import { process } from "@/lib/content/site";

/** A real sequence, so it gets numbers. */
export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="section-y bg-well">
      <div className="container-x">
        <h2 id="process-title" className="max-w-[18ch] text-h1 text-fg">
          From first call to launch, you deal with me.
        </h2>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-frame border border-rule bg-rule sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {process.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-4 bg-raised p-7 md:p-8">
              <span className="tabular font-display text-h3 font-semibold text-sky-ink" aria-hidden>
                {i + 1}
              </span>
              <h3 className="text-h3 text-fg">{step.title}</h3>
              <p className="text-fg-muted">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
