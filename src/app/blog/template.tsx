import type { ReactNode } from "react";
import type {} from "react/canary";
import { ViewTransition } from "react";

/** Retained for the legacy route while it redirects to Insights. */
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
