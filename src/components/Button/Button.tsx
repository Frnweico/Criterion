import Link from "next/link";
import styles from "./Button.module.css";

/**
 * `outline` is platinum ink for dark sections; `outlineDark` is carbon ink for
 * light ones. They are separate rather than inherited because the button sets
 * its own colour and would otherwise be invisible on the wrong background.
 */
type ButtonVariant = "secondary" | "small" | "outline" | "outlineDark";

type CommonProps = {
  /** Button label. Rendered uppercase by CSS, so pass it in normal case. */
  text: string;
  /** "secondary" is the large default; "small" is the compact one. */
  variant?: ButtonVariant;
  /** The diamond icon. Only ever shown on the "secondary" variant. */
  icon?: boolean;
  className?: string;
};

type LinkProps = CommonProps & {
  /** Renders an <a>. Omit to render a <button> instead. */
  href: string;
  /**
   * For a static asset rather than a route — renders a plain <a download>, so
   * the file saves instead of the router trying to navigate to it.
   */
  download?: boolean;
  onClick?: never;
  type?: never;
};

type ActionProps = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({
  text,
  variant = "secondary",
  icon = true,
  className,
  ...rest
}: LinkProps | ActionProps) {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  // The icon belongs to the two large variants; "small" never carries it.
  const content = (
    <>
      {variant !== "small" && icon && (
        <span className={styles.icon} aria-hidden />
      )}
      {text}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, download } = rest as LinkProps;

    if (download) {
      return (
        <a href={href} download className={classes}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const { onClick, type = "button" } = rest as ActionProps;

  return (
    <button className={classes} onClick={onClick} type={type}>
      {content}
    </button>
  );
}
