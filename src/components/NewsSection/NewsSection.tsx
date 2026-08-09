import Image from "next/image";
import Button from "@/components/Button/Button";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { FEATURED_NEWS } from "@/lib/news";
import styles from "./NewsSection.module.css";

/**
 * "Our Footprint Through The Lens Of Others" — press coverage.
 *
 * Article URLs aren't available yet, so each card renders as a plain article
 * rather than a dead link, and the arrow is hidden for those. As soon as a
 * `href` is set in `news.ts` the card becomes an external link on its own.
 */
export default function NewsSection() {
  return (
    <section className={styles.section} aria-labelledby="news-heading">
      <div className={styles.inner}>
        <SectionHeader text="News" />

        <div className={styles.head}>
          <h2 id="news-heading" className={styles.heading}>
            Our Footprint Through The Lens Of Others
          </h2>
          <Button
            text="View all"
            href="/news"
            variant="outlineDark"
            icon={false}
            className={styles.viewAll}
          />
        </div>

        <ul className={styles.cards}>
          {FEATURED_NEWS.map((item) => {
            /* The blue panel carries only the title and excerpt; the source
               row sits beneath it on the page background, per the frames. */
            const body = (
              <>
                <div className={styles.panel}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardExcerpt}>{item.excerpt}</p>
                </div>

                <div className={styles.cardFoot}>
                  <span className={styles.source}>
                    {/* Some items carry no publisher mark. */}
                    {item.logo && (
                      <Image
                        src={item.logo}
                        alt=""
                        width={28}
                        height={28}
                        className={styles.logo}
                      />
                    )}
                    {item.source}
                  </span>
                  {/* Drawn as an SVG rather than rotated pseudo-elements —
                      those overlapped into a double chevron. */}
                  <span className={styles.arrow} aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M7 17 17 7M9 7h8v8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </>
            );

            return (
              <li key={item.id} className={styles.card}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    {body}
                  </a>
                ) : (
                  <article className={styles.cardLink}>{body}</article>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
