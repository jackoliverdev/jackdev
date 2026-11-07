import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { z } from "zod";

// Enquiries and call requests from the contact form.
// RESEND_FROM must be an address on a domain verified in Resend for the visitor's
// confirmation to send; onboarding@resend.dev can only email the account owner.
const TO = process.env.CONTACT_TO || "jackoliverdev@gmail.com";
const FROM = process.env.RESEND_FROM || "Jack Oliver Dev <onboarding@resend.dev>";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(1).max(5000),
  website: z.string().optional().default(""),
  needs: z.array(z.string().max(60)).max(10).optional().default([]),
  budget: z.string().max(40).optional().default(""),
  call: z
    .object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      time: z.string().regex(/^\d{2}:\d{2}$/),
    })
    .nullable()
    .optional()
    .default(null),
});

/** UK wall-clock time to a UTC Date, allowing for BST. */
function londonToUtc(date: string, time: string) {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(guess));
  const lh = Number(parts.find((p) => p.type === "hour")?.value);
  const lm = Number(parts.find((p) => p.type === "minute")?.value);
  const offsetMinutes = (lh * 60 + lm) - (hh * 60 + mm);
  return new Date(guess - offsetMinutes * 60_000);
}

const icsStamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsText = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (c) => `\\${c}`);

function buildIcs(start: Date, name: string, email: string, summary: string) {
  const end = new Date(start.getTime() + 30 * 60_000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jack Oliver Dev//Call request//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}-${email.replace(/[^a-z0-9]/gi, "")}@jackodev.co.uk`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(end)}`,
    `SUMMARY:${icsText(`Call with ${name} (requested)`)}`,
    `DESCRIPTION:${icsText(summary)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Some details are missing or invalid." });
  }
  const data = parsed.data;

  // Bots fill the hidden field; pretend it worked.
  if (data.website) return res.status(200).json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Email isn't set up on the server." });
  const resend = new Resend(apiKey);

  const start = data.call ? londonToUtc(data.call.date, data.call.time) : null;
  const when = start
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(start)
    : null;

  const lines = [
    when ? `Call requested: ${when} (UK time), 30 minutes` : "No call requested: reply by email",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "Not given"}`,
    `Phone: ${data.phone || "Not given"}`,
    `Needs: ${data.needs.length ? data.needs.join(", ") : "Not given"}`,
    `Budget: ${data.budget || "Not given"}`,
    "",
    data.message,
  ];
  const text = lines.join("\n");

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: data.email,
      subject: when ? `Call request: ${data.name}, ${when}` : `New enquiry from ${data.name}`,
      text,
      attachments: start
        ? [{ filename: "call.ics", content: Buffer.from(buildIcs(start, data.name, data.email, text)).toString("base64") }]
        : undefined,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("contact: send failed", err);
    return res.status(502).json({ error: "The message didn't send." });
  }

  // Confirmation to the visitor. Only works once RESEND_FROM is on a verified domain.
  try {
    await resend.emails.send({
      from: FROM,
      to: [data.email],
      replyTo: TO,
      subject: when ? "Your call request with Jack Oliver Dev" : "Thanks for getting in touch",
      text: [
        `Hi ${data.name.split(" ")[0]},`,
        "",
        when
          ? `Thanks for booking in. I've got your request for ${when} (UK time). I'll confirm it with a calendar invite within one working day.`
          : "Thanks for your message. I'll reply within one working day.",
        "",
        "Jack",
        "jackodev.co.uk",
      ].join("\n"),
    });
  } catch {
    // Not fatal: Jack still has the enquiry.
  }

  return res.status(200).json({ ok: true });
}
