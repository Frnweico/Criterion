import { useEffect } from "react";

interface HeadManagerProps {
  title: string;
  description: string;
  canonical: string;
}

const HeadManager: React.FC<HeadManagerProps> = ({ title, description, canonical }) => {
  useEffect(() => {
    // Update <title>
    document.title = title;

    // Update <meta name="description">
    let descTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descTag) {
      descTag.content = description;
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Update <link rel="canonical">
    let canonicalTag = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (canonicalTag) {
      canonicalTag.href = canonical;
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = canonical;
      document.head.appendChild(link);
    }
  }, [title, description, canonical]);

  return null;
};

export default HeadManager;
