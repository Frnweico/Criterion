import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BuyerChecklistBand from "@/components/BuyerChecklistBand/BuyerChecklistBand";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { PROJECTS } from "@/lib/projects";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every Criterion development is engineered with a distinct lifestyle in mind — a curated portfolio united by our signature architecture of restraint.",
};

/** Unit descriptions are page-specific; price and completion come from data. */
const UNITS: Record<string, string> = {
  "midtown-terraces": "4-Bedroom Terrace Duplexes",
  "the-urban-nest": "4-Bedroom Terrace Duplexes",
};

export default function ProjectsPage() {
  return (
    <>
      <Header tone="light" />
      <main>
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        />

        <section className={styles.intro} aria-labelledby="projects-heading">
          <div className={styles.introInner}>
            <h1 id="projects-heading" className={styles.title}>
              Projects
            </h1>
            <p className={styles.lead}>
              Every Criterion development is engineered with a distinct
              lifestyle in mind, creating a curated portfolio united by our
              signature architecture of restraint.
            </p>
          </div>
        </section>

        <section className={styles.list} aria-label="Current developments">
          <div className={styles.listInner}>
            {PROJECTS.map((project) => (
              <article key={project.slug} className={styles.row}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={styles.figure}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 670px, 100vw"
                    className={styles.image}
                  />
                </Link>

                <div className={styles.details}>
                  <div className={styles.copy}>
                    <p className={styles.location}>{project.location}</p>

                    <h2 className={styles.name}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className={styles.nameLink}
                      >
                        {project.name}
                      </Link>
                    </h2>

                    <p className={styles.description}>{project.description}</p>
                  </div>

                  <p className={styles.facts}>
                    {[
                      UNITS[project.slug] ?? project.type,
                      project.priceLabel,
                      project.completion,
                    ].map((fact, index) => (
                      <span key={fact} className={styles.fact}>
                        {index > 0 && (
                          <span className={styles.divider} aria-hidden>
                            |
                          </span>
                        )}
                        {fact}
                      </span>
                    ))}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <BuyerChecklistBand />
      </main>

      {/* The frame gives this page a light footer rather than the carbon one
          used elsewhere; re-toned from this stylesheet so Footer is untouched. */}
      <div className={styles.footerLight}>
        <Footer />
      </div>
    </>
  );
}
