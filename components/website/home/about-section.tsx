/* eslint-disable @next/next/no-img-element */
import { Reveal } from "@/components/website/motion/reveal";
import { about, process, techStack } from "@/lib/content/site";

function TechMarquee() {
  const row = [...techStack, ...techStack];
  return (
    <div
      className="group relative mt-12 w-full max-w-full overflow-hidden"
      aria-label="Technology stack"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:w-16" />
      <div className="flex w-max animate-marquee gap-8 sm:gap-12 group-hover:[animation-play-state:paused]">
        {row.map((tech, index) => (
          <span
            key={`${tech.name}-${index}`}
            className="flex shrink-0 items-center gap-3 text-paper-dim"
          >
            <img
              src={tech.icon}
              alt=""
              width={22}
              height={22}
              loading="lazy"
              className="h-[22px] w-[22px] opacity-50 dark:invert"
            />
            <span className="font-mono text-xs">{tech.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-pad hairline-top scroll-mt-12 overflow-x-hidden"
    >
      <div className="site-container grid min-w-0 gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="min-w-0">
          <p className="eyebrow mb-4">About</p>
          <h2 className="display-hairline text-display-lg text-paper hidden md:block">
            {about.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <h2 className="display-hairline text-display-lg text-paper md:hidden">
            <span className="block">Builder first,</span>
            <span className="block">agency never.</span>
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-6 max-w-xl break-words text-base leading-relaxed text-paper-dim"
            >
              {paragraph}
            </p>
          ))}

          <dl className="mt-12 grid grid-cols-3 gap-4 sm:gap-6">
            {about.stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-medium tracking-tight text-paper sm:text-3xl">
                  {stat.value}
                </dd>
                <p className="mt-1 break-words text-xs leading-snug text-paper-faint">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>

          <TechMarquee />
        </Reveal>

        <Reveal stagger="[data-process-step]" className="flex min-w-0 flex-col">
          <h3 className="eyebrow mb-8">How it works</h3>
          <ol className="flex flex-1 flex-col justify-between">
            {process.map((step) => (
              <li
                key={step.step}
                data-process-step
                className="grid min-w-0 grid-cols-[2.5rem_1fr] gap-3 border-t border-ink-700 py-6 last:pb-0 sm:grid-cols-[3rem_1fr] sm:gap-4 sm:py-7 lg:py-4 lg:last:pb-0"
              >
                <span className="font-mono text-sm text-electric">
                  {step.step}
                </span>
                <div className="min-w-0">
                  <h4 className="font-display text-lg font-medium text-paper">
                    {step.title}
                  </h4>
                  <p className="mt-2 break-words text-sm leading-relaxed text-paper-dim">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
