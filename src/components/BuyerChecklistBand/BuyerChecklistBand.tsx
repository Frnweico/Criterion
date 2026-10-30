"use client";

import { useRef, useState, type FormEvent } from "react";
import FormConsent from "@/components/FormConsent/FormConsent";
import Button from "@/components/Button/Button";
import { formContext } from "@/lib/form-context";
import { trackLead } from "@/lib/analytics";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./BuyerChecklistBand.module.css";

/**
 * "A practical guide for serious homebuyers" — the checklist capture band on
 * the Projects page. Distinct from the homepage's version: heading on the
 * left, a single email field on the right.
 *
 */
export default function BuyerChecklistBand() {

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const inFlight = useRef(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    const form = event.currentTarget;
    const payload = { email: new FormData(form).get("email"), ...formContext(form) };
    setStatus("submitting");
    try {
      const response = await fetch("/api/buyer-checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Checklist request failed");
      trackLead("buyer-checklist-projects");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }
  return (
    <section
      id="buyer-checklist"
      className={styles.section}
      aria-labelledby="buyer-checklist-heading"
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <SectionHeader text="Buyer checklist" inverted />
          <h2 id="buyer-checklist-heading" className={styles.heading}>
            A practical guide for serious homebuyers.
          </h2>
        </div>

        <div className={styles.panel}>
          <p className={styles.lead}>
            Get a short checklist to help you approach any property decision
            with more clarity, better questions, and fewer assumptions.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} aria-busy={status === "submitting"}>
            <label className={styles.field}>
              <span className="visually-hidden">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                required
                disabled={status === "submitting"}
                className={styles.input}
              />
            </label>

            <FormConsent disabled={status === "submitting"} />
            <div className={styles.actions}>
              <Button text={status === "submitting" ? "Sending" : "Send me the checklist"} type="submit" variant="outline" disabled={status === "submitting"} />
              <p className={styles.fineprint}>
                We&rsquo;ll send the checklist and relevant real estate
                insights. No spam.
              </p>
            </div>
            <p role="status" aria-live="polite">
              {status === "success" && "Your details have been received."}
              {status === "error" && "We could not receive your request just now. Please try again."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
