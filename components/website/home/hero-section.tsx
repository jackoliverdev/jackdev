"use client";

import Link from "next/link";
import { useRef } from "react";
import { hero } from "@/lib/content/site";
import { projects } from "@/lib/content/projects";
import { gsap, useGSAP, horizontalLoop, prefersReducedMotion } from "@/lib/animations/gsap";
import { DesktopFrame, PhoneFrame } from "@/components/website/work/frames";

// The reel: every project's cover, with a phone shot after every other one for rhythm.
const reel = projects.flatMap((project, i) => {
  const items: { key: string; kind: "desktop" | "phone"; project: typeof project }[] = [
    { key: `${project.slug}-d`, kind: "desktop", project },
  ];
  if (i % 2 === 0) items.push({ key: `${project.slug}-m`, kind: "phone", project });
  return items;
});

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();

      // One orchestrated entrance: the line, then the copy, then the reel slides up.
      if (!reduce) {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-hero-line]", { yPercent: 110, duration: 1.15, stagger: 0.08 })
          .from("[data-hero-fade]", { autoAlpha: 0, y: 14, duration: 0.9, stagger: 0.06 }, "-=0.8")
          .from("[data-hero-reel]", { autoAlpha: 0, y: 48, duration: 1.3 }, "-=0.85");
      }

      if (reduce || !track.current) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-reel-item]", track.current);
      const loop = horizontalLoop(items, { speed: 0.35, repeat: -1, paddingRight: 20, draggable: true, snap: false });

      // Pause while someone is looking at, focusing or touching the reel.
      const el = track.current;
      const slow = () => gsap.to(loop, { timeScale: 0, duration: 0.6, ease: "power2.out", overwrite: true });
      const go = () => {
        loop.play();
        gsap.fromTo(loop, { timeScale: 0 }, { timeScale: 1, duration: 0.9, ease: "power2.in", overwrite: true });
      };
      el.addEventListener("pointerenter", slow);
      el.addEventListener("pointerleave", go);
      el.addEventListener("focusin", slow);
      el.addEventListener("focusout", go);
      return () => {
        el.removeEventListener("pointerenter", slow);
        el.removeEventListener("pointerleave", go);
        el.removeEventListener("focusin", slow);
        el.removeEventListener("focusout", go);
        loop.kill();
      };
    },
    { scope: root }
  );

  const words = hero.headline.split(" ");
  // Two lines on wide screens: break before "that".
  const breakAt = words.indexOf("that");
  const lines = [words.slice(0, breakAt).join(" "), words.slice(breakAt).join(" ")];

  return (
    <section ref={root} className="relative overflow-hidden pb-16 pt-[calc(var(--nav-h)+clamp(3rem,9vw,7.5rem))] md:pb-24">
      <div className="container-x">
        <p data-hero-fade className="mb-7 flex items-center gap-2.5 text-small text-fg-muted">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inset-0 rounded-full bg-sky" />
          </span>
          {hero.availability}
        </p>

        <h1 className="text-display text-fg">
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-9 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <p data-hero-fade className="max-w-[46ch] text-lead text-fg-muted md:col-span-7">
            {hero.sub}
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
            <Link href={hero.primaryCta.href} className="btn-sky">
              {hero.primaryCta.label}
            </Link>
            <Link href={hero.secondaryCta.href} className="btn-line">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* The work, straight away. Drag it, or tab through it. */}
      <div data-hero-reel className="mt-16 md:mt-24">
        <div
          ref={track}
          className="reel no-scrollbar flex cursor-grab items-end gap-5 overflow-x-auto px-[var(--gutter)] pb-2 active:cursor-grabbing motion-safe:overflow-x-visible md:gap-6"
          role="list"
          aria-label="Recent projects"
        >
          {reel.map(({ key, kind, project }, i) => (
            <div key={key} data-reel-item role="listitem" className="shrink-0">
              <Link
                href={`/projects/${project.slug}`}
                className="group block rounded-frame"
                draggable={false}
                aria-label={kind === "desktop" ? `${project.name} case study` : `${project.name} on mobile`}
                tabIndex={kind === "phone" ? -1 : 0}
              >
                {kind === "desktop" ? (
                  <DesktopFrame
                    shot={project.desktop[0]}
                    hover={project.desktop[1]}
                    sizes="(min-width: 768px) 520px, 78vw"
                    priority={i < 3}
                    className="w-[78vw] max-w-[520px] sm:w-[440px] md:w-[520px]"
                  />
                ) : (
                  <PhoneFrame
                    shot={project.mobile[0]}
                    sizes="(min-width: 768px) 150px, 36vw"
                    className="w-[calc(78vw*0.2885)] max-w-[150px] sm:w-[127px] md:w-[150px]"
                  />
                )}
                <span className="mt-3 flex items-baseline justify-between gap-4 text-small">
                  <span className="font-medium text-fg">{kind === "desktop" ? project.name : " "}</span>
                  {kind === "desktop" && <span className="text-fg-faint">{project.sector}</span>}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
