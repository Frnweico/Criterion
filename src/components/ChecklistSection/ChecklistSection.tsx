import Button from "@/components/Button/Button";
import styles from "./ChecklistSection.module.css";

/**
 * "Start with the right questions" — the buyer-checklist capture band.
 *
 * The form has no destination yet; there's no newsletter provider chosen, so
 * it renders and validates but does not submit. Logged in TODO.md.
 *
 * Note the frames disagree on fields: desktop asks for Name and Email, the
 * mobile homepage asks for Email only. Both are built with Name and Email,
 * since what you collect shouldn't depend on the visitor's screen size.
 */
export default function ChecklistSection() {
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
            Before committing to any property, the questions you ask matter more
            than the promises you hear.
          </p>
          <p className={styles.lead}>
            We&rsquo;ve put together 5 questions every Nigerian homebuyer should
            ask before signing anything.
          </p>

          <form className={styles.form}>
            <label className={styles.field}>
              <span className={styles.srOnly}>Name</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                className={styles.input}
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
              />
            </label>

            <div className={styles.actions}>
              {/* The frames use different wording per breakpoint: "Send me the
                  checklist" on mobile, "Download the buyer checklist" on
                  desktop. Both are rendered and swapped by CSS so each matches
                  its design; only one is ever visible or announced. */}
              <Button
                text="Send me the checklist"
                variant="outline"
                type="submit"
                className={styles.ctaMobile}
              />
              <Button
                text="Download the buyer checklist"
                variant="outline"
                type="submit"
                className={styles.ctaDesktop}
              />
              <p className={styles.fineprint}>
                We&rsquo;ll send the checklist and relevant real estate
                insights. No spam.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
