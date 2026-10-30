"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/Button/Button";
import { trackLead } from "@/lib/analytics";
import { formContext } from "@/lib/form-context";
import FormConsent from "@/components/FormConsent/FormConsent";

type PrivateViewingFormProps = {
  formClassName: string;
  fieldClassName: string;
  inputClassName: string;
  actionsClassName: string;
  statusClassName: string;
  productPaperHref?: string;
};

export default function PrivateViewingForm({
  formClassName,
  fieldClassName,
  inputClassName,
  actionsClassName,
  statusClassName,
  productPaperHref,
}: PrivateViewingFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");

    try {
      const response = await fetch("/api/private-viewing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          ...formContext(form),
        }),
      });

      if (!response.ok) throw new Error("Private viewing request failed");

      trackLead("private-viewing");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      {[
        { name: "name", label: "Full Name", type: "text", autoComplete: "name" },
        { name: "email", label: "Email", type: "email", autoComplete: "email" },
        {
          name: "phone",
          label: "Phone Number",
          type: "tel",
          autoComplete: "tel",
        },
      ].map((field) => (
        <label key={field.name} className={fieldClassName}>
          <span className="visually-hidden">{field.label}</span>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.label}
            autoComplete={field.autoComplete}
            required
            className={inputClassName}
            disabled={status === "submitting"}
          />
        </label>
      ))}

      <FormConsent disabled={status === "submitting"} />
      <div className={actionsClassName}>
        <Button
          text={status === "submitting" ? "Sending request" : "Request viewing"}
          type="submit"
          disabled={status === "submitting"}
        />
        {productPaperHref && (
          <Button
            text="Download product paper"
            href={productPaperHref}
            newTab
            variant="outlineDark"
            icon={false}
          />
        )}
      </div>
      <p className={statusClassName} aria-live="polite">
        {status === "success" && "Your request has been received."}
        {status === "error" &&
          "We could not receive your request just now. Please try again."}
      </p>
    </form>
  );
}
