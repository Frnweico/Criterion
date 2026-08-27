import { getImageProps } from "next/image";
import desktopImage from "../../../public/images/midtown-lifestyle-arrival-desktop-v1.png";
import mobileImage from "../../../public/images/midtown-lifestyle-arrival-mobile-v1.png";
import styles from "./LifestyleBridge.module.css";

const alt =
  "A Nigerian couple arriving home at The Midtown Terraces in Gwarinpa, Abuja";

/** A quiet visual transition from Criterion's story into its developments. */
export default function LifestyleBridge() {
  const common = { alt, sizes: "100vw", quality: 75 };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: desktopImage });
  const {
    props: { srcSet: mobile, alt: imageAlt, ...imageProps },
  } = getImageProps({ ...common, src: mobileImage });

  return (
    <section className={styles.section} aria-label="Life at Criterion Homes">
      <picture className={styles.picture}>
        <source media="(min-width: 768px)" srcSet={desktop} />
        <source media="(max-width: 767px)" srcSet={mobile} />
        <img {...imageProps} alt={imageAlt} />
      </picture>
    </section>
  );
}
