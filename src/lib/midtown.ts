/**
 * Content for the Midtown Terraces project page.
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

export const MIDTOWN_TAGLINE =
  "Four highly individualized terraces anchored by a central atrium, prioritizing natural aeration and deliberate, light-filled living spaces.";

export type SpecRow = { label: string; value: string };

export const SPECIFICATION: SpecRow[] = [
  { label: "Property Type", value: "Terrace Duplexes" },
  { label: "Available Units", value: "2/4" },
  { label: "Bedrooms", value: "4" },
  { label: "Floors", value: "3" },
  { label: "Area Size", value: "Approx. 1014 m²" },
  {
    label: "Location",
    value: "Plot 237, along 69 21A road Gwarimpa II Estate, Abuja",
  },
  { label: "Handover", value: "Q4 2026" },
];

export const ADDRESS_HEADING =
  "An address for people who want the city within reach, not at their doorstep.";

export const ADDRESS_BODY =
  "For the buyer this home is made for, location is not only about being central. It is about being able to move through the city easily, return to a calmer base, and live in an area where all essentials of daily life are already part of the neighbourhood.";

export const PHILOSOPHY_INTRO =
  "At The Midtown Terraces, we’ve gone beyond structure and we’ve made the homeowner’s experience the center of our decision making.";

/** Five points, revealed one at a time as the section is scrolled. */
export const PHILOSOPHY: ScrollPoint[] = [
  {
    id: "enduring-architecture",
    title: "Enduring Architecture",
    body: "Clean lines, balanced proportions, and a restrained design give the home a quiet presence that stays relevant as trends change.",
    image: "/images/midtown-gallery-frontage.webp",
    imageAlt: "The Midtown Terraces property frontage",
  },
  {
    id: "structural-assurance",
    title: "Structural Assurance",
    body: "Construction supervised by seasoned experts with attention to strength, finish, and long-term performance.",
    image: "/images/midtown-philosophy-2.webp",
    imageAlt:
      "A Criterion Homes engineer reviewing drawings on site at The Midtown Terraces",
  },
  {
    id: "functional-layouts",
    title: "Functional Layouts",
    body: "Open-plan living areas, ensuite bedrooms, storage, kitchen, and utility spaces are planned to make everyday movement easier.",
    image: "/images/midtown-philosophy-3.webp",
    imageAlt: "Open-plan living area",
  },
  {
    id: "bathed-in-light-and-air",
    title: "Bathed in Light and Air",
    body: "Expansive windows and a thoughtfully placed atrium fill the home with natural light and fresh air, creating a brighter, more uplifting and welcoming atmosphere.",
    image: "/images/midtown-philosophy-4.webp",
    imageAlt: "Lit recessed balconies on the terrace facade at dusk",
  },
  {
    id: "private-green-patches",
    title: "Private Green Patches",
    body: "Landscaped outdoor patches give each home breathing room, privacy, and a relaxing everyday experience.",
    image: "/images/midtown-philosophy-5.webp",
    imageAlt: "Landscaped hedging along the terrace frontage",
  },
];

export const GALLERY_NOTE =
  "Interior visualizations are illustrative only and not representations of the final delivered design.";

/**
 * Display order, not file order. The lead is the side elevation; the other
 * two exteriors follow, then the interiors.
 *
 * Filenames are descriptive rather than numbered: the supplied WEBP set was
 * numbered on a different order from the PNGs it replaced (their "Gallery 1"
 * was the frontage, not the kitchen), so numbers here would mean two
 * different things depending on where you looked.
 */
export const GALLERY: GalleryShot[] = [
  {
    src: "/images/midtown-gallery-side.webp",
    alt: "The Midtown Terraces seen from the side at dusk",
  },
  {
    src: "/images/midtown-gallery-frontage.webp",
    alt: "The frontage of The Midtown Terraces at dusk",
  },
  {
    src: "/images/midtown-gallery-corner.webp",
    alt: "The terraces from the side, showing the balcony bays",
  },
  {
    src: "/images/Gallery new/TMT front.webp",
    alt: "Front view of The Midtown Terraces during construction",
  },
  {
    src: "/images/Gallery new/TMT-Live-colour-graded.webp",
    alt: "Aerial view of The Midtown Terraces during construction",
  },
  {
    src: "/images/Gallery new/TMT-D-colour-graded.webp",
    alt: "The Midtown Terraces during construction, viewed from above",
  },
  {
    src: "/images/midtown-gallery-kitchen.webp",
    alt: "The kitchen, with a marble island and fitted cabinetry",
  },
  {
    src: "/images/midtown-gallery-bathroom.webp",
    alt: "A marble bathroom with a freestanding bath and walk-in shower",
  },
  {
    src: "/images/midtown-gallery-bedroom.webp",
    alt: "A bedroom with a slatted timber wall and desk",
  },
];

export const LOCATION_QUOTE: LocationQuote = {
  lead: "Often described as “it’s own city”",
  body: "Gwarinpa offers easy access while staying removed from Abuja’s rush.",
};

/** Same scroll treatment as the philosophy section; runs on mobile too. */
export const LOCATION_POINTS: ScrollPoint[] = [
  {
    id: "gwarinpa-abuja",
    title: "Gwarinpa, Abuja",
    body: "Gwarinpa remains one of Abuja’s most established and desirable residential districts; a mature, well-planned enclave that offers heritage, urban connectivity and lasting value.",
    image: "/images/midtown-location-1.webp",
    imageAlt: "Aerial view of Gwarinpa, Abuja",
  },
  {
    id: "proximity",
    title: "Proximity to Key Areas",
    body: "Its location in the third phase of the country’s capital city ensures direct access to key zones.",
  },
  {
    id: "wide-boulevards",
    title: "Wide boulevards",
    body: "Wide boulevards that support nature, fitness, and a consistent infrastructure that reflects a neighbourhood designed for longevity.",
    image: "/images/midtown-location-3.webp",
    imageAlt: "Tree-lined boulevard in Gwarinpa",
  },
  {
    id: "stability",
    title: "Stability",
    body: "With strong occupancy, steady appreciation, and a track record of stability, it continues to offer the assurance buyers and investors seek in a prime residential address.",
    image: "/images/midtown-location-4.webp",
    imageAlt: "Aerial view along Gwarinpa's dual carriageway at sunset",
  },
  {
    id: "nearby-essentials",
    title: "Nearby Essentials",
    body: "Supported by reputable schools, medical facilities, retail, and hospitality, Gwarinpa delivers a complete living experience within a self-sufficient setting.",
  },
];

/** Drive times shown alongside "Proximity to Key Areas". */
export const PROXIMITY: ProximityEntry[] = [
  { minutes: "10", label: "minutes to drive to key zones like Jabi" },
  { minutes: "10", label: "minutes drive to Life Camp" },
  { minutes: "15", label: "minutes drive to the city centre" },
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

/** "Why buy into…" — a toggle list; one reason open at a time. */
export const REASONS: Reason[] = [
  {
    id: "aspirational-lifestyle",
    title: "Aspirational Lifestyle",
    body: "A vision of living for those with a cultivated taste, where every detail reflects discernment, and your space embodies the assured confidence of distinction.",
  },
  {
    id: "spacious-living",
    title: "Spacious Living",
    body: "Multi-floor layouts with generous lounges, balconies, and family areas.",
  },
  {
    id: "perfect-for-families-and-professionals",
    title: "Perfect for Families and Professionals",
    body: "A considered home that supports family life, professional pace, and the privacy to return to both with ease.",
  },
  {
    id: "exclusivity",
    title: "Exclusivity and Privacy",
    body: "A rare property in a prestigious, low-density neighborhood.",
  },
  {
    id: "green-inspired",
    title: "Green-Inspired",
    body: "Each home is built around lushly landscaped compound spaces to enhance mental well-being, air quality, and aesthetics.",
  },
  {
    id: "quality-assurance",
    title: "Quality Assurance",
    body: "Crafted with enduring masonry and attentive workmanship, upheld by an uncompromising standard of care",
  },
];

/**
 * Intrinsic pixel sizes of the plan drawings. They differ in height, so the
 * figure takes its aspect from the drawing rather than a fixed box — a
 * letterboxed plan shrinks the annotation past the point of being readable.
 */
export const FLOORS: Floor[] = [
  {
    id: "ground",
    label: "Ground Floor",
    caption: "Ground Floor",
    plan: "/images/midtown-floor-ground.webp",
    width: 1429,
    height: 868,
  },
  {
    id: "first",
    label: "First Floor",
    caption: "First Floor",
    plan: "/images/midtown-floor-first.webp",
    width: 1429,
    height: 923,
  },
  {
    id: "second",
    label: "Second Floor",
    caption: "Second Floor",
    plan: "/images/midtown-floor-second.webp",
    width: 1429,
    height: 929,
  },
];

export const PAYMENT_INTRO = {
  lead: "Build As You Pay puts control back in your hands.",
  points: [
    "Pay as each stage is completed.",
    "See the quality being delivered as your property takes shape.",
    "Payments are tied to documented construction milestones.",
  ],
};

export const PAYMENT: Payment = {
  unitPrice: "NGN 350,000,000",
  semiFinished: "NGN 275,000,000",
  milestones: [
    { stage: "Foundation", instalment: "20% — 1st Instalment ₦70M", duration: "—", status: "Completed" },
    { stage: "1st Floor Slab", instalment: "20% — 2nd Instalment ₦70M", duration: "3 Months", status: "Completed" },
    { stage: "2nd Floor Slab", instalment: "20% — 3rd Instalment ₦70M", duration: "3 Months", status: "Completed" },
    { stage: "Roofing and Plastering", instalment: "20% — 4th Instalment ₦70M", duration: "3 Months", status: "In-progress" },
    { stage: "Finishes and Painting", instalment: "20% — 5th Instalment ₦70M", duration: "3 Months", status: "Upcoming" },
  ],
  terms: [
    "All payments are tied to documented milestone completion. Full records of concluded milestones are made available to every investor on entry.",
    "Investors entering after completed milestones are brought in at the project’s current position, with the instalments of prior phases incorporated into the entry commitment. Remaining instalments follow the standard schedule outlined above.",
  ],
};

export const VIEWING_INTRO =
  "Experience the property firsthand and get clear answers to your questions in real time.";
