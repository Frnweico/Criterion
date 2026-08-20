"use client";

import { FormEvent, useState } from "react";
import { BENCHMARKER_COPY, BENCHMARKER_OPTIONS } from "@/lib/benchmarkers";
import styles from "./BenchmarkerForm.module.css";

type SelectFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  options: readonly string[];
};

function SelectField({ id, label, placeholder, options }: SelectFieldProps) {
  return (
    <label className={styles.selectField} htmlFor={id}>
      <span>{label}</span>
      <select id={id} name={id} defaultValue="" required>
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className={styles.confirmation} aria-labelledby="confirmation-title">
        <h1 id="confirmation-title">{BENCHMARKER_COPY.confirmationTitle}</h1>
        <p>
          <strong>Check your email for what comes next.</strong> We&rsquo;ll be in
          touch soon with your first update.
        </p>
      </section>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.copy}>
        <h1>{BENCHMARKER_COPY.title}</h1>
        <p>{BENCHMARKER_COPY.intro}</p>
        <p>{BENCHMARKER_COPY.detail}</p>
      </div>

      <fieldset className={styles.details}>
        <legend>Your Details</legend>
        <label>
          <span className="visually-hidden">Full name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Full Name" required />
        </label>
        <label>
          <span className="visually-hidden">Email address</span>
          <input name="email" type="email" autoComplete="email" placeholder="Email" required />
        </label>
        <label>
          <span className="visually-hidden">Phone number for WhatsApp</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="Phone Number (WhatsApp)" required />
        </label>
      </fieldset>

      <fieldset className={styles.more}>
        <legend>Tell Us More</legend>
        <SelectField
          id="interest"
          label="I’m interested as a"
          placeholder="Property Investor"
          options={BENCHMARKER_OPTIONS.interest}
        />
        <SelectField
          id="location"
          label="Preferred Location"
          placeholder="Where are you currently interested in property?"
          options={BENCHMARKER_OPTIONS.location}
        />
        <SelectField
          id="communication"
          label="Preferred Communication Channel"
          placeholder="How would you prefer to hear from us?"
          options={BENCHMARKER_OPTIONS.communication}
        />
        <SelectField
          id="referral"
          label="How did you hear about us?"
          placeholder="Website"
          options={BENCHMARKER_OPTIONS.referral}
        />
      </fieldset>

      <div className={styles.submitArea}>
        <button type="submit" className={styles.submit}>
          <span aria-hidden>◇</span>
          Submit
        </button>
        <p>No noise. Just the things worth knowing.</p>
      </div>
    </form>
  );
}
