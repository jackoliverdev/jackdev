"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const HeroCanvas = dynamic(() => import("./hero-canvas"), { ssr: false });

/**
 * Mounts the WebGL dot-grid client-side only. Skipped for reduced motion,
 * lower density on small screens, paused when scrolled out of view, and
 * recoloured to match the active theme.
 */
export function HeroCanvasLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [gridSize, setGridSize] = useState(30);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const small = window.matchMedia("(max-width: 768px)").matches;
    setGridSize(small ? 18 : 30);
    setEnabled(true);

    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 -z-10" aria-hidden>
      {enabled && (
        <HeroCanvas
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          gridSize={gridSize}
          paused={paused}
        />
      )}
      {/* Soft fade into the page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
