import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { IMAGE_BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import {
  BLOG_GRID,
  BLOG_POSTS,
  formatPostDate,
  getBlogPost,
  type BlogGridItem,
} from "@/lib/blog";
import styles from "./post.module.css";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return { title: post.title, description: post.excerpt };
}

function formatArticleDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function RelatedCard({ post, index }: { post: BlogGridItem; index: number }) {
  const content = (
    <>
      <div className={styles.relatedImageWrap}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 1024px) 31vw, 100vw"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_PLACEHOLDER}
          className={styles.relatedImage}
        />
      </div>
      <div className={styles.relatedCopy}>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </div>
    </>
  );

  const className = `${styles.relatedCard} ${styles[`relatedCard${index}`]}`;

  return (
    <li className={className}>
      {post.slug ? (
        <Link href={`/blog/${post.slug}`} className={styles.relatedLink}>
          {content}
        </Link>
      ) : (
        <article className={styles.relatedStatic}>{content}</article>
      )}
    </li>
  );
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const relatedPosts = BLOG_GRID.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Header tone="light" />
      <main>
        <article className={styles.article}>
          <div className={styles.breadcrumbWrap}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>

          <header className={styles.articleHeader}>
            <time className={styles.date} dateTime={post.date}>
              {formatArticleDate(post.date)}
            </time>
            <h1>{post.title}</h1>
          </header>

          <div className={styles.heroImageWrap}>
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="100vw"
              preload
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_PLACEHOLDER}
              className={styles.heroImage}
            />
          </div>

          <div className={styles.body}>
            <p className={styles.standfirst}>{post.excerpt}</p>
            {post.body.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          <section className={styles.subscribe} aria-labelledby="article-subscribe-heading">
            <h2 id="article-subscribe-heading">
              Like what you&apos;ve read? Subscribe for
              <br className={styles.desktopBreak} /> insights, property updates, and more from
              <br className={styles.desktopBreak} /> Criterion Homes.
            </h2>
            <form className={styles.subscribeForm}>
              <label className="visually-hidden" htmlFor={`article-email-${post.slug}`}>
                Email address
              </label>
              <input
                id={`article-email-${post.slug}`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </section>

          <section className={styles.related} aria-labelledby="more-blogs-heading">
            <h2 id="more-blogs-heading">More Blogs</h2>
            <ul className={styles.relatedGrid} data-motion-stagger>
              {relatedPosts.map((relatedPost, index) => (
                <RelatedCard key={`${relatedPost.title}-${index}`} post={relatedPost} index={index} />
              ))}
            </ul>
          </section>
        </article>
      </main>
      <div className={styles.footerTaupe}>
        <Footer />
      </div>
    </>
  );
}
