export const runtime = "nodejs";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

function jsonResponse(body: Record<string, boolean | string>, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ error: "Invalid request origin." }, 403);
  }

  let payload: { email?: unknown };
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request." }, 400);
  }

  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!isValidEmail(email)) {
    return jsonResponse({ error: "Enter a valid email address." }, 400);
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_APPROACH_LIST_ID);
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    return jsonResponse({ error: "Email collection is unavailable." }, 503);
  }

  try {
    const response = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return jsonResponse({ error: "Email collection is unavailable." }, 502);
    }
  } catch {
    return jsonResponse({ error: "Email collection is unavailable." }, 502);
  }

  return jsonResponse({ success: true });
}
