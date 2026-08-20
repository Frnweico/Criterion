import type { ReactNode } from "react";
import type {} from "react/canary";
import { ViewTransition } from "react";

/** Covers Blog archive-to-article and article-to-article navigation. */
export default function BlogTemplate({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter="criterion-page-fade"
      exit="criterion-page-fade"
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
