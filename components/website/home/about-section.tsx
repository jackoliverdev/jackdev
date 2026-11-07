import { about } from "@/lib/content/site";

export function AboutSection() {
  return (
    <section id="about" className="section-y scroll-mt-20 border-t border-rule">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <h2 className="text-h1 text-fg md:col-span-5">{about.heading}</h2>
        <div className="md:col-span-7">
          <div className="space-y-5 text-lead text-fg">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-12 grid gap-6 border-t border-rule pt-8 sm:grid-cols-3">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-small text-fg-faint">{fact.label}</dt>
                <dd className="mt-1.5 text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
