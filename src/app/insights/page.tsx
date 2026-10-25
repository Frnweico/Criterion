import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import ChecklistSection from "@/components/ChecklistSection/ChecklistSection";
import Footer from "@/components/Footer/Footer";
import { IMAGE_BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import {
  BLOG_GRID,
  FEATURED_BLOG,
  formatPostDate,
  type BlogGridItem,
} from "@/lib/blog";
import styles from "../blog/blog.module.css";

export const metadata: Metadata = pageMetadata(
  "/insights",
  "Insights",
  "Practical guidance and considered perspectives on buying, building and long-term value from Criterion Homes.",
);

function InsightCardContent({ post }: { post: BlogGridItem }) {
  return (
    <>
      <div className={styles.cardFigure}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_PLACEHOLDER}
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardBody}>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </div>
    </>
  );
}

export default function InsightsPage() {
  return (
    <>
      <main>
        <section className={styles.hero} aria-labelledby="insights-lead-heading">
          <div className={styles.heroInner}>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Insights" }]} />
            <div className={styles.heroLayout}>
              <p className={styles.latestStory}>Latest insight</p>
              <div className={styles.heroMedia}>
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
              </div>
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
            <ul className={styles.grid} data-motion-stagger>
              {BLOG_GRID.map((post, index) => (
                <li key={`${post.title}-${index}`} className={styles.card}>
                  {post.slug ? (
                    <Link href={`/insights/${post.slug}`} className={styles.cardLink}>
                      <InsightCardContent post={post} />
                    </Link>
                  ) : (
                    <article className={styles.cardStatic}>
                      <InsightCardContent post={post} />
                    </article>
                  )}
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
