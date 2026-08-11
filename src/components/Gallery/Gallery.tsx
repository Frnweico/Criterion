"use client";

import { useState } from "react";
import Image from "next/image";
import { GALLERY, GALLERY_NOTE } from "@/lib/midtown";
import styles from "./Gallery.module.css";

export default function Gallery() {
  /* order[0] is the lead picture and the rest are the thumbnails. Choosing a
     thumbnail swaps it with the lead rather than filtering the list, so the
     four thumbnail positions stay put instead of reshuffling under the
     pointer. */
  const [order, setOrder] = useState(() => GALLERY.map((_, index) => index));
  const lead = order[0];

  const select = (position: number) =>
    setOrder((current) => {
      const next = [...current];
      [next[0], next[position]] = [next[position], next[0]];
      return next;
    });

  return (
    <section className={styles.gallery} aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className={styles.heading}>
        Gallery
      </h2>

      <div className={styles.grid}>
        {/* All five stay mounted and cross-fade, so choosing one doesn't
            blink while the next decodes. */}
        <div className={styles.main}>
          {GALLERY.map((shot, index) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={index === lead ? shot.alt : ""}
              fill
              sizes="(min-width: 1024px) 79vw, 100vw"
              priority={index === 0}
              aria-hidden={index !== lead}
              className={`${styles.image} ${
                index === lead ? styles.imageOn : ""
              }`}
            />
          ))}
        </div>

        <ul className={styles.side}>
          {order.slice(1).map((imageIndex, position) => {
            const shot = GALLERY[imageIndex];
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

      <p className={styles.note}>{GALLERY_NOTE}</p>
    </section>
  );
}
