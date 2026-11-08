import { cn } from "@/lib/utils";

/**
 * The contour map behind every forest panel. It is one static SVG file
 * (public/brand/topo.svg, built by scripts/generate-topo.mjs), so the browser
 * rasterises it once and caches it for every panel on the page.
 *
 * `drift` adds a very slow sway. It moves the whole image as one GPU layer
 * (transform only), so it never repaints the curves.
 */
export function TopoMap({ className, drift }: { className?: string; drift?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, nothing for next/image to optimise */}
      <img
        src="/brand/topo.svg"
        alt=""
        decoding="async"
        draggable={false}
        className={cn(
          "absolute max-w-none select-none object-cover",
          drift ? "topo-drift -inset-[15%] h-[130%] w-[130%]" : "inset-0 h-full w-full"
        )}
      />
    </div>
  );
}
