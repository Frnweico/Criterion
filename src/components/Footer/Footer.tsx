import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { CONTACT, NAV, SITE, SOCIALS } from "@/lib/site";
import styles from "./Footer.module.css";

/** Static asset, so it is linked directly rather than through a route. */
const COMPANY_PROFILE = "/Criterion-Homes-Company-Profile.pdf";

function formatPhone(phone: string) {
  return phone.replace(/^(\+234)(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4");
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <section className={styles.updates} aria-labelledby="footer-newsletter">
          <p className={styles.groupTitle}>Updates</p>
          <h2 id="footer-newsletter" className={styles.updatesHeading}>
            Stay One Step Ahead
          </h2>
          <p className={styles.updatesBody}>
            Sign up to get updates on our latest developments, industry insights,
            and exclusive opportunities.
          </p>

          {/* TODO: connect this form to the newsletter provider. */}
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
              placeholder="Email address"
              className={styles.signupInput}
            />
            <Button
              text="Sign up"
              type="submit"
              variant="small"
              icon={false}
              className={styles.signupSubmit}
            />
          </form>
        </section>

        <div className={styles.contactColumn}>
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
                  {formatPhone(CONTACT.phone)}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <address className={styles.address}>{CONTACT.address}</address>
                </a>
              </li>
            </ul>
          </section>

          <a
            href={COMPANY_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileLink}
          >
            Download company profile
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.linkColumns}>
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
      </div>

      <div className={styles.foot}>
        <Link href="/" className={styles.logo} aria-label={`${SITE.name} home`}>
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
