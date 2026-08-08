import Image from "next/image";
import { TEAM } from "@/lib/about";
import styles from "./TeamSection.module.css";

/**
 * "The Team" — three portraits with name, role and a Read more control.
 *
 * Read more opens a per-person overlay in the design. Only one overlay frame
 * exists so far, so these render as buttons without an action — logged in
 * TODO.md.
 */
export default function TeamSection() {
  return (
    <section className={styles.section} aria-labelledby="team-heading">
      <div className={styles.inner}>
        <h2 id="team-heading" className={styles.heading}>
          The Team
        </h2>

        <ul className={styles.list}>
          {TEAM.map((member) => (
            <li key={member.slug} className={styles.member}>
              <div className={styles.figure}>
                <Image
                  src={member.image}
                  alt={member.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className={styles.image}
                />
              </div>

              <p className={styles.name}>{member.name}</p>
              <p className={styles.role}>{member.role}</p>

              <button type="button" className={styles.more}>
                Read more
                <span className="visually-hidden"> about {member.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
