"use client";

import { FormEvent, useEffect, useState } from "react";
import { trackSignup } from "@/lib/analytics";
import { formContext } from "@/lib/form-context";
import FormConsent from "@/components/FormConsent/FormConsent";
import styles from "./ApproachSignupForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export default function ApproachSignupForm() {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    window.fbq?.("track", "ViewContent");
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    setStatus("submitting");

    try {
      const response = await fetch("/api/approach-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...formContext(form), marketingConsent: true }),
      });

      if (!response.ok) throw new Error("Signup request failed");

      trackSignup("approach-email-signup");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className={styles.confirmation} aria-live="polite">
        You&apos;re on the list.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="approach-email">
        Email address
      </label>
      <div className={styles.controls}>
        <input
          id="approach-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="your@email.com"
          required
          disabled={status === "submitting"}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending" : "Stay close"}
        </button>
      </div>
      <FormConsent newsletter disabled={status === "submitting"} />
      <p className={styles.status} aria-live="polite">
        {status === "error" &&
          "We could not add your email just now. Please try again."}
      </p>
    </form>
  );
}
