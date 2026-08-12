import { getAttribution, getCookie } from './attribution';

declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string },
    ) => void;
  }
}

/**
 * Espelha eventos de navegador (PageView, Contact) pro backend, que reenvia
 * via Meta Conversions API com o mesmo event_id do Pixel (dedup). Cobre
 * quedas do Pixel no navegador (bloqueador de anúncio, Safari ITP, iOS) --
 * antes só o evento "Lead" tinha esse reforço via servidor.
 */
const sendTrackEvent = (eventName: 'PageView' | 'Contact', eventId: string) => {
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
      landing_page: getAttribution().landing_page,
    }),
  }).catch(() => {
    // observabilidade de anúncio, não deve quebrar a navegação
  });
};

export const trackPageView = () => {
  const eventId = crypto.randomUUID();
  window.fbq?.('track', 'PageView', {}, { eventID: eventId });
  // pequeno atraso pra dar tempo do fbevents.js setar o cookie _fbp antes do CAPI
  setTimeout(() => sendTrackEvent('PageView', eventId), 500);
};

export const trackContact = () => {
  const eventId = crypto.randomUUID();
  window.fbq?.('track', 'Contact', {}, { eventID: eventId });
  sendTrackEvent('Contact', eventId);
};
