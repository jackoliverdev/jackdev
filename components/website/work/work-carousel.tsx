"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { clamp, onScrollFrame } from "@/lib/scroll";
import type { Project } from "@/lib/content/projects";
import { Showcase } from "@/components/website/work/showcase";
import { TopoMap } from "@/components/website/home/topo-map";
import { Logo, LogoIcon } from "@/components/brand/logo";

/**
 * A 3D ring of project cards, like flicking through a CD rack.
 *
 * Performance: pure CSS 3D (preserve-3d + transforms), no 3D library. One small
 * requestAnimationFrame loop runs only while the ring is moving; it writes the
 * ring's transform and one CSS variable per card (how far each card is turned
 * away, for shading). React re-renders only when the front card changes.
 *
 * Interaction: drag or swipe to spin (with momentum and snap), click a side card
 * to bring it to the front, click the front card to open the case study, arrow
 * buttons and arrow keys step through.
 *
 * Scroll: as the ring scrolls into view the scroll itself turns it, half a turn
 * from the moment it appears to the moment it is centred on screen (scroll back
 * and it turns back). Once it has been centred it stays put.
 *
 * Timer: from then on a line fills under the counter and the ring steps to the
 * next card when it completes. Hover, focus and being off screen pause it. Any
 * manual move (drag, arrows, dots, keys, clicking a card) hands control to the
 * visitor and the timer stops for good. Reduced motion: no spin-in, no timer,
 * instant moves.
 */

const TILT = -7; // degrees: looking down on the ring slightly
const SPACING = 1.32; // ring depth as a multiple of the tight-fit radius
const OVAL = 1.25; // desktop: how much wider than deep the ring is (1 = circle, used on phones)
const FACE_TURN = 0.82; // cards turn a little less than their angle round the ring, so more of each face shows

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const SPIN_IN = 180; // degrees the scroll turns the ring through on the way in
const AUTO_MS = 5000; // how long each card stays at the front while the timer runs

const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function WorkCarousel({ items }: { items: Project[] }) {
  const n = items.length;
  const step = 360 / n;
  // Radius that keeps cards from touching, in card widths (CSS multiplies by --cw).
  const radiusFactor = (1 / (2 * Math.tan(Math.PI / n))) * SPACING;

  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const rot = useRef(0); // degrees; the card at index i faces front when rot = i * step
  const frame = useRef(0);
  const reduced = useRef(false);
  const paused = useRef(false);
  const inView = useRef(false);
  const dragged = useRef(false);
  const entered = useRef(false); // the scroll spin-in is done (or the visitor took over)
  const timerRef = useRef<HTMLSpanElement | null>(null);
  const [auto, setAuto] = useState(false);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const geo = useRef({ rx: 0, rz: 0 }); // ring radii in px, measured from the card width

  // Measure the card and size the ring: a circle on phones, a wide oval on desktop.
  const measure = useCallback(() => {
    const cw = cardRefs.current[0]?.offsetWidth ?? 0;
    if (!cw) return;
    const rz = cw * radiusFactor;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    geo.current = { rx: wide ? rz * OVAL : rz, rz };
  }, [radiusFactor]);

  const apply = useCallback(() => {
    const ring = ringRef.current;
    if (!ring) return;
    // The ring itself only tilts; each card is placed on the ellipse directly.
    ring.style.transform = `rotateX(${TILT}deg)`;
    const { rx, rz } = geo.current;
    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const signed = (((i * step - rot.current) % 360) + 540) % 360 - 180; // -180..180, 0 = front
      const rad = (signed * Math.PI) / 180;
      if (rx) {
        const x = rx * Math.sin(rad);
        const z = rz * (Math.cos(rad) - 1);
        el.style.transform = `translate3d(${x.toFixed(1)}px,0,${z.toFixed(1)}px) rotateY(${(signed * FACE_TURN).toFixed(2)}deg)`;
      }
      const rel = Math.abs(signed);
      const facing = Math.cos(rad); // 1 front, -1 back
      el.style.setProperty("--shade", ((1 - facing) * 0.42).toFixed(3));
      el.style.pointerEvents = rel < 95 ? "auto" : "none";
    }
    const front = ((Math.round(rot.current / step) % n) + n) % n;
    if (front !== activeRef.current) {
      activeRef.current = front;
      setActive(front);
    }
  }, [n, step]);

  const animateTo = useCallback(
    (to: number, duration = 900, ease = easeOutExpo) => {
      cancelAnimationFrame(frame.current);
      if (reduced.current) duration = 1;
      const from = rot.current;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        rot.current = from + (to - from) * ease(t);
        apply();
        if (t < 1) frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    },
    [apply]
  );

  // Shortest way round to card i.
  const go = useCallback(
    (i: number, duration?: number) => {
      const base = i * step;
      const k = Math.round((rot.current - base) / 360);
      animateTo(base + k * 360, duration);
    },
    [animateTo, step]
  );
  // Autoplay steps: a symmetrical ease reads as calm rather than a flick.
  const goSmooth = useCallback(
    (i: number) => {
      const base = i * step;
      const k = Math.round((rot.current - base) / 360);
      animateTo(base + k * 360, 1500, easeInOutCubic);
    },
    [animateTo, step]
  );
  // The timer line runs only while nothing is holding it.
  const syncTimer = useCallback(() => {
    const t = timerRef.current;
    if (t) t.style.animationPlayState = paused.current || !inView.current ? "paused" : "running";
  }, []);
  const hold = useCallback(
    (on: boolean) => {
      paused.current = on;
      syncTimer();
    },
    [syncTimer]
  );
  // Any manual move: the visitor is driving now, so the spin-in and timer stop.
  const takeOver = useCallback(() => {
    entered.current = true;
    setAuto(false);
  }, []);

  const next = useCallback(() => {
    takeOver();
    go(activeRef.current + 1);
  }, [go, takeOver]);
  const prev = useCallback(() => {
    takeOver();
    go(activeRef.current - 1);
  }, [go, takeOver]);

  // Set up: initial paint, spin-in on first view, autoplay while visible.
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    measure();
    apply();
    const onResize = () => {
      measure();
      apply();
    };
    window.addEventListener("resize", onResize, { passive: true });
    const stage = stageRef.current;
    if (!stage) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        syncTimer();
      },
      { threshold: 0.35 }
    );
    io.observe(stage);

    // The spin-in, driven by the scroll: 0 as the stage's top meets the bottom of
    // the screen, 1 when the stage is centred. Then it hands over to the timer.
    let stopScroll = () => {};
    if (reduced.current) entered.current = true;
    else
      stopScroll = onScrollFrame(() => {
        if (entered.current) return;
        const r = stage.getBoundingClientRect();
        const vh = window.innerHeight;
        // Done a whisker before exactly centred, so any scroll that reaches centre counts.
        const e = clamp((vh - r.top) / (vh / 2 + r.height / 2) / 0.97);
        rot.current = -SPIN_IN * (1 - easeOutQuad(e));
        apply();
        if (e >= 1) {
          entered.current = true;
          setAuto(true);
          queueMicrotask(() => stopScroll());
        }
      });

    return () => {
      window.removeEventListener("resize", onResize);
      io.disconnect();
      stopScroll();
      cancelAnimationFrame(frame.current);
    };
  }, [apply, measure, syncTimer]);

  // Drag and swipe, with momentum, snapping to the nearest card.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let startX = 0;
    let startRot = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0; // degrees per ms
    let down = false;

    const degPerPx = () => step / Math.max(200, (cardRefs.current[0]?.offsetWidth ?? 320) * 0.9);

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      down = true;
      dragged.current = false;
      hold(true);
      cancelAnimationFrame(frame.current);
      startX = lastX = e.clientX;
      startRot = rot.current;
      lastT = performance.now();
      velocity = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!dragged.current && Math.abs(dx) > 6) {
        dragged.current = true;
        takeOver();
        stage.setPointerCapture(e.pointerId);
      }
      if (!dragged.current) return;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      velocity = (-(e.clientX - lastX) * degPerPx()) / dt;
      lastX = e.clientX;
      lastT = now;
      rot.current = startRot - dx * degPerPx();
      apply();
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (dragged.current) {
        const projected = rot.current + velocity * 220;
        const target = Math.round(projected / step) * step;
        animateTo(target, 1000);
      }
      window.setTimeout(() => hold(stage.matches(":hover")), 1200);
    };

    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [animateTo, apply, hold, step, takeOver]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const current = items[active];

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="More projects"
      onPointerEnter={() => hold(true)}
      onPointerLeave={() => hold(false)}
      onFocus={() => hold(true)}
      onBlur={() => hold(false)}
      onKeyDown={onKey}
    >
      {/* The stage: perspective lives here; the ring inside turns. */}
      <div
        ref={stageRef}
        className="work-stage relative mx-auto cursor-grab select-none touch-pan-y active:cursor-grabbing"
        style={{ ["--rf" as string]: radiusFactor.toFixed(4) }}
      >
        {/* A soft floor shadow under the ring: one static gradient, nothing animated. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[8%] bottom-[-6%] h-[18%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(var(--olive-950)/0.22),transparent)] blur-md"
        />
        <div ref={ringRef} className="work-ring absolute inset-0 [transform-style:preserve-3d]">
          {items.map((project, i) => (
            <Link
              key={project.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              href={`/projects/${project.slug}`}
              draggable={false}
              tabIndex={i === active ? 0 : -1}
              aria-label={`${project.name}: view project`}
              aria-hidden={i !== active || undefined}
              onClick={(e) => {
                if (dragged.current) {
                  e.preventDefault();
                  return;
                }
                if (i !== activeRef.current) {
                  e.preventDefault();
                  takeOver();
                  go(i);
                }
              }}
              className="work-card group absolute left-1/2 top-0 block [transform-style:preserve-3d]"
              style={{ transform: `rotateY(${i * step}deg) translateZ(var(--r))` }}
            >
              {/* Front face */}
              <div className="relative [backface-visibility:hidden]">
                <div className="overflow-hidden rounded-[12px] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.55)]">
                  <Showcase project={project} eager className="rounded-none lg:aspect-[20/17]" />
                  <div className="band-sage px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <h3 className="text-h3 text-fg">{project.name}</h3>
                    <p className="mt-2 line-clamp-3 text-small text-fg-muted">{project.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-small font-medium text-fg">
                      View project
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </div>
                </div>
                {/* Cards turned away from you darken, so the front one leads. */}
                <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[12px] bg-[rgb(12_16_12)] [opacity:var(--shade,0)]" />
              </div>
              {/* Back face: what you see on the far side of the ring, like the back of a CD case. */}
              <div
                aria-hidden
                className="forest absolute inset-0 isolate flex flex-col justify-end overflow-hidden rounded-[12px] p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
              >
                <TopoMap className="absolute inset-0 -z-10 opacity-70" />
                <LogoIcon className="mb-auto h-9 text-fg" />
                {/* The wordmark, as in the nav, dead centre of the back. */}
                <span className="pointer-events-none absolute inset-0 grid place-items-center">
                  <Logo icon={false} className="text-[1.375rem] sm:text-[1.5rem]" />
                </span>
                <p className="text-small text-fg-muted">{project.sector}</p>
                <p className="mt-1 font-display text-h3 font-semibold tracking-[-0.02em] text-fg [font-stretch:var(--display-stretch)]">{project.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Controls: step through, see where you are. */}
      <div className="relative z-10 mt-6 flex items-center justify-between gap-4 sm:mt-8">
        <p className="min-w-0 text-small text-fg-muted" aria-live="polite">
          <span className="relative inline-block pb-2 tabular text-earth-ink">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            {/* The timer: fills while this card is at the front, then turns to the next. */}
            {auto && (
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden rounded-full bg-rule">
                <span
                  key={active}
                  ref={(el) => {
                    timerRef.current = el;
                    if (el) syncTimer();
                  }}
                  onAnimationEnd={() => goSmooth(activeRef.current + 1)}
                  className="review-timer block h-full origin-left scale-x-0 bg-earth"
                  style={{ animationDuration: `${AUTO_MS}ms` }}
                />
              </span>
            )}
          </span>
          <span className="ml-3 hidden text-fg sm:inline">{current.name}</span>
          <span className="ml-3 hidden text-fg-faint md:inline">Drag to spin, or tap a card</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {items.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => {
                takeOver();
                go(i);
              }}
              className="hidden h-2 w-2 rounded-full transition-[transform,background-color] duration-300 sm:block data-[on=true]:scale-125 data-[on=true]:bg-earth bg-rule"
              data-on={i === active}
              aria-label={`Show ${project.name}`}
              aria-current={i === active || undefined}
            />
          ))}
          <span className="mx-2 hidden h-4 w-px bg-rule sm:block" aria-hidden />
          <button type="button" onClick={prev} className="grid h-11 w-11 place-items-center rounded-full border border-rule text-fg transition-colors hover:bg-raised" aria-label="Previous project">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="rotate-180">
              <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button type="button" onClick={next} className="grid h-11 w-11 place-items-center rounded-full border border-rule text-fg transition-colors hover:bg-raised" aria-label="Next project">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
