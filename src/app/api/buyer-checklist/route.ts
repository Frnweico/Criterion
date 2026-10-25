export const runtime = "nodejs";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const DEFAULT_BUYER_CHECKLIST_LIST_ID = 6;

type BuyerChecklistPayload = {
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

  if (!compact) return "";
  if (/^\+\d{7,15}$/.test(compact)) return compact;
  if (/^00\d{7,15}$/.test(compact)) return `+${compact.slice(2)}`;
  if (/^0\d{10}$/.test(compact)) return `+234${compact.slice(1)}`;

  return null;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ error: "Invalid request origin." }, 403);
  }

  let payload: BuyerChecklistPayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request." }, 400);
  }

  const name = stringValue(payload.name);
  const email = stringValue(payload.email).toLowerCase();
  const phone = normaliseWhatsAppNumber(stringValue(payload.phone));

  if (!isValidEmail(email)) {
    return jsonResponse({ error: "Enter a valid email address." }, 400);
  }

  if (phone === null) {
    return jsonResponse(
      { error: "Enter a valid WhatsApp number, including the country code." },
      400,
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(
    process.env.BREVO_BUYER_CHECKLIST_LIST_ID ?? DEFAULT_BUYER_CHECKLIST_LIST_ID,
  );
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    return jsonResponse({ error: "The buyer checklist is unavailable." }, 503);
  }

  const [firstName, ...lastName] = name.split(/\s+/);
  const attributes: Record<string, string> = {};
  if (firstName) attributes.FIRSTNAME = firstName;
  if (lastName.length) attributes.LASTNAME = lastName.join(" ");
  if (phone) attributes.WHATSAPP = phone;

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
        attributes,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return jsonResponse({ error: "We could not receive your details just now." }, 502);
    }
  } catch {
    return jsonResponse({ error: "We could not receive your details just now." }, 502);
  }

  return jsonResponse({ success: true });
}
