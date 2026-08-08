import { STATEMENTS } from "@/lib/about";
import styles from "./StatementsSection.module.css";

/**
 * Our Vision / Our Mission / Our Commitment — each a ruled row with the
 * heading on the left and the copy on the right at desktop.
 */
export default function StatementsSection() {
  return (
    <section className={styles.section} aria-labelledby="statements-heading">
      <h2 id="statements-heading" className="visually-hidden">
        Our vision, mission and commitment
      </h2>

      <div className={styles.inner}>
        {STATEMENTS.map((statement) => (
          <article key={statement.title} className={styles.row}>
            <h3 className={styles.title}>{statement.title}</h3>

            <div className={styles.copy}>
              {statement.body.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
