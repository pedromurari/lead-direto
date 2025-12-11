import { Gift, Users, Brain, Heart, CheckCircle, Sparkles, Bot } from 'lucide-react';

export const BonusSection = () => {
  const bonuses = [
    {
      icon: <Users className="h-8 md:h-12 w-8 md:w-12 text-white" />,
      title: "10 Sessões de Supervisão Clínica",
      value: "R$ 1.200,00",
      description: "Acompanhamento personalizado com supervisores experientes"
    },
    {
      icon: <Brain className="h-8 md:h-12 w-8 md:w-12 text-white" />,
      title: "Curso Essencial Practitioner em PNL",
      value: "R$ 790,00", 
      description: "Técnicas avançadas de Programação Neurolinguística"
    },
    {
      icon: <Heart className="h-8 md:h-12 w-8 md:w-12 text-white" />,
      title: 'Workshop "Cicatrizes que Curam"',
      value: "R$ 60,00",
      description: "Metodologia exclusiva para transformar traumas em força"
    },
    {
      icon: <Sparkles className="h-8 md:h-12 w-8 md:w-12 text-white" />,
      title: "Mentoria Reikiana com Elaine Ruivo",
      value: "R$ 197,00",
      description: "Sessão exclusiva de mentoria com especialista em Reiki"
    },
    {
      icon: <Bot className="h-8 md:h-12 w-8 md:w-12 text-white" />,
      title: "30 dias de IA Agente de Numerologia",
      value: "R$ 39,90",
      description: "Acesso à primeira IA Agente de Numerologia do Brasil"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-idm-navy to-idm-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título da seção */}
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center bg-idm-gold text-idm-navy px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-base md:text-lg mb-4">
              <Gift className="mr-2 h-5 w-5 md:h-6 md:w-6" />
              BÔNUS EXCLUSIVOS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Garanta Hoje e Receba <span className="text-idm-gold">GRÁTIS</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto px-2">
              Além da formação completa, você recebe bônus especiais que potencializam 
              ainda mais seu desenvolvimento profissional
            </p>
          </div>

          {/* Grid de bônus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {bonuses.map((bonus, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="bg-idm-gold rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  {bonus.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-2">
                  {bonus.title}
                </h3>
                <div className="text-xl md:text-2xl font-bold text-idm-gold mb-2 md:mb-3">
                  {bonus.value}
                </div>
                <p className="text-gray-200 text-xs md:text-sm">
                  {bonus.description}
                </p>
              </div>
            ))}
          </div>

          {/* Valor total dos bônus */}
          <div className="bg-idm-gold rounded-2xl p-5 md:p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-idm-navy mb-2 md:mb-3">
              Valor Total dos Bônus
            </h3>
            <div className="text-3xl md:text-5xl font-bold text-idm-navy mb-2 md:mb-3">
              R$ 2.286,90
            </div>
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <CheckCircle className="mr-2 h-5 w-5 text-idm-navy" />
              <span className="text-base md:text-lg font-semibold text-idm-navy">
                GRATUITOS para quem garantir a vaga hoje!
              </span>
            </div>
            <p className="text-sm md:text-base text-idm-navy max-w-2xl mx-auto">
              Esta é uma oportunidade única e por tempo limitado. 
              Não perca a chance de transformar sua vida com essa formação completa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
