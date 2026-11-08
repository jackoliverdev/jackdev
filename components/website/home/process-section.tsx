import { ProcessTimeline } from "@/components/website/home/process-timeline";

/**
 * The process as a timeline: a real sequence, so it gets numbers.
 * Desktop runs left to right, phones top to bottom, and the line is drawn by the
 * scroll (see ProcessTimeline).
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

        <ProcessTimeline />
      </div>
    </section>
  );
}
