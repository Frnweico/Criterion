import { MARKETING_NOTICE } from "@/lib/form-copy";
import styles from "./FormConsent.module.css";

export default function FormConsent({
  newsletter = false,
  hideNewsletterNotice = false,
  disabled = false,
}: { newsletter?: boolean; hideNewsletterNotice?: boolean; disabled?: boolean }) {
  return (
    <div className={styles.consent}>
      {newsletter ? (
        hideNewsletterNotice ? null : <p>Sign up for occasional Criterion Homes newsletters and property updates. Unsubscribe anytime.</p>
      ) : (
        <label className={styles.checkbox}>
          <input type="checkbox" name="marketingConsent" disabled={disabled} />
          <span>{MARKETING_NOTICE}</span>
        </label>
      )}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" disabled={disabled} />
        </label>
      </div>
    </div>
  );
}
