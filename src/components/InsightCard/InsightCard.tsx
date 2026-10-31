import Image from "next/image";
import Link from "next/link";
import { IMAGE_BLUR_PLACEHOLDER } from "@/lib/image-placeholder";
import { formatPostDate, type BlogGridItem } from "@/lib/blog";
import styles from "./InsightCard.module.css";

type Props = {
  post: BlogGridItem;
};

export default function InsightCard({ post }: Props) {
  const content = (
    <>
      <div className={styles.figure}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_PLACEHOLDER}
          className={styles.image}
        />
      </div>
      <div className={styles.copy}>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </div>
    </>
  );

  return post.slug ? (
    <Link href={`/insights/${post.slug}`} className={styles.link}>
      {content}
    </Link>
  ) : (
    <article className={styles.staticCard}>{content}</article>
  );
}

