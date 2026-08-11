/**
 * Content for The Urban Nest project page.
 *
 * Sourced from the desktop frame (10163:5017) throughout. The mobile frame
 * (10169:5553) is largely an unedited copy of Midtown Terraces's mobile
 * frame — Design Philosophy, the Location intro quote, the first Location
 * point and two more Location points still read literal "Midtown Terraces" /
 * "Gwarinpa" copy there. Desktop is the only coherent, project-specific
 * source, so every string below comes from it. Flagged to the client;
 * see HANDOVER.md.
 *
 * Photography supplied 11 Aug 2026 as WEBP. Two gaps remain, both because
 * the supplied set has no file for them:
 *   - the five "Why buy into…" panels have no picture (see REASONS)
 *   - the address/video section reuses the hero artwork, as Midtown's does
 */

import type { Floor } from "@/components/FloorPlan/FloorPlan";
import type { GalleryShot } from "@/components/Gallery/Gallery";
import type {
  LocationQuote,
  ProximityEntry,
} from "@/components/LocationStory/LocationStory";
import type { Payment } from "@/components/PaymentPlan/PaymentPlan";
import type { Reason } from "@/components/ReasonsList/ReasonsList";
import type { ScrollPoint } from "@/components/ScrollStory/ScrollStory";

export const URBAN_NEST_TAGLINE =
  "Four highly individualized terraces anchored by a central atrium, prioritizing natural aeration and deliberate, light-filled living spaces.";

export type SpecRow = { label: string; value: string };

/**
 * Six rows, not seven — the frame has no "Area Size" row for this project
 * (confirmed on both mobile and desktop, so it's deliberate, not stale).
 */
export const SPECIFICATION: SpecRow[] = [
  { label: "Property Type", value: "Terrace Duplexes" },
  { label: "Available Units", value: "4/4" },
  { label: "Bedrooms", value: "4" },
  { label: "Floors", value: "3" },
  { label: "Location", value: "Wuse, Zone 7, Abuja." },
  { label: "Handover", value: "Q4 2027" },
];

export const ADDRESS_HEADING =
  "The Urban Nest stands in the very heart of the city. Here, privacy meets connection.";

export const ADDRESS_BODY =
  "As one of Abuja’s most stable and connected residential zones, Zone 7 places essential daily life right outside your door. It offers professionals and families a secure, low-density base while keeping the wider city seamlessly within reach.";

export const PHILOSOPHY_INTRO =
  "At The Urban Nest, architecture is guided by clarity of purpose. Each unit is designed for balance, comfort and a rare living experience.";

/** Five points, revealed one at a time as the section is scrolled. */
export const PHILOSOPHY: ScrollPoint[] = [
  {
    id: "enduring-architecture",
    title: "Enduring Architecture",
    body: "Every decision is guided by precision and every detail is handled with care to create a home that holds its own well beyond the façade.",
    image: "/images/urban-nest-philosophy-1.webp",
    imageAlt: "The Urban Nest — architectural detailing",
  },
  {
    id: "functional-layouts",
    title: "Functional Layouts",
    body: "Designed to flow seamlessly into daily life, with light and air moving freely and every area serving a clear purpose of living well.",
    image: "/images/urban-nest-philosophy-2.webp",
    imageAlt: "The Urban Nest — an interior living space",
  },
  {
    id: "modern-character",
    title: "Modern Character",
    body: "A rejection of ornamentation in favor of functionality. Through simplicity of form and clarity of design, each detail caters to the modern homeowner and is crafted to endure through time.",
    image: "/images/urban-nest-philosophy-3.webp",
    imageAlt: "The Urban Nest — exterior character",
  },
  {
    id: "bathed-in-air-and-light",
    title: "Bathed in Air and Light",
    body: "Generous openings and spaces shaped to glow with the rhythm of the day.",
    image: "/images/urban-nest-philosophy-4.webp",
    imageAlt: "The Urban Nest — light-filled interior",
  },
  {
    id: "private-green-patches",
    title: "Private Green Patches",
    body: "Landscaped outdoor patches give each home breathing room, privacy, and a relaxing everyday experience.",
    image: "/images/urban-nest-philosophy-5.webp",
    imageAlt: "The Urban Nest — landscaped outdoor space",
  },
];

export const GALLERY_NOTE =
  "Interior visualizations are illustrative only and not representations of the final delivered design.";

/**
 * Four photographs, not five: the supplied set's "Gallery (4)" is a
 * byte-identical duplicate of the Bathed-in-Light-and-Air philosophy image,
 * so it isn't a gallery shot at all. The layout adapts to the count.
 *
 * Urban Nest's own gallery frame is still on the pre-redesign layout
 * (full-width lead + a horizontally scrolling row) that Midtown's frame has
 * since moved past; this uses the current Midtown gallery pattern, since the
 * brief was a replica of the page as it stands today.
 */
export const GALLERY: GalleryShot[] = [
  {
    src: "/images/urban-nest-gallery-side.webp",
    alt: "The Urban Nest seen from the side at dusk",
  },
  {
    src: "/images/urban-nest-gallery-frontage.webp",
    alt: "The frontage of The Urban Nest at dusk",
  },
  {
    src: "/images/urban-nest-gallery-corner.webp",
    alt: "The corner elevation of The Urban Nest, framed by palms",
  },
  {
    src: "/images/urban-nest-gallery-balconies.webp",
    alt: "The stacked balcony bays of The Urban Nest",
  },
];

export const LOCATION_QUOTE: LocationQuote = {
  lead: "An address “rooted in Abuja’s city centre”,",
  body: "Wuse offers the rare advantage of living where the city is already established around you.",
};

/** Same scroll treatment as the philosophy section; runs on mobile too. */
export const LOCATION_POINTS: ScrollPoint[] = [
  {
    id: "wuse-zone-7-abuja",
    title: "Wuse, Zone 7, Abuja",
    body: "Wuse remains one of Abuja’s most established and sought-after districts; a central, well-connected neighbourhood defined by mature infrastructure, everyday convenience and enduring value.",
    image: "/images/urban-nest-location-1.webp",
    imageAlt: "Aerial view over Wuse, Zone 7, Abuja",
  },
  {
    id: "proximity",
    title: "Proximity to Key Areas",
    body: "Its location in the third phase of the country’s capital city ensures direct access to key zones.",
  },
  {
    id: "quietly-central",
    title: "Quietly Central",
    body: "Wuse Zone 7 offers you privacy while putting the city central right in the palm of your hands.",
    image: "/images/urban-nest-location-3.webp",
    imageAlt: "Aerial view of a major Abuja interchange near Wuse",
  },
  {
    id: "stability",
    title: "Stability",
    body: "With strong occupancy, steady appreciation, and a track record of stability, it continues to offer the assurance buyers and investors seek in a prime residential address.",
    image: "/images/urban-nest-location-4.webp",
    imageAlt: "A gated residential street in Wuse, Zone 7",
  },
  {
    id: "nearby-essentials",
    title: "Nearby Essentials",
    body: "Supported by reputable schools, medical facilities, retail, and hospitality, Wuse, Zone 7 delivers a complete living experience within a self-sufficient setting.",
  },
];

/** Drive times shown alongside "Proximity to Key Areas". */
export const PROXIMITY: ProximityEntry[] = [
  { minutes: "8", label: "minutes to drive to Wuse 2" },
  { minutes: "8", label: "minutes drive to Central Business District" },
  { minutes: "11", label: "minutes drive to Maitama" },
];

export const ESSENTIALS = [
  "Banks",
  "Hospitals",
  "Shopping Mall & Supermarkets",
  "Major Fast Food Restaurants",
  "Local Markets",
  "Bars & Lounges",
  "Filling Stations",
  "Fine dining Restaurants",
  "Pharmacies",
  "Educational Institutions",
];

export const MAP_CATEGORIES = [
  "All",
  "Stores & Restaurants",
  "Schools",
  "Transport",
  "Medical Institutions",
  "Leisure",
];

/**
 * "Why buy into…" — the wording in Figma is verbatim identical to Midtown's
 * for every reason visible in the frame, so it's reused as-is here too.
 *
 * No pictures: the supplied WEBP set contains nothing for these five panels,
 * so each opens to copy alone. Midtown's own why-buy photographs are of
 * Midtown and would misrepresent this project, so they are deliberately not
 * borrowed. Add `image`/`imageAlt` here once Urban Nest's are shot.
 */
export const REASONS: Reason[] = [
  {
    id: "un-aspirational-lifestyle",
    title: "Aspirational Lifestyle",
    body: "A vision of living for those with a cultivated taste, where every detail reflects discernment, and your space embodies the assured confidence of distinction.",
  },
  {
    id: "un-spacious-living",
    title: "Spacious Living",
    body: "Multi-floor layouts with generous lounges, balconies, and family areas.",
  },
  {
    id: "un-exclusivity",
    title: "Exclusivity and Privacy",
    body: "A rare property in a prestigious, low-density neighborhood.",
  },
  {
    id: "un-green-inspired",
    title: "Green-Inspired",
    body: "Each home is built around lushly landscaped compound spaces to enhance mental well-being, air quality, and aesthetics.",
  },
  {
    id: "un-quality-assurance",
    title: "Quality Assurance",
    body: "Crafted with enduring masonry and attentive workmanship, upheld by an uncompromising standard of care",
  },
];

/**
 * These drawings are near-square, unlike Midtown's landscape ones, so the
 * figure takes its aspect from each plan rather than a shared box.
 */
export const FLOORS: Floor[] = [
  {
    id: "ground",
    label: "Ground Floor",
    caption: "Ground Floor (Single Unit)",
    plan: "/images/urban-nest-floor-ground.webp",
    width: 835,
    height: 753,
  },
  {
    id: "first",
    label: "First Floor",
    caption: "First Floor (Single Unit)",
    plan: "/images/urban-nest-floor-first.webp",
    width: 835,
    height: 880,
  },
  {
    id: "second",
    label: "Second Floor",
    caption: "Second Floor (Single Unit)",
    plan: "/images/urban-nest-floor-second.webp",
    width: 835,
    height: 877,
  },
];

export const PAYMENT_INTRO =
  "A 20% performance-based payment plan gives you flexibility and certainty. Each phase of the payment plan requires 2-3 months to complete.";

/** No semi-finished tier — the frame has no equivalent to Midtown's box. */
export const PAYMENT: Payment = {
  unitPrice: "NGN 498,000,000",
  milestones: [
    { stage: "Foundation", instalment: "~ 20% — 1st Instalment ₦100M", duration: "2 Months", status: "In-progress" },
    { stage: "1st Floor Slab", instalment: "~ 20% — 2nd Instalment ₦100M", duration: "2 Months", status: "Upcoming" },
    { stage: "2nd Floor Slab", instalment: "~ 20% — 3rd Instalment ₦100M", duration: "2 Months", status: "Upcoming" },
    { stage: "Roofing and Plastering", instalment: "~ 20% — 4th Instalment ₦100M", duration: "3 Months", status: "Upcoming" },
    { stage: "Finishes and Painting", instalment: "~ 20% — 5th Instalment ₦98M", duration: "3 Months", status: "Upcoming" },
  ],
  terms: [
    "All payments are tied to documented milestone completion. Full records of concluded milestones are made available to every investor on entry.",
    "Investors entering after completed milestones are brought in at the project’s current position, with the instalments of prior phases incorporated into the entry commitment. Remaining instalments follow the standard schedule outlined above.",
  ],
};

export const VIEWING_INTRO =
  "Experience the property firsthand and get clear answers to your questions in real time.";
