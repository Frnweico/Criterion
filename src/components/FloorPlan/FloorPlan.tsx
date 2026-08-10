"use client";

import { useState } from "react";
import Image from "next/image";
import { FLOORS } from "@/lib/midtown";
import styles from "./FloorPlan.module.css";

/** Tabbed floor plans. Plan drawings aren't exported yet — see TODO.md. */
export default function FloorPlan() {
  const [active, setActive] = useState(FLOORS[0].id);
  const current = FLOORS.find((floor) => floor.id === active) ?? FLOORS[0];

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label="Floor plans">
        {FLOORS.map((floor) => (
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

      <div
        role="tabpanel"
        id={`floor-panel-${current.id}`}
        aria-labelledby={`floor-tab-${current.id}`}
        className={styles.panel}
      >
        <div className={styles.figure}>
          <Image
            src={current.plan}
            alt={`${current.label} plan for The Midtown Terraces`}
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className={styles.image}
          />
        </div>
        <p className={styles.caption}>{current.label} (Single Unit)</p>
      </div>
    </div>
  );
}
