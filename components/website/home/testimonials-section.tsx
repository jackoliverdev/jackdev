"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { testimonials } from "@/lib/content/site";
import { cn } from "@/lib/utils";

/** One quote at a time; the visitor picks whose. */
export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const id = useId();
  const t = testimonials[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + testimonials.length) % testimonials.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <section aria-labelledby={`${id}-title`} className="section-y">
      <div className="container-x grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <h2 id={`${id}-title`} className="text-h1 text-fg">
            What clients say
          </h2>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Clients"
            onKeyDown={onKey}
            className="no-scrollbar -mx-[var(--gutter)] mt-8 flex gap-2 overflow-x-auto px-[var(--gutter)] md:mx-0 md:mt-12 md:flex-col md:gap-0 md:overflow-visible md:px-0"
          >
            {testimonials.map((item, i) => (
              <button
                key={item.company}
                id={`${id}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls={`${id}-panel`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-small transition-colors duration-200 ease-out",
                  "md:flex md:items-center md:justify-between md:rounded-none md:border-0 md:border-b md:border-rule md:px-0 md:py-3.5 md:text-body",
                  i === active
                    ? "border-fg bg-fg text-canvas md:bg-transparent md:text-fg"
                    : "border-rule text-fg-muted hover:text-fg"
                )}
              >
                {item.company}
                <span
                  className={cn(
                    "hidden h-1.5 w-1.5 rounded-full bg-sky transition-opacity duration-200 md:block",
                    i === active ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>

        <figure
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          className="flex flex-col justify-between gap-10 md:col-span-8 md:pl-8"
        >
          <blockquote key={active} className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
            <p className="font-display text-[clamp(1.5rem,2.9vw,2.5rem)] font-medium leading-[1.18] tracking-[-0.03em] text-fg">
              &ldquo;{t.quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex flex-wrap items-end justify-between gap-4 border-t border-rule pt-6">
            <span>
              <span className="block font-medium text-fg">{t.name}</span>
              <span className="text-small text-fg-muted">
                {t.role}, {t.company}
              </span>
            </span>
            <Link href={`/projects/${t.project}`} className="link text-small text-sky-ink">
              See the {t.company} project
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
