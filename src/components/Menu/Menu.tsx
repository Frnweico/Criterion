"use client";

import Image from "next/image";
import Link from "next/link";
import { LATEST_PROJECT } from "@/lib/projects";
import { SOCIALS } from "@/lib/site";
import styles from "./Menu.module.css";

/**
 * The full-screen navigation overlay.
 *
 * Mobile stacks nav → latest project → socials. Desktop runs two columns with
 * the project and socials on the left and the navigation on the right, so the
 * DOM keeps the mobile order and `order` swaps the columns at 1024.
 *
 * Both the nav order and the socials order differ from the footer's, so they
 * are declared here rather than reusing `NAV` from site.ts.
 */
const MENU_NAV = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const SOCIAL_ORDER = ["Instagram", "LinkedIn", "Facebook", "X (Twitter)"];

const MENU_SOCIALS = SOCIAL_ORDER.map((label) =>
  SOCIALS.find((social) => social.label === label),
).filter((social): social is (typeof SOCIALS)[number] => Boolean(social));

type Props = {
  onNavigate: () => void;
  activePath: string;
};

export default function Menu({ onNavigate, activePath }: Props) {
  return (
    <div className={styles.content}>
      <nav className={styles.nav} aria-label="Main">
        <ul className={styles.navList}>
          {MENU_NAV.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link
                href={item.href}
                className={styles.navLink}
                onClick={onNavigate}
                aria-current={activePath === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.aside}>
        <Link
          href={`/projects/${LATEST_PROJECT.slug}`}
          className={styles.latest}
          onClick={onNavigate}
        >
          <div className={styles.latestText}>
            <p className={styles.latestLabel}>Latest project</p>
            <div className={styles.latestMeta}>
              <p className={styles.latestLocation}>{LATEST_PROJECT.location}</p>
              <p className={styles.latestName}>{LATEST_PROJECT.name}</p>
            </div>
          </div>

          <div className={styles.latestFigure}>
            <Image
              src={LATEST_PROJECT.image}
              alt={LATEST_PROJECT.imageAlt}
              fill
              sizes="(min-width: 1024px) 533px, 142px"
              className={styles.latestImage}
            />
          </div>
        </Link>

        <div className={styles.follow}>
          <p className={styles.followLabel}>Follow us</p>
          <ul className={styles.followList}>
            {MENU_SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.followLink}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
