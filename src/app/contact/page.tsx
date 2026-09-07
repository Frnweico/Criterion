import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { CONTACT } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Criterion Homes in Wuse Zone 2, Abuja for premium residential development enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <main>
        <section className={styles.contact} aria-labelledby="contact-heading">
          <div className={styles.inner}>
            <header className={styles.intro}>
              <SectionHeader text="Contact" className={styles.eyebrow} />
              <h1 id="contact-heading">Get In Touch With Us</h1>
            </header>

            <dl className={styles.details}>
              <div className={styles.row}>
                <dt>Phone number</dt>
                <dd>
                  <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a>
                </dd>
              </div>
              <div className={styles.row}>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </dd>
              </div>
              <div className={styles.row}>
                <dt>Address</dt>
                <dd>
                  <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">
                    {CONTACT.address}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <div className={styles.footerLight}>
        <Footer />
      </div>
    </>
  );
}
