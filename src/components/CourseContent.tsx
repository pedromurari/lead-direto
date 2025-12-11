
import { Brain, Heart, Users, Lightbulb, CheckCircle } from 'lucide-react';

export const CourseContent = () => {
  const modules = [
    {
      number: "01",
      title: "O Inconsciente",
      icon: <Brain className="h-8 md:h-12 w-8 md:w-12 text-idm-gold" />,
      topics: [
        "Freud e os fundamentos da Psicanálise",
        "Jung e o inconsciente coletivo", 
        "Lacan e o inconsciente estruturado",
        "Aparelho psíquico e suas instâncias",
        "Mecanismos de defesa do Ego"
      ]
    },
    {
      number: "02", 
      title: "A Infância",
      icon: <Heart className="h-8 md:h-12 w-8 md:w-12 text-idm-gold" />,
      topics: [
        "Complexo de Narciso",
        "Complexo de Édipo",
        "Estruturas clínicas fundamentais",
        "Melanie Klein e o mundo infantil",
        "Winnicott e o desenvolvimento emocional"
      ]
    },
    {
      number: "03",
      title: "As Manifestações", 
      icon: <Users className="h-8 md:h-12 w-8 md:w-12 text-idm-gold" />,
      topics: [
        "Transtornos psicossomáticos",
        "Distúrbios de personalidade",
        "Vícios e compulsões",
        "Comportamento suicida",
        "TEA e TDAH na perspectiva psicanalítica"
      ]
    },
    {
      number: "04",
      title: "As Técnicas Aplicadas",
      icon: <Lightbulb className="h-8 md:h-12 w-8 md:w-12 text-idm-gold" />,
      topics: [
        "Constelação familiar sistêmica",
        "Hipnose clínica",
        "Programação Neurolinguística (PNL)",
        "Empreendedorismo em Psicanálise",
        "Marketing para psicanalistas"
      ]
    }
  ];

  return (
    <section className="py-8 md:py-10 bg-idm-light-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título da seção */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-idm-navy mb-4">
              Conteúdo do <span className="text-idm-gold">Curso</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Uma jornada estruturada em 4 arcos fundamentais que levarão você 
              do básico ao domínio completo da Psicanálise Clínica Integrativa
            </p>
          </div>

          {/* Tripé Psicanalítico */}
          <div className="mb-8 md:mb-10 text-center">
            <img 
              src="/lovable-uploads/d782be5c-ea03-4cb3-a054-f9294b1af9ed.png"
              alt="Tripé Psicanalítico: Teoria, Análise e Supervisão"
              className="max-w-full h-auto mx-auto rounded-2xl shadow-2xl"
            />
            <div className="mt-6 md:mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-lg mx-2">
              <h3 className="text-xl md:text-3xl font-bold text-idm-navy mb-3 md:mb-4">
                O Tripé Psicanalítico
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Como proposto por Freud, nossa formação se baseia nos três pilares essenciais: 
                <strong className="text-idm-gold"> Teoria Psicanalítica</strong>, 
                <strong className="text-idm-gold"> Análise Pessoal</strong> e 
                <strong className="text-idm-gold"> Supervisão Clínica</strong>. 
                Essa estrutura garante uma formação completa e transformadora
              </p>
            </div>
          </div>

          {/* Módulos do curso */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {modules.map((module, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 mx-2 md:mx-0"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                  <div className="bg-idm-navy text-idm-gold font-bold text-xl md:text-2xl rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mr-0 md:mr-4 mb-4 md:mb-0">
                    {module.number}
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    {module.icon}
                    <h3 className="text-xl md:text-2xl font-bold text-idm-navy mt-2 md:mt-0 md:ml-4 text-center md:text-left">
                      {module.title}
                    </h3>
                  </div>
                </div>
                
                <ul className="space-y-2 md:space-y-3">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start">
                      <CheckCircle className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 text-idm-gold flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm md:text-base">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Destaque da metodologia */}
          <div className="mt-8 md:mt-10 bg-gradient-to-r from-idm-gold to-yellow-500 rounded-2xl p-6 md:p-10 text-center mx-2 md:mx-0">
            <h3 className="text-2xl md:text-4xl font-bold text-idm-navy mb-4 md:mb-6">
              Metodologia Exclusiva do iDM
            </h3>
            <p className="text-lg md:text-xl text-idm-navy leading-relaxed max-w-4xl mx-auto">
              Nossa abordagem integrativa combina os fundamentos clássicos da Psicanálise 
              com técnicas modernas comprovadas, proporcionando uma formação completa 
              e prática para sua atuação profissional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
