"use client";

export function formContext(form: HTMLFormElement) {
  const data = new FormData(form);
  return {
    marketingConsent: data.get("marketingConsent") === "on",
    website: data.get("website") || "",
    pageUri: window.location.href,
    pageName: document.title,
  };
}
