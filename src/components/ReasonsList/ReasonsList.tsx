"use client";

import { useState } from "react";
import Image from "next/image";
import { REASONS } from "@/lib/midtown";
import styles from "./ReasonsList.module.css";

/**
 * "Why buy into…" — a toggle list. One reason is open at a time: its title
 * goes black while the rest sit grey, and its copy and picture appear in the
 * right-hand column on desktop, or beneath the title on mobile.
 *
 * Figma 9825:4760 — 80-tall rows, the open one 160, titles at x 460 and the
 * 306-wide panel at x 1032 whose picture overhangs the rows below it.
 */
export default function ReasonsList() {
  const [open, setOpen] = useState(0);

  return (
    <ul className={styles.list}>
      {REASONS.map((reason, index) => {
        const isOpen = index === open;

        return (
          <li
            key={reason.id}
            className={`${styles.row} ${isOpen ? styles.rowOpen : ""}`}
          >
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={isOpen}
              aria-controls={`reason-panel-${reason.id}`}
              id={`reason-toggle-${reason.id}`}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span className={styles.title}>{reason.title}</span>
              <span className={styles.chevron} aria-hidden />
            </button>

            <div
              id={`reason-panel-${reason.id}`}
              role="region"
              aria-labelledby={`reason-toggle-${reason.id}`}
              className={styles.panel}
              hidden={!isOpen}
            >
              <p className={styles.body}>{reason.body}</p>
              <div className={styles.figure}>
                <Image
                  src={reason.image}
                  alt={reason.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 306px, calc(100vw - 40px)"
                  className={styles.image}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
