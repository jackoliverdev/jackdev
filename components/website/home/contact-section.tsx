"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Reveal } from "@/components/website/motion/reveal";
import { site } from "@/lib/content/site";

type FormStatus = "idle" | "sending" | "sent" | "error";

const inputClasses =
  "w-full rounded-lg border border-ink-700 bg-ink-900 px-4 py-3 text-sm text-paper placeholder:text-paper-faint transition-colors duration-300 focus:border-electric focus:outline-none";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-pad hairline-top scroll-mt-12 overflow-x-hidden">
      <div className="site-container grid min-w-0 gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="min-w-0">
          <p className="eyebrow mb-4">Contact</p>
          <h2 className="display-hairline text-display-xl text-paper hidden md:block">
            Let&apos;s build
            <br />
            <span className="text-electric">yours.</span>
          </h2>
          <h2 className="display-hairline text-display-xl text-paper md:hidden">
            Let&apos;s build{" "}
            <span className="text-electric">yours.</span>
          </h2>
          <p className="mt-6 max-w-md break-words text-base leading-relaxed text-paper-dim">
            Tell me what you&apos;re trying to achieve and I&apos;ll tell you,
            honestly, whether I can deliver it. Most replies within the day.
          </p>

          <div className="mt-10 flex flex-col gap-4 text-sm">
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-fit"
            >
              Book a 30-minute call
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="link-arrow w-fit hover:text-electric-bright"
            >
              {site.email}
            </a>
          </div>

          <dl className="mt-12 grid max-w-sm grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="text-paper-faint">Location</dt>
              <dd className="mt-1 text-paper">{site.location}</dd>
            </div>
            <div>
              <dt className="text-paper-faint">Elsewhere</dt>
              <dd className="mt-1 flex gap-4">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper transition-colors hover:text-electric-bright"
                >
                  GitHub
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper transition-colors hover:text-electric-bright"
                >
                  LinkedIn
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="lg:pt-14">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium text-paper-dim">Name</span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={inputClasses}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium text-paper-dim">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={inputClasses}
                />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium text-paper-dim">
                Phone <span className="text-paper-faint">(optional)</span>
              </span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Best number for a call back"
                className={inputClasses}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium text-paper-dim">
                What are you building?
              </span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="A website, an AI chatbot, a web app, and roughly when you need it."
                className={`${inputClasses} resize-none`}
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="btn-primary mt-2 w-fit disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  Sending
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                </>
              ) : status === "sent" ? (
                <>
                  Message sent
                  <Check className="h-4 w-4" aria-hidden />
                </>
              ) : (
                <>
                  Send message
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </>
              )}
            </button>

            <p aria-live="polite" className="min-h-[1.25rem] text-sm">
              {status === "sent" && (
                <span className="text-electric-bright">
                  Thanks, I&apos;ll be in touch shortly.
                </span>
              )}
              {status === "error" && (
                <span className="text-red-400">
                  Something went wrong. Email me directly at {site.email}.
                </span>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
