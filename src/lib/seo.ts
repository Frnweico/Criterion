import type { Metadata } from "next";

export const SEO_ORIGIN = "https://www.criterionhomesltd.com";
export function pageMetadata(path: string, title: string, description: string, image = "/images/midtown-hero.webp"): Metadata {
  const url = `${SEO_ORIGIN}${path}`;
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, siteName: "Criterion Homes", title, description, images: [{ url: `${SEO_ORIGIN}${image}` }] },
    twitter: { card: "summary_large_image", title, description, images: [`${SEO_ORIGIN}${image}`] },
  };
}
