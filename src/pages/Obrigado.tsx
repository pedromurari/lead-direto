import { useEffect, useState } from 'react';
import { CheckCircle, Clock, MessageCircle } from 'lucide-react';
import { Footer } from '@/components/Footer';

const WHATSAPP_URL =
  'https://wa.me/5511919434040?text=Ol%C3%A1!%20Acabei%20de%20me%20cadastrar%20e%20quero%20falar%20com%20a%20equipe%20agora.';

// Prazo do bônus de matrícula rápida — mesma janela usada pelo SDR (horário
// comercial seg-sáb 9h-18h, ver leads-ia-followup no repo onze-digital-main),
// só que aqui é um aviso na copy, não um cálculo: o prazo corre em horas
// corridas a partir do cadastro, o horário comercial é só sobre quando a
// equipe consegue atender.
const BONUS_PRAZO_HORAS = 24;

const formatarPrazo = (data: Date) =>
  data.toLocaleString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

const Obrigado = () => {
  const [prazo] = useState(() => new Date(Date.now() + BONUS_PRAZO_HORAS * 60 * 60 * 1000));

  useEffect(() => {
    document.title = 'Cadastro Confirmado - Instituto DespertaMENTE';
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
              <a
                href={WHATSAPP_URL}
                className="inline-flex items-center gap-2 bg-idm-gold text-idm-navy font-bold text-base md:text-lg px-6 md:px-10 py-4 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-300 shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                FALAR COM A EQUIPE AGORA
              </a>
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
