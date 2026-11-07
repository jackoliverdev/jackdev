import Link from "next/link";
import { projects, type Project } from "@/lib/content/projects";
import { DesktopFrame, PhoneFrame } from "@/components/website/work/frames";
import { Reveal } from "@/components/website/motion/reveal";
import { cn } from "@/lib/utils";

/** Desktop and phone together on an ice mat: the same composition for every project. */
function Showcase({ project, large, priority }: { project: Project; large?: boolean; priority?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-frame bg-well px-[7%] pb-[9%] pt-[7%]">
      <DesktopFrame
        shot={project.desktop[0]}
        hover={project.desktop[1]}
        sizes={large ? "(min-width: 1024px) 760px, 90vw" : "(min-width: 768px) 560px, 90vw"}
        priority={priority}
        className="w-[88%] transition-transform duration-700 ease-out group-hover:-translate-y-1"
      />
      <PhoneFrame
        shot={project.mobile[0]}
        sizes={large ? "200px" : "140px"}
        className="absolute bottom-[6%] right-[6%] w-[22%] transition-transform duration-700 ease-out group-hover:-translate-y-2"
      />
    </div>
  );
}

function Meta({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div className={cn("flex flex-col", large ? "gap-5" : "mt-6 gap-3")}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className={cn("text-fg", large ? "text-h2" : "text-h3")}>
          <span className="bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out [background-image:linear-gradient(rgb(var(--sky)),rgb(var(--sky)))] group-hover:bg-[length:100%_2px]">
            {project.name}
          </span>
        </h3>
        <p className="text-small text-fg-faint">
          {project.status === "launching" ? "Launching soon" : project.year}
        </p>
      </div>
      <p className={cn("max-w-[52ch] text-fg-muted", large && "text-lead")}>{project.tagline}</p>
      <ul className="flex flex-wrap gap-2" aria-label="What I built">
        {project.built.map((item) => (
          <li key={item} className="rounded-full border border-rule px-3 py-1 text-caption text-fg-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SelectedWork() {
  const [first, second, third, ...rest] = projects;
  const features = [first, second, third];

  return (
    <section id="work" className="section-y scroll-mt-20">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="text-h1 text-fg md:col-span-7">Selected work</h2>
          <p className="max-w-[44ch] text-fg-muted md:col-span-5 md:justify-self-end">
            AI platforms, SaaS products and the websites that keep local firms busy. Everything here is live or
            launching, and built by me.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-28">
          {features.map((project, i) => (
            <Reveal key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group grid items-center gap-8 rounded-frame md:grid-cols-12 md:gap-12"
              >
                <div className={cn("md:col-span-8", i % 2 === 1 && "md:order-2")}>
                  <Showcase project={project} large priority={i === 0} />
                </div>
                <div className={cn("md:col-span-4", i % 2 === 1 && "md:order-1")}>
                  <p className="mb-4 text-small text-fg-muted">{project.client}</p>
                  <Meta project={project} large />
                  <span className="mt-8 inline-flex items-center gap-2 text-small font-medium text-sky-ink">
                    Read the case study
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                      <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-16 md:mt-28 md:grid-cols-2">
          {rest.map((project) => (
            <Reveal key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="group block rounded-frame">
                <Showcase project={project} />
                <Meta project={project} />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
