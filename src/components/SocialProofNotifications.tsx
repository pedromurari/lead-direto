import { useState, useEffect } from 'react';

const notifications = [
  "✅ Carla de Belo Horizonte se matriculou no curso.",
  "💬 Fernanda de São Paulo entrou em contato no WhatsApp.",
  "🕒 Juliana de Porto Alegre está negociando com a equipe.",
  "✅ Renata de Salvador se matriculou no curso.",
  "💬 Larissa de Recife chamou a equipe no WhatsApp.",
  "🕒 Amanda de Fortaleza está conversando com uma consultora.",
  "✅ Priscila de Campinas finalizou sua matrícula.",
  "💬 Tatiane de Ribeirão Preto fez contato via WhatsApp.",
  "🕒 Bruna do Rio de Janeiro está avaliando a proposta com a equipe.",
  "✅ Milena de Brasília se matriculou agora há pouco.",
  "💬 Gisele de Curitiba chamou no WhatsApp com dúvidas.",
  "🕒 Aline de São Luís pediu para falar com uma especialista.",
  "✅ Rafaela de Florianópolis garantiu sua vaga no curso.",
  "💬 Letícia de Goiânia entrou em contato pelo WhatsApp.",
  "🕒 Camila de Maceió está em conversa com o time de matrículas.",
  "✅ Beatriz de João Pessoa realizou sua inscrição agora.",
  "💬 Silvia de Teresina chamou no WhatsApp para mais informações.",
  "🕒 Luana de Natal está negociando o plano de matrícula.",
  "✅ Viviane de Aracaju completou sua inscrição no curso.",
  "💬 Thaís de Campo Grande está falando com o atendimento via WhatsApp.",
  "🎉 Patrícia de Manaus garantiu sua vaga na próxima turma.",
  "📚 Rafael de Belém começou sua jornada na formação.",
  "✅ Bruno de Vitória se matriculou no curso agora.",
  "💬 Marcelo de Cuiabá chamou a equipe no WhatsApp.",
  "🕒 Diego de Porto Velho está tirando dúvidas com a consultora.",
  "✅ Vanessa de Uberlândia finalizou sua matrícula.",
  "💬 Eduarda de Santos entrou em contato pelo WhatsApp.",
  "🎉 Rodrigo de Niterói garantiu sua vaga agora há pouco.",
  "🕒 Simone de Sorocaba está avaliando as formas de pagamento.",
  "✅ Fabiana de Londrina realizou sua inscrição no curso.",
  "💬 André de Joinville chamou no WhatsApp com dúvidas.",
  "📚 Cristina de Caxias do Sul começou a formação hoje.",
  "🕒 Leandro de Aracaju está negociando com o time de matrículas.",
  "✅ Daniela de Feira de Santana se matriculou no curso.",
  "💬 Otávio de Juiz de Fora entrou em contato via WhatsApp.",
  "🎉 Sabrina de Blumenau garantiu sua vaga na turma.",
  "🕒 Henrique de Anápolis está conversando com uma especialista.",
  "✅ Mariana de Piracicaba completou sua inscrição agora.",
  "💬 Cláudia de Petrolina chamou a equipe no WhatsApp.",
  "📚 Igor de Montes Claros começou sua jornada na formação.",
  "🕒 Rosana de Caruaru está avaliando a proposta com a equipe."
];

export const SocialProofNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let availableIndexes = notifications.map((_, index) => index);
    let hideTimeout: ReturnType<typeof setTimeout>;
    let clearTimeoutId: ReturnType<typeof setTimeout>;

    const showNotification = () => {
      if (availableIndexes.length === 0) {
        availableIndexes = notifications.map((_, index) => index);
      }

      const position = Math.floor(Math.random() * availableIndexes.length);
      const [notificationIndex] = availableIndexes.splice(position, 1);

      setCurrentNotification(notifications[notificationIndex]);
      setIsVisible(true);

      hideTimeout = setTimeout(() => {
        setIsVisible(false);
        clearTimeoutId = setTimeout(() => setCurrentNotification(null), 300);
      }, 6000);
    };

    const initialTimeout = setTimeout(showNotification, 3000);
    const interval = setInterval(showNotification, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      clearTimeout(hideTimeout);
      clearTimeout(clearTimeoutId);
    };
  }, []);

  if (!currentNotification) return null;

  return (
    <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-50 max-w-xs md:max-w-sm">
      <div
        className={`
          bg-white border border-border shadow-lg rounded-lg p-2 md:p-4
          transition-all duration-300 ease-in-out transform
          ${isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-95'
          }
        `}
      >
        <div className="flex items-start space-x-2 md:space-x-3">
          <div className="flex-shrink-0">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex-1">
            <p className="text-xs md:text-sm text-foreground font-medium leading-relaxed">
              {currentNotification}
            </p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
              Agora há pouco
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
