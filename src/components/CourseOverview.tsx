
import { CheckCircle, Users, Globe, Clock, Award, Infinity } from 'lucide-react';

export const CourseOverview = () => {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-idm-gold" />,
      title: "Formação 100% online",
      description: "Estude no seu ritmo, de qualquer lugar do mundo"
    },
    {
      icon: <Clock className="h-8 w-8 text-idm-gold" />,
      title: "Duração: 14 meses",
      description: "Tempo ideal para absorver todo o conhecimento"
    },
    {
      icon: <Award className="h-8 w-8 text-idm-gold" />,
      title: "Certificado reconhecido",
      description: "Validação oficial da sua formação"
    },
    {
      icon: <Infinity className="h-8 w-8 text-idm-gold" />,
      title: "Acesso vitalício à plataforma",
      description: "Revise o conteúdo sempre que precisar"
    }
  ];

  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título da seção */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-idm-navy mb-4">
              Formação em <span className="text-idm-gold">Psicanálise Clínica Integrativa</span>
            </h2>
            <p className="text-lg md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-2">
              Uma jornada completa de transformação pessoal e profissional baseada no método tradicional 
              de Freud: <strong>Teoria</strong>, <strong>Análise Pessoal</strong> e <strong>Supervisão</strong>
            </p>
          </div>

          {/* Grid de características */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-idm-light-blue rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-idm-navy mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Destaque especial */}
          <div className="bg-gradient-to-r from-idm-navy to-idm-blue rounded-2xl p-6 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
              Por que escolher a <span className="text-idm-gold">Psicanálise Integrativa</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
              <div className="flex flex-col md:flex-row items-start">
                <CheckCircle className="mr-0 md:mr-4 h-6 w-6 text-idm-gold flex-shrink-0 mt-1 mb-2 md:mb-0 mx-auto md:mx-0" />
                <div className="text-center md:text-left">
                  <h4 className="font-bold mb-2">Autocura e Autoconhecimento</h4>
                  <p className="text-gray-200 text-sm md:text-base">Trabalhe suas próprias questões enquanto se capacita</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start">
                <CheckCircle className="mr-0 md:mr-4 h-6 w-6 text-idm-gold flex-shrink-0 mt-1 mb-2 md:mb-0 mx-auto md:mx-0" />
                <div className="text-center md:text-left">
                  <h4 className="font-bold mb-2">Metodologia Comprovada</h4>
                  <p className="text-gray-200 text-sm md:text-base">Baseada nos fundamentos clássicos da Psicanálise</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start">
                <CheckCircle className="mr-0 md:mr-4 h-6 w-6 text-idm-gold flex-shrink-0 mt-1 mb-2 md:mb-0 mx-auto md:mx-0" />
                <div className="text-center md:text-left">
                  <h4 className="font-bold mb-2">Realização Profissional</h4>
                  <p className="text-gray-200 text-sm md:text-base">Uma nova carreira de propósito e significado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
