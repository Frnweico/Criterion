import ProjectCard from "@/components/ProjectCard/ProjectCard";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { PROJECTS } from "@/lib/projects";
import styles from "./DevelopmentsSection.module.css";

/** "Current Developments" — the current portfolio. */
export default function DevelopmentsSection() {
  return (
    <section className={styles.section} aria-labelledby="developments-heading">
      <div className={styles.inner}>
        <SectionHeader
          text="Current Developments"
          href="/projects"
          className={styles.header}
        />

        <h2 id="developments-heading" className={styles.heading}>
          Projects
        </h2>

        <div className={styles.cards} data-motion-stagger>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
