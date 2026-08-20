"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  poster: string;
  alt: string;
  className?: string;
};

type Connection = {
  effectiveType?: string;
  saveData?: boolean;
};

/** Uses the poster rather than starting a non-essential video on constrained networks. */
export default function SmartAutoplayVideo({
  src,
  poster,
  alt,
  className,
}: Props) {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const constrained =
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    const frame = window.requestAnimationFrame(() => {
      setCanPlay(!reducedMotion && !constrained);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!canPlay) {
    return (
      <Image
        className={className}
        src={poster}
        alt={alt}
        fill
        sizes="100vw"
      />
    );
  }

  return (
    <video
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      onError={() => setCanPlay(false)}
    />
  );
}
