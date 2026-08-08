import type { Metadata } from "next";
import { Manrope } from "next/font/google";
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
    <html lang="en-NG" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
