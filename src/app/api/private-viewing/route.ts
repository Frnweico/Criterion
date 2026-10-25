export const runtime = "nodejs";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const DEFAULT_PRIVATE_VIEWING_LIST_ID = 5;

type PrivateViewingPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
};

function jsonResponse(body: Record<string, boolean | string>, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normaliseWhatsAppNumber(value: string) {
  const compact = value.replace(/[\s().-]/g, "");

  if (/^\+\d{7,15}$/.test(compact)) return compact;
  if (/^00\d{7,15}$/.test(compact)) return `+${compact.slice(2)}`;
  if (/^0\d{10}$/.test(compact)) return `+234${compact.slice(1)}`;

  return "";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ error: "Invalid request origin." }, 403);
  }

  let payload: PrivateViewingPayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request." }, 400);
  }

  const name = stringValue(payload.name);
  const email = stringValue(payload.email).toLowerCase();
  const phone = normaliseWhatsAppNumber(stringValue(payload.phone));

  if (!name || !isValidEmail(email) || !phone) {
    return jsonResponse(
      { error: "Complete your name, email address, and WhatsApp number." },
      400,
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(
    process.env.BREVO_PRIVATE_VIEWING_LIST_ID ?? DEFAULT_PRIVATE_VIEWING_LIST_ID,
  );
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    return jsonResponse({ error: "Private viewing requests are unavailable." }, 503);
  }

  const [firstName, ...lastName] = name.split(/\s+/);

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
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName.join(" "),
          WHATSAPP: phone,
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return jsonResponse({ error: "We could not receive your request just now." }, 502);
    }
  } catch {
    return jsonResponse({ error: "We could not receive your request just now." }, 502);
  }

  return jsonResponse({ success: true });
}
