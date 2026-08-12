import { sendMetaCapiEvent, cleanText, getClientIp } from "../lib/meta-capi.js";

// Eventos de navegador aceitos aqui (nao envolvem dado pessoal do lead --
// esses ficam em api/leads.js). PageView cobre o acesso a pagina; Contact
// cobre a intencao de contato (abriu o modal do WhatsApp), dando sinal de
// funil mais rico pro Meta mesmo quando o lead nao chega a se cadastrar.
const EVENTOS_PERMITIDOS = new Set(["PageView", "Contact"]);

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Método não permitido." });
  }

  let body;

  try {
    body =
      typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  } catch {
    return response.status(400).json({ error: "Corpo da requisição inválido." });
  }

  const eventName = cleanText(body?.event_name, 50);
  const eventId = cleanText(body?.event_id, 100);

  if (!eventName || !EVENTOS_PERMITIDOS.has(eventName)) {
    return response.status(400).json({ error: "event_name inválido." });
  }
  if (!eventId) {
    return response.status(400).json({ error: "event_id é obrigatório." });
  }

  const userData = {
    client_ip_address: getClientIp(request) || undefined,
    client_user_agent: cleanText(request.headers["user-agent"], 500) || undefined,
    fbp: cleanText(body?.fbp, 200) || undefined,
    fbc: cleanText(body?.fbc, 200) || undefined,
  };

  await sendMetaCapiEvent({
    eventName,
    eventId,
    userData,
    eventSourceUrl: cleanText(body?.landing_page, 1000),
  });

  return response.status(200).json({ success: true });
}
