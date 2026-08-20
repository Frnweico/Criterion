import Button from "@/components/Button/Button";
import NewsCards from "@/components/NewsCards/NewsCards";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { FEATURED_NEWS } from "@/lib/news";
import styles from "./NewsSection.module.css";

export default function NewsSection() {
  return (
    <section className={styles.section} aria-labelledby="news-heading">
      <div className={styles.inner}>
        <SectionHeader text="News" />
        <div className={styles.head}>
          <h2 id="news-heading" className={styles.heading}>
            Our Footprint Through The Lens Of Others
          </h2>
          <Button text="View all" href="/news" variant="outlineDark" icon={false} className={styles.viewAll} />
        </div>
        <NewsCards items={FEATURED_NEWS} />
      </div>
    </section>
  );
}
