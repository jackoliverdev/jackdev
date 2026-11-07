"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/animations/gsap";

/**
 * A quiet scroll reveal, used only on the work. Content is server-rendered and
 * visible to crawlers; GSAP hides it client-side just before it animates in.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from(ref.current, {
        autoAlpha: 0,
        y: 20,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
