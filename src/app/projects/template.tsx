import type { ReactNode } from "react";
import type {} from "react/canary";
import { ViewTransition } from "react";

/** Covers the Projects archive and its property-detail routes. */
export default function ProjectsTemplate({
  children,
}: {
  children: ReactNode;
}) {
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
