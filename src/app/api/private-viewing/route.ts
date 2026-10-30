import { contactFields, isValidEmail, jsonResponse, normalisePhone, readSubmission, stringValue, submitToHubSpot } from "@/lib/hubspot";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const submission = await readSubmission(request);
  if (submission.error) return submission.error;
  const payload = submission.data!;
  const name = stringValue(payload.name);
  const email = stringValue(payload.email).toLowerCase();
  const phone = normalisePhone(stringValue(payload.phone));
  if (!name || !isValidEmail(email) || !phone) {
    return jsonResponse({ error: "Complete your name, email address, and WhatsApp number." }, 400);
  }
  return submitToHubSpot(request, "viewing", contactFields(name, email, phone), payload);
}
