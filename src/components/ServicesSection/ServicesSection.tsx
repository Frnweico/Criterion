import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ServicesExplorer from "./ServicesExplorer";
import styles from "./ServicesSection.module.css";

/**
 * "Four Services. One Focus."
 *
 * The intro is handed to the explorer rather than rendered here, because on
 * desktop it shares the left column with the accordion, and on mobile the
 * image sits between the intro and the list.
 */
export default function ServicesSection() {
  const intro = (
    <div className={styles.intro}>
      <SectionHeader text="Services" className={styles.header} />

      <h2 id="services-heading" className={styles.heading}>
        Four services.
        <br />
        One focus.
      </h2>

      {/* The mobile frame ends this with a full stop and the desktop frame
          doesn't. Kept consistent rather than varying punctuation by width. */}
      <p className={styles.tagline}>Delivering results that matter.</p>
    </div>
  );

  return (
    <section className={styles.section} aria-labelledby="services-heading">
      <div className={styles.inner}>
        <ServicesExplorer intro={intro} />
      </div>
    </section>
  );
}
