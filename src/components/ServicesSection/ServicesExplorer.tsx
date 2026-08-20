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
 * - Desktop: intro and list in a 360px left column; the description, image and
 *   button in a 665px right column that starts near the top of the section.
 * - Mobile: intro, image, list, button in that order, per the mobile frame.
 *
 * The description is rendered twice because it sits inline under its row on
 * mobile but in the right column on desktop; the hidden copy is `aria-hidden`
 * so it is never announced twice.
 */
export default function ServicesExplorer({ intro }: { intro: ReactNode }) {
  const [openId, setOpenId] = useState(SERVICES[0].id);
  const [hoverReveals, setHoverReveals] = useState(false);
  const active = SERVICES.find((service) => service.id === openId);

  /* Hover-to-reveal is desktop only. Width alone would give it to a hover-less
     touchscreen laptop, and pointer alone would give it to a hover-capable
     tablet — so both are required. */
  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 1200px) and (hover: hover) and (pointer: fine)",
    );
    const sync = () => setHoverReveals(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Desktop: hovering reveals and a click confirms the same row.
  // Tablet and mobile: a tap toggles the row open and shut.
  const handleClick = (id: string) => {
    if (hoverReveals) setOpenId(id);
    else setOpenId((current) => (current === id ? "" : id));
  };

  return (
    <div className={styles.body}>
      <div className={styles.column}>
        {intro}

        <ul className={styles.list}>
          {SERVICES.map((service) => {
            const isOpen = service.id === openId;
            const panelId = `service-panel-${service.id}`;

            return (
              <li key={service.id} className={styles.row}>
                <button
                  type="button"
                  className={`${styles.rowButton} ${isOpen ? styles.rowOpen : ""}`}
                  onClick={() => handleClick(service.id)}
                  onMouseEnter={() => hoverReveals && setOpenId(service.id)}
                  onFocus={() => hoverReveals && setOpenId(service.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={styles.rowIndex}>{service.index}</span>
                  <span className={styles.rowTitle}>{service.title}</span>
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
        <p className={styles.featureText} aria-hidden>
          {active?.description}
        </p>

        <div className={styles.figure}>
          <Image
            src="/images/Webp images/services-feature-v2 - Copy.webp"
            alt="A Criterion Homes development under construction"
            fill
            sizes="(min-width: 1200px) 665px, 100vw"
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
