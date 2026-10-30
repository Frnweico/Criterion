import { contactFields, isValidEmail, jsonResponse, normalisePhone, readSubmission, stringValue, submitToHubSpot } from "@/lib/hubspot";

export const runtime = "nodejs";
import { BENCHMARKER_OPTIONS } from "@/lib/benchmarkers";

function isOption(value: string, options: readonly string[]) {
  return options.includes(value);
}

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
  if (!isOption(interest, BENCHMARKER_OPTIONS.interest) ||
      !isOption(location, BENCHMARKER_OPTIONS.location) ||
      !isOption(communication, BENCHMARKER_OPTIONS.communication) ||
      !isOption(referral, BENCHMARKER_OPTIONS.referral)) {
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
