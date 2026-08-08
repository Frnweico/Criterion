/**
 * Single source of truth for project data.
 *
 * The homepage and the Projects page originally carried conflicting prices and
 * completion dates in Figma. Those were resolved in favour of the figures
 * below — every page reads from here so they cannot diverge again.
 *
 * Note `priceLabel` is a full display string rather than a number. The two
 * projects are deliberately worded differently: Midtown Terraces is prefixed
 * "From", Urban Nest is not.
 */

export type Project = {
  slug: string;
  name: string;
  location: string;
  /** Unit description, e.g. "4-Bedroom Terrace Duplexes". */
  type: string;
  /** Rendered verbatim. Do not prepend "From" — it is already here if wanted. */
  priceLabel: string;
  completion: string;
  /** Build progress, shown on the homepage card only. */
  stage: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "midtown-terraces",
    name: "The Midtown Terraces",
    location: "Gwarinpa, Abuja, Nigeria",
    type: "4-Bedroom Terrace Duplexes",
    priceLabel: "From ₦275M",
    completion: "Q4 2026",
    stage: "Stage 4/5",
    description:
      "Set within Abuja's established Gwarinpa II Estate, The Midtown Terraces introduces Criterion Homes' signature architecture of restraint. Anchored by a foundational central atrium, these four highly individualized residences deliver continuous natural aeration and deliberate, light-filled living spaces over generic layouts.",
    image: "/images/project-midtown-terraces-hero.png",
    imageAlt: "The Midtown Terraces, Gwarinpa, Abuja",
  },
  {
    slug: "the-urban-nest",
    name: "The Urban Nest",
    location: "Wuse Zone 7, Abuja, Nigeria",
    type: "4-Bedroom Terrace Duplexes",
    priceLabel: "₦498M",
    completion: "Q4 2027",
    stage: "Stage 2/5",
    description:
      "Located in the highly connected district of Wuse Zone 7, The Urban Nest provides a secure, low-density residential base. The design prioritizes a deliberately quiet way of living without sacrificing citywide access.",
    image: "/images/project-urban-nest-hero.png",
    imageAlt: "The Urban Nest, Wuse Zone 7, Abuja",
  },
];

/** The project featured in the menu overlay's "Latest Project" card. */
export const LATEST_PROJECT = PROJECTS[0];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
