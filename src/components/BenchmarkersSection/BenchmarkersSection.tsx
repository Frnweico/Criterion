import Button from "@/components/Button/Button";
import styles from "./BenchmarkersSection.module.css";

/**
 * "Become A Benchmarker".
 *
 * The envelope and its paper are a single image; everything on top is live
 * text. Two artworks are used — landscape for desktop, portrait for mobile —
 * and the text is positioned in percentages inside an aspect-ratio box, so it
 * stays locked to the artwork at every width.
 *
 * Type is sized in `cqw` (container query units) against that same box, so the
 * copy scales with the envelope instead of overflowing the card as it narrows.
 */
export default function BenchmarkersSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="benchmarkers-heading"
      data-motion-page-static
    >
      <div className={styles.background} data-parallax-background aria-hidden />
      {/* `frame` is the positioning context so the button can sit beneath the
          envelope on mobile and be placed onto its flap at desktop, without
          living inside the aspect-ratio box in both cases. */}
      <div className={styles.frame} data-motion-stagger>
        <div className={styles.stage}>
          <div className={styles.card}>
            <h2 id="benchmarkers-heading" className={styles.heading}>
              Become a Benchmarker
            </h2>
            <div className={styles.copy}>
              <p className={styles.lead}>
                A considered circle for buyers, investors, and advisers who want
                a clearer view before the wider market is looking.
              </p>

              <p className={styles.lead}>
                Get early visibility of selected releases, grounded updates from
                live projects, and useful context for considered decisions.
              </p>
            </div>
            <ul className={styles.perks}>
              <li className={styles.perk}>
                Early visibility of selected releases
              </li>
              <li className={styles.perk}>
                Grounded updates from live projects
              </li>
              <li className={styles.perk}>
                Context for considered decisions
              </li>
            </ul>
          </div>
        </div>

        {/* No Benchmarker page yet, so this renders without a destination —
            logged in TODO.md. */}
        <div className={styles.action}>
          <Button text="Join the Benchmarkers" href="/benchmarkers" />
        </div>
      </div>
    </section>
  );
}
