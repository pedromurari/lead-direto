import crypto from "node:crypto";
import { sendMetaCapiEvent, sha256, cleanText, getClientIp } from "../lib/meta-capi.js";

const DEFAULT_ONZE_WEBHOOK_URL =
  "https://usqiyekfmwwnvkmkdlej.supabase.co/functions/v1/webhook-leads";
const DEFAULT_TIME_COMERCIAL_WEBHOOK_URL =
  "https://usqiyekfmwwnvkmkdlej.supabase.co/functions/v1/webhook-leads-time-comercial";
const DEFAULT_FALLBACK_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzEOTuC7CZZPAKfCShpYn8U-KozjsJzwekFhoxKF3Vv3Qc8BYLZ9McTtDIGPk2u2kCl/exec";

const normalizePhone = (value) => String(value ?? "").replace(/\D/g, "");

// Rotula a oferta/campanha a partir do path atual (nao do first-touch salvo em
// attribution), pra equipe de vendas saber de cara qual condicao foi prometida
// ao lead antes de ligar/chamar no WhatsApp. Paginas fora desse mapa (a padrao,
// "/") caem como campanha "Padrao" no canal Direto do Time Comercial.
const CAMPANHAS = {
  "/condicao-especial": "Condição Especial (2ª e 3ª parcela 50% OFF)",
  "/pague-em-30-dias": "Pague em 30 Dias (1º pagamento com carência)",
};
const campanhaLabel = (pathname) => CAMPANHAS[pathname] ?? null;

// Nomes exatos das campanhas em `time_comercial_campanhas` (canal='Direto').
// Qualquer pagina fora desse mapa (a padrao, "/") cai como campanha "Padrao".
// "/pague-em-30-dias" ainda nao foi migrada, continua em Leads Diretos
// (Pipeline.tsx) ate ser conectada tambem.
const CAMPANHA_PADRAO_TIME_COMERCIAL = "Padrão — Formação em Psicanálise";
const CAMPANHAS_TIME_COMERCIAL = {
  "/condicao-especial": "Condição Especial — 2ª e 3ª parcela 50% OFF",
};
const PAGINAS_FORA_TIME_COMERCIAL = ["/pague-em-30-dias"];

/**
 * Envia o evento "Lead" para a Meta Conversions API, espelhando o Pixel do
 * navegador (mesmo event_id) para deduplicação. Silencioso em caso de falha:
 * a Conversions API é observabilidade de anúncios, não deve derrubar o lead.
 */
const sendLeadCapiEvent = async ({
  whatsapp,
  eventId,
  fbp,
  fbc,
  clientIp,
  userAgent,
  eventSourceUrl,
  utm,
}) => {
  const userData = {
    ph: [sha256(`55${whatsapp}`)],
    ...(clientIp ? { client_ip_address: clientIp } : {}),
    ...(userAgent ? { client_user_agent: userAgent } : {}),
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
  };

  await sendMetaCapiEvent({
    eventName: "Lead",
    eventId,
    userData,
    eventSourceUrl,
    customData: {
      utm_source: utm.utm_source || undefined,
      utm_medium: utm.utm_medium || undefined,
      utm_campaign: utm.utm_campaign || undefined,
    },
  });
};

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

  if (body?.website) {
    return response.status(200).json({ success: true });
  }

  const nome = String(body?.nome ?? "").trim();
  const whatsapp = normalizePhone(body?.whatsapp);
  const attribution = body?.attribution ?? {};
  const pagina = cleanText(body?.pagina_atual, 100);
  const campanha = campanhaLabel(pagina);

  if (nome.length < 2 || whatsapp.length < 10 || whatsapp.length > 11) {
    return response.status(400).json({
      error: "Informe um nome e um WhatsApp válido com DDD.",
    });
  }

  // Pagina padrao ("/") e Condicao Especial entram pelo Funil do Time
  // Comercial (canal Direto), com rodizio de vendedor. Pague em 30 Dias
  // continua em Leads Diretos ate ser conectada tambem.
  const nomeCampanhaTimeComercial = PAGINAS_FORA_TIME_COMERCIAL.includes(pagina)
    ? null
    : CAMPANHAS_TIME_COMERCIAL[pagina] ?? CAMPANHA_PADRAO_TIME_COMERCIAL;
  const usaTimeComercial = nomeCampanhaTimeComercial !== null;
  const webhookUrl = usaTimeComercial
    ? process.env.ONZE_TIME_COMERCIAL_WEBHOOK_URL ??
      DEFAULT_TIME_COMERCIAL_WEBHOOK_URL
    : process.env.ONZE_WEBHOOK_URL ?? DEFAULT_ONZE_WEBHOOK_URL;
  const webhookApiKey = process.env.ONZE_WEBHOOK_API_KEY;
  const fallbackWebhookUrl =
    process.env.LEADS_FALLBACK_WEBHOOK_URL ?? DEFAULT_FALLBACK_WEBHOOK_URL;
  const leadPayload = {
    nome,
    whatsapp,
    origem: "Site Formação IDM",
    data_envio: new Date().toISOString(),
    pagina: "https://formacao.idmpsi.com.br/",
    utm_source: cleanText(attribution.utm_source, 100),
    utm_medium: cleanText(attribution.utm_medium, 100),
    utm_campaign: cleanText(attribution.utm_campaign, 150),
    utm_content: cleanText(attribution.utm_content, 150),
    utm_term: cleanText(attribution.utm_term, 150),
    fbclid: cleanText(attribution.fbclid, 500),
    gclid: cleanText(attribution.gclid, 500),
    referrer: cleanText(attribution.referrer, 1000),
    landing_page: cleanText(attribution.landing_page, 1000),
    campanha,
  };

  const capiPromise = sendLeadCapiEvent({
    whatsapp: leadPayload.whatsapp,
    eventId: cleanText(body?.event_id, 100) || crypto.randomUUID(),
    fbp: cleanText(body?.fbp, 200),
    fbc: cleanText(body?.fbc, 200),
    clientIp: getClientIp(request),
    userAgent: cleanText(request.headers["user-agent"], 500),
    eventSourceUrl: leadPayload.landing_page,
    utm: leadPayload,
  });

  const respond = async (status, payload) => {
    await capiPromise;
    return response.status(status).json(payload);
  };

  const observacoes = [
    leadPayload.campanha && `Campanha: ${leadPayload.campanha}`,
    leadPayload.utm_source && `UTM Source: ${leadPayload.utm_source}`,
    leadPayload.utm_medium && `UTM Medium: ${leadPayload.utm_medium}`,
    leadPayload.utm_campaign && `UTM Campaign: ${leadPayload.utm_campaign}`,
    leadPayload.utm_content && `UTM Content: ${leadPayload.utm_content}`,
    leadPayload.utm_term && `UTM Term: ${leadPayload.utm_term}`,
    leadPayload.fbclid && `FBCLID: ${leadPayload.fbclid}`,
    leadPayload.gclid && `GCLID: ${leadPayload.gclid}`,
    leadPayload.referrer && `Referência: ${leadPayload.referrer}`,
    leadPayload.landing_page && `Página: ${leadPayload.landing_page}`,
  ]
    .filter(Boolean)
    .join("\n");

  const webhookBody = usaTimeComercial
    ? {
        nome: leadPayload.nome,
        whatsapp: leadPayload.whatsapp,
        curso_interesse: "Formação em Psicanálise Clínica Integrativa",
        canal: "Direto",
        campanha: nomeCampanhaTimeComercial,
        observacoes,
      }
    : {
        nome: leadPayload.nome,
        whatsapp: leadPayload.whatsapp,
        curso_interesse: "Formação em Psicanálise Clínica Integrativa",
        origem: leadPayload.origem,
        observacoes,
      };

  try {
    if (webhookApiKey) {
      const upstreamResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": webhookApiKey,
        },
        body: JSON.stringify(webhookBody),
        signal: AbortSignal.timeout(10000),
      });

      if (upstreamResponse.ok) {
        const upstreamJson = await upstreamResponse.json().catch(() => null);
        return respond(200, {
          success: true,
          leadId: upstreamJson?.lead?.id ?? null,
        });
      }

      console.error("Onze Digital recusou o lead; usando contingência", {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
      });
    } else {
      console.error(
        "ONZE_WEBHOOK_API_KEY ausente; usando contingência de leads",
      );
    }
  } catch (error) {
    console.error("Falha na Onze Digital; usando contingência", error);
  }

  try {
    const fallbackResponse = await fetch(fallbackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(leadPayload),
      signal: AbortSignal.timeout(10000),
    });

    if (fallbackResponse.ok) {
      return respond(200, {
        success: true,
        storage: "contingency",
      });
    }
  } catch (error) {
    console.error("Falha na contingência de leads", error);
  }

  return respond(502, {
    error: "Não foi possível registrar seus dados agora.",
  });
}
