import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./BuyerChecklistBand.module.css";

/**
 * "A practical guide for serious homebuyers" — the checklist capture band on
 * the Projects page. Distinct from the homepage's version: heading on the
 * left, a single email field on the right.
 *
 * No newsletter provider yet, so the form renders but does not submit.
 */
export default function BuyerChecklistBand() {
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

          <form className={styles.form}>
            <label className={styles.field}>
              <span className="visually-hidden">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                required
                className={styles.input}
              />
            </label>

            <div className={styles.actions}>
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
