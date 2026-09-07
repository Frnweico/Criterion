"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import SmartAutoplayVideo from "@/components/SmartAutoplayVideo/SmartAutoplayVideo";
import styles from "./ProjectVideo.module.css";

type Props = {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  youtubeId: string;
  title: string;
  /** Keep the video at rest until the viewer explicitly starts the film. */
  ambient?: boolean;
};

type DialogState = "closed" | "open" | "closing";

/** A quiet ambient loop with an opt-in, full-film YouTube player. */
export default function ProjectVideo({
  src,
  poster,
  alt,
  className,
  youtubeId,
  title,
  ambient = true,
}: Props) {
  const [dialogState, setDialogState] = useState<DialogState>("closed");
  const closeRef = useRef<HTMLButtonElement>(null);
  const isDialogVisible = dialogState !== "closed";

  const closeDialog = useCallback(() => {
    if (dialogState !== "open") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDialogState("closed");
      return;
    }

    setDialogState("closing");
  }, [dialogState]);

  useEffect(() => {
    if (!isDialogVisible) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const currentPaddingRight = Number.parseFloat(
      window.getComputedStyle(document.body).paddingRight,
    );
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isDialogVisible]);

  useEffect(() => {
    if (dialogState !== "open") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDialog();
    };
    document.addEventListener("keydown", onKeyDown);
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(frame);
    };
  }, [closeDialog, dialogState]);

  return (
    <>
      {ambient ? (
        <SmartAutoplayVideo
          src={src}
          poster={poster}
          alt={alt}
          className={className}
        />
      ) : (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className={`${styles.poster} ${className ?? ""}`}
        />
      )}
      <button
        type="button"
        className={styles.playButton}
        aria-haspopup="dialog"
        aria-expanded={isDialogVisible}
        onClick={() => setDialogState("open")}
      >
        <span className="visually-hidden">Play {title}</span>
        <span className={styles.playIcon} aria-hidden />
      </button>

      {isDialogVisible &&
        createPortal(
          <div
            className={styles.dialog}
            data-closing={dialogState === "closing" || undefined}
            role="dialog"
            aria-modal="true"
            aria-label={`Play ${title}`}
            onAnimationEnd={(event) => {
              if (
                dialogState === "closing" &&
                event.currentTarget === event.target &&
                event.animationName.endsWith("dialogExit")
              ) {
                setDialogState("closed");
              }
            }}
            onClick={(event) => {
              if (event.currentTarget === event.target) closeDialog();
            }}
          >
            <button
              type="button"
              ref={closeRef}
              className={styles.closeButton}
              onClick={closeDialog}
            >
              <span className="visually-hidden">Close video</span>
              <span className={styles.closeIcon} aria-hidden />
            </button>
            <iframe
              className={styles.player}
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>,
          document.body,
        )}
    </>
  );
}
