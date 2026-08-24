const DEFAULT_TIME_COMERCIAL_ATRIBUIR_URL =
  "https://usqiyekfmwwnvkmkdlej.supabase.co/functions/v1/time-comercial-atribuir-vendedor";

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Ponte server-side pro rodízio de vendedor do Time Comercial (canal Direto).
 * A página /obrigado chama esse endpoint (nunca o edge function direto) pra
 * não expor a chave WEBHOOK_API_KEY no navegador.
 */
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

  const leadId = String(body?.leadId ?? "").trim();
  if (!uuidRegex.test(leadId)) {
    return response.status(400).json({ error: "leadId inválido." });
  }

  const url =
    process.env.ONZE_TIME_COMERCIAL_ATRIBUIR_URL ??
    DEFAULT_TIME_COMERCIAL_ATRIBUIR_URL;
  const apiKey = process.env.ONZE_WEBHOOK_API_KEY;

  if (!apiKey) {
    console.error("ONZE_WEBHOOK_API_KEY ausente; não é possível atribuir vendedor");
    return response.status(500).json({ error: "Configuração ausente." });
  }

  try {
    const upstreamResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({ lead_id: leadId }),
      signal: AbortSignal.timeout(8000),
    });

    const upstreamJson = await upstreamResponse.json().catch(() => null);

    if (!upstreamResponse.ok || !upstreamJson?.vendedor || !upstreamJson?.telefone) {
      console.error("Falha ao atribuir vendedor", {
        status: upstreamResponse.status,
        body: upstreamJson,
      });
      return response.status(502).json({ error: "Não foi possível atribuir um vendedor." });
    }

    return response.status(200).json({
      vendedor: upstreamJson.vendedor,
      telefone: upstreamJson.telefone,
    });
  } catch (error) {
    console.error("Erro ao chamar o rodízio de vendedor", error);
    return response.status(502).json({ error: "Não foi possível atribuir um vendedor." });
  }
}
