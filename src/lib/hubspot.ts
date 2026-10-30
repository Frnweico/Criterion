const PORTAL_ID = "149663853";
const SUBSCRIPTION_TYPE_ID = 4013175565;

export const HUBSPOT_FORMS = {
  newsletter: "c206e748-9d59-40d4-a56d-9a1809268d32",
  checklist: "502d654b-6e33-4e22-a72d-70fd21fdfc7b",
  viewing: "a471e334-eeae-449c-9804-7e3b2889bb6d",
  benchmarkers: "d7bdb57b-77c2-45b6-be23-f3774892cb5b",
} as const;

import { MARKETING_NOTICE, PROCESSING_NOTICE } from "./form-copy";

export function jsonResponse(body: Record<string, boolean | string>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function normalisePhone(value: string) {
  const compact = value.replace(/[\s().-]/g, "");
  if (!compact) return "";
  if (/^\+\d{7,15}$/.test(compact)) return compact;
  if (/^00\d{7,15}$/.test(compact)) return `+${compact.slice(2)}`;
  if (/^0\d{10}$/.test(compact)) return `+234${compact.slice(1)}`;
  return null;
}

export async function readSubmission(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return { error: jsonResponse({ error: "Invalid request origin." }, 403) };
  }
  try {
    const raw = await request.text();
    if (raw.length > 12000) {
      return { error: jsonResponse({ error: "Request is too large." }, 413) };
    }
    const payload: unknown = JSON.parse(raw);
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return { error: jsonResponse({ error: "Invalid request." }, 400) };
    }
    const data = payload as Record<string, unknown>;
    if (stringValue(data.website)) {
      return { error: jsonResponse({ error: "We could not accept this submission." }, 400) };
    }
    return { data };
  } catch {
    return { error: jsonResponse({ error: "Invalid request." }, 400) };
  }
}

export function contactFields(name: string, email: string, phone: string | null = "") {
  const [firstName, ...lastName] = name.split(/\s+/);
  const fields: Record<string, string> = { email };
  if (firstName) fields.firstname = firstName.slice(0, 100);
  if (lastName.length) fields.lastname = lastName.join(" ").slice(0, 100);
  if (phone) fields.phone = phone;
  return fields;
}

export async function submitToHubSpot(
  request: Request,
  form: keyof typeof HUBSPOT_FORMS,
  fields: Record<string, string>,
  payload: Record<string, unknown>,
) {
  const requestOrigin = new URL(request.url).origin;
  let pageUri = request.headers.get("referer") || requestOrigin;
  try {
    const candidate = new URL(stringValue(payload.pageUri) || pageUri);
    pageUri = candidate.origin === requestOrigin ? candidate.href : requestOrigin;
  } catch {
    pageUri = requestOrigin;
  }
  const context: Record<string, string> = {
    pageUri,
    pageName: stringValue(payload.pageName).slice(0, 200) || "Criterion Homes",
  };
  const hutk = request.headers.get("cookie")?.match(/(?:^|;\s*)hubspotutk=([a-f0-9]{32})(?:;|$)/i)?.[1];
  if (hutk) context.hutk = hutk;
  const consent = {
    consentToProcess: true,
    text: PROCESSING_NOTICE,
    communications: payload.marketingConsent === true
      ? [{ value: true, subscriptionTypeId: SUBSCRIPTION_TYPE_ID, text: MARKETING_NOTICE }]
      : [],
  };
  try {
    // Public Forms Submission API: no CRM access token is exposed or required.
    // Do not retry automatically: an uncertain response may already be recorded.
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${HUBSPOT_FORMS[form]}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: Object.entries(fields).map(([name, value]) => ({
            objectTypeId: "0-1", name, value,
          })),
          context,
          legalConsentOptions: { consent },
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      },
    );
    if (!response.ok) {
      console.error("HubSpot form submission failed", { form, status: response.status });
      return jsonResponse({ error: "We could not receive your details just now. Please try again." }, 502);
    }
    return jsonResponse({ success: true });
  } catch {
    return jsonResponse({ error: "We could not receive your details just now. Please try again." }, 502);
  }
}
