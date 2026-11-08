"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { testimonials } from "@/lib/content/site";
import { getProject } from "@/lib/content/projects";
import { DesktopFrame } from "@/components/website/work/frames";
import { cn } from "@/lib/utils";
import { stagger } from "@/lib/reveal";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

const FLIP_MS = 7000; // how long each review stays up before flipping to the next

/**
 * One quote at a time, in a card tied to the project it's about.
 *
 * Auto-flip: while the section is on screen, a thin cocoa bar fills under the
 * active client and flips to the next review when it completes. The timing is a
 * CSS animation (transform only), so there is no JavaScript timer. It always
 * keeps rolling while the section is on screen (clicking a client restarts it from
 * that review), pauses only when the section is out of view, and is off for
 * reduced motion.
 */
export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [motion, setMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const t = testimonials[active];
  const project = getProject(t.project);
  const playing = motion && inView;

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the active client in view in the scrolling row on phones (horizontal only).
  useEffect(() => {
    const list = listRef.current;
    const tab = document.getElementById(`${id}-tab-${active}`);
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - 16, behavior: motion ? "smooth" : "auto" });
  }, [active, id, motion]);

  const advance = () => setActive((a) => (a + 1) % testimonials.length);

  const onKey = (e: React.KeyboardEvent) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + testimonials.length) % testimonials.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby={`${id}-title`}
      className="border-t border-rule py-[var(--section-y)]"
    >
      {/* Heading, switcher and card are separate grid items, so the switcher can stay
          pinned under the nav (sticky) while the quote and screenshots scroll past. */}
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10">
        <h2 id={`${id}-title`} data-reveal className="text-h1 text-fg lg:col-span-4 lg:row-start-1">
          What clients say
        </h2>
        <div className="sticky top-[var(--nav-h)] z-20 -mx-[var(--gutter)] mt-6 min-w-0 bg-canvas px-[var(--gutter)] lg:top-[calc(var(--nav-h)+1.5rem)] lg:col-span-4 lg:row-start-2 lg:mx-0 lg:mt-10 lg:self-start lg:bg-transparent lg:px-0">
          <div
            role="tablist"
            aria-label="Clients"
            onKeyDown={onKey}
            ref={listRef}
            className="no-scrollbar -mx-[var(--gutter)] flex gap-6 overflow-x-auto border-b border-rule px-[var(--gutter)] pt-3 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:px-0 lg:pt-0"
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
                  "relative shrink-0 whitespace-nowrap border-b-2 pb-2 pt-1 text-small transition-colors duration-200 ease-out",
                  "lg:flex lg:items-center lg:justify-between lg:border-b lg:border-rule lg:py-3 lg:text-body",
                  i === active ? "border-rule font-medium text-fg" : "border-transparent text-fg-muted hover:text-fg"
                )}
              >
                {item.company}
                {/* The timer: fills while this review is up, then flips to the next one. */}
                {i === active && (
                  <span
                    key={active}
                    aria-hidden
                    onAnimationEnd={advance}
                    className={cn(
                      "pointer-events-none absolute -bottom-[2px] left-0 h-[2px] w-full origin-left scale-x-0 bg-earth lg:-bottom-px",
                      motion ? "review-timer" : "scale-x-100"
                    )}
                    style={{ animationDuration: `${FLIP_MS}ms`, animationPlayState: playing ? "running" : "paused" }}
                  />
                )}
                <span
                  className={cn("hidden h-1.5 w-1.5 rounded-full bg-earth transition-opacity duration-200 lg:block", i === active ? "opacity-100" : "opacity-0")}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>

        <figure
          data-reveal
          style={stagger(1)}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          className="mt-6 min-w-0 overflow-hidden rounded-frame border border-rule bg-raised lg:col-span-8 lg:col-start-5 lg:row-span-3 lg:row-start-1 lg:mt-0"
        >
          <div key={active} className="grid h-full animate-in fade-in-0 duration-300 md:grid-cols-5">
            <div className="flex flex-col p-6 sm:p-8 md:col-span-3 md:p-10">
              <svg width="34" height="26" viewBox="0 0 34 26" aria-hidden className="text-earth">
                <path
                  fill="currentColor"
                  d="M0 26V15.6C0 6.9 4.6 1.7 13.6 0l1.6 3.6C10 5 7.6 7.8 7.3 11.8H14V26H0Zm19 0V15.6C19 6.9 23.6 1.7 32.6 0l1.4 3.6c-5.2 1.4-7.6 4.2-7.9 8.2H33V26H19Z"
                />
              </svg>
              <blockquote className="mt-6 flex-1 space-y-4">
                {t.quote.map((para) => (
                  <p key={para} className="text-[clamp(1.0625rem,1.35vw,1.1875rem)] leading-[1.6] text-fg">
                    {para}
                  </p>
                ))}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3.5 border-t border-rule pt-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-well text-small font-semibold text-fg" aria-hidden>
                  {initials(t.name)}
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-fg">{t.name}</span>
                  <span className="block text-small text-fg-muted">
                    {t.role}, {t.company}
                  </span>
                </span>
              </figcaption>
            </div>
            {project && (
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col justify-between gap-5 border-t border-rule bg-well p-6 sm:p-8 md:col-span-2 md:border-l md:border-t-0"
              >
                <div className="flex flex-col gap-3">
                  <DesktopFrame shot={project.desktop[0]} sizes="(min-width: 768px) 280px, 80vw" />
                  {project.desktop[1] && <DesktopFrame shot={project.desktop[1]} sizes="280px" className="hidden md:block" />}
                </div>
                <span>
                  <span className="block text-caption text-fg-faint">{project.sector}</span>
                  <span className="mt-1 flex items-center justify-between gap-3 font-medium text-fg">
                    See the project
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                      <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                </span>
              </Link>
            )}
          </div>
        </figure>
      </div>
    </section>
  );
}
