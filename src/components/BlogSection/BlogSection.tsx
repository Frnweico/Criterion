import Button from "@/components/Button/Button";
import InsightCard from "@/components/InsightCard/InsightCard";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { BLOG_GRID } from "@/lib/blog";
import styles from "./BlogSection.module.css";

/** "Perspectives on Home and Value" - the three most recent insights. */
export default function BlogSection() {
  return (
    <section className={styles.section} aria-labelledby="blog-heading">
      <div className={styles.inner}>
        <SectionHeader text="Insights" />

        <h2 id="blog-heading" className={styles.heading}>
          Perspectives on Home and Value
        </h2>

        <ul className={styles.cards} data-motion-stagger>
          {BLOG_GRID.slice(0, 3).map((post) => (
            <li key={post.slug}>
              <InsightCard post={post} />
            </li>
          ))}
        </ul>

        <Button
          text="Explore more insights"
          href="/insights"
          variant="outlineDark"
          icon={false}
          className={styles.more}
        />
      </div>
    </section>
  );
}
