import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import ChecklistSection from "@/components/ChecklistSection/ChecklistSection";
import FloorPlan from "@/components/FloorPlan/FloorPlan";
import Footer from "@/components/Footer/Footer";
import Gallery from "@/components/Gallery/Gallery";
import LocationStory from "@/components/LocationStory/LocationStory";
import PaymentPlan from "@/components/PaymentPlan/PaymentPlan";
import ReasonsList from "@/components/ReasonsList/ReasonsList";
import ScrollStory from "@/components/ScrollStory/ScrollStory";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ProjectVideo from "@/components/ProjectVideo/ProjectVideo";
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
  MIDTOWN_TAGLINE,
  PAYMENT,
  PAYMENT_INTRO,
  PHILOSOPHY,
  PHILOSOPHY_INTRO,
  PROXIMITY,
  REASONS,
  SPECIFICATION,
  VIEWING_INTRO,
} from "@/lib/midtown";
import styles from "./midtown.module.css";

const project = getProject("midtown-terraces")!;

export const metadata: Metadata = {
  title: project.name,
  description: MIDTOWN_TAGLINE,
};

export default function MidtownTerracesPage() {
  return (
    <>
      <main>
        {/* --- Hero ----------------------------------------------------
            Figma 9342:5395 (desktop) / 9942:5285 (mobile): centred copy on
            the platinum ground, then a full-bleed band of the cover artwork
            cropped by its frame. The breadcrumb is a separate row above the
            hero on desktop and is absent from the mobile frame. */}
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
              </div>

              <a href="#viewing" className={styles.heroLink}>
                Book a private viewing
              </a>
            </div>

            <div className={styles.heroFigure}>
              <Image
                src="/images/midtown-hero.webp"
                alt={project.imageAlt}
                width={2880}
                height={1750}
                sizes="100vw"
                preload
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>

        {/* --- Overview ------------------------------------------------
            Figma 9342:5325 / 9942:5295: the section label sits alone in the
            left column; the tagline and the spec table share the right one.
            The "Specification / Details" row is the table's own heading and
            is desktop-only. */}
        <section className={styles.spec} aria-labelledby="spec-heading">
          <div className={styles.specInner}>
            <SectionHeader text="Overview" aria-hidden />

            <div className={styles.specBody}>
              <h2 id="spec-heading" className="visually-hidden">
                Overview
              </h2>
              <p className={styles.specIntro}>{MIDTOWN_TAGLINE}</p>

              <div className={styles.specTable}>
                {/* Column headings only — the dt/dd pairs already carry the
                    relationship for assistive tech. */}
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

        {/* --- Address -------------------------------------------------
            Figma 9345:5409 / 9942:5328: heading and body as two columns on
            desktop, stacked on mobile. The picture (9345:5414) is inset to
            the gutter rather than full-bleed. */}
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

          <div className={styles.addressFigureWrap} data-motion-static>
            <div className={styles.addressFigure}>
              <ProjectVideo
                className={styles.addressVideo}
                src="/images/tmt-web-optimised.mp4"
                poster="/images/midtown-address.webp"
                alt="The Midtown Terraces frontage"
                youtubeId="Ah-YE848T-Y"
                title="The Midtown Terraces film"
              />
            </div>
          </div>
        </section>

        {/* --- Design philosophy --------------------------------------- */}
        <ScrollStory
          id="philosophy"
          heading="Design philosophy"
          intro={PHILOSOPHY_INTRO}
          points={PHILOSOPHY}
          pinOnMobile
        />

        <Gallery
          photos={GALLERY}
          note={GALLERY_NOTE}
          desktopPhotos={GALLERY}
        />

        {/* --- Location ------------------------------------------------
            Its own component: the slides carry a section label rather than a
            heading band, and two of the five swap the photograph for built
            content — the drive times and the essentials list. Those used to
            be repeated as standalone sections below; they are slides 2 and 5
            of this story, so the duplicates are gone. */}
        <LocationStory
          points={LOCATION_POINTS}
          quote={LOCATION_QUOTE}
          proximity={PROXIMITY}
          essentials={ESSENTIALS}
        />

        {/* --- Explore essentials --------------------------------------
            Its own section in the frame (9342:5254). Still to be rebuilt to
            the reference, and the map itself is blocked on a provider and pin
            data — see TODO.md. */}
        {/* --- Why buy -------------------------------------------------- */}
        <section className={styles.reasons} aria-labelledby="reasons-heading">
          <div className={styles.reasonsInner}>
            <h2 id="reasons-heading" className={styles.sectionHeading}>
              Why buy into {project.name}?
            </h2>
            <ReasonsList reasons={REASONS} />
          </div>
        </section>

        {/* --- Floor plan ----------------------------------------------
            FloorPlan owns the whole section: the frame puts the heading in
            the same left column as the tabs (9418:5002). */}
        <section className={styles.floors} aria-labelledby="floors-heading">
          <FloorPlan floors={FLOORS} projectName={project.name} />
        </section>

        {/* --- Payment plan --------------------------------------------
            Its own component: the frame pairs the copy with a ruled price
            box and indents the milestone table (9342:5218). */}
        <section className={styles.payment} aria-labelledby="payment-heading">
          <PaymentPlan
            payment={PAYMENT}
            intro={PAYMENT_INTRO}
            projectName={project.name}
            completion={project.completion}
          />
        </section>

        {/* --- Request a viewing ---------------------------------------
            Figma 9345:5413: a ruled card holding the copy and form in a
            582-wide column, with the outlined mark opposite. */}
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
                  <Button
                    text="Download product paper"
                    href="/midtown-terraces-product-paper.pdf"
                    newTab
                    variant="outlineDark"
                    icon={false}
                  />
                </div>
              </form>
            </div>

            {/* Decorative — the mark drawn as outline (9500:4981). */}
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
      </main>
      <Footer />
    </>
  );
}
