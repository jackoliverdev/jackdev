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
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  headline: ["Websites, AI", "and software", "that win you work."],
  // Two lines on desktop (1024px and up), broken exactly here; smaller screens wrap naturally.
  sub: ["I'm Jack. I design and build websites, AI tools and custom software for", "UK businesses, from local trades to growing software companies."],
  primaryCta: { label: "Book a call", href: "/#contact" },
  secondaryCta: { label: "See the work", href: "/#work" },
  availability: "Available for new projects",
};

export const services = [
  {
    id: "websites",
    tone: "sage",
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
    tone: "moss",
    title: "AI development",
    summary:
      "Anything AI: assistants that answer customers, agents that do the admin, workflows that run themselves and AI features in your apps.",
    includes: [
      "Assistants and chatbots",
      "Agents and automated workflows",
      "AI features in your apps",
      "Connected to your systems and data",
    ],
    seenIn: ["centrus-ai", "gym-tours-ai", "excel-electrics"],
  },
  {
    id: "apps",
    tone: "olive",
    title: "Web apps and SaaS",
    summary:
      "Custom software in the browser: admin panels, CRMs, portals and full products with billing, built to be used every day.",
    includes: ["Admin panels and CRMs", "Customer portals", "Payments and subscriptions", "Dashboards and reporting"],
    seenIn: ["centrus-ai", "gym-tours-ai", "imperial-build"],
  },
];

export const process = [
  {
    when: "Day one",
    title: "A 30-minute call",
    copy: "You tell me what you need and I tell you straight whether I'm the right person. No sales team, just me.",
  },
  {
    when: "Within two days",
    title: "A fixed price and plan",
    copy: "Within a couple of days you get the scope, the timeline and one fixed price. No hourly surprises.",
  },
  {
    when: "From week one",
    title: "Design and build",
    copy: "I design it first and you sign off the look. Then I build it, with updates along the way and a full preview before launch.",
  },
  {
    when: "Launch and beyond",
    title: "Launch and look after",
    copy: "Hosting, analytics, search and handover sorted. I stay on hand after launch for changes and support.",
  },
];

export const about = {
  heading: "Design, code, AI and everything that connects them.",
  paragraphs: [
    "I'm Jack, a UK developer who takes a project from a first conversation to a live product, and keeps it running after. You talk to the person writing the code, so decisions take minutes, not meetings.",
    "Most weeks I'm leading the build of Centrus AI, a platform field-service firms run their office on. Around it I build sites, AI assistants, admin systems and integrations for trades, manufacturers, contractors and founders, wired into the tools they already pay for.",
  ],
  facts: [
    { label: "Based in", value: "United Kingdom" },
    { label: "Works with", value: "Trades, manufacturers, contractors and SaaS founders" },
    { label: "Ships", value: "Websites, AI assistants, admin systems, CRMs, integrations, SaaS" },
  ],
};

// Paraphrased from client feedback, two short paragraphs each.
// Every client signs off their quote before it goes live.
export const testimonials = [
  {
    name: "Chris Hartney",
    role: "Chief Operations Officer",
    company: "Centrus AI",
    project: "centrus-ai",
    quote: [
      "Jack has built Centrus with us from day one. Our website, the main application, every API and integration, customer support and payments: all of it is his work.",
      "He also built the CRM we run the company on, from tasks and calendars to deals that update themselves after every call. Technically deep and built to a standard we rely on daily.",
    ],
  },
  {
    name: "Mitchell Evans",
    role: "Founder",
    company: "JetNow Drainage",
    project: "jetnow-drainage",
    quote: [
      "This was our first proper website, and Jack made the whole thing easy. He explained every step in plain English, kept it affordable, and the site looks as professional as anyone in the trade.",
      "The SEO has been fantastic. We show up right across our area for the searches that matter, and we get a steady stream of local leads we would never have had before.",
    ],
  },
  {
    name: "Kieran Side",
    role: "Director",
    company: "Imperial Build",
    project: "imperial-build",
    quote: [
      "We had outgrown our old website. Jack replaced it with a modern site that works properly on every device and finally reflects the size of the jobs we take on.",
      "It gave us the credibility we needed to win work. Clients see our projects and quantities before they pick up the phone, and we rank well on Google and show up in AI answers like ChatGPT.",
    ],
  },
  {
    name: "Chris Martin",
    role: "Director",
    company: "Advanta Services",
    project: "advanta-services",
    quote: [
      "Jack built us a site that finally shows the quality of our work: real jobs, real reviews and a clear picture of everything we do, from rewires to air conditioning.",
      "It ranks really well for local trades searches around Spalding and Peterborough, and I update it myself whenever I finish a job worth showing. Clear, quick and no nonsense from start to finish.",
    ],
  },
  {
    name: "Matt Digby",
    role: "Director",
    company: "Excel Electrics",
    project: "excel-electrics",
    quote: [
      "Jack took our vision for the site and delivered exactly what we wanted, at a price that worked for a small business. It looks the part on every device, and customers tell us how easy it is to get in touch.",
      "The AI assistant was custom-built around how we actually work. It answers questions, takes the details we need and hands over a proper enquiry, even when we're up a ladder on another job.",
    ],
  },
  {
    name: "Luca Castronuvo",
    role: "Managing Director",
    company: "Hand Line",
    project: "hand-line",
    quote: [
      "We started with a site that listed our gloves. Jack grew it into a full range in five languages, with a portal where we upload products, brands and articles ourselves.",
      "He understood the EN safety standards behind every product and built them in, so we manage certifications in one place. It has raised our profile and made life simpler.",
    ],
  },
  {
    name: "Jack Rowley",
    role: "Co-founder",
    company: "Gym Tours AI",
    project: "gym-tours-ai",
    quote: [
      "Jack built our marketing website and the app our gym owners use every day. It's so intuitive that they pick it up without any training, and their members find it just as easy.",
      "Behind it sits the admin system we run the business from: every account, every new gym and every payment. Better than anything we pictured at the start.",
    ],
  },
];

export const contact = {
  heading: "Tell me what you're building.",
  intro: [
    "Send me a message about your project. I'd love to hear what you're working on, however early it is.",
    "Or book a 30-minute call: pick a day and time in the form and I'll confirm it by email with a calendar invite, usually within one working day.",
  ],
  needs: ["Website", "AI development", "Web app or SaaS", "Admin system or CRM", "Something else"],
  budgets: ["Under £2k", "£2k to £5k", "£5k to £15k", "£15k+", "Not sure yet"],
  /** Call slots offered, 24-hour UK time. */
  slots: ["09:30", "11:00", "13:30", "15:00", "16:30"],
};
