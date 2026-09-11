import Link from "next/link";
import styles from "./NextProperty.module.css";

export default function NextProperty({ name, href }: { name: string; href: string }) {
  return (
    <nav className={styles.section} aria-label="Explore another property">
      <p className={styles.label}>Discover another development</p>
      <Link className={styles.link} href={href}>
        <span>Explore {name}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </nav>
  );
}
