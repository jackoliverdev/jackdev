import { Reveal } from "@/components/website/motion/reveal";

const capabilities = [
  {
    number: "01",
    title: "Custom chatbots",
    copy: "Trained on your business and embedded on your website, answering like your best member of staff, around the clock.",
  },
  {
    number: "02",
    title: "Integrations",
    copy: "AI wired into the systems you already run: job management, drives, inboxes and calendars. Ask a question, get the real answer.",
  },
  {
    number: "03",
    title: "Automations",
    copy: "Agents handling quoting, reporting and inbox triage in the background, so your team does the work only people can do.",
  },
];

export function AiSpotlight() {
  return (
    <section className="section-pad hairline-top">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow mb-4">AI Development</p>
          <h2 className="display-hairline text-display-lg max-w-5xl text-paper hidden md:block">
            I don&apos;t just use AI.{" "}
            <span className="text-electric">I build it.</span>
          </h2>
          <h2 className="display-hairline text-display-lg max-w-5xl text-paper md:hidden">
            <span className="block">I don&apos;t just use AI.</span>
            <span className="block text-electric">I build it.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper-dim">
            From chatbots trained on your business to agents running entire
            workflows, I build production AI that does real work, wired into
            the tools you already use.
          </p>
        </Reveal>

        <Reveal
          stagger="[data-capability]"
          className="mt-16 grid gap-px overflow-hidden rounded-lg border border-ink-700 bg-ink-700 md:grid-cols-3"
        >
          {capabilities.map((item) => (
            <div key={item.title} data-capability className="bg-ink-900 p-8">
              <p className="font-mono text-xs text-electric">{item.number}</p>
              <h3 className="mt-3 font-display text-lg font-medium text-paper">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                {item.copy}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
