import crypto from "node:crypto";

const DEFAULT_ONZE_WEBHOOK_URL =
  "https://usqiyekfmwwnvkmkdlej.supabase.co/functions/v1/webhook-leads";
const DEFAULT_FALLBACK_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzEOTuC7CZZPAKfCShpYn8U-KozjsJzwekFhoxKF3Vv3Qc8BYLZ9McTtDIGPk2u2kCl/exec";
const DEFAULT_META_PIXEL_ID = "1472969447740954";
const META_GRAPH_VERSION = "v21.0";

const normalizePhone = (value) => String(value ?? "").replace(/\D/g, "");
const cleanText = (value, maxLength = 500) =>
  typeof value === "string" ? value.slice(0, maxLength) : null;
const sha256 = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");

const getClientIp = (request) => {
  const forwardedFor = request.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.socket?.remoteAddress ?? null;
};

/**
 * Envia o evento "Lead" para a Meta Conversions API, espelhando o Pixel do
 * navegador (mesmo event_id) para deduplicação. Silencioso em caso de falha:
 * a Conversions API é observabilidade de anúncios, não deve derrubar o lead.
 */
const sendMetaCapiEvents = async ({
  whatsapp,
  eventId,
  fbp,
  fbc,
  clientIp,
  userAgent,
  eventSourceUrl,
  utm,
}) => {
  const pixels = [
    {
      id: process.env.META_PIXEL_ID || DEFAULT_META_PIXEL_ID,
      token: process.env.META_CAPI_ACCESS_TOKEN,
    },
  ].filter((pixel) => pixel.token);

  if (pixels.length === 0) return;

  const userData = {
    ph: [sha256(`55${whatsapp}`)],
    ...(clientIp ? { client_ip_address: clientIp } : {}),
    ...(userAgent ? { client_user_agent: userAgent } : {}),
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
  };

  const eventPayload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: eventSourceUrl || undefined,
        user_data: userData,
        custom_data: {
          utm_source: utm.utm_source || undefined,
          utm_medium: utm.utm_medium || undefined,
          utm_campaign: utm.utm_campaign || undefined,
        },
      },
    ],
  };

  await Promise.allSettled(
    pixels.map(async ({ id, token }) => {
      try {
        const res = await fetch(
          `https://graph.facebook.com/${META_GRAPH_VERSION}/${id}/events?access_token=${encodeURIComponent(token)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventPayload),
            signal: AbortSignal.timeout(8000),
          },
        );

        if (!res.ok) {
          console.error(
            "Meta CAPI recusou o evento",
            id,
            res.status,
            await res.text().catch(() => ""),
          );
        }
      } catch (error) {
        console.error("Falha ao enviar evento Meta CAPI", id, error);
      }
    }),
  );
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

  const capiPromise = sendMetaCapiEvents({
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
        return respond(200, { success: true });
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
