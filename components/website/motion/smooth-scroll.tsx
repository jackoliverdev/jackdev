"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/animations/gsap";

/**
 * Lenis smooth scrolling, synced to GSAP so ScrollTrigger stays frame-accurate.
 * In-page links (/#work, #contact) glide to their target and clear the fixed nav.
 * Off entirely for reduced motion and on touch devices, where native scroll is best.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion() || coarse) return;

    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const navOffset = () =>
      -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 4) * 16 - 8;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      const link = (event.target as Element)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", url.hash);
      lenis.scrollTo(target, { offset: navOffset(), duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    // Arriving from another page with a hash: land on it once the page has laid out.
    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) requestAnimationFrame(() => lenis.scrollTo(target, { offset: navOffset(), immediate: true }));
    }

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
