import Link from "next/link";
import { services } from "@/lib/content/site";
import { getProject } from "@/lib/content/projects";
import { cn } from "@/lib/utils";
import { stagger } from "@/lib/reveal";

// Written out in full so Tailwind keeps the classes.
const bands: Record<string, string> = { sage: "band-sage", moss: "band-moss", cocoa: "band-cocoa", olive: "band-olive" };

/**
 * Services as stacked palette bands, like swatches: sage, moss and cocoa.
 * Each band sets its own text colours (see .band-* in globals.css).
 */
export function ServicesSection() {
  return (
    <section id="services" className="py-[var(--section-y)]">
      <div className="container-x">
        <div data-reveal className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end">
          <h2 className="text-h1 text-fg md:col-span-6">What I build</h2>
          <p className="max-w-[44ch] text-fg-muted md:col-span-6 md:justify-self-end">
            No project too small, no project too big. Most clients start with one of these and end up with two.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-2.5">
          {services.map((service, i) => (
            <article
              key={service.id}
              data-reveal
              style={stagger(i)}
              className={cn(
                bands[service.tone],
                "grid grid-cols-1 gap-x-10 gap-y-6 rounded-[10px] px-6 py-7 md:grid-cols-12 md:px-9 md:py-9"
              )}
            >
              <div className="md:col-span-5">
                <h3 className="text-h2 text-fg">{service.title}</h3>
                <p className="mt-3 max-w-[40ch] text-fg-muted">{service.summary}</p>
              </div>
              <ul className="grid content-start gap-x-6 gap-y-2 sm:grid-cols-2 md:col-span-4 md:grid-cols-1">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-small text-fg">
                    <svg width="14" height="14" viewBox="0 0 14 14" className="mt-[0.2em] shrink-0" aria-hidden>
                      <path d="M2.5 7.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-rule pt-4 md:col-span-3 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <div>
                  <p className="text-caption text-fg-muted">Seen in</p>
                  <ul className="mt-1.5 space-y-1">
                    {service.seenIn.map((slug) => {
                      const project = getProject(slug);
                      if (!project) return null;
                      return (
                        <li key={slug}>
                          <Link href={`/projects/${slug}`} className="link text-small font-medium text-fg">
                            {project.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
