"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Records a completed lead only after the server has accepted the form. */
export function trackLead(formName: string) {
  window.gtag?.("event", "generate_lead", {
    form_name: formName,
  });
}
