"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll reveals for anything marked `data-reveal`: each fades and rises in once
 * as it reaches the screen, then is left alone.
 *
 * - Content stays visible until this runs. Elements already on screen are marked
 *   done first, and only then does `html.reveal-ready` hide the rest, so nothing
 *   flashes and the page still works without JavaScript.
 * - One passive scroll listener, throttled to one check per frame. It reads every
 *   pending element's position, then writes classes, so it never thrashes layout.
 * - Anything at or above the viewport counts as reached, so a fast flick or an
 *   anchor jump (Work, Contact...) never leaves a section hidden.
 * - The animation itself is CSS, transform and opacity only (see globals.css).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("reveal-ready");
      return;
    }

    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    let frame = 0;

    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.9;
      const reached = pending.filter((el) => el.getBoundingClientRect().top < line);
      if (!reached.length) return;
      for (const el of reached) el.classList.add("is-in");
      pending = pending.filter((el) => !el.classList.contains("is-in"));
      if (!pending.length) stop();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    check();
    root.classList.add("reveal-ready");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      stop();
    };
  }, [pathname]);

  return null;
}
