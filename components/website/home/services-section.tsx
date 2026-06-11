import { Reveal } from "@/components/website/motion/reveal";
import { services } from "@/lib/content/site";

export function ServicesSection() {
  return (
    <section id="services" className="section-pad hairline-top scroll-mt-12 overflow-x-hidden">
      <div className="site-container min-w-0">
        <Reveal>
          <p className="eyebrow mb-4">Services</p>
          <h2 className="display-hairline text-display-lg max-w-4xl text-paper hidden md:block">
            Three things, done properly.
          </h2>
          <h2 className="display-hairline text-display-lg max-w-4xl text-paper md:hidden">
            <span className="block">Three things,</span>
            <span className="block">done properly.</span>
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col">
          {services.map((service) => (
            <Reveal key={service.number}>
              <div className="grid min-w-0 gap-4 border-t border-ink-700 py-7 md:grid-cols-12 md:gap-10 md:py-9">
                <p className="font-mono text-sm text-paper-faint md:col-span-1">
                  {service.number}
                </p>
                <h3 className="display-hairline text-display-sm text-paper md:col-span-3">
                  {service.title}
                </h3>
                <p className="break-words text-sm leading-relaxed text-paper-dim md:col-span-4">
                  {service.summary}
                </p>
                <ul className="flex flex-wrap content-start gap-2 md:col-span-4">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-ink-700 px-3 py-1.5 text-xs text-paper-dim"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
