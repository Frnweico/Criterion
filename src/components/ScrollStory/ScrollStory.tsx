"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ScrollPoint } from "@/lib/midtown";
import styles from "./ScrollStory.module.css";

type Props = {
  id: string;
  heading?: string;
  intro?: string;
  points: ScrollPoint[];
  /**
   * Whether the pinned scroll behaviour also runs on mobile. Pinning is what
   * makes a touch scroll advance the story, so any section that should
   * respond to a swipe needs this.
   */
  pinOnMobile?: boolean;
};

export default function ScrollStory({
  id,
  heading,
  intro,
  points,
  pinOnMobile = false,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  /* Pinning is opt-in per breakpoint, and off entirely for anyone who has
     asked for reduced motion — they get the plain stack. */
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
     scroll doesn't queue up layout reads. Touch scrolling drives this the
     same way a wheel does, which is what makes the swipe work. */
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

  /* Everything already passed parks above, everything still to come parks
     below. Direction of travel then falls out of the index on its own —
     forward, the outgoing item leaves upward and the incoming one rises into
     place; backward, both reverse without tracking scroll direction. */
  const state = (index: number) =>
    index === active ? styles.on : index < active ? styles.prev : styles.next;

  const head = (heading || intro) && (
    <div className={styles.head}>
      {heading && (
        <h2 id={headingId} className={styles.heading}>
          {heading}
        </h2>
      )}
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );

  /* Unpinned: every point in normal flow. This is also what search engines
     and anyone on reduced motion sees. */
  if (!pinned) {
    return (
      <section id={id} className={styles.section} aria-labelledby={headingId}>
        {head}
        <div className={styles.stack}>
          {points.map((point, index) => (
            <article key={point.id} className={styles.stackItem}>
              <div className={styles.titleRow}>
                <span className={styles.counterBox}>
                  <span className={styles.counter}>
                    {index + 1}/{points.length}
                  </span>
                </span>
                <h3 className={styles.title}>{point.title}</h3>
              </div>
              <p className={styles.body}>{point.body}</p>
              {point.image && (
                <div className={styles.stackFigure}>
                  <Image
                    src={point.image}
                    alt={point.imageAlt ?? ""}
                    fill
                    sizes="100vw"
                    className={styles.image}
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  const anyFigure = points.some((point) => point.image);
  const activeHasFigure = Boolean(points[active]?.image);

  return (
    <section id={id} className={styles.section} aria-labelledby={headingId}>
      {/* One viewport of scroll per point. The heading band lives inside the
          sticky child, so it stays put for the whole section rather than
          scrolling away once the first step pins. */}
      <div
        ref={trackRef}
        className={styles.track}
        style={{ height: `${points.length * 100}svh` }}
      >
        <div className={styles.sticky}>
          {head}
          <div
            className={`${styles.band} ${
              activeHasFigure ? "" : styles.bandSolo
            }`}
          >
            <div className={styles.copyCol}>
              {/* Only the current segment is solid; the rest sit at 20%. */}
              <ol className={styles.rail} aria-hidden>
                {points.map((point, index) => (
                  <li
                    key={point.id}
                    className={`${styles.railItem} ${
                      index === active ? styles.railOn : ""
                    }`}
                  />
                ))}
              </ol>

              <div className={styles.copy}>
                <div className={styles.titleRow}>
                  {/* Only the step number moves; the total stays put. Both
                      clipped, so it travels inside its own rules. */}
                  <div className={styles.counterBox}>
                    <span className={styles.counterStack}>
                      {points.map((point, index) => (
                        <span
                          key={point.id}
                          className={`${styles.counterNum} ${styles.slide} ${state(index)}`}
                          aria-hidden={index !== active}
                        >
                          {index + 1}
                        </span>
                      ))}
                    </span>
                    <span className={styles.counterTotal}>
                      /{points.length}
                    </span>
                  </div>

                  <div className={styles.titles}>
                    {points.map((point, index) => (
                      <h3
                        key={point.id}
                        className={`${styles.title} ${styles.slide} ${state(index)}`}
                        aria-hidden={index !== active}
                      >
                        {point.title}
                      </h3>
                    ))}
                  </div>
                </div>

                <div className={styles.bodies}>
                  {points.map((point, index) => (
                    <p
                      key={point.id}
                      className={`${styles.body} ${styles.slide} ${state(index)}`}
                      aria-hidden={index !== active}
                    >
                      {point.body}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {anyFigure && (
              <div className={styles.figure}>
                {points.map((point, index) =>
                  point.image ? (
                    <Image
                      key={point.id}
                      src={point.image}
                      alt={index === active ? (point.imageAlt ?? "") : ""}
                      fill
                      sizes="(min-width: 1024px) 673px, 100vw"
                      className={`${styles.image} ${styles.imageSlide} ${state(index)}`}
                      aria-hidden={index !== active}
                    />
                  ) : null,
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
