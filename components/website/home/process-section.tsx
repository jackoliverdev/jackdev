import { process } from "@/lib/content/site";
import { stagger } from "@/lib/reveal";

/** A real sequence, so it gets numbers. */
export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="bg-well py-[var(--section-y)]">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
        <h2 id="process-title" data-reveal className="max-w-[16ch] text-h1 text-fg lg:col-span-4">
          From first call to launch, you deal with me.
        </h2>
        <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-8">
          {process.map((step, i) => (
            <li key={step.title} data-reveal style={stagger(i)} className="border-t border-rule pt-5">
              <p className="flex items-baseline gap-3">
                <span className="tabular font-display text-small font-semibold text-earth-ink" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-h3 font-display font-semibold tracking-[-0.015em] text-fg [font-stretch:var(--display-stretch)]">
                  {step.title}
                </span>
              </p>
              <p className="mt-2 text-fg-muted">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
