"use client";

import { useRef, useState, type FormEvent } from "react";
import Button from "@/components/Button/Button";
import FormConsent from "@/components/FormConsent/FormConsent";
import { trackSignup } from "@/lib/analytics";
import { formContext } from "@/lib/form-context";

type Props = {
  id: string;
  controlsClassName: string;
  inputClassName?: string;
  buttonClassName?: string;
  source: string;
  buttonText?: string;
  footerButton?: boolean;
};

export default function NewsletterSignupForm({
  id, controlsClassName, inputClassName, buttonClassName, source,
  buttonText = "Subscribe", footerButton = false,
}: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const inFlight = useRef(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = { email: data.get("email"), ...formContext(form) };
    setStatus("submitting");
    try {
      const response = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Signup failed");
      trackSignup(source);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }
  return (
    <form onSubmit={handleSubmit} aria-busy={status === "submitting"}>
      <div className={controlsClassName}>
        <label className="visually-hidden" htmlFor={id}>Email address</label>
        <input id={id} name="email" type="email" autoComplete="email" placeholder="Email"
          required disabled={status === "submitting"} className={inputClassName} />
        {footerButton ? (
          <Button text={status === "submitting" ? "Sending" : buttonText} type="submit"
            variant="small" icon={false} disabled={status === "submitting"} className={buttonClassName} />
        ) : (
          <button type="submit" disabled={status === "submitting"} className={buttonClassName}>
            {status === "submitting" ? "Sending" : buttonText}
          </button>
        )}
      </div>
      <FormConsent required disabled={status === "submitting"} />
      <p role="status" aria-live="polite">
        {status === "success" && "You're subscribed. You can unsubscribe at any time."}
        {status === "error" && "We could not add your email just now. Please try again."}
      </p>
    </form>
  );
}
