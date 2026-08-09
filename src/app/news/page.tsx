import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BlogSection from "@/components/BlogSection/BlogSection";
import ChecklistSection from "@/components/ChecklistSection/ChecklistSection";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { NEWS } from "@/lib/news";
import styles from "./news.module.css";

export const metadata: Metadata = {
  title: "News",
  description:
    "Criterion Homes in the press — coverage from The Nation, The Guardian Nigeria, ThisDay Live, Punch and Estate Intel.",
};

const [featured, ...rest] = NEWS;

export default function NewsPage() {
  return (
    <>
      <Header tone="light" />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "News" }]} />

        {/* Lead story, set larger than the rest. */}
        <section className={styles.featured} aria-labelledby="news-heading">
          <div className={styles.featuredInner}>
            {featured.date && (
              <p className={styles.date}>{featured.date}</p>
            )}
            <h1 id="news-heading" className={styles.featuredTitle}>
              {featured.title}
            </h1>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>

            <span className={styles.source}>
              {featured.logo && (
                <Image
                  src={featured.logo}
                  alt=""
                  width={28}
                  height={28}
                  className={styles.logo}
                />
              )}
              {featured.source}
            </span>
          </div>
        </section>

        <section className={styles.latest} aria-labelledby="latest-heading">
          <div className={styles.latestInner}>
            <h2 id="latest-heading" className={styles.latestHeading}>
              Latest News
            </h2>

            <ul className={styles.cards}>
              {rest.map((item) => (
                <li key={item.id} className={styles.card}>
                  <div className={styles.panel}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardExcerpt}>{item.excerpt}</p>
                  </div>

                  <span className={styles.source}>
                    {item.logo && (
                      <Image
                        src={item.logo}
                        alt=""
                        width={24}
                        height={24}
                        className={styles.logo}
                      />
                    )}
                    {item.source}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ChecklistSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
