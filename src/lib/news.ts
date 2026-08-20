export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  logo: string;
  href: string;
  date?: string;
};

export const NEWS: NewsItem[] = [
  {
    id: "the-nation",
    title: "Firm Promises Trust and Enduring Design in Property Sector",
    excerpt: "Criterion Homes marks its market entry with a mission to rebuild homebuyer confidence through meticulous due diligence and timeless finishes.",
    source: "The Nation Newspaper",
    logo: "/images/Webp images/The nation logo - Copy.webp",
    href: "https://thenationonlineng.net/firm-promises-trust-others-in-property-sector/",
    date: "October 23, 2025",
  },
  {
    id: "guardian",
    title: "How Nigerian Builders Can Compete Globally",
    excerpt: "Managing Director Hakeem Bakare speaks on breaking the cycle of rapidly aging luxury developments through deliberate project design and architectural restraint.",
    source: "The Guardian Nigeria",
    logo: "/images/Webp images/The guardian logo - Copy.webp",
    href: "https://guardian.ng/news/how-nigerian-builders-can-compete-globally/",
  },
  {
    id: "thisday",
    title: "Criterion Homes Targets Sustainability in Nigeria's Real Estate Sector",
    excerpt: "Criterion Homes is tackling poor building lifespans and rising urban emissions by shifting focus to sustainable luxury in key Nigerian cities.",
    source: "ThisDay Live",
    logo: "/images/Webp images/THISDAYLIVE Logo - Copy.webp",
    href: "https://www.thisdaylive.com/2025/10/29/criterion-homes-targets-sustainability-in-nigerias-real-estate-sector/",
  },
  {
    id: "punch",
    title: "Firm Advocates Sustainability Over Profit in Construction Projects",
    excerpt: "Criterion Homes calls for long-term environmental responsibility, quality and resilience in Nigerian construction.",
    source: "Punch Newspapers",
    logo: "/images/Webp images/Punch-Logo.webp",
    href: "https://punchng.com/firm-advocates-sustainability-over-profit-in-construction-projects/",
    date: "November 10, 2025",
  },
];

/** The homepage shows only three press stories. */
export const FEATURED_NEWS = NEWS.slice(0, 3);
