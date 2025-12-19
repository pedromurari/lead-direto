import { CreditCard, Banknote, CheckCircle, Users, Award, FileText, Sparkles } from 'lucide-react';
import { CTAButton } from './CTAButton';
export const InvestmentSection = () => {
  return <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título da seção */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-idm-navy mb-4">
              🎄 Investimento na sua <span className="text-idm-gold">Transformação</span> ✨
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              🎁 <strong>Presente de Natal especial!</strong> Uma oportunidade única de investir em você mesmo e construir uma carreira de propósito
            </p>
          </div>

          {/* Comparação de preços */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Preço original */}
            <div className="bg-gray-100 rounded-2xl p-5 md:p-6 text-center relative">
              <div className="absolute top-3 right-3 bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold">
                PREÇO NORMAL
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-600 mb-2 md:mb-3">Valor Original</h3>
              <div className="text-2xl md:text-3xl font-bold text-gray-500 mb-2 line-through">
                R$ 3.200,00
              </div>
              <p className="text-gray-600 text-sm">Preço sem os bônus exclusivos</p>
            </div>

            {/* Preço promocional Natal */}
            <div className="bg-gradient-to-br from-idm-gold to-yellow-500 rounded-2xl p-5 md:p-6 text-center relative transform md:scale-105 shadow-xl">
              <div className="absolute top-3 right-3 bg-idm-navy text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold">
                🎄 OFERTA DE NATAL
              </div>
              <h3 className="text-lg md:text-xl font-bold text-idm-navy mb-2 md:mb-3">🎁 Investimento Especial</h3>
              <div className="mb-3 md:mb-4">
                <div className="text-sm md:text-base text-idm-navy mb-1">A partir de</div>
                <div className="text-3xl md:text-4xl font-bold text-idm-navy mb-1">
                  R$ 997,00
                </div>
                <div className="text-sm md:text-base text-idm-navy">à vista no PIX</div>
              </div>
              <div className="bg-white/30 rounded-lg p-2">
                <p className="text-sm font-semibold text-idm-navy">
                  💰 Economize mais de R$ 500!
                </p>
              </div>
            </div>
          </div>

          {/* 3 Cards de Formas de Pagamento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            
            {/* Card PIX - DESTAQUE ESPECIAL */}
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 md:p-6 text-center text-white border-4 border-idm-gold shadow-2xl transform md:scale-105">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                🔥 MELHOR OFERTA
              </div>
              <Banknote className="h-10 md:h-12 w-10 md:w-12 text-white mx-auto mb-3 mt-2" />
              <h3 className="text-lg md:text-xl font-bold mb-2">PIX À Vista</h3>
              <div className="text-3xl md:text-4xl font-bold mb-2">R$ 997,00</div>
              <p className="mb-2 text-sm opacity-90">Pagamento à vista no PIX</p>
              <div className="bg-white/20 rounded-lg p-2 mb-3">
                <p className="text-sm font-semibold">💰 Economize mais de R$ 500!</p>
              </div>
              <ul className="text-left space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-idm-gold flex-shrink-0" />
                  <span className="text-xs">Maior desconto</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-idm-gold flex-shrink-0" />
                  <span className="text-xs">Acesso imediato</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-idm-gold flex-shrink-0" />
                  <span className="text-xs">Todos os bônus inclusos</span>
                </li>
              </ul>
            </div>

            {/* Card Cartão de Crédito */}
            <div className="bg-white border-2 border-idm-gold rounded-2xl p-5 md:p-6 text-center shadow-lg">
              <CreditCard className="h-10 md:h-12 w-10 md:w-12 text-idm-gold mx-auto mb-3" />
              <h3 className="text-lg md:text-xl font-bold text-idm-navy mb-2">Cartão de Crédito</h3>
              <div className="text-2xl md:text-3xl font-bold text-idm-gold mb-1">12x R$ 109,39</div>
              <p className="text-gray-600 mb-2 text-sm">Parcelado no Cartão de Crédito </p>
              <div className="bg-gray-100 rounded-lg p-2 mb-3">
                <p className="text-xs text-gray-700">Total: <strong>R$ 1.318,80</strong></p>
              </div>
              <ul className="text-left space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs">Sem juros</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs">Acesso imediato</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs">Parcelas fixas</span>
                </li>
              </ul>
            </div>

            {/* Card Boleto Parcelado */}
            <div className="bg-white border-2 border-idm-blue rounded-2xl p-5 md:p-6 text-center shadow-lg">
              <FileText className="h-10 md:h-12 w-10 md:w-12 text-idm-blue mx-auto mb-3" />
              <h3 className="text-lg md:text-xl font-bold text-idm-navy mb-2">Boleto Parcelado</h3>
              <div className="text-2xl md:text-3xl font-bold text-idm-blue mb-1">14x R$ 109,90</div>
              <p className="text-gray-600 mb-2 text-sm">Parcelamento no boleto bancário</p>
              <div className="bg-gray-100 rounded-lg p-2 mb-3">
                <p className="text-xs text-gray-700">Total: <strong>R$ 1.538,60</strong></p>
              </div>
              <ul className="text-left space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs">Sem cartão de crédito</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs">Mais parcelas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs">Facilita o orçamento</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Benefícios inclusos */}
          <div className="bg-idm-light-blue rounded-2xl p-5 md:p-8 mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-idm-navy text-center mb-4 md:mb-6">
              🎁 O que está incluído no seu investimento
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
                  <p className="text-gray-700 text-sm">Validação oficial pelo MEC + Anhanguera</p>
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

          {/* CTA final da seção - ÚNICO BOTÃO */}
          <div className="text-center px-4">
            <CTAButton text="🎄 QUERO GARANTIR MINHA VAGA" />
            <p className="text-sm md:text-base text-idm-navy mt-3 md:mt-4 font-semibold">
              🎄 Oferta exclusiva de Natal - Garanta sua vaga agora! ⭐
            </p>
          </div>
        </div>
      </div>
    </section>;
};