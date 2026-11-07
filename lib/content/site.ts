// Every word on the homepage lives here. British English, sentence case, no em dashes.

export const site = {
  name: "Jack Oliver Dev",
  personName: "Jack Oliver",
  legalName: "Jack Oliver Dev",
  url: "https://www.jackodev.co.uk",
  title: "Jack Oliver Dev | Websites, AI and web apps for UK businesses",
  description:
    "I design and build fast, search-ready websites, AI assistants and custom web applications for UK businesses. One developer, end to end.",
  email: "jackoliverdev@gmail.com",
  linkedin: "https://www.linkedin.com/in/jack-melluish/",
  location: "United Kingdom",
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  headline: "Websites, AI and software that win you work.",
  sub: "I'm Jack. I design and build websites, AI assistants and web apps for UK businesses, from a one-van electrician to an AI platform firms run their office on.",
  primaryCta: { label: "Book a call", href: "/#contact" },
  secondaryCta: { label: "See the work", href: "/#work" },
  availability: "Available for new projects",
};

export const services = [
  {
    id: "websites",
    title: "Websites",
    summary:
      "Sites that load instantly, rank locally and turn visits into enquiries. Every one comes with a content system, so you change it yourself.",
    includes: [
      "Design and build",
      "Your own content system",
      "Local SEO and AI search",
      "Analytics and enquiry tracking",
    ],
    seenIn: ["imperial-build", "advanta-services", "hand-line", "jetnow-drainage"],
  },
  {
    id: "ai",
    title: "AI assistants and automation",
    summary:
      "Assistants trained on your business that answer customers, qualify leads and take the repeat admin off your team.",
    includes: [
      "Website assistants",
      "Assistants wired into your systems",
      "Scheduled agents and automations",
      "WhatsApp and Teams access",
    ],
    seenIn: ["centrus-ai", "gym-tours-ai", "excel-electrics"],
  },
  {
    id: "apps",
    title: "Web apps and SaaS",
    summary:
      "Custom software in the browser: admin panels, CRMs, portals and full products with billing, built to be used every day.",
    includes: ["Admin panels and CRMs", "Customer portals", "Payments and subscriptions", "Dashboards and reporting"],
    seenIn: ["centrus-ai", "gym-tours-ai", "imperial-build"],
  },
];

export const process = [
  {
    title: "A 30-minute call",
    copy: "You tell me what you need and I tell you straight whether I'm the right person. No sales team, just me.",
  },
  {
    title: "A fixed price and plan",
    copy: "Within a couple of days you get the scope, the timeline and one fixed price. No hourly surprises.",
  },
  {
    title: "Design and build in the open",
    copy: "You get a live link from the first week and watch it come together. Feedback goes straight into the build.",
  },
  {
    title: "Launch and look after",
    copy: "Hosting, analytics, search and handover sorted. I stay on hand after launch for changes and support.",
  },
];

export const about = {
  heading: "One developer, end to end.",
  paragraphs: [
    "I'm Jack, a UK developer who builds for businesses that want serious results without agency overhead. You talk to the person writing the code, so decisions take minutes, not meetings.",
    "Most of my week goes on Centrus AI, where I lead the build of an AI platform used daily by field-service firms. The rest goes on client work: websites for trades and manufacturers, AI assistants, and the admin systems behind them.",
    "No project too small, no project too big. A five-page site for a local firm gets the same care as a SaaS product.",
  ],
  facts: [
    { label: "Based in", value: "United Kingdom" },
    { label: "Builds with", value: "Next.js, React, TypeScript, Supabase, OpenAI" },
    { label: "Works with", value: "Trades, manufacturers, contractors, SaaS founders" },
  ],
};

// Paraphrased from client feedback. Each client signs off their quote before launch.
export const testimonials = [
  {
    name: "Chris Hartney",
    role: "Chief Operations Officer",
    company: "Centrus AI",
    project: "centrus-ai",
    quote:
      "Jack built the platform we run the business on. Technically deep, quick to ship and built to a standard we rely on every single day.",
  },
  {
    name: "Mitchell Evans",
    role: "Founder",
    company: "JetNow Drainage",
    project: "jetnow-drainage",
    quote:
      "The site was ranking within weeks and the phone hasn't stopped since. Jack understood exactly what an emergency trade business needs.",
  },
  {
    name: "Matt Digby",
    role: "Director",
    company: "Excel Electrics",
    project: "excel-electrics",
    quote:
      "The assistant on our site answers customers better than we expected, even when we're on a job. A pleasure to work with from start to finish.",
  },
  {
    name: "Jack Rowley",
    role: "Co-founder",
    company: "Gym Tours AI",
    project: "gym-tours-ai",
    quote: "Jack went above and beyond at every stage. The platform he delivered was better than anything we pictured at the start.",
  },
  {
    name: "Luca Castronuvo",
    role: "Managing Director",
    company: "Hand Line",
    project: "hand-line",
    quote:
      "Our catalogue, two languages and our own publishing tools in one place. It has raised our profile and made the day-to-day simpler.",
  },
  {
    name: "Chris Martin",
    role: "Director",
    company: "ADVANTA",
    project: "advanta-services",
    quote:
      "Clear, quick and no nonsense. Jack handled the lot, and now I can update the site myself whenever I finish a job worth showing.",
  },
  {
    name: "Kieran Side",
    role: "Director",
    company: "Imperial Build",
    project: "imperial-build",
    quote:
      "Exactly what we asked for and more. Clients can see our work and our quantities before they pick up the phone.",
  },
];

export const contact = {
  heading: "Tell me what you're building.",
  sub: "Pick a time for a 30-minute call, or just send the details. I reply within one working day.",
  needs: ["Website", "AI assistant", "Web app or SaaS", "Admin system or CRM", "Something else"],
  budgets: ["Under £2k", "£2k to £5k", "£5k to £15k", "£15k+", "Not sure yet"],
  /** Call slots offered, 24-hour UK time. */
  slots: ["09:30", "11:00", "13:30", "15:00", "16:30"],
};
