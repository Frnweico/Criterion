"use client";

import { useState } from "react";
import Image from "next/image";
import { REASONS } from "@/lib/midtown";
import styles from "./ReasonsList.module.css";

/**
 * "Why buy into The Midtown Terraces?"
 *
 * Desktop reveals each reason's copy and image on hover, per the design.
 * Mobile has no hover, so every reason is shown expanded — hiding content
 * behind an interaction that can't happen would make it unreachable.
 *
 * Focus counts as well as hover, so the same content is reachable by keyboard.
 */
export default function ReasonsList() {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        {REASONS.map((reason, index) => (
          <li key={reason.id} className={styles.item}>
            <button
              type="button"
              className={`${styles.row} ${index === active ? styles.rowOn : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-expanded={index === active}
            >
              <span className={styles.title}>{reason.title}</span>
            </button>

            {/* Always in the DOM; desktop hides the inactive ones with CSS. */}
            <div className={styles.detail}>
              <p className={styles.body}>{reason.body}</p>
              <div className={styles.figureInline}>
                <Image
                  src={reason.image}
                  alt={reason.imageAlt}
                  fill
                  sizes="100vw"
                  className={styles.image}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop only — the panel that swaps as you move down the list. */}
      <div className={styles.panel} aria-hidden>
        <p className={styles.panelBody}>{REASONS[active].body}</p>
        <div className={styles.panelFigure}>
          {REASONS.map((reason, index) => (
            <Image
              key={reason.id}
              src={reason.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 306px, 0px"
              className={`${styles.image} ${
                index === active ? styles.imageOn : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
