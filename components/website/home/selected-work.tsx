import Link from "next/link";
import { projects, type Project } from "@/lib/content/projects";
import { Showcase } from "@/components/website/work/showcase";
import { cn } from "@/lib/utils";
import { stagger } from "@/lib/reveal";

function Title({ project, className }: { project: Project; className?: string }) {
  return (
    <h3 className={cn("text-fg", className)}>
      <span className="bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out [background-image:linear-gradient(rgb(var(--earth)),rgb(var(--earth)))] group-hover:bg-[length:100%_2px]">
        {project.name}
      </span>
    </h3>
  );
}

function ViewLink({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-small font-medium text-earth-ink">
      {label}
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1">
        <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

export function SelectedWork() {
  const [feature, ...rest] = projects;

  return (
    <section id="work" className="py-[var(--section-y)]">
      <div className="container-x">
        <div data-reveal className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end">
          <h2 className="text-h1 text-fg md:col-span-6">Selected work</h2>
          <p className="max-w-[44ch] text-fg-muted md:col-span-6 md:justify-self-end">
            AI platforms, SaaS products and the websites that keep local firms busy. All live, all built by me.
          </p>
        </div>

        <Link href={`/projects/${feature.slug}`} data-reveal="zoom" className="group mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <Showcase project={feature} large />
          </div>
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
            <Title project={feature} className="text-h1" />
            <p className="max-w-[46ch] text-lead text-fg-muted">{feature.tagline}</p>
            <p className="max-w-[46ch] text-fg-muted">{feature.summary}</p>
            <span className="mt-2">
              <ViewLink label="Read the case study" />
            </span>
          </div>
        </Link>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              data-reveal
              style={stagger(i % 3)}
              className="group flex min-w-0 flex-col"
            >
              <Showcase project={project} />
              <Title project={project} className="mt-5 text-h3" />
              <p className="mt-2 text-fg-muted">{project.tagline}</p>
              <span className="mt-4">
                <ViewLink label="View project" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
