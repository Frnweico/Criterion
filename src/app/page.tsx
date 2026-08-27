import AboutSection from "@/components/AboutSection/AboutSection";
import BenchmarkersSection from "@/components/BenchmarkersSection/BenchmarkersSection";
import BlogSection from "@/components/BlogSection/BlogSection";
import ChecklistSection from "@/components/ChecklistSection/ChecklistSection";
import ClaritySection from "@/components/ClaritySection/ClaritySection";
import DevelopmentsSection from "@/components/DevelopmentsSection/DevelopmentsSection";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import LifestyleBridge from "@/components/LifestyleBridge/LifestyleBridge";
import NewsSection from "@/components/NewsSection/NewsSection";
import PactSection from "@/components/PactSection/PactSection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <LifestyleBridge />
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
