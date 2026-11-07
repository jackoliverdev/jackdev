import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/lib/content/projects";
import { site, testimonials } from "@/lib/content/site";
import { DesktopFrame, PhoneFrame } from "@/components/website/work/frames";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug);
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

export default function ProjectPage({ params }: PageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const quote = testimonials.find((t) => t.project === project.slug);
  const [, d2, d3, d4] = project.desktop;
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

  return (
    <main id="main" className="pt-[calc(var(--nav-h)+clamp(2rem,6vw,4.5rem))]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        <header className="container-x">
          <Link href="/#work" className="group inline-flex items-center gap-2 text-small text-fg-muted transition-colors hover:text-fg">
            <Arrow className="rotate-180 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
            All work
          </Link>

          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="text-fg-muted">{project.client}</p>
              <h1 className="mt-3 text-display text-fg">{project.name}</h1>
            </div>
            <p className="max-w-[40ch] text-lead text-fg-muted md:col-span-4 md:justify-self-end">{project.tagline}</p>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-rule pt-6 md:grid-cols-4">
            <div>
              <dt className="text-small text-fg-faint">Sector</dt>
              <dd className="mt-1 text-fg">{project.sector}</dd>
            </div>
            <div>
              <dt className="text-small text-fg-faint">Year</dt>
              <dd className="mt-1 text-fg">{project.year}</dd>
            </div>
            <div>
              <dt className="text-small text-fg-faint">What I built</dt>
              <dd className="mt-1 text-fg">{project.built.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-small text-fg-faint">Site</dt>
              <dd className="mt-1">
                {project.status === "live" ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="link text-sky-ink">
                    {project.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                ) : (
                  <span className="text-fg">Launching soon</span>
                )}
              </dd>
            </div>
          </dl>
        </header>

        {/* The cover: desktop and phone, the same composition as the homepage. */}
        <div className="container-x mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-frame bg-well px-[6%] pb-[8%] pt-[6%]">
            <DesktopFrame shot={project.desktop[0]} sizes="(min-width: 1320px) 1100px, 90vw" priority className="w-[86%]" />
            <PhoneFrame shot={project.mobile[0]} sizes="(min-width: 768px) 260px, 22vw" priority className="absolute bottom-[5%] right-[5%] w-[21%]" />
          </div>
        </div>

        <div className="container-x section-y grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-[calc(var(--nav-h)+2rem)]">
              <h2 className="text-h3 text-fg">Built with</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tool) => (
                  <li key={tool} className="rounded-full border border-rule px-3 py-1 text-caption text-fg-muted">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-14 md:col-span-8">
            <p className="text-h3 font-display font-medium leading-[1.3] tracking-[-0.02em] text-fg">{project.summary}</p>
            <section>
              <h2 className="text-h3 text-fg">The problem</h2>
              <p className="mt-4 max-w-prose text-lead text-fg-muted">{project.challenge}</p>
            </section>
            <section>
              <h2 className="text-h3 text-fg">What I built</h2>
              <p className="mt-4 max-w-prose text-lead text-fg-muted">{project.solution}</p>
              <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-rule pt-6 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-fg">
                    <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Gallery: one ratio per device, so nothing is cropped differently. */}
        <div className="container-x space-y-6 md:space-y-8">
          {d2 && <DesktopFrame shot={d2} sizes="(min-width: 1320px) 1320px, 92vw" />}
          <div className="grid items-start gap-6 md:grid-cols-12 md:gap-8">
            {d3 && <DesktopFrame shot={d3} sizes="(min-width: 768px) 880px, 92vw" className="md:col-span-9" />}
            {m2 && (
              <div className="md:col-span-3">
                <PhoneFrame shot={m2} sizes="(min-width: 768px) 300px, 60vw" className="mx-auto w-[60%] md:w-full" />
              </div>
            )}
          </div>
          {d4 && <DesktopFrame shot={d4} sizes="(min-width: 1320px) 1320px, 92vw" />}
        </div>

        <div className="container-x section-y grid gap-12 md:grid-cols-12">
          <section className="md:col-span-5">
            <h2 className="text-h2 text-fg">What changed</h2>
            <ul className="mt-8 space-y-5">
              {project.outcomes.map((outcome) => (
                <li key={outcome} className="border-t border-rule pt-5 text-lead text-fg">
                  {outcome}
                </li>
              ))}
            </ul>
          </section>
          {quote && (
            <figure className="md:col-span-6 md:col-start-7">
              <blockquote className="font-display text-[clamp(1.5rem,2.9vw,2.5rem)] font-medium leading-[1.18] tracking-[-0.03em] text-fg">
                &ldquo;{quote.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 border-t border-rule pt-5">
                <span className="block font-medium text-fg">{quote.name}</span>
                <span className="text-small text-fg-muted">
                  {quote.role}, {quote.company}
                </span>
              </figcaption>
            </figure>
          )}
        </div>
      </article>

      <section className="border-t border-rule">
        <div className="container-x grid gap-10 py-16 md:grid-cols-12 md:items-center md:py-24">
          <div className="md:col-span-5">
            <h2 className="text-h1 text-fg">Want something like this?</h2>
            <p className="mt-5 max-w-[38ch] text-fg-muted">Tell me what you need. You get a straight answer and a fixed price.</p>
            <Link href="/#contact" className="btn-sky mt-8">
              Book a call
            </Link>
          </div>
          <Link href={`/projects/${next.slug}`} className="group block md:col-span-6 md:col-start-7">
            <p className="text-small text-fg-faint">Next project</p>
            <p className="mt-2 flex items-center justify-between gap-4 font-display text-h2 font-semibold tracking-[-0.035em] text-fg">
              {next.name}
              <Arrow className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </p>
            <DesktopFrame shot={next.desktop[0]} hover={next.desktop[1]} sizes="(min-width: 768px) 600px, 92vw" className="mt-6" />
          </Link>
        </div>
      </section>
    </main>
  );
}
