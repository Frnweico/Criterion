import styles from "./PaymentPlan.module.css";

export type Milestone = {
  stage: string;
  instalment: string;
  duration: string;
  status: string;
};

export type Payment = {
  unitPrice: string;
  /** Not every project has an off-plan tier — Urban Nest's frame has none. */
  semiFinished?: string;
  milestones: Milestone[];
  terms: string[];
};

export type PaymentIntro = {
  lead: string;
  points: string[];
};

type Props = {
  payment: Payment;
  intro: PaymentIntro;
  projectName: string;
  completion: string;
};

/**
 * Figma 9342:5218. Heading and intro on the left with the price box opposite;
 * the milestone table sits under both, indented to x 297. Completed stages
 * are greyed and their status set bold, which is how the frame marks them.
 */
export default function PaymentPlan({
  payment,
  intro,
  projectName,
  completion,
}: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div className={styles.intro}>
          <h2 id="payment-heading" className={styles.heading}>
            Build As You Pay
          </h2>
          <p className={styles.introLead}>{intro.lead}</p>
          <ul className={styles.introList}>
            {intro.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <dl className={styles.priceBox}>
          <div className={styles.priceRow}>
            <dt className={styles.priceLabel}>
              <span className={styles.marker} aria-hidden />
              Unit Price
            </dt>
            <dd className={styles.priceValue}>{payment.unitPrice}</dd>
          </div>
          <div className={`${styles.priceRow} ${styles.completionRow}`}>
            <dt className={styles.priceLabel}>
              <span className={styles.marker} aria-hidden />
              Project completion
            </dt>
            <dd className={styles.priceValue}>{completion}</dd>
          </div>
        </dl>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <caption className="visually-hidden">
            Payment milestones for {projectName}
          </caption>
          <thead>
            <tr>
              <th scope="col">Project completion</th>
              <th scope="col">Instalment</th>
              <th scope="col">Duration</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {payment.milestones.map((row) => {
              const done = row.status === "Completed";
              return (
                <tr
                  key={row.stage}
                  className={done ? styles.rowDone : undefined}
                >
                  <th scope="row" className={styles.stage}>
                    {row.stage}
                  </th>
                  <td className={styles.instalment}>{row.instalment}</td>
                  <td className={styles.duration}>{row.duration}</td>
                  <td className={styles.status}>{row.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {payment.semiFinished && (
        <div className={styles.semiBox}>
          <div className={styles.semiRow}>
            <p className={styles.priceLabel}>
              <span className={styles.marker} aria-hidden />
              Semi-Finished
            </p>
            <p className={styles.priceValue}>{payment.semiFinished}</p>
          </div>
          {/* No destination yet — see TODO.md. */}
          <p className={styles.semiNote}>Contact us for more info</p>
        </div>
      )}

      <div className={styles.terms}>
        <p className={styles.termsTitle}>Terms &amp; Conditions</p>
        {payment.terms.map((term) => (
          <p key={term} className={styles.termsBody}>
            {term}
          </p>
        ))}
      </div>
    </div>
  );
}
