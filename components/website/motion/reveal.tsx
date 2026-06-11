"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/animations/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Vertical offset in px the content rises from. */
  y?: number;
  /** Delay in seconds once the trigger fires. */
  delay?: number;
  /** CSS selector for staggered children; when set, children animate individually. */
  stagger?: string;
  /** Seconds between staggered children. */
  staggerAmount?: number;
};

/**
 * Scroll-triggered reveal. Content is server-rendered and visible to
 * crawlers; GSAP only hides it client-side immediately before animating.
 */
export function Reveal({
  children,
  className,
  y = 32,
  delay = 0,
  stagger,
  staggerAmount = 0.08,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;

      const targets = stagger
        ? ref.current.querySelectorAll(stagger)
        : [ref.current];
      if (!targets.length) return;

      gsap.from(targets, {
        autoAlpha: 0,
        y,
        duration: 1,
        delay,
        ease: "expo.out",
        stagger: stagger ? staggerAmount : 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
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
