import Image from "next/image";
import type { NewsItem } from "@/lib/news";
import styles from "./NewsCards.module.css";

type Props = { items: NewsItem[] };

/** Press cards shared by the homepage and the complete News archive. */
export default function NewsCards({ items }: Props) {
  return (
    <ul className={styles.cards} data-motion-stagger>
      {items.map((item) => (
        <li key={item.id} className={styles.card}>
          <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            <div className={styles.panel}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardExcerpt}>{item.excerpt}</p>
            </div>
            <div className={styles.cardFoot}>
              <span className={styles.source}>
                <Image src={item.logo} alt="" width={28} height={28} className={styles.logo} />
                {item.source}
              </span>
              <span className={styles.arrow} aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
