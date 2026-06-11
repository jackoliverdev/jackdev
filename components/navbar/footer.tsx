import Link from "next/link";
import { FC } from "react";
import { site } from "@/lib/content/site";

const footerLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hairline-top">
      <div className="site-container flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-sm font-medium tracking-tight text-paper">
            Jack Oliver Dev<span className="text-electric">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-paper-faint">
            Websites, AI and web applications, designed and built in the
            United Kingdom.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-paper-dim transition-colors duration-300 hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm md:items-end">
          <div className="flex gap-5">
            <a
              href={`mailto:${site.email}`}
              className="text-paper-dim transition-colors duration-300 hover:text-paper"
            >
              Email
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper-dim transition-colors duration-300 hover:text-paper"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper-dim transition-colors duration-300 hover:text-paper"
            >
              GitHub
            </a>
          </div>
          <p className="text-xs text-paper-faint">
            © {currentYear} Jack Oliver Dev · United Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
};
