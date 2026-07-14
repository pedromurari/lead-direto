
import { HeroSection } from '@/components/HeroSection';
import { CourseOverview } from '@/components/CourseOverview';
import { CourseContent } from '@/components/CourseContent';
import { BonusSection } from '@/components/BonusSection';
import { InvestmentSection } from '@/components/InvestmentSection';
import { AboutSection } from '@/components/AboutSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Footer } from '@/components/Footer';
import { CTAButton } from '@/components/CTAButton';
import { SocialProofNotifications } from '@/components/SocialProofNotifications';

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <HeroSection />
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
      <InvestmentSection />
      
      {/* CTA intermediário */}
      <div className="py-2 md:py-3 bg-idm-navy">
        <div className="container mx-auto px-4 text-center">
          <CTAButton 
            id="btn-whatsapp-2" 
            variant="white" 
            text="✨ FALAR COM CONSULTOR" 
          />
        </div>
      </div>
      
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
    </div>
  );
};

export default Index;
