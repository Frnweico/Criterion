import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

type Props = {
  project: Project;
};

/**
 * A development card, used on the homepage's Current Developments section.
 *
 * Price, stage and completion all come from `projects.ts` rather than being
 * typed in here — the Figma frames still carry the superseded figures
 * (From 55Million / Q4 2027 and From 80Million / Q2 2028), and hardcoding them
 * is what let the homepage and Projects page disagree in the first place.
 */
export default function ProjectCard({ project }: Props) {
  const facts = [project.priceLabel, project.stage, project.completion];

  return (
    <Link href={`/projects/${project.slug}`} className={styles.card}>
      <div className={styles.figure}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 656px, 100vw"
          className={styles.image}
        />
        {/* Scrim carries the title over the photography. This one is part of
            the card design and is not the hero overlay that was removed. */}
        <div className={styles.caption}>
          <h3 className={styles.title}>{project.name}</h3>
        </div>
      </div>

      <p className={styles.location}>{project.location}</p>

      <p className={styles.facts}>
        {facts.map((fact, index) => (
          <span key={fact} className={styles.fact}>
            {index > 0 && <span className={styles.divider} aria-hidden />}
            {fact}
          </span>
        ))}
      </p>
    </Link>
  );
}
