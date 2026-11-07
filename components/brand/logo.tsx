import { logoIcon, logoWordmark } from "@/lib/brand/logo-paths";
import { cn } from "@/lib/utils";

/**
 * The logo, drawn from the same outlines as public/brand/*.svg.
 * Ink follows currentColor so it themes itself; the dots use the signal colour.
 */
export function LogoIcon({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="12 0 40 64"
      className={cn("h-8 w-auto", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={logoIcon.stroke} fill="none" stroke="currentColor" strokeWidth={logoIcon.width} />
      <circle cx={logoIcon.dot.cx} cy={logoIcon.dot.cy} r={logoIcon.dot.r} className="fill-signal" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  const [x, y, w, h] = logoWordmark.box;
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-fg", className)}>
      <LogoIcon className="h-[1.9em]" />
      <svg viewBox={`${x} ${y} ${w} ${h}`} className="h-[1.05em] w-auto" aria-hidden>
        <path d={logoWordmark.body} fill="currentColor" />
        <path d={logoWordmark.dots} className="fill-signal" />
        <path d={logoWordmark.dev} className="fill-fg-muted" />
      </svg>
      <span className="sr-only">Jack Oliver Dev</span>
    </span>
  );
}
