import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { CONTACT, NAV, SITE, SOCIALS } from "@/lib/site";
import styles from "./Footer.module.css";

/** Static asset, so it is linked directly rather than through a route. */
const COMPANY_PROFILE = "/Criterion-Homes-Company-Profile.pdf";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <section
          className={styles.updates}
          aria-labelledby="footer-newsletter"
        >
          <p className={styles.groupTitle}>Updates</p>

          <h2 id="footer-newsletter" className={styles.updatesHeading}>
            Stay One Step Ahead
          </h2>
          <p className={styles.updatesBody}>
            Sign up for our newsletter to receive occasional updates on all
            things Criterion Homes
          </p>

          {/* TODO: no submit destination yet — needs a newsletter provider. */}
          <form className={styles.signupForm}>
            <label htmlFor="footer-email" className="visually-hidden">
              Email address
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="email address"
              className={styles.signupInput}
            />
            <button type="submit" className={styles.signupSubmit}>
              Sign up
            </button>
          </form>
        </section>

        {/* Contact and Resources share a column in the frame. */}
        <div className={styles.column}>
          <section className={styles.group} aria-labelledby="footer-contact">
            <p id="footer-contact" className={styles.groupTitle}>
              Contact
            </p>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${CONTACT.email}`} className={styles.link}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className={styles.link}>
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <address className={styles.address}>{CONTACT.address}</address>
            </a>
          </section>

          <section className={styles.group} aria-labelledby="footer-resources">
            <p id="footer-resources" className={styles.groupTitle}>
              Resources
            </p>
            <Button
              text="Download company profile"
              href={COMPANY_PROFILE}
              variant="outline"
              icon={false}
              className={styles.profileButton}
            />
          </section>
        </div>

        <section className={styles.group} aria-labelledby="footer-nav">
          <p id="footer-nav" className={styles.groupTitle}>
            Navigation
          </p>
          <nav>
            <ul className={styles.list}>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <section className={styles.group} aria-labelledby="footer-socials">
          <p id="footer-socials" className={styles.groupTitle}>
            Socials
          </p>
          <ul className={styles.list}>
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className={styles.foot}>
        {/* The mark and wordmark are separate assets; the frame sets them side
            by side at 175x50. */}
        <Link href="/" className={styles.logo} aria-label={`${SITE.name} — home`}>
          <Image
            src="/icons/logo-wordmark-mark.svg"
            alt=""
            width={498}
            height={502}
            className={styles.logoMark}
          />
          <Image
            src="/icons/logo-wordmark-text.svg"
            alt=""
            width={1144}
            height={449}
            className={styles.logoText}
          />
        </Link>

        <p className={styles.colophon}>
          © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
