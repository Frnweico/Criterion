import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import ChecklistSection from "@/components/ChecklistSection/ChecklistSection";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "A record of how we build — writing on restraint, structure and the long-term value of every Criterion Homes project.",
};

/** The most recent post leads the page; the rest fill the grid below. */
const [lead] = BLOG_POSTS;

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero} aria-labelledby="blog-lead-heading">
          <div className={styles.heroMedia}>
            <Image
              src={lead.image}
              alt={lead.imageAlt}
              fill
              sizes="100vw"
              priority
              className={styles.heroImage}
            />
            <span className={styles.heroScrim} aria-hidden />
          </div>

          <div className={styles.heroInner}>
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
            />

            <div className={styles.heroCopy}>
              <p className={styles.heroDate}>{formatPostDate(lead.date)}</p>
              <h1 id="blog-lead-heading" className={styles.heroTitle}>
                {lead.title}
              </h1>
              <p className={styles.heroExcerpt}>{lead.excerpt}</p>
            </div>

            {/* Individual post pages don't exist yet — see TODO.md. */}
            <Button text="Read the story" variant="outline" icon={false} />
          </div>
        </section>

        <section className={styles.list} aria-labelledby="all-posts-heading">
          <div className={styles.listInner}>
            <h2 id="all-posts-heading" className={styles.listHeading}>
              Our Blogs
            </h2>

            <ul className={styles.grid}>
              {BLOG_POSTS.map((post) => (
                <li key={post.slug} className={styles.card}>
                  <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                    <div className={styles.cardFigure}>
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 440px, 100vw"
                        className={styles.cardImage}
                      />
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.cardCopy}>
                        <h3 className={styles.cardTitle}>{post.title}</h3>
                        <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      </div>
                      <p className={styles.cardDate}>
                        {formatPostDate(post.date)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ChecklistSection />
      </main>

      {/* The Blog frame gives the footer a taupe ground. */}
      <div className={styles.footerTaupe}>
        <Footer />
      </div>
    </>
  );
}
