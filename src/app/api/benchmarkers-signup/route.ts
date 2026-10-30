import { contactFields, isValidEmail, jsonResponse, normalisePhone, readSubmission, stringValue, submitToHubSpot } from "@/lib/hubspot";

export const runtime = "nodejs";
import { BENCHMARKER_OPTIONS } from "@/lib/benchmarkers";

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
  const interest = stringValue(payload.interest);
  const location = stringValue(payload.location);
  const communication = stringValue(payload.communication);
  const referral = stringValue(payload.referral);
  if (!BENCHMARKER_OPTIONS.interest.includes(interest) ||
      !BENCHMARKER_OPTIONS.location.includes(location) ||
      !BENCHMARKER_OPTIONS.communication.includes(communication) ||
      !BENCHMARKER_OPTIONS.referral.includes(referral)) {
    return jsonResponse({ error: "Choose an option for every preference." }, 400);
  }
  return submitToHubSpot(request, "benchmarkers", {
    ...contactFields(name, email, phone),
    benchmarker_interest: interest,
    benchmarker_preferred_location: location,
    preferred_communication_channel: communication,
    benchmarker_referral_source: referral,
  }, payload);
}
