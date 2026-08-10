import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import BuyerChecklistBand from "@/components/BuyerChecklistBand/BuyerChecklistBand";
import FloorPlan from "@/components/FloorPlan/FloorPlan";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ReasonsList from "@/components/ReasonsList/ReasonsList";
import ScrollStory from "@/components/ScrollStory/ScrollStory";
import { getProject } from "@/lib/projects";
import {
  ADDRESS_BODY,
  ADDRESS_HEADING,
  ESSENTIALS,
  GALLERY_NOTE,
  LOCATION_POINTS,
  LOCATION_QUOTE,
  MAP_CATEGORIES,
  MIDTOWN_TAGLINE,
  PAYMENT,
  PAYMENT_INTRO,
  PHILOSOPHY,
  PHILOSOPHY_INTRO,
  PROXIMITY,
  SPECIFICATION,
  VIEWING_INTRO,
} from "@/lib/midtown";
import styles from "./midtown.module.css";

const project = getProject("midtown-terraces")!;

export const metadata: Metadata = {
  title: project.name,
  description: MIDTOWN_TAGLINE,
};

const GALLERY = [1, 2, 3, 4, 5].map((n) => ({
  src: `/images/midtown-gallery-${n}.png`,
  alt: `The Midtown Terraces, view ${n}`,
}));

export default function MidtownTerracesPage() {
  return (
    <>
      <Header />
      <main>
        {/* --- Hero ---------------------------------------------------- */}
        <section className={styles.hero} aria-labelledby="project-heading">
          <div className={styles.heroMedia}>
            <Image
              src="/images/midtown-hero.png"
              alt={project.imageAlt}
              fill
              sizes="100vw"
              priority
              className={styles.heroImage}
            />
            <span className={styles.heroScrim} aria-hidden />
          </div>

          <div className={styles.heroInner}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.name },
              ]}
            />

            <p className={styles.heroLocation}>{project.location}</p>
            <p className={styles.heroWelcome}>Welcome to</p>
            <h1 id="project-heading" className={styles.heroTitle}>
              {project.name}
            </h1>
            <p className={styles.heroTagline}>{MIDTOWN_TAGLINE}</p>

            <Button text="Book a private viewing" href="#viewing" />
          </div>
        </section>

        {/* --- Specification ------------------------------------------- */}
        <section className={styles.spec} aria-labelledby="spec-heading">
          <div className={styles.specInner}>
            <div className={styles.specHead}>
              <h2 id="spec-heading" className={styles.specTitle}>
                Specification
              </h2>
              <p className={styles.specSub}>Details</p>
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
        </section>

        {/* --- Address ------------------------------------------------- */}
        <section className={styles.address} aria-labelledby="address-heading">
          <div className={styles.addressInner}>
            <h2 id="address-heading" className={styles.addressHeading}>
              {ADDRESS_HEADING}
            </h2>
            <p className={styles.addressBody}>{ADDRESS_BODY}</p>
          </div>

          {/* Video goes here once the MP4 lands; the still stands in until
              then — see TODO.md. */}
          <div className={styles.addressFigure}>
            <Image
              src="/images/midtown-address.png"
              alt="The Midtown Terraces frontage"
              fill
              sizes="100vw"
              className={styles.addressImage}
            />
          </div>
        </section>

        {/* --- Design philosophy --------------------------------------- */}
        <ScrollStory
          id="philosophy"
          label="Design philosophy"
          heading="Design philosophy"
          intro={PHILOSOPHY_INTRO}
          points={PHILOSOPHY}
        />

        {/* --- Gallery ------------------------------------------------- */}
        <section className={styles.gallery} aria-labelledby="gallery-heading">
          <div className={styles.galleryInner}>
            <h2 id="gallery-heading" className={styles.galleryHeading}>
              Gallery
            </h2>

            <ul className={styles.galleryGrid}>
              {GALLERY.map((shot) => (
                <li key={shot.src} className={styles.galleryItem}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className={styles.galleryImage}
                  />
                </li>
              ))}
            </ul>

            <p className={styles.galleryNote}>{GALLERY_NOTE}</p>
          </div>
        </section>

        {/* --- Location quote ------------------------------------------ */}
        <section className={styles.quote}>
          <div className={styles.quoteInner}>
            <p className={styles.quoteLead}>{LOCATION_QUOTE.lead}</p>
            <p className={styles.quoteBody}>{LOCATION_QUOTE.body}</p>
          </div>
        </section>

        {/* --- Location ------------------------------------------------ */}
        <ScrollStory
          id="location"
          label="Location"
          heading="Gwarinpa, Abuja"
          points={LOCATION_POINTS}
          pinOnMobile
        />

        {/* --- Proximity ----------------------------------------------- */}
        <section className={styles.proximity} aria-labelledby="proximity-heading">
          <div className={styles.proximityInner}>
            <h2 id="proximity-heading" className={styles.sectionHeading}>
              Proximity to Key Areas
            </h2>
            <ul className={styles.proximityList}>
              {PROXIMITY.map((entry) => (
                <li key={entry.label} className={styles.proximityItem}>
                  <span className={styles.proximityMinutes}>
                    {entry.minutes}
                  </span>
                  <span className={styles.proximityLabel}>{entry.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- Nearby essentials --------------------------------------- */}
        <section className={styles.essentials} aria-labelledby="essentials-heading">
          <div className={styles.essentialsInner}>
            <h2 id="essentials-heading" className={styles.sectionHeading}>
              Nearby Essentials
            </h2>

            <ul className={styles.essentialsList}>
              {ESSENTIALS.map((item) => (
                <li key={item} className={styles.essentialsItem}>
                  {item}
                </li>
              ))}
            </ul>

            {/* Map is not built — no provider chosen. See TODO.md. */}
            <div className={styles.mapPlaceholder}>
              <p className={styles.mapHeading}>Explore Essentials</p>
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

        {/* --- Why buy -------------------------------------------------- */}
        <section className={styles.reasons} aria-labelledby="reasons-heading">
          <div className={styles.reasonsInner}>
            <h2 id="reasons-heading" className={styles.sectionHeading}>
              Why buy into {project.name}?
            </h2>
            <ReasonsList />
          </div>
        </section>

        {/* --- Floor plan ---------------------------------------------- */}
        <section className={styles.floors} aria-labelledby="floors-heading">
          <div className={styles.floorsInner}>
            <h2 id="floors-heading" className={styles.sectionHeading}>
              Floor Plan
            </h2>
            <FloorPlan />
          </div>
        </section>

        {/* --- Payment plan -------------------------------------------- */}
        <section className={styles.payment} aria-labelledby="payment-heading">
          <div className={styles.paymentInner}>
            <h2 id="payment-heading" className={styles.sectionHeading}>
              Payment Plan
            </h2>
            <p className={styles.paymentIntro}>{PAYMENT_INTRO}</p>

            <div className={styles.prices}>
              <p className={styles.priceRow}>
                <span className={styles.priceLabel}>Unit Price</span>
                <span className={styles.priceValue}>{PAYMENT.unitPrice}</span>
              </p>
              <p className={styles.priceRow}>
                <span className={styles.priceLabel}>Semi-Finished</span>
                <span className={styles.priceValue}>
                  {PAYMENT.semiFinished}
                </span>
              </p>
            </div>

            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Project completion</th>
                    <th scope="col">Instalment</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYMENT.milestones.map((row) => (
                    <tr key={row.stage}>
                      <th scope="row">{row.stage}</th>
                      <td>{row.instalment}</td>
                      <td>{row.duration}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.terms}>
              <p className={styles.termsTitle}>Terms &amp; Conditions</p>
              {PAYMENT.terms.map((term) => (
                <p key={term} className={styles.termsBody}>
                  {term}
                </p>
              ))}
            </div>

            <Button
              text="Contact us for more info"
              href="/contact"
              variant="outlineDark"
              icon={false}
            />
          </div>
        </section>

        {/* --- Request a viewing --------------------------------------- */}
        <section id="viewing" className={styles.viewing} aria-labelledby="viewing-heading">
          <div className={styles.viewingInner}>
            <h2 id="viewing-heading" className={styles.sectionHeading}>
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

              <Button text="Request a viewing" type="submit" />
            </form>
          </div>
        </section>

        <BuyerChecklistBand />
      </main>
      <Footer />
    </>
  );
}
