"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "main > section";

function prepareTextLines(
  element: HTMLElement,
  baseDelay = 0,
  preserveLayout = false,
) {
  const source =
    element.dataset.lineRevealSource ??
    (preserveLayout
      ? Array.from(element.childNodes)
          .map((node) => (node.nodeName === "BR" ? "\n" : node.textContent ?? ""))
          .join("")
          .trim()
      : element.innerText.trim());
  if (!source) return;
  const isCentered = getComputedStyle(element).textAlign === "center";

  element.dataset.lineRevealSource = source;
  element.dataset.lineReveal = "";
  if (preserveLayout) element.dataset.lineRevealLayout = "";
  element.setAttribute("aria-label", source);
  // Existing blocks that declare their own width or use explicit <br> tags
  // must retain those rules. Their rows are still measured after the font
  // loads, but the reveal never writes a replacement width onto the element.
  if (!preserveLayout) {
    element.style.setProperty(
      "--line-reveal-width",
      `${element.getBoundingClientRect().width}px`,
    );
  }
  const revealed = element.classList.contains("is-scroll-revealed");

  const sourceLines = source.split("\n");
  const words = sourceLines.flatMap((sourceLine, sourceLineIndex) => {
    const lineWords = sourceLine.trim().split(/\s+/).filter(Boolean);
    return lineWords.map((word, wordIndex) => {
      const item = document.createElement("span");
      item.className = "line-reveal-word";
      const isLastWord =
        sourceLineIndex === sourceLines.length - 1 &&
        wordIndex === lineWords.length - 1;
      // A normal hyphen is a browser line-break opportunity. The animated
      // word is measured as a single unit, so retain the visible hyphen while
      // using its non-breaking equivalent to keep compounds together.
      const displayWord = word.replaceAll("-", "\u2011");
      item.textContent = isLastWord ? displayWord : `${displayWord} `;
      if (sourceLineIndex > 0 && wordIndex === 0) {
        item.dataset.lineRevealForcedBreak = "";
      }
      item.setAttribute("aria-hidden", "true");
      return item;
    });
  });

  // Authored line breaks must exist while the words are measured. The row
  // grouping below knows where a forced break belongs, but without a real
  // `<br>` the browser can still split that authored line at a smaller width.
  const measuredNodes = words.flatMap((word) =>
    preserveLayout && word.dataset.lineRevealForcedBreak !== undefined
      ? [document.createElement("br"), word]
      : [word],
  );
  element.replaceChildren(...measuredNodes);

  const rows = words.reduce<HTMLSpanElement[][]>((lines, word) => {
    const current = lines.at(-1);
    if (
      !current ||
      word.dataset.lineRevealForcedBreak !== undefined ||
      Math.abs(current[0].offsetTop - word.offsetTop) > 1
    ) {
      lines.push([word]);
    } else {
      current.push(word);
    }
    return lines;
  }, []);

  const lines = rows.map((row, index) => {
    // The words have now been measured in their original inline layout. Normal
    // content uses the measured row width. Authored project copy instead keeps
    // its full text column as the clipping frame, so a short final line cannot
    // shrink or centre that column at another viewport size.
    const elementBounds = element.getBoundingClientRect();
    const rowBounds = row.map((word) => word.getBoundingClientRect());
    const rowLeft = Math.min(
      ...rowBounds.map((bounds) => bounds.left - elementBounds.left),
    );
    const rowRight = Math.max(
      ...rowBounds.map((bounds) => bounds.right - elementBounds.left),
    );
    const mask = document.createElement("span");
    mask.className = "line-reveal-mask";
    mask.style.width = preserveLayout ? "100%" : `${rowRight - rowLeft}px`;
    if (!preserveLayout && isCentered) {
      mask.style.marginInline = "auto";
    } else if (!preserveLayout && rowLeft > 0) {
      mask.style.marginLeft = `${rowLeft}px`;
    }
    mask.setAttribute("aria-hidden", "true");
    const line = document.createElement("span");
    line.className = "line-reveal-line";
    if (preserveLayout && !isCentered && index === 0 && rowLeft > 0) {
      line.style.paddingInlineStart = `${rowLeft}px`;
    }
    line.style.setProperty(
      "--line-reveal-delay",
      `${baseDelay + index * 85}ms`,
    );
    if (revealed) line.style.transform = "translateY(0)";
    line.append(...row);
    mask.append(line);
    return mask;
  });

  element.replaceChildren(...lines);
}

/**
 * Adds a single, light-weight reveal treatment to the page-level sections.
 * Existing carousel and sticky-story components own their own motion, so they
 * opt out with `data-motion-preserve` instead of competing with this observer.
 */
export default function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    ).filter(
      (section) =>
        section.id !== "philosophy" &&
        section.id !== "location" &&
        !section.hasAttribute("data-motion-preserve") &&
        !section.querySelector("[data-motion-preserve]"),
    );

    const revealTargets = sections.flatMap((section) =>
      Array.from(section.children).filter(
        (child): child is HTMLElement =>
          child instanceof HTMLElement &&
          child.tagName !== "H1" &&
          child.tagName !== "H2",
      ),
    );

    // Headings receive their own line masks. Measuring the rendered words after
    // fonts load means a 393px phone and a wide desktop each animate the lines
    // they actually show, rather than relying on fragile manual <br> tags.
    const headingTargets = Array.from(
      document.querySelectorAll<HTMLElement>("main h1, main h2"),
    ).filter(
      (heading) =>
        !heading.classList.contains("visually-hidden") &&
        !heading.closest("li") &&
        // Article body subheads are content, but the article title is a page
        // header and should receive the same measured reveal as every other
        // page title.
        (!heading.closest("article") || heading.tagName === "H1") &&
        !heading.closest("[data-motion-preserve]") &&
        !heading.closest("[data-motion-page-static]") &&
        !heading.closest("[data-motion-pact]") &&
        !heading.hasAttribute("data-motion-line-preserve") &&
        !heading.closest("#benchmarkers"),
    );

    const copyTargets = Array.from(
      document.querySelectorAll<HTMLElement>("main section p"),
    ).filter(
      (copy) =>
        copy.innerText.trim().length > 20 &&
        !copy.closest("li") &&
        !copy.closest("article") &&
        !copy.closest("form") &&
        !copy.closest("[data-motion-preserve]") &&
        !copy.closest("[data-motion-page-static]") &&
        !copy.closest("[data-motion-pact]") &&
        !copy.hasAttribute("data-motion-line-preserve") &&
        !copy.closest("#benchmarkers"),
    );

    const staggerGroups = Array.from(
      document.querySelectorAll<HTMLElement>("[data-motion-stagger]"),
    );
    const pactSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-motion-pact]"),
    );

    const initiallyVisibleTargets: HTMLElement[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-scroll-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -18%", threshold: 0.12 },
    );

    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-scroll-revealed");
          headingObserver.unobserve(entry.target);
        });
      },
      // This is deliberately later than the generic section observer: a
      // heading starts only once it has crossed the lower 18% of the viewport,
      // then settles for 900ms inside its own clipped line containers.
      { rootMargin: "0px 0px -18%", threshold: 0.12 },
    );

    const copyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-scroll-revealed");
          copyObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -18%", threshold: 0.12 },
    );

    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-scroll-revealed");
          staggerObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -14%", threshold: 0.12 },
    );

    const pactObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-pact-revealed");
          pactObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -14%", threshold: 0.12 },
    );

    revealTargets.forEach((target, index) => {
      target.dataset.scrollReveal = "";

      // Only the content that is already in view is staggered as one entrance.
      // Later sections retain their short local grouping, while Benchmarkers
      // keeps its established timing exactly as-is.
      if (target.getBoundingClientRect().top < window.innerHeight * 0.9) {
        initiallyVisibleTargets.push(target);
      } else {
        target.style.setProperty(
          "--reveal-delay",
          `${Math.min(index % 3, 2) * 70}ms`,
        );
        observer.observe(target);
      }
    });

    document.documentElement.classList.add("motion-ready");

    let disposed = false;
    const setupHeadings = () => {
      if (disposed) return;
      headingTargets.forEach((heading) => {
        prepareTextLines(
          heading,
          0,
          heading.hasAttribute("data-motion-line-safe"),
        );
        if (heading.getBoundingClientRect().top < window.innerHeight * 0.82) {
          window.requestAnimationFrame(() => {
            heading.classList.add("is-scroll-revealed");
          });
        } else {
          headingObserver.observe(heading);
        }
      });

      copyTargets.forEach((copy) => {
        prepareTextLines(
          copy,
          220,
          copy.hasAttribute("data-motion-line-safe"),
        );
        if (copy.getBoundingClientRect().top < window.innerHeight * 0.82) {
          window.requestAnimationFrame(() => {
            copy.classList.add("is-scroll-revealed");
          });
        } else {
          copyObserver.observe(copy);
        }
      });
    };

    if (document.fonts) {
      void document.fonts.ready.then(setupHeadings);
    } else {
      setupHeadings();
    }

    initiallyVisibleTargets.forEach((target, index) => {
      const keepsExistingTiming = target.parentElement?.hasAttribute(
        "data-motion-page-static",
      );
      const delay = keepsExistingTiming
        ? Math.min(index % 3, 2) * 70
        : Math.min(index * 100, 360);
      target.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    // Give the initial hidden state one painted frame before revealing it. This
    // makes the stagger observable without hiding server-rendered content.
    const entranceFrame = window.requestAnimationFrame(() => {
      initiallyVisibleTargets.forEach((target) => {
        target.classList.add("is-scroll-revealed");
      });
    });

    // Re-measuring a masked element changes its own dimensions. Observing that
    // same element therefore risks a ResizeObserver feedback loop on reload.
    // A viewport resize is the only event that can change line wrapping here.
    let resizeFrame = 0;
    const remaskForViewport = () => {
      [...headingTargets, ...copyTargets].forEach((target) => {
        if (!target.dataset.lineRevealSource) return;
        target.dataset.lineRevealResize = "";
        prepareTextLines(
          target,
          copyTargets.includes(target) ? 220 : 0,
          target.hasAttribute("data-motion-line-safe"),
        );
        window.requestAnimationFrame(() => {
          delete target.dataset.lineRevealResize;
        });
      });
    };
    const onResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(remaskForViewport);
    };
    window.addEventListener("resize", onResize);

    staggerGroups.forEach((group) => {
      Array.from(group.children).forEach((item, index) => {
        (item as HTMLElement).style.setProperty(
          "--stagger-delay",
          `${Math.min(index, 4) * 110}ms`,
        );
      });
      staggerObserver.observe(group);
    });

    pactSections.forEach((section) => pactObserver.observe(section));

    const parallaxTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main img, main [data-parallax-background]",
      ),
    ).filter((target) => {
      const section = target.closest("section");
      const image = target instanceof HTMLImageElement ? target : null;
      const isLogo = image && /logo|wordmark/i.test(`${image.alt} ${image.currentSrc} ${image.src}`);
      return Boolean(section) &&
        section?.id !== "philosophy" &&
        section?.id !== "location" &&
        !target.closest("[data-motion-preserve]") &&
        !target.closest("[data-parallax-preserve]") &&
        !isLogo;
    });
    let frame = 0;
    let currentOffsets = new Map<HTMLElement, number>();
    let targetOffsets = new Map<HTMLElement, number>();

    const paintParallax = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      parallaxTargets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const distance = rect.top + rect.height / 2 - viewportCenter;
        const maxOffset = Math.min(28, rect.height * 0.08);
        targetOffsets.set(target, Math.max(-maxOffset, Math.min(maxOffset, distance * -0.06)));
        if (!target.hasAttribute("data-parallax-background")) {
          const overscan = 1 + (maxOffset * 2 + 4) / Math.max(rect.height, 1);
          target.style.setProperty("--parallax-scale", overscan.toFixed(3));
        }
      });

      let moving = false;
      parallaxTargets.forEach((element) => {
        const target = targetOffsets.get(element) ?? 0;
        const current = currentOffsets.get(element) ?? target;
        const next = current + (target - current) * 0.09;
        currentOffsets.set(element, next);
        element.style.setProperty("--parallax-y", `${next.toFixed(2)}px`);
        element.dataset.parallaxMedia = "";
        moving ||= Math.abs(target - next) > 0.1;
      });
      if (moving) frame = window.requestAnimationFrame(paintParallax);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(paintParallax);
    };
    paintParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      headingObserver.disconnect();
      copyObserver.disconnect();
      staggerObserver.disconnect();
      pactObserver.disconnect();
      disposed = true;
      window.cancelAnimationFrame(entranceFrame);
      window.cancelAnimationFrame(resizeFrame);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("motion-ready");
      revealTargets.forEach((target) => {
        delete target.dataset.scrollReveal;
        target.style.removeProperty("--reveal-delay");
        target.classList.remove("is-scroll-revealed");
      });
      [...headingTargets, ...copyTargets].forEach((target) => {
        const source = target.dataset.lineRevealSource;
        if (source && target.hasAttribute("data-motion-line-safe")) {
          const restored = source.split("\n").flatMap((line, index) =>
            index === 0
              ? [document.createTextNode(line)]
              : [document.createElement("br"), document.createTextNode(line)],
          );
          target.replaceChildren(...restored);
        } else if (source) {
          target.textContent = source;
        }
        delete target.dataset.lineReveal;
        delete target.dataset.lineRevealSource;
        delete target.dataset.lineRevealLayout;
        delete target.dataset.lineRevealResize;
        target.style.removeProperty("--line-reveal-width");
        target.removeAttribute("aria-label");
      });
      staggerGroups.forEach((group) => {
        group.classList.remove("is-scroll-revealed");
        Array.from(group.children).forEach((item) =>
          (item as HTMLElement).style.removeProperty("--stagger-delay"),
        );
      });
      pactSections.forEach((section) => section.classList.remove("is-pact-revealed"));
      parallaxTargets.forEach((target) => {
        delete target.dataset.parallaxMedia;
        target.style.removeProperty("--parallax-y");
        target.style.removeProperty("--parallax-scale");
      });
      currentOffsets = new Map();
      targetOffsets = new Map();
    };
  }, [pathname]);

  return null;
}
