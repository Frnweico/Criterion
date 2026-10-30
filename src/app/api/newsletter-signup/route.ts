import { isValidEmail, jsonResponse, readSubmission, stringValue, submitToHubSpot } from "@/lib/hubspot";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const submission = await readSubmission(request);
  if (submission.error) return submission.error;
  const payload = submission.data!;
  const email = stringValue(payload.email).toLowerCase();
  if (!isValidEmail(email)) {
    return jsonResponse({ error: "Enter a valid email address." }, 400);
  }
  if (payload.marketingConsent !== true) {
    return jsonResponse({ error: "Please confirm that you would like to receive email updates." }, 400);
  }
  return submitToHubSpot(request, "newsletter", { email }, payload);
}
