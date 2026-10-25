import { permanentRedirect } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostRedirect({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  permanentRedirect(`/insights/${slug}`);
}
