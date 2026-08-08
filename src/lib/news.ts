export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  logo: string;
  /** null until the real article URL is supplied — see TODO.md. */
  href: string | null;
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
];
