import Link from "next/link";
import Image from "next/image";
import { getProject } from "@/lib/projects";
import styles from "./NextProperty.module.css";

export default function NextProperty({ name, href }: { name: string; href: string }) {
  const project = getProject(href.split("/").pop() ?? "");
  if (!project) return null;

  return (
    <nav className={styles.section} aria-label="Explore another property">
      <Link className={styles.imageLink} href={href} aria-label={`Explore ${name}`}>
        <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1024px) calc(100vw - 80px), calc(100vw - 40px)" className={styles.image} />
      </Link>
      <div className={styles.details}>
        <div>
          <p className={styles.label}>Also by Criterion Homes</p>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.location}>{project.location}</p>
        </div>
      <Link className={styles.link} href={href}>
        <span>Explore {name}</span>
        <span aria-hidden="true">→</span>
      </Link>
      </div>
    </nav>
  );
}
