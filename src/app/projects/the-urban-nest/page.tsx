import { pageMetadata, projectListingJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import ChecklistSection from "@/components/ChecklistSection/ChecklistSection";
import FloorPlan from "@/components/FloorPlan/FloorPlan";
import Footer from "@/components/Footer/Footer";
import Gallery from "@/components/Gallery/Gallery";
import NextProperty from "@/components/NextProperty/NextProperty";
import LocationStory from "@/components/LocationStory/LocationStory";
import ReasonsList from "@/components/ReasonsList/ReasonsList";
import ScrollStory from "@/components/ScrollStory/ScrollStory";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { getProject } from "@/lib/projects";
import {
  ADDRESS_BODY,
  ADDRESS_HEADING,
  DESKTOP_GALLERY,
  ESSENTIALS,
  FLOORS,
  GALLERY,
  GALLERY_NOTE,
  LOCATION_POINTS,
  LOCATION_QUOTE,
  PAYMENT,
  PHILOSOPHY,
  PHILOSOPHY_INTRO,
  PROXIMITY,
  REASONS,
  SPECIFICATION,
  URBAN_NEST_TAGLINE,
} from "@/lib/urban-nest";
import styles from "./urban-nest.module.css";

const project = getProject("the-urban-nest")!;

export const metadata: Metadata = pageMetadata("/projects/the-urban-nest", "The Urban Nest in Wuse, Abuja", "The Urban Nest is fully sold out. Explore its design and construction progress in Wuse Zone 7, Abuja, with projected completion in Q4 2027.", "/images/urban-nest-hero.webp");

/**
 * A replica of the Midtown Terraces page — same sections, same components,
 * same behaviour — with Urban Nest's own copy from Figma frame 10163:5017
 * and no images yet. See HANDOVER.md for the content divergences found
 * between Urban Nest's mobile and desktop frames and how they were resolved.
 */
export default function UrbanNestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectListingJsonLd("/projects/the-urban-nest", project)).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        {/* --- Hero ---------------------------------------------------- */}
        <section className={styles.hero} aria-labelledby="project-heading">
          <div className={styles.heroCrumb}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.name },
              ]}
            />
          </div>

          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.heroHeadings}>
                <p className={styles.heroLocation}>{project.location}</p>
                <h1
                  id="project-heading"
                  className={styles.heroTitle}
                  data-motion-line-safe
                >
                  Welcome to
                  <br />
                  {project.name}
                </h1>
                <p className={styles.heroPrice}>{project.priceLabel}</p>
                {project.availability ? (
                  <p className={styles.heroAvailability}>
                    {project.availability}
                  </p>
                ) : null}
              </div>

              <a href="#availability" className={styles.heroLink}>
                Explore other available homes
              </a>
            </div>

            <div className={styles.heroFigure}>
              <Image
                src="/images/urban-nest-hero.webp"
                alt={project.imageAlt}
                width={1440}
                height={875}
                sizes="100vw"
                preload
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>

        {/* --- Overview -------------------------------------------------
            Six spec rows, not seven — Urban Nest's frame has no "Area Size"
            row (confirmed on both mobile and desktop). */}
        <section className={styles.spec} aria-labelledby="spec-heading">
          <div className={styles.specInner}>
            <SectionHeader text="Overview" aria-hidden />

            <div className={styles.specBody}>
              <h2 id="spec-heading" className="visually-hidden">
                Overview
              </h2>
              <p className={styles.specIntro}>{URBAN_NEST_TAGLINE}</p>

              <div className={styles.specTable}>
                <div
                  className={`${styles.specRow} ${styles.specColHeadRow}`}
                  aria-hidden
                >
                  <span className={`${styles.specLabel} ${styles.specColHead}`}>
                    Specification
                  </span>
                  <span className={styles.specColHead}>Details</span>
                </div>

                <dl className={styles.specList}>
                  {SPECIFICATION.map((row) => (
                    <div key={row.label} className={styles.specRow}>
                      <dt className={styles.specLabel}>{row.label}</dt>
                      <dd className={styles.specValue}>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* --- Address --------------------------------------------------- */}
        <section className={styles.address} aria-labelledby="address-heading">
          <div className={styles.addressInner}>
            <h2
              id="address-heading"
              className={styles.addressHeading}
              data-motion-line-safe
            >
              {ADDRESS_HEADING}
            </h2>
            <p className={styles.addressBody} data-motion-line-safe>
              {ADDRESS_BODY}
            </p>
          </div>

          {/* Video goes here once the MP4 lands; the still stands in until
              then, so the frame's play control is deliberately absent —
              same policy as Midtown. */}
          <div className={styles.addressFigureWrap}>
            <div className={styles.addressFigure}>
              <Image
                src="/images/urban-nest-address.webp"
                alt="The Urban Nest frontage"
                width={1440}
                height={875}
                sizes="100vw"
                className={styles.addressImage}
              />
            </div>
          </div>
        </section>

        {/* --- Design philosophy ------------------------------------------ */}
        <ScrollStory
          id="philosophy"
          heading="Design philosophy"
          intro={PHILOSOPHY_INTRO}
          points={PHILOSOPHY}
          pinOnMobile
        />

        <Gallery photos={GALLERY} note={GALLERY_NOTE} desktopPhotos={DESKTOP_GALLERY} />

        {/* --- Location ---------------------------------------------------- */}
        <LocationStory
          points={LOCATION_POINTS}
          quote={LOCATION_QUOTE}
          proximity={PROXIMITY}
          essentials={ESSENTIALS}
        />

        {/* --- Explore essentials -------------------------------------- */}
        {/* --- Why buy --------------------------------------------------- */}
        <section className={styles.reasons} aria-labelledby="reasons-heading">
          <div className={styles.reasonsInner}>
            <h2 id="reasons-heading" className={styles.sectionHeading}>
              The thinking behind {project.name}
            </h2>
            <ReasonsList reasons={REASONS} />
          </div>
        </section>

        {/* --- Floor plan -------------------------------------------------- */}
        <section className={styles.floors} aria-labelledby="floors-heading">
          <FloorPlan floors={FLOORS} projectName={project.name} />
        </section>

        <section className={styles.progress} aria-labelledby="progress-heading">
          <div className={styles.progressHead}>
            <div>
              <p className={styles.progressLabel}>Construction record</p>
              <h2 id="progress-heading" className={styles.sectionHeading}>
                Construction progress
              </h2>
            </div>
            <p className={styles.progressCompletion}>
              Projected completion <strong>{project.completion}</strong>
            </p>
          </div>
          <p className={styles.progressIntro}>
            The Urban Nest is fully sold out. Follow the construction milestones
            as the development takes shape.
          </p>
          <table className={styles.progressTable}>
            <caption className="visually-hidden">
              Construction milestones for The Urban Nest
            </caption>
            <thead>
              <tr><th scope="col">Construction milestone</th><th scope="col">Status</th></tr>
            </thead>
            <tbody>
              {PAYMENT.milestones.map((milestone) => (
                <tr key={milestone.stage}>
                  <th scope="row">{milestone.stage}</th>
                  <td>{milestone.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* --- Available homes -----------------------------------------------
            This development is sold out, so enquiries lead people to the
            available release and the newsletter rather than a viewing form. */}
        <section id="availability" className={styles.viewing} aria-labelledby="availability-heading">
          <div className={styles.viewingCard}>
            <div className={styles.viewingInner}>
              <h2 id="availability-heading" className={styles.viewingHeading}>
                Explore available homes
              </h2>
              <p className={styles.availabilityCopy}>
                The Urban Nest is fully sold out. Explore The Midtown Terraces
                for currently available homes.
              </p>
              <div className={styles.availabilityActions}>
                <Button text="Explore The Midtown Terraces" href="/projects/midtown-terraces" />
                <Link className={styles.newsletterLink} href="/approach#signup-title">
                  Sign up to our newsletter
                </Link>
              </div>
            </div>

            {/* Decorative — same shared outline mark Midtown uses (9500:4981
                / 10163:5413 are identical geometry). */}
            <Image
              src="/icons/viewing-mark.svg"
              alt=""
              width={416}
              height={419}
              aria-hidden
              className={styles.viewingMark}
            />
          </div>
        </section>

        <ChecklistSection />
        <NextProperty name="The Midtown Terraces" href="/projects/midtown-terraces" />
      </main>
      <Footer />
    </>
  );
}
