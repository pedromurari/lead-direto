
import { useEffect } from 'react';
import { HeroSection, type OfferVariant } from '@/components/HeroSection';
import { CourseOverview } from '@/components/CourseOverview';
import { CourseContent } from '@/components/CourseContent';
import { BonusSection } from '@/components/BonusSection';
import { InvestmentSection } from '@/components/InvestmentSection';
import { OfferParcelasEspeciais } from '@/components/OfferParcelasEspeciais';
import { OfferPagueEm30Dias } from '@/components/OfferPagueEm30Dias';
import { AboutSection } from '@/components/AboutSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Footer } from '@/components/Footer';
import { CTAButton } from '@/components/CTAButton';
import { SocialProofNotifications } from '@/components/SocialProofNotifications';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';

const TITULOS: Record<OfferVariant, string> = {
  default: 'Instituto DespertaMENTE - Formação em Psicanálise Clínica Integrativa',
  'condicao-especial': 'Condição Especial nas Parcelas - Formação em Psicanálise | Instituto DespertaMENTE',
  'pague-em-30-dias': 'Assine Hoje, Pague em 30 Dias - Formação em Psicanálise | Instituto DespertaMENTE',
};

interface IndexProps {
  variant?: OfferVariant;
}

const Index = ({ variant = 'default' }: IndexProps) => {
  useEffect(() => {
    document.title = TITULOS[variant];
  }, [variant]);

  const OfferSection =
    variant === 'condicao-especial' ? OfferParcelasEspeciais :
    variant === 'pague-em-30-dias' ? OfferPagueEm30Dias :
    InvestmentSection;

  return (
    <div className="min-h-screen bg-white font-poppins">
      <HeroSection variant={variant} />
      <CourseOverview />

      {/* CTA intermediário */}
      <div className="py-2 md:py-3 bg-idm-light-blue">
        <div className="container mx-auto px-4 text-center">
          <CTAButton
            id="btn-whatsapp-1"
            text="✨ GARANTA SUA VAGA"
          />
        </div>
      </div>

      <CourseContent />
      <BonusSection />
      <OfferSection />

      <AboutSection />
      <TestimonialsSection />

      {/* CTA final */}
      <div className="py-3 md:py-4 bg-idm-gold">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg md:text-2xl font-bold text-idm-navy mb-3 md:mb-4">
            ✨ Comece agora a transformar sua vida!
          </h3>
          <CTAButton
            id="btn-whatsapp-3"
            variant="navy"
            text="✨ QUERO TRANSFORMAR MINHA VIDA"
          />
        </div>
      </div>

      <Footer />

      {/* Notificações de prova social */}
      <SocialProofNotifications />

      {/* CTA fixo no mobile */}
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
