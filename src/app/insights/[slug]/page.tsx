import {
  articleJsonLd,
  articleMetadata,
} from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import NewsletterSignupForm from "@/components/NewsletterSignupForm/NewsletterSignupForm";
import { IMAGE_BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import {
  BLOG_GRID,
  BLOG_POSTS,
  formatPostDate,
  getBlogPost,
  type BlogGridItem,
} from "@/lib/blog";
import styles from "../../blog/[slug]/post.module.css";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return articleMetadata(
    `/insights/${slug}`,
    post.title,
    post.excerpt,
    post.image,
    post.date,
  );
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
        <Link href={`/insights/${post.slug}`} className={styles.relatedLink}>
          {content}
        </Link>
      ) : (
        <article className={styles.relatedStatic}>{content}</article>
      )}
    </li>
  );
}

export default async function InsightPostPage({
  params,
}: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const relatedPosts = BLOG_GRID.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd(
              `/insights/${slug}`,
              post.title,
              post.excerpt,
              post.image,
              post.date,
            ),
          ).replace(/</g, "\u003c"),
        }}
      />
      <main>
        <article className={styles.article}>
          <div className={styles.breadcrumbWrap}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/insights" },
                { label: post.title },
              ]}
            />
          </div>

          <header className={styles.articleHeader}>
            <h1>{post.title}</h1>
            <div className={styles.articleMeta}>
              <time className={styles.date} dateTime={post.date}>
                {formatArticleDate(post.date)}
              </time>
              <p className={styles.author}>Criterion Homes Editorial Team</p>
            </div>
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
                {section.items ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            {post.cta ? (
              <p className={styles.articleCta}>
                <Link href={post.cta.href}>{post.cta.label}</Link>
              </p>
            ) : null}
          </div>

          <section className={styles.subscribe} aria-labelledby="article-subscribe-heading">
            <h2 id="article-subscribe-heading">
              Like what you&apos;ve read? Subscribe for
              <br className={styles.desktopBreak} /> insights, property updates, and more from
              <br className={styles.desktopBreak} /> Criterion Homes.
            </h2>
            <NewsletterSignupForm
              id={`article-email-${post.slug}`}
              source="article-newsletter"
              controlsClassName={styles.subscribeForm}
            />
          </section>

          <section className={styles.related} aria-labelledby="more-insights-heading">
            <h2 id="more-insights-heading">More insights</h2>
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
