"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [pending, setPending] = useState<string | null>(null);
  const [loadedFloors, setLoadedFloors] = useState<Set<string>>(
    () => new Set([floors[0].id]),
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const requestedFloors = useRef(new Set<string>());
  const current = floors.find((floor) => floor.id === active) ?? floors[0];
  const visuallySelected = pending ?? active;

  const markFloorLoaded = useCallback((floorId: string) => {
    setLoadedFloors((currentFloors) => {
      if (currentFloors.has(floorId)) return currentFloors;
      return new Set(currentFloors).add(floorId);
    });
  }, []);

  const preloadFloor = useCallback((floor: Floor) => {
    if (requestedFloors.current.has(floor.id)) return;
    requestedFloors.current.add(floor.id);

    const image = new window.Image();
    image.onload = () => markFloorLoaded(floor.id);
    image.onerror = () => requestedFloors.current.delete(floor.id);
    image.src = floor.plan;
  }, [markFloorLoaded]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const preloadPlans = () => floors.forEach(preloadFloor);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        preloadPlans();
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, [floors, preloadFloor]);

  useEffect(() => {
    if (!pending || !loadedFloors.has(pending)) return;
    setActive(pending);
    setPending(null);
  }, [loadedFloors, pending]);

  const selectFloor = (floor: Floor) => {
    if (floor.id === active) return;
    if (loadedFloors.has(floor.id)) {
      setActive(floor.id);
      setPending(null);
      return;
    }

    setPending(floor.id);
    preloadFloor(floor);
  };

  return (
    <div ref={wrapRef} className={styles.wrap}>
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
                  floor.id === visuallySelected ? styles.tabOn : ""
                }`}
                onClick={() => selectFloor(floor)}
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
        aria-busy={pending !== null}
      >
        <div className={styles.figure}>
          <Image
            src={current.plan}
            alt={`${current.label} plan for ${projectName}`}
            width={current.width}
            height={current.height}
            sizes="(min-width: 1024px) 714px, calc(100vw - 40px)"
            className={styles.image}
            data-motion-preserve
            unoptimized
            onLoad={() => markFloorLoaded(current.id)}
          />
        </div>

        <div className={styles.caption}>
          <p className={styles.captionTitle}>{current.caption}</p>
        </div>
      </div>
    </div>
  );
}
