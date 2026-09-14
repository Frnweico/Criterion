import type { MetadataRoute } from "next";
import { SEO_ORIGIN } from "@/lib/seo";
import { PROJECTS } from "@/lib/projects";
import { BLOG_POSTS } from "@/lib/blog";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/contact", "/projects", "/blog", "/news", "/approach", "/benchmarkers",
    ...PROJECTS.map(p => `/projects/${p.slug}`), ...BLOG_POSTS.map(p => `/blog/${p.slug}`),
  ].map(path => ({ url: `${SEO_ORIGIN}${path}` }));
}
