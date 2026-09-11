import Link from "next/link";
import Image from "next/image";
import { getProject } from "@/lib/projects";
import styles from "./NextProperty.module.css";
import menuStyles from "../Menu/Menu.module.css";

export default function NextProperty({ name, href }: { name: string; href: string }) {
  const project = getProject(href.split("/").pop() ?? "");
  if (!project) return null;

  return (
    <nav className={styles.section} aria-label="Explore another property">
      <Link className={`${menuStyles.latest} ${styles.mobileCard}`} href={href} aria-label={`Explore ${name}`}>
        <div className={menuStyles.latestText}>
          <p className={menuStyles.latestLabel}>Also by Criterion Homes</p>
          <div className={menuStyles.latestMeta}>
            <p className={menuStyles.latestLocation}>{project.location}</p>
            <p className={menuStyles.latestName}>{name}</p>
          </div>
        </div>
        <div className={`${menuStyles.latestFigure} ${styles.mobileFigure}`}>
          <Image src={project.image} alt={project.imageAlt} fill sizes="142px" className={menuStyles.latestImage} />
        </div>
      </Link>
      <div className={styles.desktopContent}>
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
      </div>
    </nav>
  );
}
