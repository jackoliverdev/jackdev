"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/animations/gsap";
import { hero, site } from "@/lib/content/site";
import { HeroCanvasLoader } from "./hero-canvas-loader";
import { HeroCodeEditor } from "./hero-code-editor";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-line] > span", {
        yPercent: 115,
        duration: 1.2,
        stagger: 0.12,
        delay: 0.15,
      })
        .from(
          "[data-hero-fade]",
          { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1 },
          "-=0.7"
        );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      <HeroCanvasLoader />

      <div className="site-container pt-28 pb-20">
        <p data-hero-fade className="eyebrow mb-8 hidden md:block">
          {hero.eyebrow}
        </p>
        <p
          data-hero-fade
          className="eyebrow mb-8 whitespace-nowrap text-[0.625rem] tracking-[0.12em] md:hidden"
        >
          {hero.eyebrow}
        </p>

        <h1 className="display-hairline text-display-2xl max-w-5xl text-paper">
          {hero.headline.map((line) => (
            <span
              key={line}
              data-hero-line
              className="hidden overflow-hidden pb-1 md:block"
            >
              <span className="block">{line}</span>
            </span>
          ))}
          <span
            data-hero-line
            className="block overflow-hidden pb-1 md:hidden"
          >
            <span className="block">Websites</span>
          </span>
          <span
            data-hero-line
            className="block overflow-hidden pb-1 md:hidden"
          >
            <span className="block">and AI</span>
          </span>
          <span
            data-hero-line
            className="block overflow-hidden pb-1 md:hidden"
          >
            <span className="block">that win you work.</span>
          </span>
        </h1>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,29rem)] lg:gap-16">
          <div>
            <p
              data-hero-fade
              className="max-w-xl text-base leading-relaxed text-paper-dim sm:text-lg"
            >
              {hero.sub}
            </p>

            <div
              data-hero-fade
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {hero.primaryCta.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <Link href={hero.secondaryCta.href} className="btn-ghost">
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div data-hero-fade className="w-full lg:justify-self-end">
            <HeroCodeEditor />
          </div>
        </div>

        <div
          data-hero-fade
          className="mt-16 flex items-center gap-6 text-sm text-paper-faint lg:mt-20"
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
            </span>
            Available for new projects
          </span>
          <ArrowDown
            className="ml-auto h-4 w-4 animate-bounce text-paper-faint"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
