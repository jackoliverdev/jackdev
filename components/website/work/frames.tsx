import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectShot } from "@/lib/content/projects";

/** A desktop screenshot in a 16:10 frame. Every desktop shot on the site uses this. */
export function DesktopFrame({
  shot,
  hover,
  sizes,
  priority,
  className,
}: {
  shot: ProjectShot;
  /** Optional second shot that fades in when the parent `.group` is hovered. */
  hover?: ProjectShot;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("frame aspect-[16/10]", className)}>
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
      {hover && (
        <Image
          src={hover.src}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className="object-cover object-top opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      )}
    </div>
  );
}

/** A phone screenshot in a 390:844 frame. */
export function PhoneFrame({
  shot,
  sizes,
  priority,
  className,
}: {
  shot: ProjectShot;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("frame-phone aspect-[390/844]", className)}>
      <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}
