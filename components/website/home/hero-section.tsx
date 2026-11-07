import Link from "next/link";
import type { CSSProperties } from "react";
import { hero } from "@/lib/content/site";
import { TopoMap } from "@/components/website/home/topo-map";
import { LogoMarquee } from "@/components/website/home/logo-marquee";

// Stagger index for the CSS entrance (see .hero-line and .hero-fade in globals.css).
const order = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

/**
 * Server-rendered, no JavaScript. The entrance is CSS keyframes, so it plays from
 * the first paint instead of waiting for the page to hydrate.
 */
export function HeroSection() {
  return (
    <section className="px-2 pt-[calc(var(--nav-h)+0.25rem)] sm:px-3">
      <div className="forest relative isolate overflow-hidden rounded-frame">
        <TopoMap drift className="hero-map absolute inset-0 -z-10" />

        <div className="container-x flex min-h-[min(46rem,calc(100svh-var(--nav-h)-1rem))] flex-col justify-end pb-10 pt-20 sm:pb-12 md:pt-28">
          <p
            className="hero-fade mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-rule bg-raised/70 px-3.5 py-1.5 text-small text-fg-muted"
            style={order(0)}
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
              <span className="relative h-2 w-2 rounded-full bg-signal" />
            </span>
            {hero.availability}
          </p>

          <h1 className="text-[clamp(2.5rem,7vw,6.25rem)] leading-[0.98] tracking-[-0.04em] text-fg">
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.05em]">
                <span className="hero-line block" style={order(i)}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-rule pt-8 md:grid-cols-12 md:items-end">
            <p className="hero-fade max-w-[48ch] text-lead text-fg-muted md:col-span-7" style={order(1)}>
              {hero.sub}
            </p>
            <div className="hero-fade flex flex-wrap gap-3 md:col-span-5 md:justify-end" style={order(2)}>
              <Link href={hero.primaryCta.href} className="btn-brand">
                {hero.primaryCta.label}
              </Link>
              <Link href={hero.secondaryCta.href} className="btn-line">
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-fade flex items-center gap-6 border-t border-rule bg-well/50 py-5 pl-[var(--gutter)]" style={order(3)}>
          <p className="hidden shrink-0 text-small text-fg-faint sm:block">Built with</p>
          <LogoMarquee className="min-w-0 flex-1" />
        </div>
      </div>
    </section>
  );
}
