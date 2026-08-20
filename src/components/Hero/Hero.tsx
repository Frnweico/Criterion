"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Button from "@/components/Button/Button";
import { HomeEntranceCompleteContext } from "@/components/HomeIntro/HomeIntro";
import { HERO_SLIDES, SLIDE_DURATION_MS } from "@/lib/hero";
import styles from "./Hero.module.css";

/* Embla owns the clock, the scroll position and the drag gestures as one
   system. Two earlier hand-rolled versions failed because the bar fill and
   the slide advance were separate timers that drifted apart the moment
   anything paused. Here the bars are a pure readout of the autoplay plugin's
   own countdown — `timeUntilNext()`, added in Embla 8.5.0 for exactly this —
   so they cannot disagree with the slide that is actually showing. */

export default function Hero() {
  const entranceComplete = useContext(HomeEntranceCompleteContext);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", duration: 30 },
    [
      Autoplay({
        delay: SLIDE_DURATION_MS,
        playOnInit: false,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  );

  const [selected, setSelected] = useState(0);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);

  const paint = useCallback((current: number, progress: number) => {
    fills.current.forEach((fill, position) => {
      if (!fill) return;
      // Passed bars hold full, upcoming sit empty, the current one fills.
      const scale =
        position < current ? 1 : position === current ? progress : 0;
      fill.style.transform = `scaleX(${scale})`;
    });
  }, []);

  // Track which slide is showing. `loop` means the wrap back to slide 1 is
  // Embla's job, and this simply follows it.
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Paint the bars from the autoplay countdown, every frame.
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.stop();
      paint(emblaApi.selectedScrollSnap(), 1);
      return;
    }

    if (entranceComplete) {
      autoplay.play();
    } else {
      autoplay.stop();
      paint(emblaApi.selectedScrollSnap(), 0);
    }

    let frame = 0;
    const tick = () => {
      const remaining = autoplay.timeUntilNext();
      const progress =
        remaining === null
          ? 0
          : Math.min(Math.max(1 - remaining / SLIDE_DURATION_MS, 0), 1);

      paint(emblaApi.selectedScrollSnap(), progress);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [emblaApi, entranceComplete, paint]);

  const goTo = useCallback(
    (position: number) => emblaApi?.scrollTo(position),
    [emblaApi],
  );

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Featured developments"
      data-motion-preserve
    >
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {HERO_SLIDES.map((slide, slideIndex) => (
            <div
              key={slide.id}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${HERO_SLIDES.length}`}
            >
              {/* Slide 1 anchors right; the other two stay centred. The
                  gradient and wash overlays were removed at the client's
                  request — the photography now carries the frame unaided. */}
              <div
                className={`${styles.media} ${
                  slideIndex === 0 ? styles.mediaRight : ""
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="100vw"
                  preload={slideIndex === 0}
                  draggable={false}
                />
              </div>

              {/* Slide 1 alone puts its paragraph in a right-hand column on
                  desktop; slides 2 and 3 keep theirs under the title. */}
              <div
                className={`${styles.content} ${
                  slideIndex === 0 ? styles.contentLead : ""
                }`}
              >
                <div className={styles.copy}>
                  {/* Only the first slide is the page's h1. The other two are
                      project names, not the page's subject — three h1s on one
                      page muddies both the document outline and SEO. */}
                  {slideIndex === 0 ? (
                    <h1 className={`type-h1 ${styles.title}`}>{slide.title}</h1>
                  ) : (
                    <h2 className={`type-h1 ${styles.title}`}>{slide.title}</h2>
                  )}
                  <p className={`type-body ${styles.body}`}>{slide.body}</p>

                  {slide.meta && (
                    <p className={`type-caption ${styles.meta}`}>
                      {slide.meta.map((fact, factIndex) => (
                        <span key={fact}>
                          {factIndex > 0 && (
                            <span className={styles.metaDivider} aria-hidden>
                              {" | "}
                            </span>
                          )}
                          {fact}
                        </span>
                      ))}
                    </p>
                  )}
                </div>

                <div className={styles.actions}>
                  <Button text={slide.ctaText} href={slide.ctaHref} />

                  {/* Desktop only. No destination decided yet, so it renders
                      without a link rather than pointing somewhere invented —
                      see TODO.md. */}
                  {slide.secondaryCtaText &&
                    (slide.secondaryCtaHref ? (
                      <Button
                        text={slide.secondaryCtaText}
                        href={slide.secondaryCtaHref}
                        variant="outline"
                        className={styles.secondaryCta}
                      />
                    ) : (
                      <Button
                        text={slide.secondaryCtaText}
                        variant="outline"
                        className={styles.secondaryCta}
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bars}>
        {HERO_SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            className={styles.bar}
            onClick={() => goTo(slideIndex)}
            aria-label={`Go to slide ${slideIndex + 1}: ${slide.title}`}
            aria-current={slideIndex === selected}
          >
            <span
              ref={(element) => {
                fills.current[slideIndex] = element;
              }}
              className={styles.barFill}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
