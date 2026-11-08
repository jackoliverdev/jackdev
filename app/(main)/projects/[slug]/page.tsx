import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/lib/content/projects";
import { site, testimonials } from "@/lib/content/site";
import { DesktopFrame, PhoneFrame } from "@/components/website/work/frames";
import { Showcase } from "@/components/website/work/showcase";
import { TopoMap } from "@/components/website/home/topo-map";
import { stagger } from "@/lib/reveal";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} case study | Jack Oliver Dev`;
  return {
    title,
    description: project.seoDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description: project.seoDescription,
      url: `${site.url}/projects/${project.slug}`,
      siteName: site.legalName,
      locale: "en_GB",
      type: "article",
      images: [{ url: project.desktop[0].src, alt: project.desktop[0].alt }],
    },
    twitter: { card: "summary_large_image", title, description: project.seoDescription },
  };
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className={className}>
      <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const quote = testimonials.find((t) => t.project === project.slug);
  const gallery = project.desktop.slice(1);
  const [, m2] = project.mobile;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.name} case study`,
    description: project.seoDescription,
    url: `${site.url}/projects/${project.slug}`,
    image: `${site.url}${project.desktop[0].src}`,
    author: { "@type": "Person", name: site.personName, url: site.url },
    about: { "@type": "Organization", name: project.name, url: project.url },
  };

  const initials = quote ? quote.name.split(" ").map((p) => p[0]).join("").slice(0, 2) : "";
  const facts = [
    { label: "Sector", value: project.sector },
    { label: "Year", value: project.year },
    { label: "What I built", value: project.built.join(", ") },
    { label: "Built with", value: project.stack.join(", ") },
  ];

  return (
    <main id="main" className="pb-2 pt-[calc(var(--nav-h)+clamp(1.5rem,4vw,3rem))] sm:pb-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container-x">
        <Link href="/#work" className="group inline-flex items-center gap-2 text-small text-fg-muted transition-colors hover:text-fg">
          <Arrow className="rotate-180 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
          All work
        </Link>

        {/* Header: name and pitch on the left, the facts in a panel on the right. */}
        <header className="mt-6 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div data-reveal className="min-w-0 lg:col-span-7">
            <p className="text-small text-fg-muted">{project.client}</p>
            <h1 className="mt-2 text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[1] tracking-[-0.04em] text-fg">{project.name}</h1>
            <p className="mt-5 max-w-[46ch] text-lead text-fg-muted">{project.tagline}</p>
          </div>
          <div data-reveal style={stagger(1)} className="min-w-0 rounded-frame border border-rule bg-raised lg:col-span-5">
            <dl className="divide-y divide-rule">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3 text-small">
                  <dt className="text-fg-faint">{fact.label}</dt>
                  <dd className="text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-rule p-4">
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-brand w-full">
                Visit {project.url.replace(/^https?:\/\/(www\.)?/, "")}
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <path d="M3 9l6-6M4.5 3H9v4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        <div data-reveal="zoom" style={stagger(2)} className="mt-8 lg:mt-10">
          <Showcase project={project} large priority caption={false} className="md:aspect-[16/9]" />
        </div>

        {/* The story in three short blocks. */}
        <section aria-label="Overview" className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3 lg:mt-14">
          <div data-reveal className="rounded-frame border border-rule bg-raised p-6">
            <h2 className="text-h3 text-fg">The brief</h2>
            <p className="mt-3 text-fg-muted">{project.challenge}</p>
          </div>
          <div data-reveal style={stagger(1)} className="rounded-frame border border-rule bg-raised p-6">
            <h2 className="text-h3 text-fg">What I built</h2>
            <p className="mt-3 text-fg-muted">{project.solution}</p>
          </div>
          <div data-reveal style={stagger(2)} className="rounded-frame border border-rule bg-raised p-6">
            <h2 className="text-h3 text-fg">What changed</h2>
            <ul className="mt-3 space-y-2.5">
              {project.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-fg">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-earth" aria-hidden />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="highlights" data-reveal className="mt-3 rounded-frame border border-rule bg-raised p-6 md:p-8">
          <h2 id="highlights" className="text-h3 text-fg">
            Highlights
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-x-10 gap-y-2.5 md:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-fg">
                <svg width="14" height="14" viewBox="0 0 14 14" className="mt-[0.3em] shrink-0 text-earth" aria-hidden>
                  <path d="M2.5 7.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Gallery: every desktop shot at 16:10 and the phone shot on a matching forest mat. */}
        <section aria-label="Screens" className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:mt-14">
          {gallery.map((shot, i) => (
            <div key={shot.src} data-reveal style={stagger(i % 2)}>
              <DesktopFrame shot={shot} sizes="(min-width: 768px) 640px, 92vw" />
            </div>
          ))}
          {m2 && (
            <div data-reveal style={stagger(1)} className="forest relative isolate flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[var(--radius-shot)]">
              <TopoMap className="absolute inset-0 -z-10 opacity-60" />
              <PhoneFrame shot={m2} sizes="200px" className="h-[86%] w-auto" />
            </div>
          )}
        </section>

        {quote && (
          <figure data-reveal className="mt-10 grid grid-cols-1 gap-6 rounded-frame border border-rule bg-raised p-6 md:grid-cols-12 md:gap-10 md:p-10 lg:mt-14">
            <svg width="34" height="26" viewBox="0 0 34 26" aria-hidden className="text-earth md:col-span-1">
              <path
                fill="currentColor"
                d="M0 26V15.6C0 6.9 4.6 1.7 13.6 0l1.6 3.6C10 5 7.6 7.8 7.3 11.8H14V26H0Zm19 0V15.6C19 6.9 23.6 1.7 32.6 0l1.4 3.6c-5.2 1.4-7.6 4.2-7.9 8.2H33V26H19Z"
              />
            </svg>
            <blockquote className="space-y-4 md:col-span-7">
              {quote.quote.map((para) => (
                <p key={para} className="text-[clamp(1.0625rem,1.35vw,1.1875rem)] leading-[1.6] text-fg">
                  {para}
                </p>
              ))}
            </blockquote>
            <figcaption className="flex items-center gap-3.5 border-t border-rule pt-5 md:col-span-4 md:items-start md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-well text-small font-semibold text-fg" aria-hidden>
                {initials}
              </span>
              <span>
                <span className="block font-medium text-fg">{quote.name}</span>
                <span className="block text-small text-fg-muted">
                  {quote.role}, {quote.company}
                </span>
              </span>
            </figcaption>
          </figure>
        )}
      </article>

      {/* Close: next project and a call to action, side by side. */}
      <section className="container-x mt-10 grid grid-cols-1 gap-3 pb-[var(--section-y)] md:grid-cols-2 lg:mt-14">
        <Link href={`/projects/${next.slug}`} data-reveal className="group flex flex-col gap-4 rounded-frame border border-rule bg-raised p-4">
          <Showcase project={next} caption={false} />
          <span className="flex items-center justify-between gap-4 px-1 pb-1">
            <span>
              <span className="block text-caption text-fg-faint">Next project</span>
              <span className="mt-0.5 block font-display text-h3 font-semibold tracking-[-0.02em] text-fg [font-stretch:var(--display-stretch)]">
                {next.name}
              </span>
            </span>
            <Arrow className="h-5 w-5 text-earth-ink transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </span>
        </Link>
        <div data-reveal style={stagger(1)} className="forest relative isolate flex flex-col justify-end overflow-hidden rounded-frame p-6 md:p-10">
          <TopoMap className="absolute inset-0 -z-10" />
          <h2 className="max-w-[14ch] text-h1 text-fg">Want something like this?</h2>
          <p className="mt-4 max-w-[38ch] text-fg-muted">Tell me what you need. You get a straight answer and a fixed price, with no surprises along the way.</p>
          <Link href="/#contact" className="btn-brand mt-7 w-fit">
            Book a call
          </Link>
        </div>
      </section>
    </main>
  );
}
