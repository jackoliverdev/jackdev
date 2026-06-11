import { Reveal } from "@/components/website/motion/reveal";
import { testimonials } from "@/lib/content/site";

export function TestimonialsSection() {
  const row = [...testimonials, ...testimonials];

  return (
    <section className="section-pad hairline-top max-md:overflow-x-hidden">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow mb-4">Customer Testimonials</p>
          <h2 className="display-hairline text-display-lg max-w-4xl text-paper">
            Clients say it better than I can.
          </h2>
        </Reveal>
      </div>

      <Reveal className="relative mt-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

        <div className="group flex w-max animate-marquee gap-6 hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-full">
          {row.map((testimonial, index) => (
            <figure
              key={`${testimonial.name}-${index}`}
              className="surface-card surface-card-hover flex w-[20rem] shrink-0 flex-col justify-between p-7 sm:w-[24rem]"
              aria-hidden={index >= testimonials.length}
            >
              <blockquote className="text-sm leading-relaxed text-paper sm:text-base">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-700 pt-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-electric/10 font-mono text-xs text-electric">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span>
                  <p className="text-sm font-medium text-paper">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 text-xs text-paper-faint">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
