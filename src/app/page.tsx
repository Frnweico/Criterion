import { pageMetadata } from "@/lib/seo";
import { CONTACT, SOCIALS } from "@/lib/site";
import { SEO_ORIGIN } from "@/lib/seo";
import AboutSection from "@/components/AboutSection/AboutSection";
import BenchmarkersSection from "@/components/BenchmarkersSection/BenchmarkersSection";
import BlogSection from "@/components/BlogSection/BlogSection";
import ChecklistSection from "@/components/ChecklistSection/ChecklistSection";
import ClaritySection from "@/components/ClaritySection/ClaritySection";
import DevelopmentsSection from "@/components/DevelopmentsSection/DevelopmentsSection";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import NewsSection from "@/components/NewsSection/NewsSection";
import PactSection from "@/components/PactSection/PactSection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";

export const metadata = pageMetadata("/", "Building what matters and nothing without purpose", "Explore thoughtfully designed homes in Abuja by Criterion Homes, including The Midtown Terraces in Gwarinpa and The Urban Nest in Wuse Zone 7.");

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Organization",
        "@id": `${SEO_ORIGIN}/#organization`,
        name: "Criterion Homes",
        alternateName: ["Criterion Homes Ltd", "Criterion Homes Limited"],
        url: SEO_ORIGIN,
        telephone: CONTACT.phone, email: CONTACT.email,
        address: { "@type": "PostalAddress", streetAddress: CONTACT.address, addressLocality: "Abuja", addressCountry: "NG" },
        sameAs: SOCIALS.map(social => social.href),
      }).replace(/</g, "\\u003c") }} />
      <Header persistent />
      <main>
        <Hero />
        <AboutSection />
        <DevelopmentsSection />
        <ServicesSection />
        <ChecklistSection />
        <BenchmarkersSection />
        <PactSection />
        <ClaritySection />
        <NewsSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
