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
  bio: string[];
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
    image: "/images/Webp images/team-hakeem-bakare - Copy.webp",
    imageAlt: "Hakeem Bakare, Managing Director and CEO",
    bio: [
      "For 15 years, Hakeem Bakare, the CEO and Managing Director of Criterion Homes, has cultivated a distinguished career in real estate, marked by consistent advancement and a demonstrably successful track record.",
      "Hakeem's professional journey commenced within Propertymart Real Estate's 2009 sales and marketing division. His exceptional talent fostered rapid progression through diverse roles, equipping him with an unparalleled understanding of the industry's intricacies.",
      "In 2017, Hakeem transitioned to Grenadines Homes as Regional Director of two northern subsidiaries. He successfully delivered Grenadines Resort, Katampe, Abuja and Micheville Estate, Lokogoma District, Abuja, leading sales and marketing, business development, strategic execution, construction management, and coordination of both subsidiaries.",
      "In 2022, Hakeem returned to Propertymart's Lagos headquarters to lead a pivotal turnaround project. He empowered middle management and spearheaded sales and marketing efforts, delivering four major projects totalling approximately 200 units within two years. He also played a key role in strategy, resource management, business development, project oversight, and strategic partnerships.",
      "Hakeem holds a Bachelor of Arts (Education) from the University of Lagos and has further bolstered his expertise through professional development opportunities and certificates from both Lagos and Harvard Business Schools.",
    ],
  },
  {
    slug: "letam-wiwa",
    name: "Letam Wiwa, MA, LLB, BL",
    role: "Director",
    image: "/images/Webp images/Letam Wiwa, MA, LLB, BL (2) - Copy.webp",
    imageAlt: "Letam Wiwa, Director",
    bio: [
      "With an illustrious career spanning nearly three decades in property law and real estate development, Letam Wiwa has continually raised the bar for industry standards and best practices.",
      "He has developed high-profile properties in Lagos, Port Harcourt, and Abuja, including the prestigious Katampe Heights Apartments (KHA) 1 and KHA 2, along with other luxury residences.",
      "As the Managing Partner at Bogana Chambers and based in Abuja, Letam Wiwa's profound legal expertise and development acumen ensure exceptional value and reliable outcomes for all stakeholders involved.",
    ],
  },
  {
    slug: "olayinka-arasi",
    name: "Olayinka Arasi",
    role: "Director",
    image: "/images/Webp images/WP-Akola - Copy.webp",
    imageAlt: "Olayinka Arasi, Director",
    bio: [
      "Olayinka Arasi is a distinguished legal expert with over 16 years of experience in providing high-level legal, compliance, and regulatory advisory services. His expertise encompasses dispute resolution, risk management, business and commercial law, corporate affairs, land transactions, contracts, and employment law.",
      "Yinka has notably represented the Minister of the Federal Capital Territory in intricate land disputes and offers comprehensive advisory services to clients in the real estate and construction sectors. He was instrumental in the legal team for Nigeria's first airport and road concessionaire under a Public-Private Partnership and led legal due diligence for over 60 health start-ups in the Investing in Innovation program, funded by the Bill and Melinda Gates Foundation.",
      "He has previously served as Deputy Head of Chambers at a prominent commercial law firm and as acting Head of Legal for a Free Trade Zone company. Yinka is a member of the Nigerian Bar Association, the Chartered Institute of Arbitrators (UK), and the International Compliance Association (UK).",
    ],
  },
];
