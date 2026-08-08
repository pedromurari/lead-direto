import { useEffect, useState } from 'react';
import { CTAButton } from './CTAButton';

export const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-idm-navy/95 backdrop-blur-sm border-t border-idm-gold/40 px-3 py-2 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <CTAButton id="btn-whatsapp-sticky" text="✨ FALAR NO WHATSAPP" />
    </div>
  );
};
