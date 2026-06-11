"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  gsap,
  useGSAP,
  horizontalLoop,
  prefersReducedMotion,
} from "@/lib/animations/gsap";
import { projects } from "@/lib/content/projects";

// Order the homepage gallery independently of the case-study data. Comment a
// slug out to drop a project from the gallery while keeping its case study.
const GALLERY_ORDER = [
  "excel-electrics",
  "jetnow-drainage",
  "centrus-ai",
  // "imperial-build",
  "gym-tours-ai",
  "hand-line",
  // "advanta-services",
  // "tourbots-ai",
];

const galleryProjects = GALLERY_ORDER.map((slug) =>
  projects.find((project) => project.slug === slug)
).filter((project): project is (typeof projects)[number] => Boolean(project));

/**
 * Single-row work gallery that scrolls itself in a seamless, endless loop
 * (GSAP's horizontalLoop helper — each card wraps via xPercent, so there's
 * no jump). Auto-play pauses while the visitor drags or throws the row and
 * resumes once they let go; arrows nudge it card by card. Dots show which
 * project is centred, and reduced motion degrades to a native horizontally
 * scrolling row.
 */
export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const api = useRef<{ step: (direction: 1 | -1) => void }>({ step: () => {} });

  useGSAP(
    () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]", track);
      const dots = gsap.utils.toArray<HTMLElement>("[data-work-dot]", sectionRef.current);
      if (!cards.length) return;

      const activeIndex = () => {
        const center =
          viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
        let index = 0;
        let bestLeft = -Infinity;
        cards.forEach((card, i) => {
          const left = card.getBoundingClientRect().left;
          if (left <= center && left > bestLeft) {
            bestLeft = left;
            index = i;
          }
        });
        return index;
      };

      const setActiveDot = (index: number) => {
        dots.forEach((dot, i) => {
          dot.classList.toggle("bg-electric", i === index);
          dot.classList.toggle("bg-ink-700", i !== index);
        });
      };

      let lastIndex = -1;
      const updateDots = () => {
        const index = activeIndex();
        if (index === lastIndex) return;
        lastIndex = index;
        setActiveDot(index);
      };

      if (prefersReducedMotion()) {
        viewport.classList.remove("overflow-hidden");
        viewport.classList.add("overflow-x-auto", "snap-x", "snap-mandatory");
        cards.forEach((card) => card.classList.add("snap-start"));
        viewport.addEventListener("scroll", updateDots, { passive: true });
        updateDots();
        return () => viewport.removeEventListener("scroll", updateDots);
      }

      const gap =
        cards.length > 1
          ? cards[1].offsetLeft - cards[0].offsetLeft - cards[0].offsetWidth
          : 0;

      const loop = horizontalLoop(cards, {
        speed: 1,
        repeat: -1,
        paused: true,
        paddingRight: gap,
        draggable: true,
      });

      let resumeTimer: ReturnType<typeof setTimeout> | null = null;

      const resume = () => loop.play();
      const pauseAfterInteraction = () => {
        loop.pause();
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => {
          loop.play();
          resumeTimer = null;
        }, 2000);
      };

      loop.draggable?.addEventListener("throwcomplete", resume);

      api.current.step = (direction) => {
        loop.closestIndex(true);
        loop.toIndex(activeIndex() + direction, {
          duration: 0.7,
          ease: "power2.inOut",
        });
        pauseAfterInteraction();
      };

      gsap.ticker.add(updateDots);
      updateDots();

      gsap.from(cards, {
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: viewport,
          start: "top 85%",
          once: true,
          onEnter: () => loop.play(),
        },
      });

      return () => {
        gsap.ticker.remove(updateDots);
        if (resumeTimer) clearTimeout(resumeTimer);
        loop.draggable?.removeEventListener("throwcomplete", resume);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-pad hairline-top scroll-mt-12 max-md:overflow-x-hidden"
    >
      <div className="site-container">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Showcase</p>
            <h2 className="display-hairline text-display-lg max-w-2xl text-paper hidden md:block">
              A selection of the work.
            </h2>
            <h2 className="display-hairline text-display-lg max-w-2xl whitespace-nowrap text-paper md:hidden">
              A selection of work
            </h2>
          </div>
          <div className="hidden flex-col items-start gap-5 sm:items-end md:flex">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => api.current.step(-1)}
                aria-label="Previous project"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 text-paper-dim transition-all duration-300 hover:border-electric hover:text-electric"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => api.current.step(1)}
                aria-label="Next project"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 text-paper-dim transition-all duration-300 hover:border-electric hover:text-electric"
              >
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="w-full max-md:overflow-hidden">
        <div
          ref={viewportRef}
          className="overflow-hidden mx-5 sm:mx-8 max-md:mx-0 max-md:w-full max-md:px-5 max-md:[contain:paint] lg:mx-[max(3rem,calc((100vw-1320px)/2+3rem))]"
          role="group"
          aria-label="Project gallery"
        >
          <div
            ref={trackRef}
            className="flex w-max gap-6 max-md:gap-5 lg:gap-8"
          >
            {galleryProjects.map((project, index) => (
              <article
                key={project.slug}
                data-work-card
                className="w-[72vw] shrink-0 overflow-hidden min-w-0 sm:w-[26rem] lg:w-[34rem]"
              >
              <Link
                href={`/projects/${project.slug}`}
                className="group block"
                draggable={false}
              >
                <div className="relative overflow-hidden rounded-lg border border-ink-700 transition-colors duration-300 group-hover:border-ink-500">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      fill
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 26rem, 34rem"
                      className="object-cover object-top transition-transform duration-700 ease-out-expo max-md:group-hover:scale-100 group-hover:scale-[1.04]"
                      priority={index < 2}
                      draggable={false}
                    />
                  </div>
                  {!project.live && (
                    <span className="absolute left-4 top-4 rounded-full border border-ink-600 bg-ink-950/80 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-paper-dim backdrop-blur">
                      In build
                    </span>
                  )}
                </div>

                <div className="mt-5 flex min-w-0 items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-medium tracking-tight text-paper">
                      {project.name}
                    </h3>
                    <p className="mt-1 truncate font-mono text-xs text-paper-faint">
                      {project.sector}
                    </p>
                  </div>
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-700 text-paper-dim transition-all duration-300 group-hover:border-electric group-hover:text-electric">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
      </div>

      <div className="site-container mt-10 flex items-center justify-between gap-4 md:justify-center md:gap-2">
        <button
          type="button"
          onClick={() => api.current.step(-1)}
          aria-label="Previous project"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-700 text-paper-dim transition-all duration-300 hover:border-electric hover:text-electric md:hidden"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
        </button>
        <div className="flex flex-1 justify-center gap-2 md:flex-none">
          {galleryProjects.map((project) => (
            <span
              key={project.slug}
              data-work-dot
              aria-hidden
              className="h-2 w-2 rounded-full bg-ink-700 transition-colors duration-300"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => api.current.step(1)}
          aria-label="Next project"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-700 text-paper-dim transition-all duration-300 hover:border-electric hover:text-electric md:hidden"
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </section>
  );
}
