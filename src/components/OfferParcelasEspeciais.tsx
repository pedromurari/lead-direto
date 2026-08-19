import { Wallet, Percent, FileText, CheckCircle, Award, Users } from 'lucide-react';
import { CTAButton } from './CTAButton';

export const OfferParcelasEspeciais = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título da seção */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-idm-navy mb-4">
              Uma Condição Especial pros seus <span className="text-idm-gold">Primeiros Meses</span> de Formação
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Pra quem se matricular durante essa campanha, preparamos um desconto exclusivo nas primeiras parcelas do boleto ou cartão recorrente
            </p>
          </div>

          {/* 3 Parcelas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-gray-100 rounded-2xl p-5 md:p-6 text-center relative border-2 border-idm-navy/10">
              <div className="bg-idm-navy text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">1</div>
              <h3 className="text-base md:text-lg font-bold text-idm-navy mb-3">1ª Parcela</h3>
              <Wallet className="h-10 w-10 text-idm-navy mx-auto mb-3" />
              <div className="text-xl md:text-2xl font-bold text-gray-700 mb-1">R$ 150,00</div>
              <p className="text-gray-600 text-sm">Valor normal</p>
            </div>
            <div className="bg-gradient-to-br from-idm-gold to-yellow-500 rounded-2xl p-5 md:p-6 text-center relative transform md:scale-105 shadow-xl">
              <div className="bg-idm-navy text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">2</div>
              <h3 className="text-base md:text-lg font-bold text-idm-navy mb-3">2ª Parcela</h3>
              <Percent className="h-10 w-10 text-idm-navy mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-idm-navy mb-1">50% OFF</div>
              <p className="text-idm-navy text-sm font-semibold">R$ 75,00</p>
            </div>
            <div className="bg-gradient-to-br from-idm-gold to-yellow-500 rounded-2xl p-5 md:p-6 text-center relative transform md:scale-105 shadow-xl">
              <div className="bg-idm-navy text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">3</div>
              <h3 className="text-base md:text-lg font-bold text-idm-navy mb-3">3ª Parcela</h3>
              <Percent className="h-10 w-10 text-idm-navy mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-idm-navy mb-1">50% OFF</div>
              <p className="text-idm-navy text-sm font-semibold">R$ 75,00</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-idm-light-blue rounded-2xl p-4 md:p-5 mb-6 md:mb-8 max-w-3xl mx-auto">
            <FileText className="h-6 w-6 text-idm-navy flex-shrink-0" />
            <p className="text-sm md:text-base text-idm-navy">
              Condição especial no boleto ou cartão recorrente para matrículas realizadas <strong>durante a campanha.</strong>
            </p>
          </div>

          {/* Benefícios inclusos */}
          <div className="bg-idm-light-blue rounded-2xl p-5 md:p-8 mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-idm-navy text-center mb-4 md:mb-6">
              ✨ O que está incluído no seu investimento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <Award className="mr-0 md:mr-3 h-7 w-7 text-idm-gold flex-shrink-0 mb-2 md:mb-0" />
                <div>
                  <h4 className="font-bold text-idm-navy mb-1">Acesso vitalício</h4>
                  <p className="text-gray-700 text-sm">Estude no seu ritmo, para sempre</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <CheckCircle className="mr-0 md:mr-3 h-7 w-7 text-idm-gold flex-shrink-0 mb-2 md:mb-0" />
                <div>
                  <h4 className="font-bold text-idm-navy mb-1">Certificado reconhecido</h4>
                  <p className="text-gray-700 text-sm">Extensão Universitária nas diretrizes do MEC</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <Users className="mr-0 md:mr-3 h-7 w-7 text-idm-gold flex-shrink-0 mb-2 md:mb-0" />
                <div>
                  <h4 className="font-bold text-idm-navy mb-1">Comunidade exclusiva</h4>
                  <p className="text-gray-700 text-sm">Networking com outros profissionais</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA final da seção */}
          <div className="text-center px-4">
            <CTAButton text="🎁 QUERO APROVEITAR OS 50%" />
            <p className="text-sm md:text-base text-idm-navy mt-3 md:mt-4 font-semibold">
              🎁 Condição especial válida só durante a campanha!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
