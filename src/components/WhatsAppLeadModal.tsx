import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { getAttribution, getCookie } from '@/lib/attribution';
import { trackContact } from '@/lib/meta-tracking';

const formSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  telefone: z.string().min(10, 'WhatsApp deve ter pelo menos 10 dígitos'),
  website: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface WhatsAppLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Numero generico antigo (5511919434040) nao tinha vendedor de olho -- leads
// caiam num WhatsApp sem dono. Fallback agora aponta pra Helen (uma pessoa
// real acompanhando), ate a Condicao Especial/Pague em 30 Dias ganharem
// rodizio proprio como a pagina Padrao ja tem.
const WHATSAPP_TELEFONE_FALLBACK = '5511965781940';
const whatsappUrl = (telefone: string) =>
  `https://wa.me/${telefone}?text=${encodeURIComponent(
    'Olá! Quero receber informações sobre a Formação em Psicanálise Integrativa do IDM.',
  )}`;
const WHATSAPP_URL = whatsappUrl(WHATSAPP_TELEFONE_FALLBACK);

// Função para aplicar máscara de telefone brasileiro
const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) {
    return `(${numbers}`;
  }
  if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }
  if (numbers.length <= 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

export const WhatsAppLeadModal = ({ isOpen, onClose }: WhatsAppLeadModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      telefone: '',
      website: '',
    },
  });

  // Sinal de intenção de contato (abriu o modal), mesmo que não chegue a
  // preencher o formulário — dá ao Meta um evento de funil intermediário
  // entre PageView e Lead.
  useEffect(() => {
    if (isOpen) trackContact();
  }, [isOpen]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  const onSubmit = async (data: FormData) => {
    const phoneDigits = data.telefone.replace(/\D/g, '');
    
    if (phoneDigits.length < 10) {
      setErrorMessage('Por favor, insira um WhatsApp válido com DDD');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const eventId = crypto.randomUUID();
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: data.nome,
          whatsapp: phoneDigits,
          website: data.website,
          event_id: eventId,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
          // Pagina atual (nao o first-touch salvo em attribution.landing_page) --
          // e' o sinal confiavel de qual oferta/campanha o lead converteu, mesmo
          // que o primeiro toque dele tenha sido em outra pagina antes.
          pagina_atual: window.location.pathname,
          attribution: getAttribution(),
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error ?? 'Falha ao registrar o lead.');
      }

      const result = await response.json().catch(() => null);

      window.fbq?.('track', 'Lead', {}, { eventID: eventId });
      setSubmitStatus('success');

      // Pagina-ponte /obrigado (video/copy + bonus de matricula rapida) fica em
      // standby ate o video e a copy do beneficio ficarem prontos. O rodizio de
      // vendedor (Helen/Miguel intercalados) ja roda pra Padrao e Condicao
      // Especial -- so pula a ponte e manda direto pro WhatsApp de quem foi
      // sorteado. Pague em 30 Dias ainda nao tem canal/campanha no Time
      // Comercial, entao cai no fallback fixo.
      const paginasSemRodizio = ['/pague-em-30-dias'];
      let destino = WHATSAPP_URL;

      if (!paginasSemRodizio.includes(window.location.pathname) && result?.leadId) {
        try {
          const vendedorResponse = await fetch('/api/atribuir-vendedor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ leadId: result.leadId }),
            signal: AbortSignal.timeout(5000),
          });
          const vendedorResult = await vendedorResponse.json().catch(() => null);
          if (vendedorResponse.ok && vendedorResult?.telefone) {
            destino = whatsappUrl(vendedorResult.telefone);
          }
        } catch {
          // Rodizio fora do ar -- segue com o fallback fixo, lead nao pode travar.
        }
      }

      setTimeout(() => {
        form.reset();
        window.location.assign(destino);
      }, 1200);
    } catch (error) {
      console.error('Falha ao enviar lead:', error);
      setErrorMessage(
        'Não foi possível registrar seus dados. Tente novamente em instantes.',
      );
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      setSubmitStatus('idle');
      setErrorMessage('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border-idm-gold border-2 mx-2 sm:mx-4 w-[calc(100%-1rem)] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-idm-navy text-center">
            ✨ Fale com Nossa Equipe
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm md:text-base text-idm-navy text-center">
            Preencha seus dados e nossa equipe entrará em contato agora pelo WhatsApp!
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px]"
                {...form.register('website')}
              />
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-idm-navy font-medium">Nome Completo *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome completo"
                        {...field}
                        className="border-idm-gold focus:border-idm-navy h-12 text-base"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-idm-navy font-medium">WhatsApp com DDD *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(11) 99999-9999"
                        value={field.value}
                        onChange={(e) => handlePhoneChange(e, field.onChange)}
                        className="border-idm-gold focus:border-idm-navy h-12 text-base"
                        disabled={isSubmitting}
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-xs text-gray-500 text-center">* Campos obrigatórios</p>

              {/* Mensagem de sucesso */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-700 text-sm font-medium">
                    Lead registrado! Redirecionando para o WhatsApp...
                  </span>
                </div>
              )}

              {/* Mensagem de erro */}
              {submitStatus === 'error' && errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <span className="text-red-700 text-sm font-medium">{errorMessage}</span>
                </div>
              )}
              
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full bg-idm-gold text-idm-navy hover:bg-green-600 hover:text-white font-bold transition-colors duration-300 h-14 text-base md:text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Enviado! Redirecionando...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="mr-2 h-5 w-5" />
                      ENVIAR E FALAR COM CONSULTOR
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
