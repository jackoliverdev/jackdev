"use client";

import { FormEvent, useEffect, useState } from "react";
import { contact, site } from "@/lib/content/site";
import { cn } from "@/lib/utils";
import { TopoMap } from "@/components/website/home/topo-map";
import { stagger } from "@/lib/reveal";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message" | "time", string>>;

/** The next ten weekdays from tomorrow, as YYYY-MM-DD in UK time, with a readable label. */
function upcomingWeekdays(count = 10) {
  const out: { iso: string; label: string }[] = [];
  const fmt = (d: Date, o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", ...o }).format(d);
  const d = new Date();
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    const weekday = fmt(d, { weekday: "short" });
    if (weekday === "Sat" || weekday === "Sun") continue;
    const [dd, mm, yyyy] = fmt(d, { day: "2-digit", month: "2-digit", year: "numeric" }).split("/");
    out.push({ iso: `${yyyy}-${mm}-${dd}`, label: fmt(d, { weekday: "short", day: "numeric", month: "short" }) });
  }
  return out;
}

const field =
  "block w-full rounded-control border border-rule bg-canvas px-3.5 py-2.5 text-fg placeholder:text-fg-faint transition-colors duration-200 ease-out hover:border-rule-strong focus:border-signal focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-red-600";
const selectField = `${field} select-chevron appearance-none pr-9`;
const label = "mb-1.5 block text-small font-medium text-fg";
const optional = <span className="font-normal text-fg-faint"> (optional)</span>;
const errorText = "mt-1 text-caption text-red-700 dark:text-red-400";

export function ContactSection() {
  const [days, setDays] = useState<ReturnType<typeof upcomingWeekdays>>([]);
  const [day, setDay] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [summary, setSummary] = useState("");
  // On phones, company and phone sit behind a link to keep the form short.
  const [extras, setExtras] = useState(false);

  // Dates depend on "today", so build them in the browser to keep hydration clean.
  useEffect(() => setDays(upcomingWeekdays()), []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) || "").trim();
    const time = get("time");
    const payload = {
      name: get("name"),
      email: get("email"),
      company: get("company"),
      phone: get("phone"),
      message: get("message"),
      website: get("website"),
      needs: get("need") ? [get("need")] : [],
      budget: get("budget"),
      call: day && time ? { date: day, time } : null,
    };

    const next: Errors = {};
    if (!payload.name) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) next.email = "Enter an email like name@company.co.uk.";
    if (!payload.message) next.message = "Tell me a little about the project.";
    if (day && !time) next.time = "Pick a time for the call.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
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
      const chosen = days.find((d) => d.iso === day);
      setSummary(chosen ? `${chosen.label} at ${time}` : "");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setServerError(`${err instanceof Error ? err.message : "The message didn't send."} Try again, or email ${site.email}.`);
    }
  }

  return (
    <section id="contact" className="px-2 pb-2 pt-2 sm:px-3 sm:pb-3 sm:pt-3">
      <div className="forest relative isolate overflow-hidden rounded-frame py-[var(--section-y)]">
      <TopoMap drift className="absolute inset-0 -z-10" />
      <div className="container-x grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
        <div data-reveal className="min-w-0 lg:col-span-4">
          <h2 className="text-h1 text-fg">{contact.heading}</h2>
          {/* Phones get the first line only; the rest is in the form's own hints. */}
          <div className="mt-4 max-w-[40ch] space-y-3 text-fg-muted lg:mt-5">
            {contact.intro.map((p, i) => (
              <p key={p} className={i > 0 ? "hidden lg:block" : undefined}>
                {p}
              </p>
            ))}
          </div>
          <dl className="mt-8 hidden space-y-4 border-t border-rule pt-6 text-small lg:block">
            <div>
              <dt className="text-fg-faint">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="link text-fg">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-fg-faint">Reply</dt>
              <dd className="text-fg">Within one working day</dd>
            </div>
            <div>
              <dt className="text-fg-faint">Calls</dt>
              <dd className="text-fg">30 minutes, weekdays, UK time</dd>
            </div>
          </dl>
        </div>

        <div data-reveal style={stagger(1)} className="min-w-0 rounded-frame border border-rule bg-raised p-4 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] sm:p-7 lg:col-span-8">
          {status === "sent" ? (
            <div role="status" className="flex min-h-[22rem] flex-col justify-center">
              <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden className="text-brand">
                <circle cx="20" cy="20" r="19" fill="currentColor" />
                <path d="M12 20.5l5.5 5.5L28.5 14" fill="none" stroke="rgb(var(--on-brand))" strokeWidth="2.5" />
              </svg>
              <h3 className="mt-5 text-h2 text-fg">{summary ? "Call requested." : "Message sent."}</h3>
              <p className="mt-3 max-w-[44ch] text-fg-muted">
                {summary
                  ? `I've got your request for ${summary}. You'll get a confirmation and calendar invite within one working day.`
                  : "Thanks. I'll reply within one working day."}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-4 sm:gap-y-4">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="name" className={label}>Name</label>
                <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                {errors.name && <p id="name-error" className={errorText}>{errors.name}</p>}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="email" className={label}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="name@company.co.uk"
                  className={field}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" className={errorText}>{errors.email}</p>}
              </div>
              {!extras && (
                <button
                  type="button"
                  onClick={() => setExtras(true)}
                  className="col-span-2 -mt-1 w-fit text-small font-medium text-brand-ink underline decoration-1 underline-offset-4 sm:hidden"
                >
                  Add company and phone
                </button>
              )}
              <div className={extras ? undefined : "hidden sm:block"}>
                <label htmlFor="company" className={label}>Company{optional}</label>
                <input id="company" name="company" autoComplete="organization" className={field} />
              </div>
              <div className={extras ? undefined : "hidden sm:block"}>
                <label htmlFor="phone" className={label}>Phone{optional}</label>
                <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} />
              </div>
              <div>
                <label htmlFor="need" className={label}>
                  <span className="sm:hidden">Need</span>
                  <span className="hidden sm:inline">What do you need?</span>
                </label>
                <select id="need" name="need" defaultValue="" className={selectField}>
                  <option value="">Choose…</option>
                  {contact.needs.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="budget" className={label}>Budget{optional}</label>
                <select id="budget" name="budget" defaultValue="" className={selectField}>
                  <option value="">Choose…</option>
                  {contact.budgets.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="day" className={label}>
                  Book a call<span className="hidden font-normal text-fg-faint sm:inline"> (optional)</span>
                </label>
                <select id="day" name="day" value={day} onChange={(e) => setDay(e.target.value)} className={selectField}>
                  <option value="">Email only</option>
                  {days.map((d) => (
                    <option key={d.iso} value={d.iso}>{d.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="time" className={label}>Time <span className="font-normal text-fg-faint">(UK)</span></label>
                <select
                  id="time"
                  name="time"
                  defaultValue=""
                  disabled={!day}
                  className={cn(selectField, "disabled:cursor-not-allowed disabled:opacity-50")}
                  aria-invalid={!!errors.time}
                  aria-describedby={errors.time ? "time-error" : undefined}
                >
                  <option value="">{day ? "Choose…" : "Day first"}</option>
                  {contact.slots.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.time && <p id="time-error" className={errorText}>{errors.time}</p>}
              </div>
              <div className="col-span-2">
                <label htmlFor="message" className={label}>About the project</label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="What you do, what you need and any deadline…"
                  className={cn(field, "resize-y")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && <p id="message-error" className={errorText}>{errors.message}</p>}
              </div>
              {/* Spam trap: hidden from people, filled by bots. */}
              <div className="hidden" aria-hidden>
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="col-span-2 flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="hidden text-caption text-fg-faint sm:block">I&apos;ll confirm any call by email with a calendar invite.</p>
                <button type="submit" className="btn-brand w-full sm:w-auto" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : day ? "Request the call" : "Send message"}
                </button>
              </div>
              {status === "error" && (
                <p role="alert" className={cn(errorText, "col-span-2")}>
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
