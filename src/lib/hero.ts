import { PROJECTS } from "./projects";

/** How long each slide holds before advancing. Also drives the bar fill. */
export const SLIDE_DURATION_MS = 4000;

export type HeroSlide = {
  id: string;
  title: string;
  body: string;
  /** Pipe-separated facts shown under the title. Slide 1 has none. */
  meta?: string[];
  ctaText: string;
  ctaHref: string;
  /** Outlined second CTA. Desktop only — the mobile frames show one button. */
  secondaryCtaText?: string;
  /** Destination still to be decided; see TODO.md. Until it is set the button
      renders but does not navigate. */
  secondaryCtaHref?: string;
  image: string;
  /** Optional portrait crop for the first slide on phones. */
  mobileImage?: string;
  imageAlt: string;
};

/** Same on all three slides. */
const SECONDARY_CTA = "Get Buyer Checklist";

/**
 * Jumps to the checklist capture band further down the homepage. The Figma
 * frames label this button "Join the Benchmarkers", but the client confirmed
 * it should drive the checklist instead — a deliberate divergence.
 */
const SECONDARY_CTA_HREF = "/#buyer-checklist";

const [midtown, urbanNest] = PROJECTS;

/**
 * The hero uses shorter location and unit wording than the Projects page, so
 * those strings live here. Price and completion are read from `projects.ts`
 * so they can never disagree with the rest of the site.
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "brand",
    title: "Homes, Built With A Clear Standard",
    body: "We guide buyers to well-considered homes, with no compromise on detail or long-term value. Because home is not just where your heart is, it is also where your money is.",
    ctaText: "Explore Developments",
    ctaHref: "/projects",
    secondaryCtaText: SECONDARY_CTA,
    secondaryCtaHref: SECONDARY_CTA_HREF,
    image: "/images/hero-abuja-interior-desktop-v1.webp",
    mobileImage: "/images/hero-abuja-interior-mobile-v1.webp",
    imageAlt: "A refined contemporary living room opening onto an Abuja courtyard",
  },
  {
    id: midtown.slug,
    title: midtown.name,
    body: "A limited collection of 4-bedroom terrace duplexes designed for light, structure, and long-term value.",
    meta: [
      "Gwarinpa, Abuja",
      "4 Units of 4-Bedroom Terrace Duplexes",
      midtown.priceLabel,
      midtown.completion,
    ],
    ctaText: "View details",
    ctaHref: `/projects/${midtown.slug}`,
    secondaryCtaText: SECONDARY_CTA,
    secondaryCtaHref: SECONDARY_CTA_HREF,
    image: "/images/Webp images/hero-slide-2-v2 - Copy.webp",
    imageAlt: midtown.imageAlt,
  },
  {
    id: urbanNest.slug,
    title: urbanNest.name,
    body: "A considered approach to modern terrace living, built for location, structure, and return.",
    meta: [
      "Wuse Zone 7, Abuja",
      "4-Bedroom Terrace Duplex",
      urbanNest.priceLabel,
      urbanNest.completion,
    ],
    ctaText: "View details",
    ctaHref: `/projects/${urbanNest.slug}`,
    secondaryCtaText: SECONDARY_CTA,
    secondaryCtaHref: SECONDARY_CTA_HREF,
    image: "/images/Webp images/hero-slide-3-v2 - Copy.webp",
    imageAlt: urbanNest.imageAlt,
  },
];
