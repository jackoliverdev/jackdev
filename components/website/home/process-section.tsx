import type { CSSProperties } from "react";
import { process } from "@/lib/content/site";

const at = (i: number) => ({ ["--step" as string]: i }) as CSSProperties;

/**
 * The process as a timeline: a real sequence, so it gets numbers.
 *
 * Desktop runs left to right, phones top to bottom. When it scrolls into view a
 * cocoa line draws along the track and each stop fills as the line reaches it.
 * On phones the line is drawn in segments, stop to stop, so it ends at the last one.
 * Pure CSS, driven by the reveal system (`data-reveal` adds `is-in`), transform
 * and colour only. Without JavaScript, or with reduced motion, it shows complete.
 */
export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="bg-well py-[var(--section-y)]">
      <div className="container-x">
        <div data-reveal className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end">
          <h2 id="process-title" className="max-w-[18ch] text-h1 text-fg lg:col-span-7">
            From first call to launch, you deal with me.
          </h2>
          <p className="max-w-[42ch] text-fg-muted lg:col-span-5 lg:justify-self-end">
            One person from the first conversation to the day it goes live, and after. Here&apos;s how it runs.
          </p>
        </div>

        <ol data-reveal="fade" className="timeline relative mt-12 grid grid-cols-1 gap-10 pl-16 lg:mt-16 lg:grid-cols-4 lg:gap-8 lg:pl-0">
          {/* Desktop: one track across all four stops, and the line that draws along it. */}
          <span aria-hidden className="absolute left-[1.375rem] right-[calc((100%_-_6rem)_/_4_-_1.375rem)] top-[3.75rem] hidden h-px bg-rule lg:block" />
          <span aria-hidden className="timeline-fill absolute left-[1.375rem] right-[calc((100%_-_6rem)_/_4_-_1.375rem)] top-[3.75rem] hidden h-[2px] -translate-y-[0.5px] bg-earth lg:block" />

          {process.map((step, i) => (
            <li key={step.title} className="timeline-step relative" style={at(i)}>
              {/* Phones: a segment from this stop down to the next, drawn in turn. */}
              {i < process.length - 1 && (
                <>
                  <span aria-hidden className="absolute -bottom-10 -left-[2.625rem] top-11 w-px bg-rule lg:hidden" />
                  <span aria-hidden className="timeline-seg absolute -bottom-10 -left-[2.625rem] top-11 w-[2px] -translate-x-[0.5px] bg-earth lg:hidden" />
                </>
              )}
              <p className="mb-2 text-small font-medium text-earth-ink lg:mb-4">{step.when}</p>
              <span
                aria-hidden
                className="timeline-node absolute -left-16 top-0 grid h-11 w-11 place-items-center rounded-full border-2 font-display text-small font-semibold tabular [font-stretch:var(--display-stretch)] lg:static"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 text-fg lg:mt-6 xl:whitespace-nowrap xl:text-[1.125rem]">{step.title}</h3>
              <p className="mt-2 max-w-[34ch] text-fg-muted">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
