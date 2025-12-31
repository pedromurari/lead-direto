import { useState } from 'react';
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

const formSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  telefone: z.string().min(10, 'WhatsApp deve ter pelo menos 10 dígitos'),
});

type FormData = z.infer<typeof formSchema>;

interface WhatsAppLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
    },
  });

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

    // Enviar para Google Sheets via Apps Script
    const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbxlTQEMNojYPsB_G-oblIYo30X9c6RLZN5Qz6dk-GQrDuWaQDzMbaIV-XtbU0HX2hAd/exec';
    
    try {
      // Enviar dados para Google Sheets (fire and forget com no-cors)
      fetch(googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: data.nome,
          whatsapp: phoneDigits,
        }),
      });
    } catch (error) {
      console.log('Erro ao enviar para Google Sheets (ignorado):', error);
    }

    // Disparar evento de conversão Lead no Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }

    // Mostrar sucesso e aguardar 2 segundos antes de redirecionar
    setSubmitStatus('success');
    
    setTimeout(() => {
      setIsSubmitting(false);
      window.open('https://wa.me/5511919434040?text=Ol%C3%A1!%20Quero%20receber%20informa%C3%A7%C3%B5es%20sobre%20a%20Forma%C3%A7%C3%A3o%20em%20Psican%C3%A1lise%20Integrativa%20do%20IDM.', '_blank');
      form.reset();
      setSubmitStatus('idle');
      onClose();
    }, 2000);
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
            🎄 Fale com Nossa Equipe
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm md:text-base text-idm-navy text-center">
            Preencha seus dados e nossa equipe entrará em contato agora pelo WhatsApp!
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    ✅ Enviado com sucesso! Redirecionando para o WhatsApp...
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
