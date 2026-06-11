"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, useGSAP);
}

export const EASE_OUT_EXPO = "expo.out";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface HorizontalLoopConfig {
  /** Pixels-per-second is `speed * 100`. Defaults to 1. */
  speed?: number;
  paused?: boolean;
  /** Use -1 for an endless loop. */
  repeat?: number;
  reversed?: boolean;
  /** Extra space after the last item before the first wraps back in. */
  paddingRight?: number;
  /** Snap increment, or `false` to disable snapping. */
  snap?: number | false;
  draggable?: boolean;
  onChange?: (item: HTMLElement, index: number) => void;
}

export interface HorizontalLoop extends gsap.core.Timeline {
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
  closestIndex: (setCurrent?: boolean) => number;
  current: () => number;
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  times: number[];
  draggable?: Draggable;
}

/**
 * GreenSock's official seamless looping helper (adapted to TypeScript).
 * Each item is repositioned with `xPercent` as it leaves one edge, so the
 * row appears endless with no DOM duplication and no jump. Optionally wires
 * up a Draggable proxy (needs InertiaPlugin) for grab-and-throw control.
 * https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop/
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function horizontalLoop(
  targets: gsap.DOMTarget,
  config: HorizontalLoopConfig = {}
): HorizontalLoop {
  let timeline!: HorizontalLoop;
  const items = gsap.utils.toArray<HTMLElement>(targets);

  gsap.context(() => {
    const onChange = config.onChange;
    let lastIndex = 0;
    const tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onUpdate:
        onChange &&
        (() => {
          const i = (tl as HorizontalLoop).closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        }),
      onReverseComplete: () =>
        tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }) as HorizontalLoop;

    const length = items.length;
    const startX = items[0].offsetLeft;
    const times: number[] = [];
    const widths: number[] = [];
    const spaceBefore: number[] = [];
    const xPercents: number[] = [];
    let curIndex = 0;
    let indexIsDirty = false;
    const pixelsPerSecond = (config.speed || 1) * 100;
    const snap =
      config.snap === false
        ? (v: number) => v
        : gsap.utils.snap(config.snap || 1);
    const container = items[0].parentNode as HTMLElement;
    let totalWidth = 0;

    const getTotalWidth = () =>
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      spaceBefore[0] +
      items[length - 1].offsetWidth *
        (gsap.getProperty(items[length - 1], "scaleX") as number) +
      (Number(config.paddingRight) || 0);

    const populateWidths = () => {
      let b1 = container.getBoundingClientRect();
      let b2: DOMRect;
      items.forEach((el, i) => {
        widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i]) *
            100 +
            (gsap.getProperty(el, "xPercent") as number)
        );
        b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });
      gsap.set(items, { xPercent: (i: number) => xPercents[i] });
      totalWidth = getTotalWidth();
    };

    let timeWrap: (value: number) => number;

    const getClosest = (values: number[], value: number, wrap: number) => {
      let i = values.length;
      let closest = 1e10;
      let index = 0;
      let d: number;
      while (i--) {
        d = Math.abs(values[i] - value);
        if (d > wrap / 2) d = wrap - d;
        if (d < closest) {
          closest = d;
          index = i;
        }
      }
      return index;
    };

    const populateTimeline = () => {
      tl.clear();
      for (let i = 0; i < length; i++) {
        const item = items[i];
        const curX = (xPercents[i] / 100) * widths[i];
        const distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        const distanceToLoop =
          distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = gsap.utils.wrap(0, tl.duration());
    };

    const refresh = (deep?: boolean) => {
      const progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      if (deep) populateTimeline();
      if (deep && tl.draggable && tl.paused()) tl.time(times[curIndex], true);
      else tl.progress(progress, true);
    };

    const onResize = () => refresh(true);
    let proxy: HTMLElement;

    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    window.addEventListener("resize", onResize);

    const toIndex = (index: number, vars?: gsap.TweenVars) => {
      vars = vars || {};
      if (Math.abs(index - curIndex) > length / 2)
        index += index > curIndex ? -length : length;
      const newIndex = gsap.utils.wrap(0, length, index);
      let time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) vars.modifiers = { time: timeWrap };
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return vars.duration === 0
        ? tl.time(timeWrap(time))
        : tl.tweenTo(time, vars);
    };

    tl.toIndex = (index, vars) => toIndex(index, vars) as gsap.core.Tween;
    tl.closestIndex = (setCurrent?: boolean) => {
      const index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars) => toIndex(tl.current() + 1, vars) as gsap.core.Tween;
    tl.previous = (vars) => toIndex(tl.current() - 1, vars) as gsap.core.Tween;
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance

    if (config.reversed) {
      (tl.vars.onReverseComplete as () => void)();
      tl.reverse();
    }

    if (config.draggable && typeof Draggable === "function") {
      proxy = document.createElement("div");
      const wrap = gsap.utils.wrap(0, 1);
      let ratio: number;
      let startProgress: number;
      let draggable: Draggable;
      let lastSnap: number;
      let initChangeX: number;
      const align = () =>
        tl.progress(
          wrap(startProgress + (draggable.startX - draggable.x) * ratio)
        );
      const syncIndex = () => tl.closestIndex(true);

      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode as HTMLElement,
        type: "x",
        onPressInit(this: Draggable) {
          const x = this.x;
          gsap.killTweensOf(tl);
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = startProgress / -ratio - x;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(this: Draggable, value: number) {
          if (Math.abs(startProgress / -ratio - this.x) < 10)
            return lastSnap + initChangeX;
          const time = -(value * ratio) * tl.duration();
          const wrapTime = timeWrap(time);
          const snapTime = times[getClosest(times, wrapTime, tl.duration())];
          let dif = snapTime - wrapTime;
          if (Math.abs(dif) > tl.duration() / 2)
            dif += dif < 0 ? tl.duration() : -tl.duration();
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease(this: Draggable) {
          syncIndex();
          (this as any).isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: syncIndex,
      } as any)[0];
      tl.draggable = draggable;
    }

    tl.closestIndex(true);
    lastIndex = curIndex;
    if (onChange) onChange(items[curIndex], curIndex);
    timeline = tl;

    return () => window.removeEventListener("resize", onResize);
  });

  return timeline;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export { gsap, ScrollTrigger, Draggable, InertiaPlugin, useGSAP };
