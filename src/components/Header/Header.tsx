"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "@/components/Menu/Menu";
import { HomeEntranceCompleteContext } from "@/components/HomeIntro/HomeIntro";
import styles from "./Header.module.css";

type Props = {
  /** Use on pages with no hero image behind the bar. */
  solid?: boolean;
  /** Keep the homepage header available for scroll-down/up reveal behaviour. */
  persistent?: boolean;
  /**
   * "light" gives the platinum bar with black logo and hamburger used on the
   * interior pages; the default overlays a hero image with white marks.
   */
  tone?: "dark" | "light";
};

export default function Header({ solid, persistent, tone = "dark" }: Props) {
  const entranceComplete = useContext(HomeEntranceCompleteContext);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const wasOpen = useRef(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on Escape, lock the page behind the modal menu, and keep keyboard
  // focus inside it until it is closed.
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }

    wasOpen.current = true;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      overlayRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(frame);
    };
  }, [open]);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const currentY = window.scrollY;
      setScrolled(currentY > 24);
      setHidden(currentY > 160 && currentY > lastY);
      if (persistent) {
        const hero = document.getElementById("home-hero");
        setPastHero(Boolean(hero && hero.getBoundingClientRect().bottom <= 0));
      }
      lastY = currentY;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [persistent]);

  const adaptiveContrast = !persistent || pastHero;

  return (
    <>
      <header
        className={`${styles.header} ${solid ? styles.solid : ""} ${
          persistent ? styles.persistent : ""
        } ${
          tone === "light" ? styles.light : ""
        } ${adaptiveContrast ? styles.adaptive : ""} ${
          scrolled ? styles.scrolled : ""
        } ${entranceComplete ? styles.controlsReady : ""} ${
          hidden && !open ? styles.hidden : ""
        }`}
      >
        {/* Mobile shows the mark alone; desktop adds the wordmark beside it,
            as the nav artwork does. */}
        <Link
          href="/"
          className={styles.brand}
          aria-label="Criterion Homes — home"
        >
          <Image
            src="/icons/logo-wordmark-mark.svg"
            alt=""
            width={498}
            height={502}
            className={styles.logo}
            priority
            unoptimized
          />
          <Image
            src="/icons/logo-wordmark-text.svg"
            alt=""
            width={1144}
            height={449}
            className={styles.wordmark}
            priority
            unoptimized
          />
        </Link>

        <button
          type="button"
          ref={toggleRef}
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
        ref={overlayRef}
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        data-menu-open={open ? "" : undefined}
      >
        <div className={styles.overlayPanel}>
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

        <Menu onNavigate={() => setOpen(false)} activePath={pathname} />

        {/* Taupe band across the foot of the overlay, per the frame. */}
        <span className={styles.overlayFoot} aria-hidden />
        </div>
      </div>
    </>
  );
}
