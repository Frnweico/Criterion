import type {} from "react/canary";
import { ViewTransition } from "react";

/**
 * Templates remount on route changes, which gives React a departing and an
 * arriving page for its native View Transition integration to crossfade.
 */
export default function PageTemplate({ children }: LayoutProps<"/">) {
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
