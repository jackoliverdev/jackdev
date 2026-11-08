import Link from "next/link";
import { Fragment } from "react";
import { services } from "@/lib/content/site";
import { getProject } from "@/lib/content/projects";
import { cn } from "@/lib/utils";
import { stagger } from "@/lib/reveal";

// Written out in full so Tailwind keeps the classes.
const bands: Record<string, string> = { sage: "band-sage", moss: "band-moss", cocoa: "band-cocoa", olive: "band-olive" };

/**
 * Services as stacked palette bands, like swatches: sage, moss and deep olive.
 * Each band sets its own text colours (see .band-* in globals.css).
 *
 * On phones the section becomes a scroll stack, pure CSS (position: sticky):
 * - The title locks under the nav and Websites locks under it.
 * - AI development only appears once Websites has settled (a spacer the height of
 *   the empty screen below the card sits between them), then slides up and covers
 *   it exactly. Web apps does the same over AI development.
 * - Every card is the same height (--stack-h), so each one covers the last fully.
 * - The title carries a bottom margin as tall as a card (cancelled by the list's
 *   negative top margin). Sticky elements release when their margin box reaches the
 *   end of their container, so the title and the stack leave at the same moment.
 * From md upwards it is the normal stacked list.
 */
export function ServicesSection() {
  return (
    <section id="services" className="py-[var(--section-y)]">
      {/* Phone stack sizes: --head-h the locked title, --stack-h every card,
          --stack-gap the scroll distance before the next card appears. */}
      <div className="container-x [--head-h:8rem] [--stack-gap:max(0px,calc(100svh_-_var(--nav-h)_-_var(--head-h)_-_var(--stack-h)))] [--stack-h:28rem] md:[--head-h:0px]">
        <div
          data-reveal
          className="sticky top-[var(--nav-h)] -mx-[var(--gutter)] mb-[var(--stack-h)] grid h-[var(--head-h)] grid-cols-1 content-end gap-2 bg-canvas px-[var(--gutter)] pb-4 md:static md:mx-0 md:mb-0 md:h-auto md:grid-cols-12 md:items-end md:gap-5 md:px-0 md:pb-0"
        >
          <h2 className="text-h1 text-fg md:col-span-6">What I build</h2>
          <p className="max-w-[44ch] text-small text-fg-muted md:col-span-6 md:justify-self-end md:text-body">
            No project too small, no project too big. Most clients start with one of these and end up with two.
          </p>
        </div>

        <div className="-mt-[var(--stack-h)] flex flex-col md:mt-12 md:gap-2.5">
          {services.map((service, i) => (
            <Fragment key={service.id}>
              {i > 0 && <div aria-hidden className="h-[var(--stack-gap)] md:hidden" />}
            <article
              data-reveal
              style={stagger(i)}
              className={cn(
                bands[service.tone],
                "sticky top-[calc(var(--nav-h)_+_var(--head-h))] grid h-[var(--stack-h)] grid-cols-1 content-start gap-x-10 gap-y-5 overflow-hidden rounded-[10px] px-6 py-6 shadow-[0_-18px_40px_-24px_rgb(0_0_0/0.45)] md:static md:h-auto md:grid-cols-12 md:content-normal md:gap-y-6 md:overflow-visible md:px-9 md:py-9 md:shadow-none"
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
                  <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 md:block md:space-y-1">
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
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
