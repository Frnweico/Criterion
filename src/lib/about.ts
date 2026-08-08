/** Content for the About page. */

export const ABOUT_INTRO =
  "We are a real estate development firm that seeks to reinvent the real estate business in Nigeria. We understand that home is where the heart lies, and our team of experts is dedicated to helping our clients create their dream property, brick by brick.";

export type Statement = {
  title: string;
  /** One or more paragraphs. */
  body: string[];
};

export const STATEMENTS: Statement[] = [
  {
    title: "Our Vision",
    body: [
      "To be the development company of choice by positioning real estate as a foundation for a sustainable and enriched living.",
    ],
  },
  {
    title: "Our Mission",
    body: [
      "To ensure the prosperity and satisfaction of all stakeholders through our commitment to excellence, innovation, professionalism, environmental stewardship and transparency.",
    ],
  },
  {
    title: "Our Commitment",
    body: [
      "We believe everyone deserves a place to call home. We are committed to providing exceptional service, in-depth market knowledge, and unwavering dedication to your home ownership and investment goals.",
      "We achieve this through professionalism, efficiency, attention to detail, and a relentless pursuit of your best interests, fostering a long-term partnership built on trust and expertise.",
    ],
  },
];

export const VALUES_INTRO =
  "We believe everyone deserves a place to call home. We are committed to providing exceptional service, in-depth market knowledge, and unwavering dedication to your home ownership and investment goals.";

export type CoreValue = {
  index: string;
  title: string;
  body: string;
};

export const CORE_VALUES: CoreValue[] = [
  {
    index: "01",
    title: "Trust",
    body: "Trust is the foundation of what we do at Criterion Homes. We believe in building long-term relationships based on transparency and honesty.",
  },
  {
    index: "02",
    title: "Empathy",
    body: "We understand you. We listen to your unique goals and support you every step of the way in building not just your home but your hopes and dreams.",
  },
  {
    index: "03",
    title: "Discipline",
    body: "Dedication to delivering exceptional real estate services to our clients is a reflection of our discipline in making well-informed decisions for the future.",
  },
  {
    index: "04",
    title: "Growth",
    body: "While we continuously expand our expertise to serve you in an ever-dynamic industry, we empower you with the knowledge required to grow and navigate the market.",
  },
  {
    index: "05",
    title: "Responsible",
    body: "We hold ourselves to the highest ethical standards, acting with integrity in every interaction.",
  },
  {
    index: "06",
    title: "Community",
    body: "At Criterion Homes, we believe in building together. We develop sustainable and vibrant communities where everyone thrives.",
  },
];

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
};

/**
 * The Figma layers are all named after the same Unsplash placeholder, but the
 * three exports are distinct images. Names and roles are taken from the frame's
 * captions.
 */
export const TEAM: TeamMember[] = [
  {
    slug: "hakeem-bakare",
    name: "Hakeem Bakare",
    role: "Managing Director/CEO",
    image: "/images/team-hakeem-bakare.png",
    imageAlt: "Hakeem Bakare, Managing Director and CEO",
  },
  {
    slug: "letam-wiwa",
    name: "Letam Wiwa, MA, LLB, BL",
    role: "Director",
    image: "/images/team-letam-wiwa.jpg",
    imageAlt: "Letam Wiwa, Director",
  },
  {
    slug: "babatope-akola",
    name: "Babatope Akola",
    role: "Director",
    image: "/images/team-babatope-akola.png",
    imageAlt: "Babatope Akola, Director",
  },
];
