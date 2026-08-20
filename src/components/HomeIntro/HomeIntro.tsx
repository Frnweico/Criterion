"use client";

import {
  createContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import styles from "./HomeIntro.module.css";

type IntroState = "playing" | "entering" | "complete";

const INTRO_FAILSAFE_MS = 7000;
const ENTER_DURATION_MS = 3000;
const INTRO_ENTRANCE_START_SECONDS = 3;

/**
 * Descendants that need to synchronize with the entrance use this in-memory
 * state. The intro plays on every hard refresh and an initial direct visit to
 * Home. Client-side route changes begin complete.
 */
export const HomeEntranceCompleteContext = createContext(false);

export default function HomeIntro({ children }: { children: ReactNode }) {
  const [state, setState] = useState<IntroState>("playing");
  const timer = useRef<number | undefined>(undefined);
  // Capture this once for the document. The root marker is set before
  // hydration, so client-side route changes cannot replay the intro.
  const [shouldPlay] = useState(
    typeof document !== "undefined" &&
      document.documentElement.dataset.homeIntro === "initial",
  );

  const beginEntrance = () => {
    window.clearTimeout(timer.current);
    setState((current) => (current === "playing" ? "entering" : current));
  };

  const beginWhenVideoReachesEntranceTime = (
    event: SyntheticEvent<HTMLVideoElement>,
  ) => {
    if (event.currentTarget.currentTime >= INTRO_ENTRANCE_START_SECONDS) {
      beginEntrance();
    }
  };

  // Scroll restoration is handled before hydration by the root startup script.
  // Client-side route changes skip the intro and become complete next frame.
  useLayoutEffect(() => {
    if (!shouldPlay) {
      const frame = window.requestAnimationFrame(() => setState("complete"));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [shouldPlay]);

  useEffect(() => {
    if (!shouldPlay) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      const frame = window.requestAnimationFrame(() => setState("complete"));
      return () => window.cancelAnimationFrame(frame);
    }

    timer.current = window.setTimeout(beginEntrance, INTRO_FAILSAFE_MS);
    return () => window.clearTimeout(timer.current);
  }, [shouldPlay]);

  useEffect(() => {
    if (state !== "entering") return;
    const completeTimer = window.setTimeout(
      () => setState("complete"),
      ENTER_DURATION_MS,
    );
    return () => window.clearTimeout(completeTimer);
  }, [state]);

  return (
    <HomeEntranceCompleteContext.Provider value={state === "complete"}>
      <div className={styles.stage}>
        {state !== "complete" && (
          <div
            className={styles.intro}
            aria-hidden
          >
            <video
              className={styles.video}
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={beginWhenVideoReachesEntranceTime}
              onEnded={beginEntrance}
              onError={beginEntrance}
            >
              <source
                src="/images/Intro Mobile New.mp4"
                media="(max-width: 767px)"
                type="video/mp4"
              />
              <source src="/images/Intro Desktop new.mp4" type="video/mp4" />
            </video>
          </div>
        )}
        <div
          className={`${styles.site} ${
            state === "playing" ? styles.siteWaiting : ""
          }`}
        >
          {children}
        </div>
      </div>
    </HomeEntranceCompleteContext.Provider>
  );
}
