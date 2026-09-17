import type { Metadata } from "next";
import type { Project } from "@/lib/projects";

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

export function projectListingJsonLd(path: string, project: Project) {
  const [neighbourhood, city = "Abuja"] = project.location
    .split(",")
    .map((part) => part.trim());
  const url = `${SEO_ORIGIN}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${url}#listing`,
    name: project.name,
    url,
    image: `${SEO_ORIGIN}${project.image}`,
    provider: {
      "@type": "Organization",
      "@id": `${SEO_ORIGIN}/#organization`,
      name: "Criterion Homes",
      url: SEO_ORIGIN,
    },
    mainEntity: {
      "@type": "Residence",
      "@id": `${url}#residence`,
      name: project.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: "Federal Capital Territory",
        addressCountry: "NG",
      },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Neighbourhood", value: neighbourhood },
        { "@type": "PropertyValue", name: "Property type", value: project.type },
      ],
    },
  };
}
