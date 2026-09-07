/**
 * Single source of truth for site-wide navigation and contact details.
 * The header menu and the footer both read from here, so they cannot drift.
 */

export type NavItem = {
  label: string;
  href: string;
};

/**
 * Note: the Figma file labels this item "Properties". The site deliberately
 * says "Projects" — see the route at /projects.
 */
export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Our approach", href: "/approach" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Blog", href: "/blog" },
  { label: "Contact us", href: "/contact" },
];

export type SocialItem = {
  label: string;
  href: string;
};

/**
 * Note: the Figma footer lists only Facebook, X and LinkedIn. Instagram was
 * added afterwards, so the site carries one more than the design shows.
 */
export const SOCIALS: SocialItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/criterionhomesltd/" },
  {
    label: "Facebook",
    href: "https://web.facebook.com/people/Criterion-Homes-Ltd/61581628876999/",
  },
  { label: "X (Twitter)", href: "https://x.com/CriterionHomes_" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/criterion-homes-ltd",
  },
];

export const CONTACT = {
  email: "info@criterionhomesltd.com",
  phone: "+2348058573915",
  address: "Machima Plaza, Mambolo Junction, Wuse Zone 2, FCT Abuja",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Machima+Plaza+Mambolo+Junction+Wuse+Zone+2+Abuja",
} as const;

export const SITE = {
  name: "Criterion Homes",
  legalName: "Criterion Homes LTD",
  url: "https://criterionhomesltd.com",
} as const;
