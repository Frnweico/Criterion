"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TEAM } from "@/lib/about";
import styles from "./TeamSection.module.css";

export default function TeamSection() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const selected = TEAM.find((member) => member.slug === selectedSlug);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedSlug(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <section className={styles.section} aria-labelledby="team-heading">
      <div className={styles.inner}>
        <h2 id="team-heading" className={styles.heading}>The Team</h2>

        <ul className={styles.list} data-motion-stagger>
          {TEAM.map((member) => (
            <li key={member.slug} className={styles.member}>
              <div className={styles.figure}>
                <Image src={member.image} alt={member.imageAlt} fill sizes="(min-width: 1024px) 320px, 100vw" className={styles.image} />
              </div>
              <p className={styles.name}>{member.name}</p>
              <p className={styles.role}>{member.role}</p>
              <button type="button" className={styles.more} onClick={() => setSelectedSlug(member.slug)}>
                Read more<span className="visually-hidden"> about {member.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selected && (
        <div className={styles.overlay} role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedSlug(null);
        }}>
          <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="team-profile-name">
            <button ref={closeRef} type="button" className={styles.close} onClick={() => setSelectedSlug(null)}>
              Close <span aria-hidden>×</span>
            </button>
            <div className={styles.dialogImage}>
              <Image src={selected.image} alt={selected.imageAlt} fill sizes="(min-width: 1024px) 360px, 100vw" className={styles.image} />
            </div>
            <div className={styles.dialogCopy}>
              <p className={styles.dialogRole}>{selected.role}</p>
              <h3 id="team-profile-name" className={styles.dialogName}>{selected.name}</h3>
              {selected.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
