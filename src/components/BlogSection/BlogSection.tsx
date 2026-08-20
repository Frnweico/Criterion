import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { IMAGE_BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import { BLOG_GRID, formatPostDate } from "@/lib/blog";
import styles from "./BlogSection.module.css";

/**
 * "A Record Of How We Build" — the three most recent posts.
 *
 * Desktop runs the heading on the left with the supporting line on the right;
 * mobile stacks them.
 */
export default function BlogSection() {
  return (
    <section className={styles.section} aria-labelledby="blog-heading">
      <div className={styles.inner}>
        <SectionHeader text="Blogs" />

        <div className={styles.head}>
          <h2 id="blog-heading" className={styles.heading}>
            A Record Of How We Build
          </h2>
          <p className={styles.standfirst}>
            Guided by restraint, shaped by clear decisions, and dedicated to the
            long-term value of every structure we create
          </p>
        </div>

        <ul className={styles.cards} data-motion-stagger>
          {BLOG_GRID.slice(0, 3).map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className={styles.card}>
                <div className={styles.figure}>
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 423px, 100vw"
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR_PLACEHOLDER}
                    className={styles.image}
                  />
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <time className={styles.date} dateTime={post.date}>
                    {formatPostDate(post.date)}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Button
          text="Explore more stories"
          href="/blog"
          variant="outlineDark"
          icon={false}
          className={styles.more}
        />
      </div>
    </section>
  );
}
