/**
 * Content for the Midtown Terraces project page.
 *
 * Only this project has a design so far; The Urban Nest falls back to the
 * summary in `projects.ts` until its frames arrive.
 */

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

export type ScrollPoint = {
  id: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

/** Five points, revealed one at a time as the section is scrolled. */
export const PHILOSOPHY: ScrollPoint[] = [
  {
    id: "enduring-architecture",
    title: "Enduring Architecture",
    body: "Clean lines, balanced proportions, and a restrained design give the home a quiet presence that stays relevant as trends change.",
    image: "/images/midtown-philosophy-1.png",
    imageAlt: "Floor plans for The Midtown Terraces",
  },
  {
    id: "structural-assurance",
    title: "Structural Assurance",
    body: "Construction supervised by seasoned experts with attention to strength, finish, and long-term performance.",
    image: "/images/midtown-philosophy-2.png",
    imageAlt: "Construction underway at The Midtown Terraces",
  },
  {
    id: "functional-layouts",
    title: "Functional Layouts",
    body: "Open-plan living areas, ensuite bedrooms, storage, kitchen, and utility spaces are planned to make everyday movement easier.",
    image: "/images/midtown-philosophy-3.png",
    imageAlt: "Open-plan living area",
  },
  {
    id: "bathed-in-light-and-air",
    title: "Bathed in Light and Air",
    body: "Expansive windows and a thoughtfully placed atrium fill the home with natural light and fresh air, creating a brighter, more uplifting and welcoming atmosphere.",
    image: "/images/midtown-philosophy-4.png",
    imageAlt: "Light-filled interior with expansive windows",
  },
  {
    id: "private-green-patches",
    title: "Private Green Patches",
    body: "Landscaped outdoor patches give each home breathing room, privacy, and a relaxing everyday experience.",
    image: "/images/midtown-philosophy-5.png",
    imageAlt: "Landscaped outdoor space",
  },
];

export const GALLERY_NOTE =
  "Interior visualizations are illustrative only and not representations of the final delivered design.";

export const LOCATION_QUOTE = {
  lead: "Often described as “it’s own city”",
  body: "Gwarinpa offers easy access while staying removed from Abuja’s rush.",
};

/** Same scroll treatment as the philosophy section; runs on mobile too. */
export const LOCATION_POINTS: ScrollPoint[] = [
  {
    id: "gwarinpa-abuja",
    title: "Gwarinpa, Abuja",
    body: "Gwarinpa remains one of Abuja’s most established and desirable residential districts; a mature, well-planned enclave that offers heritage, urban connectivity and lasting value.",
    image: "/images/midtown-location-1.png",
    imageAlt: "Aerial view of Gwarinpa, Abuja",
  },
  {
    id: "proximity",
    title: "Proximity to Key Areas",
    body: "Its location in the third phase of the country’s capital city ensures direct access to key zones.",
    image: "/images/midtown-location-2.png",
    imageAlt: "Road connections around Gwarinpa",
  },
  {
    id: "wide-boulevards",
    title: "Wide boulevards",
    body: "Wide boulevards that support nature, fitness, and a consistent infrastructure that reflects a neighbourhood designed for longevity.",
    image: "/images/midtown-location-3.png",
    imageAlt: "Tree-lined boulevard in Gwarinpa",
  },
  {
    id: "stability",
    title: "Stability",
    body: "With strong occupancy, steady appreciation, and a track record of stability, it continues to offer the assurance buyers and investors seek in a prime residential address.",
    image: "/images/midtown-location-4.png",
    imageAlt: "Established residential streets in Gwarinpa",
  },
  {
    id: "nearby-essentials",
    title: "Nearby Essentials",
    body: "Supported by reputable schools, medical facilities, retail, and hospitality, Gwarinpa delivers a complete living experience within a self-sufficient setting.",
    image: "/images/midtown-location-5.png",
    imageAlt: "Local amenities in Gwarinpa",
  },
];

/** Drive times shown alongside "Proximity to Key Areas". */
export const PROXIMITY = [
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

export type Reason = {
  id: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

/** "Why buy into…" — desktop reveals the body and image on hover. */
export const REASONS: Reason[] = [
  {
    id: "aspirational-lifestyle",
    title: "Aspirational Lifestyle",
    body: "A vision of living for those with a cultivated taste, where every detail reflects discernment, and your space embodies the assured confidence of distinction.",
    image: "/images/midtown-reason-1.png",
    imageAlt: "The Midtown Terraces at dusk",
  },
  {
    id: "spacious-living",
    title: "Spacious Living",
    body: "Multi-floor layouts with generous lounges, balconies, and family areas.",
    image: "/images/midtown-reason-2.png",
    imageAlt: "A generous lounge inside The Midtown Terraces",
  },
  {
    id: "exclusivity",
    title: "Exclusivity and Privacy",
    body: "A rare property in a prestigious, low-density neighborhood.",
    image: "/images/midtown-reason-3.png",
    imageAlt: "The low-density streets around the development",
  },
  {
    id: "green-inspired",
    title: "Green-Inspired",
    body: "Each home is built around lushly landscaped compound spaces to enhance mental well-being, air quality, and aesthetics.",
    image: "/images/midtown-reason-4.png",
    imageAlt: "Landscaped compound planting",
  },
  {
    id: "quality-assurance",
    title: "Quality Assurance",
    body: "Crafted with enduring masonry and attentive workmanship, upheld by an uncompromising standard of care",
    image: "/images/midtown-reason-5.png",
    imageAlt: "Masonry detail showing the standard of workmanship",
  },
];

export const FLOORS = [
  { id: "ground", label: "Ground Floor", plan: "/images/midtown-floor-ground.png" },
  { id: "first", label: "First Floor", plan: "/images/midtown-floor-first.png" },
  { id: "second", label: "Second Floor", plan: "/images/midtown-floor-second.png" },
];

export const PAYMENT_INTRO =
  "A 20% performance-based payment plan gives you flexibility and certainty. Each phase of the payment plan requires 3 months to complete.";

export const PAYMENT = {
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
