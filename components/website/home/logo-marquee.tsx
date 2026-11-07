import { techLogos } from "@/lib/brand/tech-logos";
import { cn } from "@/lib/utils";

/**
 * An endless strip of platform logos, one size and one colour so they read as a set.
 * Pure CSS: two identical groups sit in a max-content track, each group carries its
 * own trailing gap, and the track slides by exactly -50%, so the loop is seamless.
 * Pauses on hover; stops for reduced motion.
 */
function Group({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-11 pr-11" aria-hidden={hidden || undefined} aria-label={hidden ? undefined : "Platforms I build with"}>
      {techLogos.map((logo) => (
        <li key={logo.name} title={logo.name} className="shrink-0">
          <svg
            viewBox={logo.viewBox}
            className="h-6 w-6 fill-current text-fg-muted transition-colors duration-200 hover:text-fg"
            role={hidden ? undefined : "img"}
            aria-label={hidden ? undefined : logo.name}
          >
            <path d={logo.path} />
          </svg>
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee({ className, reverse, speed = 45 }: { className?: string; reverse?: boolean; speed?: number }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]",
        className
      )}
      style={{ ["--marquee-duration" as string]: `${speed}s` }}
    >
      <div className={cn("marquee-track flex w-max group-hover:[animation-play-state:paused]", reverse && "marquee-reverse")}>
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
