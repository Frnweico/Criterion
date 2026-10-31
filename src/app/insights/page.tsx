import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import ChecklistSection from "@/components/ChecklistSection/ChecklistSection";
import Footer from "@/components/Footer/Footer";
import InsightCard from "@/components/InsightCard/InsightCard";
import { IMAGE_BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import {
  BLOG_GRID,
  FEATURED_BLOG,
  formatPostDate,
} from "@/lib/blog";
import styles from "../blog/blog.module.css";

export const metadata: Metadata = pageMetadata(
  "/insights",
  "Insights",
  "Practical guidance and considered perspectives on buying, building and long-term value from Criterion Homes.",
);

export default function InsightsPage() {
  return (
    <>
      <main>
        <section className={styles.hero} aria-labelledby="insights-lead-heading">
          <div className={styles.heroInner}>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Insights" }]} />
            <div className={styles.heroLayout}>
              <p className={styles.latestStory}>Latest insight</p>
              <Link
                href={`/insights/${FEATURED_BLOG.slug}`}
                className={styles.heroMedia}
                aria-label={`Read ${FEATURED_BLOG.title}`}
              >
                <Image
                  src={FEATURED_BLOG.image}
                  alt={FEATURED_BLOG.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  preload
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_PLACEHOLDER}
                  className={styles.heroImage}
                />
              </Link>
              <div className={styles.heroContent}>
                <div className={styles.heroCopy}>
                  <p className={styles.heroDate}>{formatPostDate(FEATURED_BLOG.date)}</p>
                  <h1 id="insights-lead-heading">{FEATURED_BLOG.title}</h1>
                  <p>{FEATURED_BLOG.excerpt}</p>
                </div>
                <Button
                  text="Read insight"
                  href={`/insights/${FEATURED_BLOG.slug}`}
                  variant="outlineDark"
                  icon={false}
                  sentenceCase
                  className={styles.heroButton}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.list} aria-labelledby="all-insights-heading">
          <div className={styles.listInner}>
            <h2 id="all-insights-heading">More insights</h2>
            <ul className={styles.grid}>
              {BLOG_GRID.map((post, index) => (
                <li key={`${post.title}-${index}`} className={styles.card}>
                  <InsightCard post={post} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ChecklistSection />
      </main>
      <div className={styles.footerTaupe}>
        <Footer />
      </div>
    </>
  );
}

