"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./FloorPlan.module.css";

export type Floor = {
  id: string;
  label: string;
  plan: string;
  /** Intrinsic pixel size of the drawing — see the note on FLOORS. */
  width: number;
  height: number;
  /**
   * The caption under the drawing. Not always just the label — Midtown's
   * frame reads "First Floor" alone, Urban Nest's reads "First Floor (Single
   * Unit)" — so this is spelled out per floor rather than derived.
   */
  caption: string;
};

type Props = {
  floors: Floor[];
  projectName: string;
};

/**
 * Tabbed floor plans. Figma 9342:5108 — heading, "FLOOR" label and the tabs
 * hold a 380-wide left column; the plan sits on a grey panel to the right
 * with its caption beneath.
 */
export default function FloorPlan({ floors, projectName }: Props) {
  const [active, setActive] = useState(floors[0].id);
  const current = floors.find((floor) => floor.id === active) ?? floors[0];

  return (
    <div className={styles.wrap}>
      <div className={styles.aside}>
        <h2 id="floors-heading" className={styles.heading}>
          Floor Plan
        </h2>

        <div className={styles.control}>
          <p className={styles.label} id="floor-label">
            Floor
          </p>
          <div className={styles.tabs} role="tablist" aria-labelledby="floor-label">
            {floors.map((floor) => (
              <button
                key={floor.id}
                type="button"
                role="tab"
                id={`floor-tab-${floor.id}`}
                aria-selected={floor.id === active}
                aria-controls={`floor-panel-${floor.id}`}
                className={`${styles.tab} ${
                  floor.id === active ? styles.tabOn : ""
                }`}
                onClick={() => setActive(floor.id)}
              >
                {floor.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        role="tabpanel"
        id={`floor-panel-${current.id}`}
        aria-labelledby={`floor-tab-${current.id}`}
        className={styles.panel}
      >
        <div className={styles.figure}>
          <Image
            src={current.plan}
            alt={`${current.label} plan for ${projectName}`}
            width={current.width}
            height={current.height}
            sizes="(min-width: 1024px) 714px, calc(100vw - 40px)"
            className={styles.image}
          />
        </div>

        <div className={styles.caption}>
          <p className={styles.captionTitle}>{current.caption}</p>
          {/* Placeholder copy in the frame — no real caption supplied yet. */}
          <p className={styles.captionSub}>more information or details</p>
        </div>
      </div>
    </div>
  );
}
