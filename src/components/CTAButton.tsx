import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { WhatsAppLeadModal } from './WhatsAppLeadModal';

interface CTAButtonProps {
  variant?: 'default' | 'white' | 'navy';
  text?: string;
  id?: string;
}

export const CTAButton = ({ 
  variant = 'default',
  text = "🎁 GARANTA SEU DESCONTO DE NATAL",
  id
}: CTAButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const getButtonClasses = () => {
    switch (variant) {
      case 'white':
        return 'bg-white text-idm-navy hover:bg-gray-100 border-2 border-white';
      case 'navy':
        return 'bg-idm-navy text-white hover:bg-idm-blue border-2 border-idm-navy';
      default:
        return 'bg-idm-gold text-idm-navy hover:bg-yellow-500 border-2 border-idm-gold';
    }
  };

  return (
    <>
      <Button
        id={id}
        onClick={handleClick}
        data-gtm-button="whatsapp-cta"
        className={`${getButtonClasses()} text-xs md:text-lg font-bold py-4 px-6 md:py-5 md:px-8 h-auto rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow w-full max-w-xs md:max-w-none md:w-auto mx-auto [&>*]:pointer-events-none`}
      >
        <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
        <span className="text-center flex-1 leading-tight">{text}</span>
        <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
      </Button>
      
      <WhatsAppLeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};
