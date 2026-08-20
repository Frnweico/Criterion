import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import PactSection from "@/components/PactSection/PactSection";
import PageHero from "@/components/PageHero/PageHero";
import StatementsSection from "@/components/StatementsSection/StatementsSection";
import TeamSection from "@/components/TeamSection/TeamSection";
import ValuesSection from "@/components/ValuesSection/ValuesSection";
import { ABOUT_INTRO } from "@/lib/about";
import styles from "./about.module.css";

export const metadata: Metadata = {
  /* The root layout appends "| Criterion Homes" via its title template, so the
     brand is deliberately not repeated here. */
  title: "Who We Are",
  description:
    "Criterion Homes is a real estate development firm reinventing the business in Nigeria — our vision, values, the Criterion Pact, and the team behind it.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Who We Are"
          body={ABOUT_INTRO}
          cta={{
            text: "Download company profile",
            href: "/Criterion-Homes-Company-Profile.pdf",
            newTab: true,
          }}
        />
        <StatementsSection />
        <ValuesSection />

        {/* The Pact runs on taupe here rather than the homepage's green. Toned
            from this stylesheet so PactSection itself stays untouched. */}
        <div className={styles.pactTaupe}>
          <PactSection />
        </div>

        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
