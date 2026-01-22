
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-idm-navy text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo e descrição */}
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/8e88918f-e465-49cf-86d8-076a8bbbf39e.png"
                  alt="Instituto DespertaMENTE"
                  className="h-12 w-12 mr-3"
                />
                <div>
                  <h3 className="text-xl font-bold">Instituto DespertaMENTE</h3>
                  <p className="text-idm-gold text-sm">Transformando vidas através da Psicanálise</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Formação completa em Psicanálise Clínica Integrativa com metodologia 
                baseada no tripé freudiano: Teoria, Análise e Supervisão.
              </p>
            </div>

            {/* Links rápidos */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-idm-gold">Formação</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Psicanálise Clínica Integrativa</li>
                <li>• Certificado Reconhecido</li>
                <li>• 14 meses de duração</li>
                <li>• Acesso vitalício</li>
                <li>• Supervisão clínica</li>
                <li>• Comunidade exclusiva</li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-idm-gold">Fale Conosco</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-idm-gold" />
                  <a 
                    href="https://bit.ly/idm_atendimento" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-idm-gold transition-colors"
                  >
                    WhatsApp Atendimento
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-idm-gold" />
                  <span>institutodespertamente@gmail.com</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-idm-gold mt-1" />
                  <span>Formação 100% Online<br />Disponível em todo o Brasil</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divisor */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0 text-center">
                © 2026 Instituto DespertaMENTE. Todos os direitos reservados.
              </p>
              <div className="flex items-center text-gray-400">
                <span>Feito com</span>
                <Heart className="h-4 w-4 mx-2 text-red-500 fill-current" />
                <span>para transformar vidas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
