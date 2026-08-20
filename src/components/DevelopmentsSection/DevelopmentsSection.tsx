import ProjectCard from "@/components/ProjectCard/ProjectCard";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { PROJECTS } from "@/lib/projects";
import styles from "./DevelopmentsSection.module.css";

/**
 * "Current Developments" / "A Focused Portfolio".
 *
 * The desktop frame lays this out with absolute offsets inside a fixed 1050px
 * band — a Figma export artefact. Rebuilt as a grid so it reflows instead of
 * breaking at any width other than 1440.
 */
export default function DevelopmentsSection() {
  return (
    <section className={styles.section} aria-labelledby="developments-heading">
      <div className={styles.inner}>
        <SectionHeader
          text="Current Developments"
          href="/projects"
          className={styles.header}
        />

        <div className={styles.intro}>
          <h2 id="developments-heading" className={styles.heading}>
            A Focused Portfolio
          </h2>

          <div className={styles.blurb}>
            <p className={styles.description}>
              We are currently developing a small number of homes, each
              approached with the same level of care, clarity, and attention to
              detail.
            </p>
            <p className={styles.emphasis}>
              Nothing rushed. Nothing excessive.
            </p>
          </div>
        </div>

        <div className={styles.cards} data-motion-stagger>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
