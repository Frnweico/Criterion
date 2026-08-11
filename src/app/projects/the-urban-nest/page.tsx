import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BuyerChecklistBand from "@/components/BuyerChecklistBand/BuyerChecklistBand";
import Button from "@/components/Button/Button";
import FloorPlan from "@/components/FloorPlan/FloorPlan";
import Footer from "@/components/Footer/Footer";
import Gallery from "@/components/Gallery/Gallery";
import Header from "@/components/Header/Header";
import LocationStory from "@/components/LocationStory/LocationStory";
import PaymentPlan from "@/components/PaymentPlan/PaymentPlan";
import ReasonsList from "@/components/ReasonsList/ReasonsList";
import ScrollStory from "@/components/ScrollStory/ScrollStory";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { getProject } from "@/lib/projects";
import {
  ADDRESS_BODY,
  ADDRESS_HEADING,
  ESSENTIALS,
  FLOORS,
  GALLERY,
  GALLERY_NOTE,
  LOCATION_POINTS,
  LOCATION_QUOTE,
  MAP_CATEGORIES,
  PAYMENT,
  PAYMENT_INTRO,
  PHILOSOPHY,
  PHILOSOPHY_INTRO,
  PROXIMITY,
  REASONS,
  SPECIFICATION,
  URBAN_NEST_TAGLINE,
  VIEWING_INTRO,
} from "@/lib/urban-nest";
import styles from "./urban-nest.module.css";

const project = getProject("the-urban-nest")!;

export const metadata: Metadata = {
  title: project.name,
  description: URBAN_NEST_TAGLINE,
};

/**
 * A replica of the Midtown Terraces page — same sections, same components,
 * same behaviour — with Urban Nest's own copy from Figma frame 10163:5017
 * and no images yet. See HANDOVER.md for the content divergences found
 * between Urban Nest's mobile and desktop frames and how they were resolved.
 */
export default function UrbanNestPage() {
  return (
    <>
      <Header tone="light" />
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
                <h1 id="project-heading" className={styles.heroTitle}>
                  Welcome to
                  <br />
                  {project.name}
                </h1>
              </div>

              <a href="#viewing" className={styles.heroLink}>
                Book a private viewing
              </a>
            </div>

            <div className={styles.heroFigure}>
              <Image
                src="/images/urban-nest-hero.webp"
                alt={project.imageAlt}
                width={1440}
                height={875}
                sizes="100vw"
                priority
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
            <h2 id="address-heading" className={styles.addressHeading}>
              {ADDRESS_HEADING}
            </h2>
            <p className={styles.addressBody}>{ADDRESS_BODY}</p>
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

        <Gallery photos={GALLERY} note={GALLERY_NOTE} />

        {/* --- Location ---------------------------------------------------- */}
        <LocationStory
          points={LOCATION_POINTS}
          quote={LOCATION_QUOTE}
          proximity={PROXIMITY}
          essentials={ESSENTIALS}
        />

        {/* --- Explore essentials -------------------------------------- */}
        <section className={styles.essentials} aria-labelledby="essentials-heading">
          <div className={styles.essentialsInner}>
            <h2 id="essentials-heading" className={styles.sectionHeading}>
              Explore Essentials
            </h2>

            <div className={styles.mapPlaceholder}>
              <ul className={styles.mapCategories}>
                {MAP_CATEGORIES.map((category) => (
                  <li key={category} className={styles.mapCategory}>
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Why buy --------------------------------------------------- */}
        <section className={styles.reasons} aria-labelledby="reasons-heading">
          <div className={styles.reasonsInner}>
            <h2 id="reasons-heading" className={styles.sectionHeading}>
              Why buy into {project.name}?
            </h2>
            <ReasonsList reasons={REASONS} />
          </div>
        </section>

        {/* --- Floor plan -------------------------------------------------- */}
        <section className={styles.floors} aria-labelledby="floors-heading">
          <FloorPlan floors={FLOORS} projectName={project.name} />
        </section>

        {/* --- Payment plan -------------------------------------------------
            No semi-finished tier — Urban Nest's frame has no equivalent to
            Midtown's box, so the field is simply omitted. */}
        <section className={styles.payment} aria-labelledby="payment-heading">
          <PaymentPlan
            payment={PAYMENT}
            intro={PAYMENT_INTRO}
            projectName={project.name}
            completion={project.completion}
          />
        </section>

        {/* --- Request a viewing --------------------------------------------
            Only one button here — Urban Nest's frame carries no product-paper
            download, and no PDF exists for this project. */}
        <section id="viewing" className={styles.viewing} aria-labelledby="viewing-heading">
          <div className={styles.viewingCard}>
            <div className={styles.viewingInner}>
              <h2 id="viewing-heading" className={styles.viewingHeading}>
                Request a Private Viewing
              </h2>
              <p className={styles.viewingIntro}>{VIEWING_INTRO}</p>

              {/* No destination yet — see TODO.md. */}
              <form className={styles.form}>
                {[
                  { name: "name", label: "Full Name", type: "text", autoComplete: "name" },
                  { name: "email", label: "Email", type: "email", autoComplete: "email" },
                  { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
                ].map((field) => (
                  <label key={field.name} className={styles.field}>
                    <span className="visually-hidden">{field.label}</span>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.label}
                      autoComplete={field.autoComplete}
                      required
                      className={styles.input}
                    />
                  </label>
                ))}

                <div className={styles.formActions}>
                  <Button text="Request viewing" type="submit" />
                </div>
              </form>
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

        <BuyerChecklistBand />
      </main>
      <Footer />
    </>
  );
}
