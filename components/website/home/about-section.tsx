import { about } from "@/lib/content/site";
import { LogoMarquee } from "@/components/website/home/logo-marquee";
import { stagger } from "@/lib/reveal";

export function AboutSection() {
  return (
    <section id="about" className="bg-well py-[var(--section-y)]">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <h2 data-reveal className="max-w-[18ch] text-h1 text-fg lg:col-span-5">{about.heading}</h2>
          <div data-reveal style={stagger(1)} className="space-y-4 text-fg lg:col-span-7">
            {about.paragraphs.map((p) => (
              <p key={p} className="text-lead">
                {p}
              </p>
            ))}
            <dl className="grid gap-5 pt-4 sm:grid-cols-3">
              {about.facts.map((fact) => (
                <div key={fact.label} className="border-t border-rule pt-3">
                  <dt className="text-caption text-fg-faint">{fact.label}</dt>
                  <dd className="mt-1 text-small text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div data-reveal="fade" className="mt-14 flex items-center gap-6 border-y border-rule py-6">
          <p className="hidden max-w-[11ch] shrink-0 text-small text-fg-muted sm:block">Platforms I build on</p>
          <LogoMarquee className="min-w-0 flex-1" reverse />
        </div>
      </div>
    </section>
  );
}
