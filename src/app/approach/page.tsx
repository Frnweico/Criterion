import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ApproachSignupForm from "@/components/ApproachSignupForm/ApproachSignupForm";
import ProjectVideo from "@/components/ProjectVideo/ProjectVideo";
import ApproachEntranceState from "./ApproachEntranceState";
import styles from "./approach.module.css";

export const metadata: Metadata = {
  title: "A Better Way to Buy a Home Is Possible",
  description:
    "Criterion Homes documents construction progress, ties payments to milestones, and begins every home with the life it needs to support.",
  openGraph: {
    title: "A Better Way to Buy a Home Is Possible",
    description:
      "See how Criterion Homes approaches clearer, more accountable homebuilding in Abuja.",
    images: [
      {
        url: "/images/approach-hero-midtown.webp",
        width: 1920,
        height: 1080,
        alt: "The Midtown Terraces at dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Better Way to Buy a Home Is Possible",
    description:
      "See how Criterion Homes approaches clearer, more accountable homebuilding in Abuja.",
    images: ["/images/approach-hero-midtown.webp"],
  },
};

const PRACTICES = [
  {
    title: "Milestone-led payments",
    body: "Payments follow documented construction milestones.",
  },
  {
    title: "Construction updates as standard",
    body: "Progress should not be something buyers have to chase.",
  },
  {
    title: "Design begins with real life",
    body: "We start by asking what a home needs to support.",
  },
];

const EVIDENCE = [
  {
    src: "/images/midtown-milestone-1-foundation.webp",
    alt: "Foundation work at The Midtown Terraces",
    milestone: "Milestone 1 · Foundation completion",
  },
  {
    src: "/images/midtown-milestone-2-first-floor-slab.webp",
    alt: "First-floor slab construction at The Midtown Terraces",
    milestone: "Milestone 2 · First-floor slab complete",
  },
  {
    src: "/images/midtown-milestone-3-second-floor-slab.webp",
    alt: "Second-floor slab construction at The Midtown Terraces",
    milestone: "Milestone 3 · Second-floor slab complete",
  },
  {
    src: "/images/midtown-milestone-4-blockwork.webp",
    alt: "Blockwork in progress at The Midtown Terraces",
    milestone: "Milestone 4 · Blockwork in progress",
  },
];

export default function ApproachPage() {
  return (
    <>
      <main
        className={styles.page}
        data-motion-page-static
        data-parallax-preserve
      >
        <ApproachEntranceState />
        <section className={styles.intro} aria-labelledby="approach-title">
          <div
            className={styles.logoLockup}
            aria-label="Criterion Homes"
            data-approach-intro-copy
            data-motion-static
          >
            <Image
              src="/icons/logo-wordmark-mark.svg"
              alt=""
              width={50}
              height={50}
              className={styles.logoMark}
              priority
              unoptimized
            />
            <Image
              src="/icons/logo-wordmark-text.svg"
              alt=""
              width={114}
              height={45}
              className={styles.wordmark}
              priority
              unoptimized
            />
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/images/approach-hero-midtown.webp"
              alt="The Midtown Terraces at dusk"
              fill
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
              className={styles.image}
            />
          </div>
          <div
            className={styles.heroCopy}
            data-approach-intro-copy
            data-motion-static
          >
            <h1 id="approach-title">A better way to buy a home is possible.</h1>
          </div>
        </section>

        <section className={styles.problem} aria-label="The problem">
          <p>
            Buying from a developer can leave people looking for clarity only
            after they have committed.
          </p>
          <p>
            They are left asking where things stand, what their money is tied
            to, and whether the home was truly designed around the life they
            are building.
          </p>
        </section>

        <section className={styles.approach} aria-labelledby="practices-title">
          <p className={styles.sectionLabel}>Our approach</p>
          <h2 id="practices-title">Clarity is part of the work.</h2>
          <ol className={styles.practices}>
            {PRACTICES.map((practice, index) => (
              <li key={practice.title}>
                <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{practice.title}</h3>
                  <p>{practice.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.evidence} aria-labelledby="evidence-title">
          <div className={styles.evidenceHeading}>
            <p className={styles.sectionLabel}>On site</p>
            <h2 id="evidence-title">The Midtown Terraces</h2>
            <p className={styles.projectTimeline}>
              <span>Started · December 2025</span>
              <span>Expected handover · Q4 2026</span>
            </p>
          </div>
          <div className={styles.imageGrid}>
            {EVIDENCE.map((image, index) => (
              <figure key={image.src} className={styles.figure}>
                <div className={styles.imageFrame}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className={styles.image}
                  />
                </div>
                <figcaption>
                  {image.milestone && <strong>{image.milestone}</strong>}
                  The Midtown Terraces · Gwarinpa II Estate · Construction in
                  progress
                </figcaption>
              </figure>
            ))}
          </div>
          <div className={styles.film}>
            <p className={styles.filmLabel}>Watch the film</p>
            <div className={styles.filmFrame}>
              <ProjectVideo
                ambient={false}
                src="/images/tmt-web-optimised.mp4"
                poster="/images/midtown-address.webp"
                alt="The Midtown Terraces frontage"
                youtubeId="Ah-YE848T-Y"
                title="The Midtown Terraces film"
              />
            </div>
          </div>
        </section>

        <section className={styles.signup} aria-labelledby="signup-title">
          <p className={styles.sectionLabel}>Stay close</p>
          <h2 id="signup-title">Follow what we are building.</h2>
          <p className={styles.signupCopy}>
            Occasional notes on what we&apos;re building, why we make the
            decisions we make, and what we think the standard should be. No
            sales pitches.
          </p>
          <div className={styles.signupActions}>
            <ApproachSignupForm />
            <Link href="/" className={styles.aboutLink}>
              See more of Criterion Homes <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
