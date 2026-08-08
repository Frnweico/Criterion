import { CORE_VALUES, VALUES_INTRO } from "@/lib/about";
import styles from "./ValuesSection.module.css";

/**
 * "Our Core Values" — deep blue band, centred intro, then six numbered values
 * in two columns at desktop with a dividing rule between them.
 */
export default function ValuesSection() {
  return (
    <section className={styles.section} aria-labelledby="values-heading">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="values-heading" className={styles.heading}>
            Our Core Values
          </h2>
          <p className={styles.lead}>{VALUES_INTRO}</p>
        </div>

        <ol className={styles.list}>
          {CORE_VALUES.map((value) => (
            <li key={value.index} className={styles.item}>
              <p className={styles.index} aria-hidden>
                {value.index}
              </p>
              <h3 className={styles.title}>{value.title}</h3>
              <p className={styles.body}>{value.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
