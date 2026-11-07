import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { nav, site } from "@/lib/content/site";
import { projects } from "@/lib/content/projects";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" className="inline-block rounded-md text-[1.25rem]" aria-label="Jack Oliver Dev, home">
            <Logo />
          </Link>
          <p className="mt-5 max-w-sm text-fg-muted">
            Websites, AI assistants and web apps, designed and built in the UK by one developer.
          </p>
          <a href={`mailto:${site.email}`} className="link mt-8 inline-block font-display text-h3 font-semibold text-fg">
            {site.email}
          </a>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:justify-items-end">
          <div>
            <h2 className="text-small font-medium tracking-normal text-fg-muted">Site</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-small font-medium tracking-normal text-fg-muted">Work</h2>
            <ul className="mt-4 space-y-2.5">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className="link text-fg">
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-small font-medium tracking-normal text-fg-muted">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link text-fg">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link text-fg">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-rule py-6 text-caption text-fg-faint sm:flex-row sm:justify-between">
        <p>© {year} Jack Oliver Dev. All rights reserved.</p>
        <p>Designed and built by Jack, in the UK.</p>
      </div>
    </footer>
  );
};
