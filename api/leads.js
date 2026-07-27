const DEFAULT_ONZE_WEBHOOK_URL =
  "https://usqiyekfmwwnvkmkdlej.supabase.co/functions/v1/webhook-leads";
const DEFAULT_FALLBACK_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzEOTuC7CZZPAKfCShpYn8U-KozjsJzwekFhoxKF3Vv3Qc8BYLZ9McTtDIGPk2u2kCl/exec";

const normalizePhone = (value) => String(value ?? "").replace(/\D/g, "");
const cleanText = (value, maxLength = 500) =>
  typeof value === "string" ? value.slice(0, maxLength) : null;

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

  if (nome.length < 2 || whatsapp.length < 10 || whatsapp.length > 11) {
    return response.status(400).json({
      error: "Informe um nome e um WhatsApp válido com DDD.",
    });
  }

  const webhookUrl =
    process.env.ONZE_WEBHOOK_URL ?? DEFAULT_ONZE_WEBHOOK_URL;
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
  };

  try {
    if (webhookApiKey) {
      const upstreamResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": webhookApiKey,
        },
        body: JSON.stringify({
          nome: leadPayload.nome,
          whatsapp: leadPayload.whatsapp,
          curso_interesse: "Formação em Psicanálise Clínica Integrativa",
          origem: leadPayload.origem,
          observacoes: [
            leadPayload.utm_source &&
              `UTM Source: ${leadPayload.utm_source}`,
            leadPayload.utm_medium &&
              `UTM Medium: ${leadPayload.utm_medium}`,
            leadPayload.utm_campaign &&
              `UTM Campaign: ${leadPayload.utm_campaign}`,
            leadPayload.utm_content &&
              `UTM Content: ${leadPayload.utm_content}`,
            leadPayload.utm_term && `UTM Term: ${leadPayload.utm_term}`,
            leadPayload.fbclid && `FBCLID: ${leadPayload.fbclid}`,
            leadPayload.gclid && `GCLID: ${leadPayload.gclid}`,
            leadPayload.referrer && `Referência: ${leadPayload.referrer}`,
            leadPayload.landing_page &&
              `Página: ${leadPayload.landing_page}`,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (upstreamResponse.ok) {
        return response.status(200).json({ success: true });
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
      return response.status(200).json({
        success: true,
        storage: "contingency",
      });
    }
  } catch (error) {
    console.error("Falha na contingência de leads", error);
  }

  return response.status(502).json({
    error: "Não foi possível registrar seus dados agora.",
  });
}
