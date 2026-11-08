"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { process } from "@/lib/content/site";
import { clamp, onScrollFrame } from "@/lib/scroll";

const at = (i: number) => ({ ["--step" as string]: i }) as CSSProperties;

/**
 * The process timeline, drawn by the scroll.
 *
 * Progress is measured in stops: 0 means the first stop is lit, 1 the second, and
 * so on, with the fraction in between being how far the line has drawn towards
 * the next one. It only ever goes forward, so once a stop is filled it stays filled.
 *
 * - Desktop (a row): the line draws as the row rises from 85% to 40% of the screen.
 * - Phones (a column): the line follows a reading line 60% down the screen, so each
 *   stop fills exactly as you reach it, whatever height its text wraps to.
 *
 * One rAF-throttled scroll listener writes CSS variables and data attributes;
 * React never re-renders. It stops listening once the last stop is filled.
 * Without JavaScript, or with reduced motion, the timeline shows complete.
 */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const steps = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"));
    const nodes = steps.map((s) => s.querySelector<HTMLElement>(".timeline-node")!);
    const segs = steps.map((s) => s.querySelector<HTMLElement>(".timeline-seg"));
    const last = steps.length - 1;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let reached = -1; // furthest progress so far, in stops
    const paint = () => {
      list.style.setProperty("--p", (clamp(reached / last)).toFixed(4));
      steps.forEach((step, i) => {
        step.toggleAttribute("data-on", reached >= i);
        segs[i]?.style.setProperty("--s", clamp(reached - i).toFixed(4));
      });
    };

    const measure = () => {
      const vh = window.innerHeight;
      if (window.matchMedia("(min-width: 1024px)").matches) {
        const top = nodes[0].getBoundingClientRect().top;
        return ((vh * 0.85 - top) / (vh * 0.45)) * last;
      }
      const line = vh * 0.6;
      const centres = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      if (line < centres[0]) return -1;
      for (let i = 0; i < last; i++) {
        if (line < centres[i + 1]) return i + (line - centres[i]) / (centres[i + 1] - centres[i]);
      }
      return last;
    };

    list.setAttribute("data-scrub", "");
    paint();
    const stop = onScrollFrame(() => {
      const now = clamp(measure(), -1, last);
      if (now <= reached) return;
      reached = now;
      paint();
      // Finished: stop listening (after this call returns, so `stop` exists).
      if (reached >= last) queueMicrotask(() => stop());
    });
    return stop;
  }, []);

  return (
    <ol ref={ref} className="timeline relative mt-12 grid grid-cols-1 gap-10 pl-16 lg:mt-16 lg:grid-cols-4 lg:gap-8 lg:pl-0">
      {/* Desktop: one track across all four stops, and the line that draws along it. */}
      <span aria-hidden className="absolute left-[1.375rem] right-[calc((100%_-_6rem)_/_4_-_1.375rem)] top-[3.75rem] hidden h-px bg-rule lg:block" />
      <span aria-hidden className="timeline-fill absolute left-[1.375rem] right-[calc((100%_-_6rem)_/_4_-_1.375rem)] top-[3.75rem] hidden h-[2px] bg-earth lg:block" />

      {process.map((step, i) => (
        <li key={step.title} data-step className="timeline-step relative" style={at(i)}>
          {/* Phones: a segment from this stop down to the next. */}
          {i < process.length - 1 && (
            <>
              <span aria-hidden className="absolute -bottom-10 -left-[2.625rem] top-11 w-px bg-rule lg:hidden" />
              <span aria-hidden className="timeline-seg absolute -bottom-10 -left-[2.625rem] top-11 w-[2px] bg-earth lg:hidden" />
            </>
          )}
          <p className="timeline-copy mb-2 text-small font-medium text-earth-ink lg:mb-4">{step.when}</p>
          <span
            aria-hidden
            className="timeline-node absolute -left-16 top-0 grid h-11 w-11 place-items-center rounded-full border-2 font-display text-small font-semibold tabular [font-stretch:var(--display-stretch)] lg:static"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="timeline-copy">
            <h3 className="text-h3 text-fg lg:mt-6 xl:whitespace-nowrap xl:text-[1.125rem]">{step.title}</h3>
            <p className="mt-2 max-w-[34ch] text-fg-muted">{step.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
