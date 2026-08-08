import Button from "@/components/Button/Button";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ClaritySection.module.css";

/**
 * "Start With Clarity" — the closing call to action.
 *
 * Eyebrow on the left, copy and buttons in a column on the right at desktop;
 * stacked on mobile. The outlined button carries no icon, matching the frame.
 */
export default function ClaritySection() {
  return (
    <section className={styles.section} aria-labelledby="clarity-heading">
      <div className={styles.inner}>
        {/* As in the About section — the eyebrow is the title, so a hidden h2
            carries it into the outline without altering the design. */}
        <h2 id="clarity-heading" className="visually-hidden">
          Start With Clarity
        </h2>

        <SectionHeader text="Start With Clarity" inverted aria-hidden />

        <div className={styles.content}>
          <p className={styles.lead}>
            Whether you&rsquo;re ready to buy or simply exploring your options,
            we help you move with confidence.
          </p>

          <div className={styles.actions}>
            <Button text="Speak with us" href="/contact" />

            {/* The Benchmarker page doesn't exist yet — logged in TODO.md. */}
            <Button text="Join the Benchmarkers" variant="outline" icon={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
