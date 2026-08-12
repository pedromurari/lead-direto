import { FileSignature, CalendarCheck, CalendarClock, CheckCircle, Award, Users } from 'lucide-react';
import { CTAButton } from './CTAButton';

const PASSOS = [
  {
    icon: FileSignature,
    titulo: 'Contrato assinado hoje',
  },
  {
    icon: CalendarCheck,
    titulo: 'Formação conforme o calendário da turma',
  },
  {
    icon: CalendarClock,
    titulo: '1º pagamento: +30 dias',
  },
];

export const OfferPagueEm30Dias = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título da seção */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-idm-navy mb-4">
              Assine Hoje. Comece sua Formação. <span className="text-idm-gold">Pague em 30 Dias.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Uma condição de pagamento pensada para facilitar sua entrada na formação
            </p>
          </div>

          {/* Fluxo em 3 passos */}
          <div className="max-w-2xl mx-auto mb-8 md:mb-10 space-y-4">
            {PASSOS.map((passo, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-idm-light-blue rounded-2xl p-4 flex items-center gap-4 flex-1 border-2 border-idm-navy/10">
                  <passo.icon className="h-8 w-8 text-idm-gold flex-shrink-0" />
                  <span className="font-bold text-idm-navy text-base md:text-lg">{passo.titulo}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Destaque do curso */}
          <div className="bg-gradient-to-r from-idm-navy to-idm-blue rounded-2xl p-6 md:p-8 text-white text-center mb-8 md:mb-10">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Formação em <span className="text-idm-gold">Psicanálise Clínica Integrativa</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-sm md:text-base">
              <div>
                <div className="font-bold text-idm-gold text-lg md:text-xl">14 meses</div>
                <p className="text-gray-200">de duração</p>
              </div>
              <div>
                <div className="font-bold text-idm-gold text-lg md:text-xl">600h</div>
                <p className="text-gray-200">de formação</p>
              </div>
              <div>
                <div className="font-bold text-idm-gold text-lg md:text-xl">400h</div>
                <p className="text-gray-200">de teoria</p>
              </div>
              <div>
                <div className="font-bold text-idm-gold text-lg md:text-xl">Ao vivo</div>
                <p className="text-gray-200">e gravadas</p>
              </div>
            </div>
          </div>

          {/* Benefícios inclusos */}
          <div className="bg-idm-light-blue rounded-2xl p-5 md:p-8 mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-idm-navy text-center mb-4 md:mb-6">
              ✨ O que está incluído no seu investimento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <Award className="mr-0 md:mr-3 h-7 w-7 text-idm-gold flex-shrink-0 mb-2 md:mb-0" />
                <div>
                  <h4 className="font-bold text-idm-navy mb-1">Acesso vitalício</h4>
                  <p className="text-gray-700 text-sm">Estude no seu ritmo, para sempre</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <CheckCircle className="mr-0 md:mr-3 h-7 w-7 text-idm-gold flex-shrink-0 mb-2 md:mb-0" />
                <div>
                  <h4 className="font-bold text-idm-navy mb-1">Certificado reconhecido</h4>
                  <p className="text-gray-700 text-sm">Extensão Universitária nas diretrizes do MEC</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <Users className="mr-0 md:mr-3 h-7 w-7 text-idm-gold flex-shrink-0 mb-2 md:mb-0" />
                <div>
                  <h4 className="font-bold text-idm-navy mb-1">Comunidade exclusiva</h4>
                  <p className="text-gray-700 text-sm">Networking com outros profissionais</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA final da seção */}
          <div className="text-center px-4">
            <CTAButton text="📝 QUERO GARANTIR ESSA CONDIÇÃO" />
            <p className="text-sm md:text-base text-idm-navy mt-3 md:mt-4 font-semibold">
              📝 Condição exclusiva pra quem assina agora!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
