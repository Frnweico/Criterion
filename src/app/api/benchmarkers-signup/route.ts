import { BENCHMARKER_OPTIONS } from "@/lib/benchmarkers";

export const runtime = "nodejs";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

type BenchmarkerPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  location?: unknown;
  communication?: unknown;
  referral?: unknown;
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

  // Most local submissions are Nigerian mobile numbers such as 0801 234 5678.
  // Brevo's WhatsApp attribute requires E.164, so convert that familiar local
  // format without making visitors work out the country-code convention.
  if (/^0\d{10}$/.test(compact)) return `+234${compact.slice(1)}`;

  return "";
}

function isOption(value: string, options: readonly string[]) {
  return options.includes(value);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ error: "Invalid request origin." }, 403);
  }

  let payload: BenchmarkerPayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request." }, 400);
  }

  const name = stringValue(payload.name);
  const email = stringValue(payload.email).toLowerCase();
  const phone = normaliseWhatsAppNumber(stringValue(payload.phone));
  const interest = stringValue(payload.interest);
  const location = stringValue(payload.location);
  const communication = stringValue(payload.communication);
  const referral = stringValue(payload.referral);

  if (!name || !isValidEmail(email)) {
    return jsonResponse({ error: "Complete your name and email address." }, 400);
  }

  if (!phone) {
    return jsonResponse(
      { error: "Enter a valid WhatsApp number, including the country code." },
      400,
    );
  }

  if (
    !isOption(interest, BENCHMARKER_OPTIONS.interest) ||
    !isOption(location, BENCHMARKER_OPTIONS.location) ||
    !isOption(communication, BENCHMARKER_OPTIONS.communication) ||
    !isOption(referral, BENCHMARKER_OPTIONS.referral)
  ) {
    return jsonResponse({ error: "Choose an option for every preference." }, 400);
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_BENCHMARKERS_LIST_ID);
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    return jsonResponse({ error: "The Benchmarkers list is unavailable." }, 503);
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
          BENCHMARKER_INTEREST: interest,
          BENCHMARKER_LOCATION: location,
          PREFERRED_CHANNEL: communication,
          REFERRAL_SOURCE: referral,
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return jsonResponse({ error: "We could not submit your details just now." }, 502);
    }
  } catch {
    return jsonResponse({ error: "We could not submit your details just now." }, 502);
  }

  return jsonResponse({ success: true });
}
