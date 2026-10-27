import Link from "next/link";
import Image from "next/image";
import { getProject } from "@/lib/projects";
import styles from "./NextProperty.module.css";

export default function NextProperty({ name, href }: { name: string; href: string }) {
  const project = getProject(href.split("/").pop() ?? "");
  if (!project) return null;
  return (
    <nav className={styles.section} aria-label="Explore another property">
      <div className={styles.card}>
        <div className={styles.details}>
          <p className={styles.label}>Also by Criterion Homes</p>
          <div className={styles.meta}>
            <p className={styles.location}>{project.location}</p>
            <h2 className={styles.name}>{name}</h2>
          </div>
          <Link className={styles.link} href={href}>
            <span>Explore Project</span><span aria-hidden="true">→</span>
          </Link>
        </div>
        <Link className={styles.imageLink} href={href} aria-label={`Explore ${name}`}>
          <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1024px) 55vw, 40vw" className={styles.image} />
        </Link>
      </div>
    </nav>
  );
}
