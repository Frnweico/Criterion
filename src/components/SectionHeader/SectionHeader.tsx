import Link from "next/link";
import styles from "./SectionHeader.module.css";

type Props = {
  /** Label text. Rendered uppercase by CSS, so pass it in normal case. */
  text: string;
  /** Optional destination. With it the header becomes a link. */
  href?: string;
  /** Light text on a dark section. */
  inverted?: boolean;
  className?: string;
  /**
   * Set when a hidden heading already carries this text, so a screen reader
   * doesn't announce the same label twice.
   */
  "aria-hidden"?: boolean;
};

export default function SectionHeader({
  text,
  href,
  inverted,
  className,
  "aria-hidden": ariaHidden,
}: Props) {
  const classes = [
    styles.sectionHeader,
    inverted && styles.inverted,
    href && styles.link,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className={styles.marker} aria-hidden />
      <span className={styles.text}>{text}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <div className={classes} aria-hidden={ariaHidden}>
      {content}
    </div>
  );
}
