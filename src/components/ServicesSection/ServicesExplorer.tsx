"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { SERVICES } from "@/lib/services";
import styles from "./ServicesSection.module.css";

/**
 * The services accordion and its supporting column.
 *
 * Layout differs by breakpoint, which is why the intro is passed in rather
 * than rendered by the parent — on desktop it belongs in the same column as
 * the list, above it.
 *
 * - Desktop: intro, list and active description in a 360px left column; the
 *   image and button sit in the 665px right column.
 * - Mobile: intro, image, list, button in that order, per the mobile frame.
 *
 * The desktop description sits inside the active button so hover remains
 * stable as the row expands. The mobile accordion panel remains the announced
 * copy; the desktop mirror is hidden from assistive technology.
 */
export default function ServicesExplorer({ intro }: { intro: ReactNode }) {
  const [openId, setOpenId] = useState(SERVICES[0].id);
  const [hoveredId, setHoveredId] = useState("");
  const [hoverReveals, setHoverReveals] = useState(false);

  /* Hover-to-reveal is desktop only. Width alone would give it to a hover-less
     touchscreen laptop, and pointer alone would give it to a hover-capable
     tablet — so both are required. */
  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 1280px) and (hover: hover) and (pointer: fine)",
    );
    const sync = () => setHoverReveals(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Desktop: hovering reveals and a click confirms the same row.
  // Tablet and mobile: a tap toggles the row open and shut.
  const handleClick = (id: string) => {
    if (hoverReveals) setHoveredId(id);
    else setOpenId((current) => (current === id ? "" : id));
  };

  const activeId = hoverReveals ? hoveredId : openId;

  return (
    <div className={styles.body}>
      <div className={styles.column}>
        {intro}

        <ul
          className={styles.list}
          onMouseLeave={() => hoverReveals && setHoveredId("")}
          onBlur={(event) => {
            if (
              hoverReveals &&
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setHoveredId("");
            }
          }}
        >
          {SERVICES.map((service) => {
            const isOpen = service.id === activeId;
            const panelId = `service-panel-${service.id}`;

            return (
              <li key={service.id} className={styles.row}>
                <button
                  type="button"
                  className={`${styles.rowButton} ${isOpen ? styles.rowOpen : ""}`}
                  onClick={() => handleClick(service.id)}
                  onMouseEnter={() =>
                    hoverReveals && setHoveredId(service.id)
                  }
                  onFocus={() => hoverReveals && setHoveredId(service.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={styles.rowIndex}>{service.index}</span>
                  <span className={styles.rowCopy}>
                    <span className={styles.rowTitle}>{service.title}</span>
                    {isOpen ? (
                      <span className={styles.desktopDescription} aria-hidden>
                        {service.description}
                      </span>
                    ) : null}
                  </span>
                  {/* Rotation comes from the button's aria-expanded, so the
                      arrow can never disagree with the panel's real state. */}
                  <span className={styles.chevron} aria-hidden />
                </button>

                <div
                  id={panelId}
                  aria-hidden={!isOpen}
                  className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.panelText}>{service.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.feature}>
        <div className={styles.figure}>
          <Image
            src="/images/Webp images/services-feature-v2 - Copy.webp"
            alt="A Criterion Homes development under construction"
            fill
            sizes="(min-width: 1280px) 665px, 100vw"
            className={styles.image}
          />
        </div>

        <Button
          text="Ask About Our Services"
          href="/contact"
          variant="small"
          className={styles.cta}
        />
      </div>
    </div>
  );
}
