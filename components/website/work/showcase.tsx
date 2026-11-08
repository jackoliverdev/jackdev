import { DesktopFrame, PhoneFrame } from "@/components/website/work/frames";
import { TopoMap } from "@/components/website/home/topo-map";
import type { Project } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

/**
 * Desktop and phone together on a forest-green mat with faint contour lines, the same
 * green as the hero and contact panel. `forest` gives the mat its colour and text roles.
 */
export function Showcase({
  project,
  large,
  priority,
  caption = true,
  eager,
  className,
}: {
  project: Project;
  large?: boolean;
  priority?: boolean;
  caption?: boolean;
  /** Load images straight away. For 3D-transformed places (the carousel) where lazy loading can't tell a card is visible. */
  eager?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "forest relative isolate overflow-hidden rounded-[10px]",
        "shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]",
        large ? "aspect-[16/11]" : "aspect-[5/4]",
        className
      )}
    >
      <TopoMap className="absolute inset-0 -z-10 opacity-60" />
      <DesktopFrame
        shot={project.desktop[0]}
        hover={project.desktop[1]}
        priority={priority}
        loading={eager ? "eager" : undefined}
        sizes={large ? "(min-width: 1024px) 620px, 90vw" : "(min-width: 1024px) 330px, (min-width: 640px) 42vw, 85vw"}
        className={cn(
          "!absolute left-[7%] top-[7%] shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)] transition-transform duration-700 ease-out group-hover:-translate-y-1",
          "w-[78%]"
        )}
      />
      <PhoneFrame
        shot={project.mobile[0]}
        loading={eager ? "eager" : undefined}
        sizes={large ? "160px" : "110px"}
        className={cn(
          "!absolute bottom-[7%] right-[6%] shadow-[0_24px_48px_-20px_rgb(0_0_0/0.7)] transition-transform duration-700 ease-out group-hover:-translate-y-2",
          large ? "w-[20%]" : "w-[24%]"
        )}
      />
      {caption && (
        <p className="absolute bottom-[6%] left-[7%] max-w-[min(58%,19ch)] text-balance text-caption text-fg-muted sm:max-w-[58%]">
          {project.clientShort ? (
            <>
              <span className="sm:hidden">{project.clientShort}</span>
              <span className="hidden sm:inline">{project.client}</span>
            </>
          ) : (
            project.client
          )}
        </p>
      )}
    </div>
  );
}

