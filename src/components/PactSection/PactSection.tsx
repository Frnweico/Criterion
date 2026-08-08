import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { PACT_INTRO, PACT_ITEMS } from "@/lib/pact";
import styles from "./PactSection.module.css";

/**
 * "The Criterion Pact" — deep green band listing the five commitments.
 *
 * Desktop centres the intro block and runs each item as an oversized title on
 * the left with its caption in a column on the right, dropped 72px so it sits
 * against the top of the title. Mobile stacks the caption under each title.
 */
export default function PactSection() {
  return (
    <section className={styles.section} aria-labelledby="pact-heading">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <SectionHeader text="Our agreement" inverted />

          <h2 id="pact-heading" className={styles.heading}>
            The Criterion Pact
          </h2>

          <p className={styles.lead}>{PACT_INTRO}</p>
        </div>

        <ol className={styles.list}>
          {PACT_ITEMS.map((item) => (
            <li key={item.index} className={styles.item}>
              <div className={styles.main}>
                <p className={styles.index} aria-hidden>
                  {item.index}
                </p>
                {/* Short vertical rule beside the number; the title aligns to
                    its left edge on the row below. */}
                <span className={styles.rule} aria-hidden />
                <h3 className={styles.title}>{item.title}</h3>
              </div>

              <p className={styles.caption}>{item.caption}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
