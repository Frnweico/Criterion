"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import {
  ESSENTIALS,
  LOCATION_POINTS,
  LOCATION_QUOTE,
  PROXIMITY,
} from "@/lib/midtown";
import styles from "./LocationStory.module.css";

/**
 * The location story, intro included. Step 0 is the quote with the section
 * label centred above it; from step 1 the quote clears, the label settles at
 * the top left and stays there while the five points run beneath it.
 *
 * Pinned on every width — a touch drag advances it the same way a wheel does
 * — and falls back to a plain stack under reduced motion.
 *
 * Figma 9342:5053; slides 9396:4763 (image), 4755 (drive times), 4771 (list).
 */
export default function LocationStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState(false);

  const steps = LOCATION_POINTS.length + 1;

  useEffect(() => {
    const decide = () =>
      setPinned(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const next = Math.min(steps - 1, Math.floor(progress * steps));
      setStep((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned, steps]);

  /* Step 0 is the intro, so the points run one behind it. */
  const activePoint = step - 1;
  const onIntro = step === 0;

  const state = (index: number) =>
    index === activePoint
      ? styles.on
      : index < activePoint
        ? styles.prev
        : styles.next;

  const aside = (id: string, image?: string, imageAlt?: string) => {
    if (id === "proximity") {
      return (
        <ul className={styles.rows}>
          {PROXIMITY.map((entry) => (
            <li key={entry.label} className={styles.row}>
              <span className={styles.minutes}>{entry.minutes}</span>
              <span className={styles.rowLabel}>{entry.label}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (id === "nearby-essentials") {
      return (
        <ul className={styles.essentials}>
          {ESSENTIALS.map((item) => (
            <li key={item} className={styles.essential}>
              <span className={styles.marker} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      );
    }

    if (!image) return null;

    return (
      <div className={styles.figure}>
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          sizes="(min-width: 1024px) 690px, calc(100vw - 40px)"
          className={styles.image}
        />
      </div>
    );
  };

  const slides = LOCATION_POINTS.map((point, index) => {
    const isEssentials = point.id === "nearby-essentials";
    const hasImage = Boolean(point.image);

    return (
      <article
        key={point.id}
        className={[
          styles.slide,
          pinned ? state(index) : "",
          isEssentials ? styles.slideEssentials : "",
          hasImage ? "" : styles.slideBuilt,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={pinned ? index !== activePoint : undefined}
      >
        <div className={styles.copy}>
          <h3 className={styles.title}>{point.title}</h3>
          {!isEssentials && <p className={styles.body}>{point.body}</p>}
        </div>

        <div className={styles.aside}>
          {isEssentials && <p className={styles.body}>{point.body}</p>}
          {aside(point.id, point.image, point.imageAlt)}
        </div>
      </article>
    );
  });

  /* SectionHeader sets `align-self: flex-start` so a stretching parent can't
     widen its rule, which also stops it centring — hence the wrapper. */
  const intro = (
    <>
      <div className={styles.introLabel}>
        <SectionHeader text="Location" aria-hidden />
      </div>
      <div className={styles.quote}>
        <p className={styles.quoteLine}>{LOCATION_QUOTE.lead}</p>
        <p className={styles.quoteLine}>{LOCATION_QUOTE.body}</p>
      </div>
    </>
  );

  if (!pinned) {
    return (
      <section id="location" className={styles.section}>
        <h2 className="visually-hidden">Location</h2>
        <div className={styles.stack}>
          <div className={`${styles.stackItem} ${styles.stackIntro}`}>
            {intro}
          </div>
          {LOCATION_POINTS.map((point, index) => (
            <div key={point.id} className={styles.stackItem}>
              <SectionHeader text="Location" aria-hidden />
              {slides[index]}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="location" className={styles.section}>
      <h2 className="visually-hidden">Location</h2>

      <div
        ref={trackRef}
        className={styles.track}
        style={{ height: `${steps * 100}svh` }}
      >
        <div className={styles.sticky}>
          {/* Two layers cross-fade: the label reads as settling from the
              centre of the intro into the top-left corner. */}
          <div
            className={`${styles.introLayer} ${onIntro ? styles.on : ""}`}
            aria-hidden={!onIntro}
          >
            {intro}
          </div>

          <div
            className={`${styles.pointsLayer} ${onIntro ? "" : styles.on}`}
            aria-hidden={onIntro}
          >
            {/* Out of flow, so the slides centre against the whole frame
                rather than the space left under the label. */}
            <div className={styles.label}>
              <SectionHeader text="Location" aria-hidden />
            </div>
            <div className={styles.slides}>{slides}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
