import {
  articleJsonLd,
  articleMetadata,
} from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import Footer from "@/components/Footer/Footer";
import InsightCard from "@/components/InsightCard/InsightCard";
import { IMAGE_BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import {
  BLOG_POSTS,
  getBlogPost,
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
    post.modifiedDate ?? post.date,
  );
}

function formatArticleDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function InsightPostPage({
  params,
}: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

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
              post.modifiedDate ?? post.date,
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

          <div className={`${styles.heroImageWrap} ${post.slug === "build-as-you-pay-explained" ? styles.progressionHero : ""}`}>
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
                {section.image && section.imageAlt && section.imageBeforeHeading ? (
                  <figure className={styles.sectionFigure}>
                    <div className={styles.sectionImageWrap}>
                      <Image
                        src={section.image}
                        alt={section.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 800px, 100vw"
                        placeholder="blur"
                        blurDataURL={IMAGE_BLUR_PLACEHOLDER}
                        className={styles.sectionImage}
                      />
                    </div>
                    {section.imageCaption ? (
                      <figcaption>{section.imageCaption}</figcaption>
                    ) : null}
                  </figure>
                ) : null}
                {section.heading ? <h2>{section.heading}</h2> : null}
                {section.image && section.imageAlt && !section.imageBeforeHeading ? (
                  <figure className={styles.sectionFigure}>
                    <div className={styles.sectionImageWrap}>
                      <Image
                        src={section.image}
                        alt={section.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 800px, 100vw"
                        placeholder="blur"
                        blurDataURL={IMAGE_BLUR_PLACEHOLDER}
                        className={styles.sectionImage}
                      />
                    </div>
                    {section.imageCaption ? (
                      <figcaption>{section.imageCaption}</figcaption>
                    ) : null}
                  </figure>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    {section.paragraphLink && paragraph.includes(section.paragraphLink.label) ? (
                      <>
                        {paragraph.slice(0, paragraph.indexOf(section.paragraphLink.label))}
                        <Link href={section.paragraphLink.href}>{section.paragraphLink.label}</Link>
                        {paragraph.slice(paragraph.indexOf(section.paragraphLink.label) + section.paragraphLink.label.length)}
                      </>
                    ) : paragraph}
                  </p>
                ))}
                {section.benefits?.map((benefit) => (
                  <p key={benefit.heading}><strong>{benefit.heading}</strong> {benefit.text}</p>
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

          <section className={styles.related} aria-labelledby="more-insights-heading">
            <h2 id="more-insights-heading">More insights</h2>
            <ul className={styles.relatedGrid} data-motion-stagger>
              {relatedPosts.map((relatedPost, index) => (
                <li key={`${relatedPost.title}-${index}`}>
                  <InsightCard post={relatedPost} />
                </li>
              ))}
            </ul>
            <div className={styles.relatedAction}>
              <Button
                text="View all insights"
                href="/insights"
                variant="outlineDark"
                icon={false}
                sentenceCase
              />
            </div>
          </section>
        </article>
      </main>
      <div className={styles.footerTaupe}>
        <Footer />
      </div>
    </>
  );
}

