import Button from "@/components/Button/Button";
import styles from "./BenchmarkersSection.module.css";

const PERKS = [
  "Early access before public release",
  "Private updates from Midtown Terraces",
  "Clear, practical real estate insights",
];

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
    >
      {/* `frame` is the positioning context so the button can sit beneath the
          envelope on mobile and be placed onto its flap at desktop, without
          living inside the aspect-ratio box in both cases. */}
      <div className={styles.frame}>
        <div className={styles.stage}>
          <div className={styles.card}>
            <h2 id="benchmarkers-heading" className={styles.heading}>
              Become A Benchmarker
            </h2>
            <div className={styles.copy}>
              <p className={styles.lead}>
                An exclusive circle for buyers and investors who prefer to move
                early, and with clarity.
              </p>

              <p className={styles.lead}>
                Get early access to our developments like The Urban Nest, along
                with updates from ongoing builds and practical insights into real
                estate decisions.
              </p>
            </div>
            <ul className={styles.perks}>
              <li className={styles.perk}>
                Early access before public release
              </li>
              <li className={styles.perk}>
                Private updates from Midtown Terraces
              </li>
              <li className={styles.perk}>
                Clear, practical real estate insights
              </li>
            </ul>
          </div>
        </div>

        {/* No Benchmarker page yet, so this renders without a destination —
            logged in TODO.md. */}
        <div className={styles.action}>
          <Button text="Join the Benchmarkers" />
        </div>
      </div>
    </section>
  );
}
