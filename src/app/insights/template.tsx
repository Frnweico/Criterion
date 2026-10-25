import type { ReactNode } from "react";
import type {} from "react/canary";
import { ViewTransition } from "react";

export default function InsightsTemplate({ children }: { children: ReactNode }) {
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
