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
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "A record of how we build — writing on restraint, structure and the long-term value of every Criterion Homes project.",
};

function BlogCardContent({ post }: { post: BlogGridItem }) {
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

function FeaturedTitle({ title }: { title: string }) {
  if (title === "The Abuja Report: Gwarinpa & Wuse") {
    return <>The Abuja Report:<br />Gwarinpa &amp; Wuse</>;
  }
  return title;
}

export default function BlogPage() {
  return (
    <>
      <main>
        <section className={styles.hero} aria-labelledby="blog-lead-heading">
          <div className={styles.heroInner}>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
            <div className={styles.heroLayout}>
              <p className={styles.latestStory}>Latest Story</p>
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
                  <h1 id="blog-lead-heading"><FeaturedTitle title={FEATURED_BLOG.title} /></h1>
                  <p>{FEATURED_BLOG.excerpt}</p>
                </div>
                <Button
                  text="Read story"
                  href={`/blog/${FEATURED_BLOG.slug}`}
                  variant="outlineDark"
                  icon={false}
                  className={styles.heroButton}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.list} aria-labelledby="all-posts-heading">
          <div className={styles.listInner}>
            <h2 id="all-posts-heading">Other Blogs</h2>
            <ul className={styles.grid} data-motion-stagger>
              {BLOG_GRID.map((post, index) => (
                <li key={`${post.title}-${index}`} className={styles.card}>
                  {post.slug ? (
                    <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                      <BlogCardContent post={post} />
                    </Link>
                  ) : (
                    <article className={styles.cardStatic}>
                      <BlogCardContent post={post} />
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
