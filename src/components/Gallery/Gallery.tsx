"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Gallery.module.css";

export type GalleryShot = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type Props = {
  photos: GalleryShot[];
  note: string;
  desktopPhotos?: GalleryShot[];
};

export default function Gallery({ photos, note, desktopPhotos }: Props) {
  const [order, setOrder] = useState(() => photos.map((_, index) => index));
  const [active, setActive] = useState(0);
  const [pending, setPending] = useState<number | null>(null);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(
    () => new Set([0]),
  );
  const galleryRef = useRef<HTMLElement>(null);
  const requestedSlides = useRef(new Set<number>());
  const lead = order[0];
  const carouselPhotos = desktopPhotos ?? photos;
  const activeShot = carouselPhotos[active];
  const usesDesktopCarousel = Boolean(desktopPhotos);

  const markSlideLoaded = useCallback((index: number) => {
    setLoadedSlides((currentSlides) => {
      if (currentSlides.has(index)) return currentSlides;
      return new Set(currentSlides).add(index);
    });
  }, []);

  const preloadSlide = useCallback((index: number) => {
    if (requestedSlides.current.has(index)) return;
    requestedSlides.current.add(index);

    const image = new window.Image();
    image.onload = () => markSlideLoaded(index);
    image.onerror = () => requestedSlides.current.delete(index);
    image.src = carouselPhotos[index].src;
  }, [carouselPhotos, markSlideLoaded]);

  useEffect(() => {
    if (!usesDesktopCarousel || !window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }

    const gallery = galleryRef.current;
    if (!gallery) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        carouselPhotos.forEach((_, index) => preloadSlide(index));
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(gallery);
    return () => observer.disconnect();
  }, [carouselPhotos, preloadSlide, usesDesktopCarousel]);

  useEffect(() => {
    if (pending === null || !loadedSlides.has(pending)) return;
    setActive(pending);
    setPending(null);
  }, [loadedSlides, pending]);

  const select = (position: number) =>
    setOrder((current) => {
      const next = [...current];
      [next[0], next[position]] = [next[position], next[0]];
      return next;
    });

  const changeSlide = (direction: 1 | -1) => {
    const current = pending ?? active;
    const next =
      (current + direction + carouselPhotos.length) % carouselPhotos.length;

    if (loadedSlides.has(next)) {
      setActive(next);
      setPending(null);
      return;
    }

    setPending(next);
    preloadSlide(next);
  };

  return (
    <section
      className={`${styles.gallery} ${
        usesDesktopCarousel ? styles.desktopCarousel : ""
      }`}
      aria-labelledby="gallery-heading"
      data-parallax-preserve
      ref={galleryRef}
    >
      <h2 id="gallery-heading" className={styles.heading}>
        Gallery
      </h2>

      <div className={styles.mobileList}>
        {photos.map((shot) => (
          <div key={shot.src} className={styles.mobileItem}>
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
              className={styles.mobileImage}
            />
          </div>
        ))}
      </div>

      {usesDesktopCarousel ? (
        <div className={styles.carousel} aria-label="Gallery" aria-busy={pending !== null}>
          <div className={styles.carouselFrame}>
            <Image
              src={activeShot.src}
              alt={activeShot.alt}
              fill
              sizes="(min-width: 1024px) 92vw, 100vw"
              className={styles.carouselImage}
              unoptimized
              onLoad={() => markSlideLoaded(active)}
            />
          </div>

          <div className={styles.carouselControls}>
            <button
              type="button"
              className={styles.carouselControl}
              onClick={() => changeSlide(-1)}
            >
              <svg className={styles.carouselArrow} viewBox="0 0 24 24" aria-hidden>
                <path d="M20 12H4M11 5l-7 7 7 7" />
              </svg>
              <span className="visually-hidden">Previous image</span>
            </button>
            <button
              type="button"
              className={styles.carouselControl}
              onClick={() => changeSlide(1)}
            >
              <svg className={styles.carouselArrow} viewBox="0 0 24 24" aria-hidden>
                <path d="M4 12h16M13 5l7 7-7 7" />
              </svg>
              <span className="visually-hidden">Next image</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.main}>
            {photos.map((shot, index) => (
              <Image
                key={shot.src}
                src={shot.src}
                alt={index === lead ? shot.alt : ""}
                fill
                sizes="(min-width: 1024px) 79vw, 100vw"
                aria-hidden={index !== lead}
                className={`${styles.image} ${
                  index === lead ? styles.imageOn : ""
                }`}
              />
            ))}
          </div>

          <ul className={styles.side}>
            {order.slice(1).map((imageIndex, position) => {
              const shot = photos[imageIndex];
              return (
                <li key={shot.src} className={styles.sideItem}>
                  <button
                    type="button"
                    className={styles.thumb}
                    onClick={() => select(position + 1)}
                  >
                    <span className="visually-hidden">Show {shot.alt}</span>
                    <Image
                      src={shot.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 23vw, 25vw"
                      className={styles.image}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <p className={styles.note}>{note}</p>

    </section>
  );
}
