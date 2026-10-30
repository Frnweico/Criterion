import { MARKETING_NOTICE, PROCESSING_NOTICE } from "@/lib/form-copy";
import styles from "./FormConsent.module.css";

export default function FormConsent({
  required = false,
  disabled = false,
}: { required?: boolean; disabled?: boolean }) {
  return (
    <div className={styles.consent}>
      <label className={styles.checkbox}>
        <input type="checkbox" name="marketingConsent" required={required} disabled={disabled} />
        <span>{MARKETING_NOTICE}</span>
      </label>
      <p>{PROCESSING_NOTICE}</p>
      <div className={styles.trap} aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" disabled={disabled} />
        </label>
      </div>
    </div>
  );
}
