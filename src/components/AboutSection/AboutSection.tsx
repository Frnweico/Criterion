import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./AboutSection.module.css";

/**
 * "About Criterion Homes" — deep blue band under the hero.
 *
 * Mobile stacks the header above the copy; desktop puts the header on the left
 * and the copy in a column on the right, matching the two-column arrangement
 * in the desktop frame.
 */
export default function AboutSection() {
  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <div className={styles.inner}>
        {/* The eyebrow is this section's title, but SectionHeader renders a
            div. A hidden h2 keeps the document outline complete without
            changing anything on screen. */}
        <h2 id="about-heading" className="visually-hidden">
          About Criterion Homes
        </h2>

        <SectionHeader
          text="About Criterion Homes"
          inverted
          className={styles.header}
          aria-hidden
        />

        <div className={styles.copy}>
          <p className={styles.lead}>
            Criterion Homes builds with restraint, making clear choices about
            what adds lasting value.
          </p>
          <p className={styles.emphasis}>
            We build what matters, and nothing without purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
