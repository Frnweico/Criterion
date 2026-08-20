import Button from "@/components/Button/Button";
import styles from "./PageHero.module.css";

type Props = {
  title: string;
  body: string;
  cta?: { text: string; href: string; newTab?: boolean };
};

/**
 * Dark banner at the top of an interior page — title on the left, supporting
 * copy and an optional button on the right at desktop, stacked on mobile.
 */
export default function PageHero({ title, body, cta }: Props) {
  return (
    <section className={styles.hero} aria-labelledby="page-hero-heading">
      <div className={styles.inner}>
        <h1 id="page-hero-heading" className={styles.title}>
          {title}
        </h1>

        <div className={styles.aside}>
          <p className={styles.body}>{body}</p>
          {cta && (
            <Button
              text={cta.text}
              href={cta.href}
              newTab={cta.newTab}
              className={styles.cta}
            />
          )}
        </div>
      </div>
    </section>
  );
}
