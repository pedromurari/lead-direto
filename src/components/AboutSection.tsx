import { Heart, Users, Award, Target, GraduationCap, ShieldCheck } from 'lucide-react';

export const AboutSection = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-idm-gold" />,
      number: "5.000+",
      label: "Alunos Formados"
    },
    {
      icon: <Award className="h-8 w-8 text-idm-gold" />,
      number: "98%",
      label: "Satisfação"
    },
    {
      icon: <Target className="h-8 w-8 text-idm-gold" />,
      number: "14",
      label: "Meses de Formação"
    },
    {
      icon: <Heart className="h-8 w-8 text-idm-gold" />,
      number: "100%",
      label: "Transformação"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-idm-light-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título da seção */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-idm-navy mb-6">
              Sobre o <span className="text-idm-gold">Instituto DespertaMENTE</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
            {/* Conteúdo textual */}
            <div>
              <h3 className="text-3xl font-bold text-idm-navy mb-6">
                Nossa Missão
              </h3>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  O Instituto DespertaMENTE nasceu com o propósito de 
                  <strong className="text-idm-gold"> acolher, curar e transformar vidas</strong> por meio da Psicanálise Integrativa.
                </p>
                <p>
                  Já formamos <strong>milhares de alunos</strong> com um método que une 
                  <strong className="text-idm-blue"> teoria sólida</strong>, 
                  <strong className="text-idm-blue"> análise pessoal</strong> e 
                  <strong className="text-idm-blue"> supervisão</strong> — como propôs Freud.
                </p>
                <p className="text-xl font-semibold text-idm-navy">
                  Acreditamos que a Psicanálise é um direito de todos.
                </p>
              </div>
            </div>

            {/* Logo do instituto */}
            <div className="text-center">
              <img 
                src="/lovable-uploads/3751439a-de7d-4cfb-9d51-601a50a02ce3.png"
                alt="Instituto DespertaMENTE Logo"
                className="max-w-xs md:max-w-xs max-w-32 mx-auto"
              />
            </div>
          </div>

          {/* Card Parceria Faculdade */}
          <div className="bg-gradient-to-r from-blue-900 via-idm-navy to-blue-900 border-4 border-idm-gold rounded-2xl p-6 md:p-8 mb-10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="bg-idm-gold rounded-full p-4">
                  <GraduationCap className="h-12 w-12 text-idm-navy" />
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-idm-gold mb-3">
                  🎓 Curso nas Diretrizes do MEC - Extensão Universitária
                </h3>
                <p className="text-lg text-white mb-4">
                  Nosso curso é uma <strong className="text-idm-gold">Extensão Universitária</strong> nas diretrizes do MEC, 
                  em parceria oficial com <strong className="text-idm-gold">Faculdade Parceira</strong>!
                </p>
                <p className="text-base text-gray-200 mb-4">
                  Isso significa que ao concluir sua formação, você receberá um certificado universitário com validade nacional, 
                  emitido por uma instituição de ensino de qualidade.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2 text-white bg-white/10 rounded-lg p-2">
                    <ShieldCheck className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">Certificado Universitário</span>
                  </div>
                  <div className="flex items-center gap-2 text-white bg-white/10 rounded-lg p-2">
                    <ShieldCheck className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">Diretrizes do MEC</span>
                  </div>
                  <div className="flex items-center gap-2 text-white bg-white/10 rounded-lg p-2">
                    <ShieldCheck className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">Faculdade Parceira</span>
                  </div>
                  <div className="flex items-center gap-2 text-white bg-white/10 rounded-lg p-2">
                    <ShieldCheck className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">Validade Nacional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificado */}
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
            <div className="order-2 lg:order-1">
              <img 
                src="/lovable-uploads/fbe2904a-d7b4-4247-8775-6d06582bb61e.png"
                alt="Certificado do Instituto DespertaMENTE"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-idm-navy mb-6">
                Certificação Reconhecida
              </h3>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Nosso certificado é reconhecido e validado, dando a você a credibilidade 
                  necessária para atuar profissionalmente.
                </p>
                <p>
                  Ao concluir a formação, você estará apto a exercer a Psicanálise Clínica 
                  com toda a base teórica e prática necessárias.
                </p>
                <div className="bg-idm-gold/20 rounded-lg p-4 border-l-4 border-idm-gold">
                  <p className="font-semibold text-idm-navy">
                    ✅ Certificado com validade nacional<br />
                    ✅ Reconhecimento profissional<br />
                    ✅ Base para especialização continuada
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-gradient-to-r from-idm-navy to-idm-blue rounded-2xl p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Números que Comprovam Nossa Excelência
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-200 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
