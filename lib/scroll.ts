/**
 * Run `fn` at most once per frame while the page scrolls or resizes, and once
 * straight away. Passive listeners. Returns a function that stops it.
 */
export function onScrollFrame(fn: () => void) {
  let frame = 0;
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(run);
  };
  const run = () => {
    frame = 0;
    fn();
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  run();
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
