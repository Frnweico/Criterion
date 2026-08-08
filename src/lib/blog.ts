export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date — formatted for display at render time. */
  date: string;
  image: string;
  imageAlt: string;
};

/**
 * Newest first.
 *
 * Temporary. Posts will move to Markdown files under `content/blog/` with
 * frontmatter, per the agreed approach; this list keeps the same shape so the
 * homepage section won't need changing when that happens.
 *
 * Note the frames order these differently on mobile and desktop. A single
 * newest-first order is used at both sizes — reading order shouldn't depend on
 * screen width.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-architecture-of-restraint",
    title: "The Architecture of Restraint",
    excerpt:
      "An exploration of why we choose what to leave out to ensure every project holds value over time.",
    date: "2026-05-11",
    image: "/images/blog-card-1.png",
    imageAlt: "A Criterion Homes development at dusk",
  },
  {
    slug: "the-abuja-report-gwarinpa-and-wuse",
    title: "The Abuja Report: Gwarinpa & Wuse",
    excerpt:
      "Practical insights into identifying property opportunities that make financial sense in Nigeria's capital.",
    date: "2026-04-20",
    image: "/images/blog-card-2.png",
    imageAlt: "Aerial view of Abuja",
  },
  {
    slug: "beyond-the-finish-line",
    title: "Beyond the Finish Line",
    excerpt:
      "A deep dive into the systems and foundations that support lasting quality and structural integrity.",
    date: "2026-03-15",
    image: "/images/blog-card-3.png",
    imageAlt: "Detail of a completed Criterion Homes residence",
  },
];

/** "MARCH 15, 2026" — the uppercase form the cards use. */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`)
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/(\d+) (\w+) (\d+)/, "$2 $1, $3");
}
