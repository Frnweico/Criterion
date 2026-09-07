import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import HomeIntro from "@/components/HomeIntro/HomeIntro";
import InteriorHeader from "@/components/Header/InteriorHeader";
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
const GA4_MEASUREMENT_ID = "G-F3KGQ2HGJJ";

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
        <Script id="ga4-config" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag("js",new Date());gtag("config","${GA4_MEASUREMENT_ID}");`}
        </Script>
        <Script
          id="ga4-library"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","743970928697244");fbq("track","PageView");`}
        </Script>
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
            if (!reducedMotion) {
              document.documentElement.dataset.motionPrepared = "true";
            }
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
            if (isReload) {
              // A marketing-page refresh should begin at the top, not where a
              // previous visit happened to end. Keep browser restoration manual:
              // automatic mode restores the last scroll position on refresh.
              window.history.scrollRestoration = "manual";
              window.scrollTo(0, 0);
            }
          } catch {
            document.documentElement.dataset.homeIntro = "skip";
          }`}
        </Script>
        <MotionController />
        <HomeIntro>
          <InteriorHeader />
          {children}
        </HomeIntro>
      </body>
    </html>
  );
}
