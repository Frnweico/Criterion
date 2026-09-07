import type { Metadata } from "next";
import BenchmarkerForm from "@/components/BenchmarkerForm/BenchmarkerForm";
import Footer from "@/components/Footer/Footer";
import styles from "./benchmarkers.module.css";

export const metadata: Metadata = {
  title: "The Benchmarkers",
  description:
    "Join The Benchmarkers for early access to selected Criterion Homes developments and private project updates.",
};

export default function BenchmarkersPage() {
  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero} aria-label="Join The Benchmarkers">
          <div className={styles.panel}>
            <BenchmarkerForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
