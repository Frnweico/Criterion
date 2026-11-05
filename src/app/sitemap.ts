import type { MetadataRoute } from "next";
import { SEO_ORIGIN } from "@/lib/seo";
import { PROJECTS } from "@/lib/projects";
import { BLOG_POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about",
    "/contact",
    "/projects",
    "/news",
    "/approach",
    "/benchmarkers",
  ];

  const latestInsightDate = BLOG_POSTS.reduce(
    (latest, post) =>
      (post.modifiedDate ?? post.date) > latest
        ? (post.modifiedDate ?? post.date)
        : latest,
    BLOG_POSTS[0]?.modifiedDate ?? BLOG_POSTS[0]?.date ?? "2026-01-01",
  );

  return [
    ...staticPaths.map((path) => ({
      url: `${SEO_ORIGIN}${path}`,
    })),
    ...PROJECTS.map((project) => ({
      url: `${SEO_ORIGIN}/projects/${project.slug}`,
    })),
    {
      url: `${SEO_ORIGIN}/insights`,
      lastModified: new Date(latestInsightDate),
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${SEO_ORIGIN}/insights/${post.slug}`,
      lastModified: new Date(post.modifiedDate ?? post.date),
    })),
  ];
}
