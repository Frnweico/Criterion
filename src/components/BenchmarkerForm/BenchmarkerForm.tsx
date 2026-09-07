"use client";

import { FormEvent, useState } from "react";
import { trackLead } from "@/lib/analytics";
import { BENCHMARKER_COPY, BENCHMARKER_OPTIONS } from "@/lib/benchmarkers";
import styles from "./BenchmarkerForm.module.css";

type SelectFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  disabled: boolean;
};

function SelectField({
  id,
  label,
  placeholder,
  options,
  disabled,
}: SelectFieldProps) {
  return (
    <label className={styles.selectField} htmlFor={id}>
      <span>{label}</span>
      <select id={id} name={id} defaultValue="" required disabled={disabled}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function BenchmarkerForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/benchmarkers-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      const result: unknown = await response.json();
      if (!response.ok) {
        const message =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "We could not submit your details just now. Please try again.";
        throw new Error(message);
      }

      form.reset();
      trackLead("benchmarkers-signup");
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not submit your details just now. Please try again.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className={styles.confirmation} aria-labelledby="confirmation-title">
        <h1 id="confirmation-title">{BENCHMARKER_COPY.confirmationTitle}</h1>
        <p>
          <strong>You&apos;re on the list.</strong> We&apos;ll share selected
          opportunities and useful project context when there is something
          worth knowing.
        </p>
      </section>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-busy={status === "submitting"}>
      <div className={styles.copy}>
        <h1>{BENCHMARKER_COPY.title}</h1>
        <p>{BENCHMARKER_COPY.intro}</p>
        <p>{BENCHMARKER_COPY.detail}</p>
      </div>

      <fieldset className={styles.details}>
        <legend>Your Details</legend>
        <label>
          <span className="visually-hidden">Full name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Full Name" required disabled={status === "submitting"} />
        </label>
        <label>
          <span className="visually-hidden">Email address</span>
          <input name="email" type="email" autoComplete="email" placeholder="Email" required disabled={status === "submitting"} />
        </label>
        <label>
          <span className="visually-hidden">Phone number for WhatsApp</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="WhatsApp number, e.g. 0801 234 5678" required disabled={status === "submitting"} />
        </label>
      </fieldset>

      <fieldset className={styles.more}>
        <legend>Tell Us More</legend>
        <SelectField
          id="interest"
          label="I’m interested as a"
          placeholder="Property Investor"
          options={BENCHMARKER_OPTIONS.interest}
          disabled={status === "submitting"}
        />
        <SelectField
          id="location"
          label="Preferred Location"
          placeholder="Where are you currently interested in property?"
          options={BENCHMARKER_OPTIONS.location}
          disabled={status === "submitting"}
        />
        <SelectField
          id="communication"
          label="Preferred Communication Channel"
          placeholder="How would you prefer to hear from us?"
          options={BENCHMARKER_OPTIONS.communication}
          disabled={status === "submitting"}
        />
        <SelectField
          id="referral"
          label="How did you hear about us?"
          placeholder="Website"
          options={BENCHMARKER_OPTIONS.referral}
          disabled={status === "submitting"}
        />
      </fieldset>

      <div className={styles.submitArea}>
        <button type="submit" className={styles.submit} disabled={status === "submitting"}>
          <span aria-hidden>◇</span>
          {status === "submitting" ? "Sending" : "Submit"}
        </button>
        <p>Occasional updates. Useful context.</p>
        {status === "error" && (
          <p className={styles.error} role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
