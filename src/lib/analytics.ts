"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (
      eventType: "track",
      eventName: "PageView" | "ViewContent" | "Lead" | "CompleteRegistration",
      parameters?: Record<string, unknown>,
    ) => void;
  }
}

/** Call only after HubSpot accepts the submission. Never include contact details. */
export function trackLead(formName: string) {
  window.gtag?.("event", "generate_lead", { form_name: formName });
  window.fbq?.("track", "Lead", { content_name: formName });
}

export function trackSignup(formName: string) {
  window.gtag?.("event", "sign_up", { method: "email", form_name: formName });
  window.fbq?.("track", "CompleteRegistration", { content_name: formName });
}
