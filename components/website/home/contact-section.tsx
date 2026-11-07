"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { contact, site } from "@/lib/content/site";
import { cn } from "@/lib/utils";

type Mode = "call" | "email";
type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message" | "slot", string>>;

/** The next ten weekdays from tomorrow, as YYYY-MM-DD in UK time. */
function upcomingWeekdays(count = 10) {
  const out: { iso: string; day: string; date: string }[] = [];
  const fmt = (d: Date, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", ...o }).format(d);
  const d = new Date();
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    const weekday = fmt(d, { weekday: "short" });
    if (weekday === "Sat" || weekday === "Sun") continue;
    const [dd, mm, yyyy] = fmt(d, { day: "2-digit", month: "2-digit", year: "numeric" }).split("/");
    out.push({ iso: `${yyyy}-${mm}-${dd}`, day: weekday, date: fmt(d, { day: "numeric", month: "short" }) });
  }
  return out;
}

function Chip({
  type,
  name,
  value,
  checked,
  onChange,
  children,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative inline-flex min-h-[2.5rem] cursor-pointer select-none items-center rounded-full border px-4 text-small transition-colors duration-200 ease-out",
        "[&:has(:focus-visible)]:outline [&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-offset-2 [&:has(:focus-visible)]:outline-sky",
        checked ? "border-fg bg-fg text-canvas" : "border-rule text-fg hover:border-rule-strong"
      )}
    >
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}

const fieldClass =
  "mt-2 block w-full rounded-control border border-rule bg-canvas px-4 py-3 text-fg placeholder:text-fg-faint transition-colors duration-200 ease-out hover:border-rule-strong focus:border-sky focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-red-500";

export function ContactSection() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [mode, setMode] = useState<Mode>("call");
  const [days, setDays] = useState<ReturnType<typeof upcomingWeekdays>>([]);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Dates depend on "today", so build them in the browser to keep hydration clean.
  useEffect(() => setDays(upcomingWeekdays()), []);

  const chosen = useMemo(() => days.find((d) => d.iso === day), [days, day]);

  const toggleNeed = (need: string) =>
    setNeeds((current) => (current.includes(need) ? current.filter((n) => n !== need) : [...current, need]));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
      website: String(data.get("website") || ""),
      needs,
      budget,
      call: mode === "call" && day && time ? { date: day, time } : null,
    };

    const next: Errors = {};
    if (!payload.name) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) next.email = "Enter an email address like name@company.co.uk.";
    if (!payload.message) next.message = "Tell me a little about the project.";
    if (mode === "call" && (!day || !time)) next.slot = "Pick a day and a time, or switch to email only.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      const el = first === "slot" ? form.querySelector<HTMLElement>("[data-slot-group] input") : form.elements.namedItem(first);
      (el as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "The message didn't send.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setServerError(
        `${err instanceof Error ? err.message : "The message didn't send."} Try again, or email ${site.email} directly.`
      );
    }
  }

  return (
    <section id="contact" className="section-y scroll-mt-20 bg-well">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="max-w-[14ch] text-h1 text-fg">{contact.heading}</h2>
          <p className="mt-6 max-w-[40ch] text-lead text-fg-muted">{contact.sub}</p>

          <ol className="mt-12 space-y-5 border-t border-rule pt-8">
            {[
              "You pick a slot or send the details.",
              "I confirm the call by email with a calendar invite.",
              "We talk for 30 minutes. You leave with a straight answer.",
            ].map((line, i) => (
              <li key={line} className="flex gap-4 text-fg">
                <span className="tabular text-sky-ink">{i + 1}</span>
                {line}
              </li>
            ))}
          </ol>

          <p className="mt-10 text-fg-muted">
            Rather email?{" "}
            <a href={`mailto:${site.email}`} className="link text-fg">
              {site.email}
            </a>
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-frame border border-rule bg-raised p-6 shadow-[var(--frame-shadow)] sm:p-8 md:p-10">
            {status === "sent" ? (
              <div role="status" className="py-10">
                <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden className="text-sky">
                  <circle cx="20" cy="20" r="19" fill="currentColor" />
                  <path d="M12 20.5l5.5 5.5L28.5 14" fill="none" stroke="rgb(var(--on-sky))" strokeWidth="2.5" />
                </svg>
                <h3 className="mt-6 text-h2 text-fg">
                  {mode === "call" && chosen ? "Call requested." : "Message sent."}
                </h3>
                <p className="mt-4 max-w-[46ch] text-fg-muted">
                  {mode === "call" && chosen
                    ? `I've got your request for ${chosen.day} ${chosen.date} at ${time}. You'll get a confirmation and calendar invite by email within one working day.`
                    : "Thanks. I'll reply within one working day."}
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-9">
                <fieldset className="min-w-0">
                  <legend className="font-medium text-fg">What do you need?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {contact.needs.map((need) => (
                      <Chip key={need} type="checkbox" name="needs" value={need} checked={needs.includes(need)} onChange={() => toggleNeed(need)}>
                        {need}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="min-w-0">
                  <legend className="font-medium text-fg">
                    Rough budget <span className="font-normal text-fg-faint">(optional)</span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {contact.budgets.map((b) => (
                      <Chip key={b} type="radio" name="budget" value={b} checked={budget === b} onChange={() => setBudget(b)}>
                        {b}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="min-w-0">
                  <legend className="font-medium text-fg">How should we talk?</legend>
                  <div className="mt-3 inline-flex rounded-full border border-rule p-1" role="radiogroup" aria-label="Contact method">
                    {(
                      [
                        ["call", "Book a 30-minute call"],
                        ["email", "Email only"],
                      ] as const
                    ).map(([value, label]) => (
                      <label
                        key={value}
                        className={cn(
                          "relative cursor-pointer rounded-full px-4 py-2 text-small transition-colors duration-200 ease-out [&:has(:focus-visible)]:outline [&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-sky",
                          mode === value ? "bg-fg text-canvas" : "text-fg-muted hover:text-fg"
                        )}
                      >
                        <input type="radio" name="mode" value={value} checked={mode === value} onChange={() => setMode(value)} className="sr-only" />
                        {label}
                      </label>
                    ))}
                  </div>

                  {mode === "call" && (
                    <div data-slot-group className="mt-6 space-y-5">
                      <div>
                        <p id="day-label" className="text-small text-fg-muted">
                          Day <span className="text-fg-faint">(UK time)</span>
                        </p>
                        <div
                          role="radiogroup"
                          aria-labelledby="day-label"
                          className="no-scrollbar -mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1"
                          data-lenis-prevent
                        >
                          {days.length === 0 && <span className="h-[4.25rem]" aria-hidden />}
                          {days.map((d) => (
                            <label
                              key={d.iso}
                              className={cn(
                                "relative flex min-w-[4.5rem] shrink-0 cursor-pointer flex-col items-center rounded-control border px-3 py-2.5 transition-colors duration-200 ease-out",
                                "[&:has(:focus-visible)]:outline [&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-offset-2 [&:has(:focus-visible)]:outline-sky",
                                day === d.iso ? "border-sky bg-sky text-on-sky" : "border-rule text-fg hover:border-rule-strong"
                              )}
                            >
                              <input type="radio" name="day" value={d.iso} checked={day === d.iso} onChange={() => setDay(d.iso)} className="sr-only" />
                              <span className={cn("text-caption", day === d.iso ? "text-on-sky" : "text-fg-muted")}>{d.day}</span>
                              <span className="font-medium">{d.date}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p id="time-label" className="text-small text-fg-muted">
                          Time
                        </p>
                        <div role="radiogroup" aria-labelledby="time-label" className="mt-2 flex flex-wrap gap-2">
                          {contact.slots.map((slot) => (
                            <Chip key={slot} type="radio" name="time" value={slot} checked={time === slot} onChange={() => setTime(slot)}>
                              <span className="tabular">{slot}</span>
                            </Chip>
                          ))}
                        </div>
                      </div>
                      {errors.slot && (
                        <p className="text-small text-red-600 dark:text-red-400" role="alert">
                          {errors.slot}
                        </p>
                      )}
                    </div>
                  )}
                </fieldset>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-small font-medium text-fg">
                      Name
                    </label>
                    <input id="name" name="name" autoComplete="name" className={fieldClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                    {errors.name && <p id="name-error" className="mt-1.5 text-small text-red-600 dark:text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="text-small font-medium text-fg">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      spellCheck={false}
                      placeholder="name@company.co.uk"
                      className={fieldClass}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && <p id="email-error" className="mt-1.5 text-small text-red-600 dark:text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="text-small font-medium text-fg">
                      Company <span className="font-normal text-fg-faint">(optional)</span>
                    </label>
                    <input id="company" name="company" autoComplete="organization" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-small font-medium text-fg">
                      Phone <span className="font-normal text-fg-faint">(optional)</span>
                    </label>
                    <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={fieldClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="text-small font-medium text-fg">
                      About the project
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="What you do, what you need and any deadline…"
                      className={cn(fieldClass, "resize-y")}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && <p id="message-error" className="mt-1.5 text-small text-red-600 dark:text-red-400">{errors.message}</p>}
                  </div>
                  {/* Spam trap: hidden from people, filled by bots. */}
                  <div className="hidden" aria-hidden>
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-rule pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-small text-fg-muted">
                    {mode === "call" && chosen && time
                      ? `${chosen.day} ${chosen.date} at ${time}, 30 minutes`
                      : mode === "call"
                        ? "Pick a day and time above"
                        : "I reply within one working day"}
                  </p>
                  <button type="submit" className="btn-sky w-full sm:w-auto" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : mode === "call" ? "Request the call" : "Send message"}
                  </button>
                </div>
                {status === "error" && (
                  <p role="alert" className="text-small text-red-600 dark:text-red-400">
                    {serverError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
