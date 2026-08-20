import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import HomeIntro from "@/components/HomeIntro/HomeIntro";
import MotionController from "@/components/MotionController/MotionController";
import "./globals.css";

// Manrope is the site's only family. Its variable axis covers every weight
// the design uses: Light 300 through Bold 700.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://criterionhomesltd.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Criterion Homes — Homes, Built With A Clear Standard",
    template: "%s | Criterion Homes",
  },
  description:
    "Criterion Homes approaches development with restraint. Every project is shaped by clear decisions — what to include, what to leave out, and what truly holds value over time.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: "Criterion Homes",
    title: "Criterion Homes — Homes, Built With A Clear Standard",
    description:
      "A small number of homes in Abuja, each approached with the same level of care, clarity, and attention to detail.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Criterion Homes — Homes, Built With A Clear Standard",
    description:
      "A small number of homes in Abuja, each approached with the same level of care, clarity, and attention to detail.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-NG"
      className={manrope.variable}
      suppressHydrationWarning
    >
      <body>
        <Script id="home-intro-navigation-type" strategy="beforeInteractive">
          {`try {
            const [navigation] = window.performance?.getEntriesByType("navigation") || [];
            const navigationType = navigation?.type ||
              (window.performance?.navigation?.type === 1 ? "reload" : "navigate");
            const isReload = navigationType === "reload";
            const isInitialHomeVisit =
              window.location.pathname === "/" &&
              !isReload &&
              navigationType !== "back_forward";
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const scrollKey = "criterion-scroll:" + window.location.pathname + window.location.search;
            const saveScrollPosition = () => {
              try {
                window.sessionStorage.setItem(scrollKey, String(Math.round(window.scrollY)));
              } catch {}
            };
            document.documentElement.dataset.inputModality = "pointer";
            window.addEventListener("keydown", () => {
              document.documentElement.dataset.inputModality = "keyboard";
            });
            window.addEventListener("pointerdown", () => {
              document.documentElement.dataset.inputModality = "pointer";
            }, { passive: true });
            document.documentElement.dataset.homeIntro =
              !reducedMotion && (isReload || isInitialHomeVisit)
              ? "initial"
              : "skip";
            window.addEventListener("pagehide", saveScrollPosition, { capture: true });
            if (isReload) {
              const savedScroll = Number(window.sessionStorage.getItem(scrollKey));
              if (Number.isFinite(savedScroll) && savedScroll > 0) {
                window.history.scrollRestoration = "manual";
                const restoreScrollPosition = () => {
                  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
                    window.scrollTo(0, savedScroll);
                  }));
                };
                if (document.readyState === "complete") restoreScrollPosition();
                else window.addEventListener("load", restoreScrollPosition, { once: true });
              }
            }
          } catch {
            document.documentElement.dataset.homeIntro = "skip";
          }`}
        </Script>
        <MotionController />
        <HomeIntro>{children}</HomeIntro>
      </body>
    </html>
  );
}
