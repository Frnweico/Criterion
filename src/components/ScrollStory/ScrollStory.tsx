"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ScrollPoint } from "@/lib/midtown";
import styles from "./ScrollStory.module.css";

type Props = {
  id: string;
  /** Eyebrow above the section. */
  label: string;
  heading?: string;
  intro?: string;
  points: ScrollPoint[];
  /**
   * Whether the pinned scroll behaviour also runs on mobile. The design gives
   * it to Location only; Design Philosophy stacks normally on small screens.
   */
  pinOnMobile?: boolean;
};

export default function ScrollStory({
  id,
  label,
  heading,
  intro,
  points,
  pinOnMobile = false,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  /* Pinning is opt-in per breakpoint. Below 1024 only the Location section
     pins; everything else renders as a plain stack, which is also the
     fallback when a visitor has asked for reduced motion. */
  useEffect(() => {
    const decide = () => {
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      setPinned(!reduced && (wide || pinOnMobile));
    };
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, [pinOnMobile]);

  /* Active point comes from how far the track has travelled past the top of
     the viewport, divided into one band per point. Read in a rAF so a fast
     scroll doesn't queue up layout reads. */
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
      const next = Math.min(
        points.length - 1,
        Math.floor(progress * points.length),
      );
      setActive((current) => (current === next ? current : next));
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
  }, [pinned, points.length]);

  const headingId = `${id}-heading`;

  const intoduction = (
    <div className={styles.intro}>
      <p className={styles.label}>{label}</p>
      {heading && (
        <h2 id={headingId} className={styles.heading}>
          {heading}
        </h2>
      )}
      {intro && <p className={styles.introText}>{intro}</p>}
    </div>
  );

  /* Unpinned: every point in normal flow. This is also what search engines and
     screen readers see, since the pinned view renders the same markup. */
  if (!pinned) {
    return (
      <section className={styles.section} aria-labelledby={headingId}>
        <div className={styles.stack}>
          {intoduction}
          {points.map((point, index) => (
            <article key={point.id} className={styles.stackItem}>
              <p className={styles.counter}>
                {index + 1}/{points.length}
              </p>
              <div className={styles.stackFigure}>
                <Image
                  src={point.image}
                  alt={point.imageAlt}
                  fill
                  sizes="100vw"
                  className={styles.image}
                />
              </div>
              <h3 className={styles.pointTitle}>{point.title}</h3>
              <p className={styles.pointBody}>{point.body}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby={headingId}>
      {/* One viewport of scroll per point. */}
      <div
        ref={trackRef}
        className={styles.track}
        style={{ height: `${points.length * 100}svh` }}
      >
        <div className={styles.sticky}>
          <div className={styles.pinned}>
            <div className={styles.copyColumn}>
              {intoduction}

              {/* Progress rail — one segment per point, filled up to the
                  current one. */}
              <ol className={styles.rail} aria-hidden>
                {points.map((point, index) => (
                  <li
                    key={point.id}
                    className={`${styles.railItem} ${
                      index <= active ? styles.railItemOn : ""
                    }`}
                  />
                ))}
              </ol>

              <p className={styles.counter}>
                {active + 1}/{points.length}
              </p>

              <div className={styles.pointCopy}>
                <h3 className={styles.pointTitle}>{points[active].title}</h3>
                <p className={styles.pointBody}>{points[active].body}</p>
              </div>
            </div>

            <div className={styles.figure}>
              {points.map((point, index) => (
                <Image
                  key={point.id}
                  src={point.image}
                  alt={index === active ? point.imageAlt : ""}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={`${styles.image} ${
                    index === active ? styles.imageOn : ""
                  }`}
                  aria-hidden={index !== active}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
