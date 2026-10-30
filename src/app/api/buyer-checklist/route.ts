import { contactFields, isValidEmail, jsonResponse, normalisePhone, readSubmission, stringValue, submitToHubSpot } from "@/lib/hubspot";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const submission = await readSubmission(request);
  if (submission.error) return submission.error;
  const payload = submission.data!;
  const email = stringValue(payload.email).toLowerCase();
  const phone = normalisePhone(stringValue(payload.phone));
  if (!isValidEmail(email)) {
    return jsonResponse({ error: "Enter a valid email address." }, 400);
  }
  if (phone === null) {
    return jsonResponse({ error: "Enter a valid WhatsApp number, including the country code." }, 400);
  }
  return submitToHubSpot(request, "checklist",
    contactFields(stringValue(payload.name), email, phone), payload);
}
