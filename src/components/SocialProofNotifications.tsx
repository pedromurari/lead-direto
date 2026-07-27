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
  "💬 Thaís de Campo Grande está falando com o atendimento via WhatsApp."
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
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 max-w-xs md:max-w-sm">
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
