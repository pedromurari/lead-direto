import { useEffect, useState } from 'react';
import { CheckCircle, Clock, Loader2, MessageCircle, Play } from 'lucide-react';
import { Footer } from '@/components/Footer';

// Video self-hosted (comprimido de 144MB pra ~19MB, mesmo esquema usado em
// psicuritiba.idmpelobrasil.com.br/videos/) -- serve direto do /public, sem
// depender de YouTube/Vimeo.
const VIDEO_SRC = '/videos/obrigado-setembro-amarelo.mp4';
// Frame limpo (sem legenda queimada) extraído do próprio vídeo, em vez de
// carregar o vídeo inteiro só pra mostrar a capa -- clica pra só então baixar
// os 19MB de verdade.
const VIDEO_POSTER = '/videos/obrigado-poster.jpg';

// Fallback pra quando o rodízio não confirma a tempo -- mesmo número usado
// em WhatsAppLeadModal.tsx (Helen), não o número genérico antigo sem dono.
const WHATSAPP_TELEFONE_PADRAO = '5511965781940';
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
  const [tocandoVideo, setTocandoVideo] = useState(false);

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
            {tocandoVideo ? (
              <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg bg-black">
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  playsInline
                  src={VIDEO_SRC}
                >
                  Seu navegador não suporta vídeo em HTML5.
                </video>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setTocandoVideo(true)}
                className="relative block w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl border-4 border-idm-gold/60 group"
              >
                <img
                  src={VIDEO_POSTER}
                  alt="Assista antes de falar com a equipe"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4">
                  <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-idm-gold shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="h-7 w-7 md:h-9 md:w-9 text-idm-navy fill-idm-navy ml-1" />
                  </span>
                  <div className="bg-black/70 rounded-xl px-4 py-2 md:px-6 md:py-3 max-w-md">
                    <p className="text-white font-bold text-sm md:text-base flex items-center justify-center gap-2">
                      <Play className="h-4 w-4 fill-white flex-shrink-0" />
                      ASSISTA ANTES DE FALAR COM A EQUIPE
                    </p>
                    <p className="text-gray-200 text-xs md:text-sm mt-1">
                      Descubra a condição especial que preparamos pra você
                    </p>
                  </div>
                </div>
              </button>
            )}

            <p className="text-gray-700 text-sm md:text-base text-center mb-6 leading-relaxed">
              Se você chegou até aqui, é porque em algum momento sentiu o quanto a mente humana
              precisa ser compreendida — inclusive a sua. A Psicanálise não é só uma profissão:
              é aprender a escutar, acolher e enxergar o que existe por trás dos comportamentos.
            </p>

            <div className="bg-idm-light-blue rounded-2xl p-5 md:p-8 text-center mb-6 border-2 border-idm-gold/40">
              <Clock className="h-8 w-8 text-idm-navy mx-auto mb-2" />
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-idm-gold mb-1">
                🎗️ Edição Setembro Amarelo
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-idm-navy mb-2">
                Matricule-se em até {BONUS_PRAZO_HORAS}h e garanta 50% OFF + bônus especiais
              </h2>
              <p className="text-idm-navy text-sm md:text-base">
                Prazo: <strong>{formatarPrazo(prazo)}</strong>
              </p>
              <p className="text-xs text-gray-600 mt-2">
                *Vagas limitadas. Condição confirmada com a equipe comercial, válida em horário
                comercial (seg. a sáb., 9h às 18h).
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
