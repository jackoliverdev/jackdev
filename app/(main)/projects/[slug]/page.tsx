import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getNextProject, getProject, projects } from "@/lib/content/projects";
import { site } from "@/lib/content/site";
import { Reveal } from "@/components/website/motion/reveal";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  const title = `${project.name} Case Study | Jack Oliver Dev`;
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
      images: project.cover.src.endsWith(".svg")
        ? undefined
        : [{ url: project.cover.src, alt: project.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.seoDescription,
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const nextProject = getNextProject(project.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.seoDescription,
    url: `${site.url}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    ...(project.url ? { sameAs: project.url } : {}),
  };

  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Header */}
        <header className="site-container">
          <Link href="/#work" className="link-arrow mb-10">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All work
          </Link>

          <p className="eyebrow mb-4">
            {project.sector} · {project.year}
          </p>
          <h1 className="display-hairline text-display-xl max-w-4xl text-paper">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper-dim sm:text-lg">
            {project.summary}
          </p>

          <dl className="mt-12 grid gap-8 border-t border-ink-700 pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-paper-faint">Role</dt>
              <dd className="mt-2 text-sm text-paper">{project.role}</dd>
            </div>
            <div>
              <dt className="text-xs text-paper-faint">Stack</dt>
              <dd className="mt-2 text-sm text-paper">
                {project.stack.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-paper-faint">Status</dt>
              <dd className="mt-2 text-sm text-paper">
                {project.live && project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow text-paper hover:text-electric-bright"
                  >
                    Visit live site
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : (
                  "In build, launching soon"
                )}
              </dd>
            </div>
          </dl>
        </header>

        {/* Cover */}
        <div className="site-container mt-14">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-ink-700 bg-ink-900 md:aspect-[21/10]">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="(max-width: 1320px) 100vw, 1320px"
                className="object-cover object-top"
                priority
              />
            </div>
          </Reveal>
        </div>

        {/* Challenge / Solution */}
        <div className="site-container section-pad grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h2 className="eyebrow mb-5">The Challenge</h2>
            <p className="text-base leading-relaxed text-paper-dim">
              {project.challenge}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="eyebrow mb-5">The Solution</h2>
            <p className="text-base leading-relaxed text-paper-dim">
              {project.solution}
            </p>
          </Reveal>
        </div>

        {/* Features */}
        <div className="site-container">
          <Reveal>
            <h2 className="eyebrow mb-8">What it does</h2>
          </Reveal>
          <Reveal
            stagger="[data-feature]"
            className="grid gap-px overflow-hidden rounded-lg border border-ink-700 bg-ink-700 sm:grid-cols-2"
          >
            {project.features.map((feature, index) => (
              <div
                key={feature}
                data-feature
                className="flex gap-4 bg-ink-900 p-6"
              >
                <span className="font-mono text-xs text-electric">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-paper">{feature}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Gallery */}
        {project.shots.length > 0 && (
          <div className="site-container mt-20 grid gap-6 md:grid-cols-3">
            {project.shots.map((shot) => (
              <Reveal key={shot.src}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-ink-700 bg-ink-900">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Results */}
        <div className="site-container section-pad">
          <Reveal>
            <h2 className="eyebrow mb-8">The Result</h2>
            <ul className="flex max-w-3xl flex-col gap-5">
              {project.results.map((result) => (
                <li
                  key={result}
                  className="display-hairline border-l border-electric pl-6 text-display-sm text-paper"
                >
                  {result}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Next project */}
        <div className="hairline-top">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block py-16 transition-colors duration-300 hover:bg-ink-900 md:py-20"
          >
            <div className="site-container flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow mb-3">Next project</p>
                <p className="display-hairline text-display-lg text-paper">
                  {nextProject.name}
                </p>
              </div>
              <ArrowRight
                className="mb-2 h-8 w-8 shrink-0 text-paper-faint transition-all duration-300 group-hover:translate-x-2 group-hover:text-electric-bright"
                aria-hidden
              />
            </div>
          </Link>
        </div>
      </article>
    </main>
  );
}
