"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const LIGHT_HEADER_PATHS = [
  "/approach",
  "/blog",
  "/contact",
  "/news",
  "/projects",
];

/**
 * The root layout persists through page-template transitions, so interior
 * navigation lives here rather than inside each transitioning page. The home
 * header remains in its page to retain its dedicated entrance behaviour.
 */
export default function InteriorHeader() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/approach") return null;

  const usesLightTone = LIGHT_HEADER_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  return <Header tone={usesLightTone ? "light" : "dark"} />;
}
