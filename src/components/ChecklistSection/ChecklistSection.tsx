"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/Button/Button";
import { trackLead } from "@/lib/analytics";
import { formContext } from "@/lib/form-context";
import FormConsent from "@/components/FormConsent/FormConsent";
import styles from "./ChecklistSection.module.css";

/**
 * "Start with the right questions" — the buyer-checklist capture band.
 *
 * Note the frames disagree on fields: desktop asks for Name and Email, the
 * mobile homepage asks for Email only. Both are built with Name and Email,
 * since what you collect shouldn't depend on the visitor's screen size.
 */
export default function ChecklistSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");

    try {
      const response = await fetch("/api/buyer-checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          ...formContext(form),
        }),
      });

      if (!response.ok) throw new Error("Buyer checklist request failed");

      trackLead("buyer-checklist");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="buyer-checklist"
      className={styles.section}
      aria-labelledby="checklist-heading"
    >
      <div className={styles.inner}>
        <h2 id="checklist-heading" className={styles.heading}>
          Start with the right questions
        </h2>

        <div className={styles.panel}>
          <p className={styles.lead}>
            Get five essential questions every Nigerian homebuyer should ask
            before committing to a property.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span className={styles.srOnly}>Name</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                className={styles.input}
                disabled={status === "submitting"}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.srOnly}>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                required
                className={styles.input}
                disabled={status === "submitting"}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.srOnly}>Phone (WhatsApp)</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone (WhatsApp)"
                autoComplete="tel"
                inputMode="tel"
                className={styles.input}
                disabled={status === "submitting"}
              />
            </label>

            <FormConsent disabled={status === "submitting"} />
            <div className={styles.actions}>
              {/* One submission action is used at every viewport. */}
              <Button
                text="Send me the checklist"
                variant="outline"
                type="submit"
                className={styles.ctaMobile}
                disabled={status === "submitting"}
              />
              <p className={styles.fineprint}>
                We&rsquo;ll send the checklist and relevant real estate
                insights. No spam.
              </p>
            </div>
            <p className={styles.formStatus} aria-live="polite">
              {status === "success" && "Your details have been received."}
              {status === "error" &&
                "We could not receive your details just now. Please try again."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
