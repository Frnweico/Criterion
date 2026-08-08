"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu/Menu";
import styles from "./Header.module.css";

type Props = {
  /** Use on pages with no hero image behind the bar. */
  solid?: boolean;
  /**
   * "light" gives the platinum bar with black logo and hamburger used on the
   * interior pages; the default overlays a hero image with white marks.
   */
  tone?: "dark" | "light";
};

export default function Header({ solid, tone = "dark" }: Props) {
  const [open, setOpen] = useState(false);

  // Close on Escape, and stop the page scrolling behind the overlay.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <header
        className={`${styles.header} ${solid ? styles.solid : ""} ${
          tone === "light" ? styles.light : ""
        }`}
      >
        <Link href="/" aria-label="Criterion Homes — home">
          <Image
            src="/icons/logo-mark.svg"
            alt=""
            /* Matches the SVG's own 27.1941 × 27.4246 viewBox ratio. Declaring
               27 × 28 was ~3% off and tripped Next's aspect-ratio warning;
               CSS still sizes it down to 27px. */
            width={272}
            height={274}
            className={styles.logo}
            priority
            unoptimized
          />
        </Link>

        <button
          type="button"
          className={`${styles.toggle} ${open ? styles.open : ""}`}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          <span className={styles.bar} aria-hidden />
          <span className={styles.bar} aria-hidden />
          <span className={styles.bar} aria-hidden />
        </button>
      </header>

      <div
        id="site-menu"
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        hidden={!open}
      >
        {/* Repeats the logo and close control inside the overlay, since the
            header bar sits behind it. */}
        <div className={styles.overlayBar}>
          <Link
            href="/"
            aria-label="Criterion Homes — home"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/icons/logo-mark.svg"
              alt=""
              width={272}
              height={274}
              className={styles.logo}
              unoptimized
            />
          </Link>

          <button
            type="button"
            className={styles.close}
            onClick={() => setOpen(false)}
          >
            <span className="visually-hidden">Close menu</span>
            <span className={styles.closeIcon} aria-hidden />
          </button>
        </div>

        <Menu onNavigate={() => setOpen(false)} />

        {/* Taupe band across the foot of the overlay, per the frame. */}
        <span className={styles.overlayFoot} aria-hidden />
      </div>
    </>
  );
}
