import Link from "next/link";
import styles from "./Breadcrumb.module.css";

export type Crumb = {
  label: string;
  /** Omit on the current page — it renders as plain text. */
  href?: string;
};

type Props = {
  items: Crumb[];
};

export default function Breadcrumb({ items }: Props) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className={styles.item}>
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
