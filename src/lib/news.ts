export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  /** null where the frame supplies no publisher mark. */
  logo: string | null;
  /** null until the real article URL is supplied — see TODO.md. */
  href: string | null;
  /** Shown on the News page. */
  date?: string;
};

export const NEWS: NewsItem[] = [
  {
    id: "the-nation",
    title: "Firm Promises Trust and Enduring Design in Property Sector",
    excerpt:
      "Criterion Homes LTD marks its market entry with a mission to rebuild homebuyer confidence through meticulous due diligence and timeless finishes.",
    source: "The Nation Newspaper",
    logo: "/images/news-1.png",
    href: null,
    date: "May 11, 2026",
  },
  {
    id: "guardian",
    title: "Quiet Conviction: How Nigerian Builders Can Compete Globally",
    excerpt:
      "Managing Director Hakeem Bakare speaks on breaking the cycle of rapidly aging luxury developments through deliberate project design and architectural restraint.",
    source: "The Guardian Nigeria",
    logo: "/images/news-2.png",
    href: null,
  },
  {
    id: "thisday",
    title: "Redefining Housing Standards via Long-Term Value Creation",
    excerpt:
      "A look into how Criterion Homes is tackling poor building lifespans and rising urban emissions by shifting focus to sustainable luxury in key Nigerian cities",
    source: "ThisDay Live",
    logo: "/images/news-3.png",
    href: null,
  },
  /* The three below appear on the News page only — the homepage carries the
     first three. No publisher marks were exported for these. */
  {
    id: "punch",
    title:
      "Firm Advocates Sustainability Over Profit in Construction Projects",
    excerpt:
      "CEO Hakeem Bakare outlines the critical need for long-term environmental responsibility and quality in Nigerian construction.",
    source: "Punch Newspapers",
    logo: null,
    href: null,
  },
  {
    id: "estate-intel-midtown",
    title: "Project Pipeline: The Midtown Terraces Data Index",
    excerpt:
      "Live structural metrics, location analytics, and construction timelines for Criterion's deluxe residential development in Gwarinpa.",
    source: "Estate Intel",
    logo: null,
    href: null,
  },
  {
    id: "estate-intel-urban-nest",
    title: "Conceptual Analysis: The Urban Nest Real Estate Portfolio",
    excerpt:
      "Tracking Criterion Homes' upcoming deluxe multi-unit residential footprint within the Wuse development corridor.",
    source: "Estate Intel",
    logo: null,
    href: null,
  },
];

/** The homepage shows only the first three. */
export const FEATURED_NEWS = NEWS.slice(0, 3);
