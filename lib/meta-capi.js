import crypto from "node:crypto";

const DEFAULT_META_PIXEL_ID = "1472969447740954";
const META_GRAPH_VERSION = "v21.0";

export const sha256 = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");

export const cleanText = (value, maxLength = 500) =>
  typeof value === "string" ? value.slice(0, maxLength) : null;

export const getClientIp = (request) => {
  const forwardedFor = request.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.socket?.remoteAddress ?? null;
};

/**
 * Envia um evento para a Meta Conversions API, espelhando o Pixel do
 * navegador (mesmo event_id) para deduplicação. Silencioso em caso de falha:
 * a Conversions API é observabilidade de anúncios, não deve derrubar a
 * requisição que a chamou.
 */
export const sendMetaCapiEvent = async ({
  eventName,
  eventId,
  userData,
  customData,
  eventSourceUrl,
  actionSource = "website",
}) => {
  const pixels = [
    {
      id: process.env.META_PIXEL_ID || DEFAULT_META_PIXEL_ID,
      token: process.env.META_CAPI_ACCESS_TOKEN,
    },
  ].filter((pixel) => pixel.token);

  if (pixels.length === 0) return;

  const eventPayload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: actionSource,
        event_source_url: eventSourceUrl || undefined,
        user_data: userData,
        ...(customData ? { custom_data: customData } : {}),
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
            eventName,
            id,
            res.status,
            await res.text().catch(() => ""),
          );
        }
      } catch (error) {
        console.error("Falha ao enviar evento Meta CAPI", eventName, id, error);
      }
    }),
  );
};
