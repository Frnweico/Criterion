import type { Metadata } from "next";
import BlogSection from "@/components/BlogSection/BlogSection";
import ChecklistSection from "@/components/ChecklistSection/ChecklistSection";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import NewsCards from "@/components/NewsCards/NewsCards";
import { NEWS } from "@/lib/news";
import styles from "./news.module.css";

export const metadata: Metadata = {
  title: "News",
  description: "Criterion Homes in the press â€” coverage from The Nation, The Guardian Nigeria, ThisDay Live and Punch.",
};

export default function NewsPage() {
  return (
    <>
      <Header tone="light" />
      <main>
        <section className={styles.archive} aria-labelledby="news-heading">
          <div className={styles.inner}>
            <h1 id="news-heading">Our Footprint Through The Lens Of Others</h1>
            <NewsCards items={NEWS} />
          </div>
        </section>
        <ChecklistSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
