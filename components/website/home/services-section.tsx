import Link from "next/link";
import { services } from "@/lib/content/site";
import { getProject } from "@/lib/content/projects";

export function ServicesSection() {
  return (
    <section id="services" className="section-y scroll-mt-20 border-t border-rule">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-[calc(var(--nav-h)+2rem)]">
            <h2 className="text-h1 text-fg">What I build</h2>
            <p className="mt-6 max-w-[34ch] text-fg-muted">
              No project too small, no project too big. Most clients start with one of these and end up with two.
            </p>
          </div>
        </div>

        <div className="md:col-span-8">
          {services.map((service) => (
            <article key={service.id} className="grid gap-6 border-t border-rule py-10 first:border-t-0 first:pt-0 md:py-14">
              <h3 className="text-h2 text-fg">{service.title}</h3>
              <p className="max-w-[54ch] text-lead text-fg-muted">{service.summary}</p>
              <div className="grid gap-8 sm:grid-cols-2">
                <ul className="space-y-2.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-fg">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div>
                  <p className="text-small text-fg-faint">Seen in</p>
                  <ul className="mt-2.5 space-y-2.5">
                    {service.seenIn.map((slug) => {
                      const project = getProject(slug);
                      if (!project) return null;
                      return (
                        <li key={slug}>
                          <Link href={`/projects/${slug}`} className="link text-fg">
                            {project.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
