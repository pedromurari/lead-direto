import { useEffect, useState } from 'react';
import { CheckCircle, Clock, Loader2, MessageCircle } from 'lucide-react';
import { Footer } from '@/components/Footer';

const WHATSAPP_TELEFONE_PADRAO = '5511919434040';
const WHATSAPP_MENSAGEM =
  'Olá! Acabei de me cadastrar e quero falar com a equipe agora.';
const whatsappUrl = (telefone: string) =>
  `https://wa.me/${telefone}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;

// Prazo do bônus de matrícula rápida — mesma janela usada pelo SDR (horário
// comercial seg-sáb 9h-18h, ver leads-ia-followup no repo onze-digital-main),
// só que aqui é um aviso na copy, não um cálculo: o prazo corre em horas
// corridas a partir do cadastro, o horário comercial é só sobre quando a
// equipe consegue atender.
const BONUS_PRAZO_HORAS = 24;

// Tentativas de atribuir um vendedor via rodízio antes de desistir e cair no
// número genérico -- o usuário pediu pra priorizar acertar o rodízio (afeta
// comissão) em vez de liberar o botão na primeira falha, mas o lead não pode
// ficar travado pra sempre se o Supabase cair.
const TENTATIVAS_ATRIBUICAO = 3;
const ATRASO_ENTRE_TENTATIVAS_MS = 1200;

const formatarPrazo = (data: Date) =>
  data.toLocaleString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type EstadoBotao = 'preparando' | 'pronto' | 'fallback';

const Obrigado = () => {
  const [prazo] = useState(() => new Date(Date.now() + BONUS_PRAZO_HORAS * 60 * 60 * 1000));
  const [estadoBotao, setEstadoBotao] = useState<EstadoBotao>('preparando');
  const [telefoneDestino, setTelefoneDestino] = useState(WHATSAPP_TELEFONE_PADRAO);

  useEffect(() => {
    document.title = 'Cadastro Confirmado - Instituto DespertaMENTE';
  }, []);

  useEffect(() => {
    const leadId = new URLSearchParams(window.location.search).get('lead');

    // Sem leadId pra atribuir (ex: caiu na contingência de leads) -- vai
    // direto pro número genérico, sem tentar o rodízio.
    if (!leadId) {
      setEstadoBotao('fallback');
      return;
    }

    let cancelado = false;

    const atribuirVendedor = async () => {
      for (let tentativa = 1; tentativa <= TENTATIVAS_ATRIBUICAO; tentativa++) {
        try {
          const response = await fetch('/api/atribuir-vendedor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ leadId }),
            signal: AbortSignal.timeout(8000),
          });

          if (response.ok) {
            const result = await response.json().catch(() => null);
            if (result?.telefone && !cancelado) {
              setTelefoneDestino(result.telefone);
              setEstadoBotao('pronto');
              return;
            }
          }
        } catch {
          // segue pra próxima tentativa
        }

        if (tentativa < TENTATIVAS_ATRIBUICAO) {
          await sleep(ATRASO_ENTRE_TENTATIVAS_MS * tentativa);
        }
      }

      // Esgotou as tentativas -- libera o botão com o número genérico pra não
      // travar o lead, mesmo sem conseguir confirmar o rodízio.
      if (!cancelado) setEstadoBotao('fallback');
    };

    atribuirVendedor();

    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-poppins flex flex-col">
      <div className="flex-1">
        <section className="py-10 md:py-16 bg-gradient-to-br from-idm-navy to-idm-blue text-white text-center px-4">
          <CheckCircle className="h-12 w-12 md:h-14 md:w-14 text-idm-gold mx-auto mb-4" />
          <h1 className="text-2xl md:text-4xl font-bold mb-3">Cadastro confirmado! 🎉</h1>
          <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
            Falta pouco pra você garantir sua vaga na Formação em Psicanálise Clínica Integrativa.
          </p>
        </section>

        <section className="py-8 md:py-12 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Espaço reservado pro vídeo */}
            <div className="aspect-video bg-gray-100 border-2 border-dashed border-idm-gold/40 rounded-2xl flex items-center justify-center mb-8">
              <p className="text-gray-400 text-sm md:text-base px-4 text-center">[ vídeo em breve ]</p>
            </div>

            <div className="bg-idm-light-blue rounded-2xl p-5 md:p-8 text-center mb-6">
              <Clock className="h-8 w-8 text-idm-navy mx-auto mb-2" />
              <h2 className="text-xl md:text-2xl font-bold text-idm-navy mb-2">
                Matricule-se em até {BONUS_PRAZO_HORAS}h e garanta [bônus a definir]
              </h2>
              <p className="text-idm-navy text-sm md:text-base">
                Prazo: <strong>{formatarPrazo(prazo)}</strong>
              </p>
              <p className="text-xs text-gray-600 mt-2">
                *Oferta válida em horário comercial (seg. a sáb., 9h às 18h)
              </p>
            </div>

            <div className="text-center">
              {estadoBotao === 'preparando' ? (
                <span className="inline-flex items-center gap-2 bg-idm-gold/50 text-idm-navy font-bold text-base md:text-lg px-6 md:px-10 py-4 rounded-full cursor-wait">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Preparando seu atendimento...
                </span>
              ) : (
                <a
                  href={whatsappUrl(telefoneDestino)}
                  className="inline-flex items-center gap-2 bg-idm-gold text-idm-navy font-bold text-base md:text-lg px-6 md:px-10 py-4 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-300 shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  FALAR COM A EQUIPE AGORA
                </a>
              )}
              <p className="text-sm text-gray-600 mt-3">
                Nossa equipe vai te atender o quanto antes, dentro do horário comercial.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Obrigado;
