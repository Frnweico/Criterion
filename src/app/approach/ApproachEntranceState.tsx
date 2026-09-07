"use client";

import { useContext, useEffect } from "react";
import { HomeEntranceCompleteContext } from "@/components/HomeIntro/HomeIntro";

/**
 * The Approach hero has a separate text reveal, timed to begin only after
 * the shared page-intro canvas has settled into place.
 */
export default function ApproachEntranceState() {
  const entranceComplete = useContext(HomeEntranceCompleteContext);

  useEffect(() => {
    if (!entranceComplete) return;

    document.documentElement.dataset.approachEntrance = "complete";
    return () => {
      delete document.documentElement.dataset.approachEntrance;
    };
  }, [entranceComplete]);

  return null;
}
