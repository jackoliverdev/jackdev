// Every case study on the site. Order here is the order on the homepage.
// Images live in public/work/<slug>/ and are captured with one rig, so they
// all share a ratio: desktop-*.webp is 16:10, mobile-*.webp is 390:844.

export type ProjectShot = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  /** Who the client is, in a few words. */
  client: string;
  /** A shorter version for narrow cards on phones, where `client` would run to three lines. */
  clientShort?: string;
  sector: string;
  year: string;
  url: string;
  status: "live" | "launching";
  /** One line for the homepage card. */
  tagline: string;
  /** What I built, as short labels. */
  built: string[];
  summary: string;
  challenge: string;
  solution: string;
  features: string[];
  outcomes: string[];
  stack: string[];
  /** desktop[0] is the cover. */
  desktop: ProjectShot[];
  mobile: ProjectShot[];
  seoDescription: string;
};

// `version` goes in the file name (desktop-1-v3.webp) so a reshoot never shows a cached old image.
const shots = (slug: string, name: string, desktop: string[], mobile: string[], version?: number) => {
  const v = version ? `-v${version}` : "";
  return {
    desktop: desktop.map((alt, i) => ({ src: `/work/${slug}/desktop-${i + 1}${v}.webp`, alt: `${name}: ${alt}` })),
    mobile: mobile.map((alt, i) => ({ src: `/work/${slug}/mobile-${i + 1}${v}.webp`, alt: `${name} on a phone: ${alt}` })),
  };
};

export const projects: Project[] = [
  {
    slug: "centrus-ai",
    name: "Centrus AI",
    client: "AI and automation platform for UK field service",
    sector: "AI platform",
    year: "2023 to now",
    url: "https://centrus.ai",
    status: "live",
    tagline: "The AI platform field-service firms run their office on. I lead the build, end to end.",
    built: ["AI product", "Admin CRM", "APIs and integrations", "Payments", "Marketing site"],
    summary:
      "Centrus connects to the job system, finance, files and inbox a field-service business already runs. Engineers and the office ask on WhatsApp, Teams or the web, get answers from their own records, and Centrus does the follow-up. I'm the lead developer on all of it.",
    challenge:
      "Field-service knowledge is scattered across job systems, shared drives, inboxes and a few people's heads. Engineers on site can't get answers, and the office loses hours to the same admin every week.",
    solution:
      "One assistant wired into the tools a business already uses: BigChange, Joblogic, Xero, Outlook, SharePoint and more. Agent Builder turns a described task into an automation that runs on a schedule, Front Desk answers customers on the website, and an admin CRM behind it all runs tasks, calendars, deals and the automations that update a deal after each call. Billing and payments run through Stripe.",
    features: [
      "Answers from live job data on WhatsApp, Teams and the web",
      "Integrations with BigChange, Joblogic, Xero, Outlook, SharePoint and Google",
      "Agent Builder: describe the admin once and it runs every time",
      "Front Desk website assistant that books jobs and answers customers",
      "Admin CRM for tasks, calendars, deals and post-call automations",
      "Billing, subscriptions and payments",
      "The marketing site, help centre and product films",
    ],
    outcomes: [
      "A production platform used daily by field-service businesses across the UK",
      "Engineers self-serve answers on site instead of ringing the office",
      "Reports, chasers and inbox triage handled by agents, not admin staff",
    ],
    stack: ["Next.js", "React", "TypeScript", "OpenAI", "Supabase", "Stripe", "Remotion"],
    ...shots(
      "centrus-ai",
      "Centrus AI",
      [
        "homepage, with the product answering from live job data",
        "the app: an answer from the contract and rate card, with sources",
        "the app: describing an agent in chat and getting its plan",
        "the app: the Agent Builder canvas",
        "the app: an agent's runs, step by step",
        "Chat on the marketing site, with the WhatsApp demo",
        "Front Desk, the website assistant, on the marketing site",
        "the integrations wall",
        "the hours and ROI calculator",
      ],
      ["homepage", "use cases: portal mail raised as a job"],
      3
    ),
    seoDescription:
      "Case study: Centrus AI, an AI and automation platform for UK field service with an admin CRM, Agent Builder and integrations with BigChange, Joblogic and Xero. Built by Jack Oliver Dev.",
  },
  {
    slug: "jetnow-drainage",
    name: "JetNow Drainage",
    client: "Family-run emergency drainage firm, London and Essex",
    clientShort: "Emergency drainage, London and Essex",
    sector: "Trades",
    year: "2025",
    url: "https://www.jetnowdrainage.co.uk",
    status: "live",
    tagline: "Built for the 2am blocked-drain search: emergency services up front, local SEO that wins page one across the area, and one-tap calls and WhatsApp to book.",
    built: ["Website", "Local SEO", "WhatsApp contact"],
    summary:
      "A high-urgency site for a family drainage firm: fixed pricing, two-hour response and one-tap WhatsApp, all on screen in seconds for someone searching with water rising.",
    challenge:
      "Drainage is a distress purchase. Visitors arrive stressed, on a phone, and pick whoever looks trustworthy and answers first.",
    solution:
      "Two-hour response, fixed prices and ten years' experience above the fold, one-tap WhatsApp and phone, a coverage map across the counties around London, and service pages for the searches people actually make.",
    features: [
      "Response time and fixed pricing front and centre",
      "One-tap WhatsApp and phone contact",
      "Coverage map with town-level SEO",
      "Pages for unblocking, CCTV surveys, jetting, relining and repairs",
      "Reviews and trust signals tuned for distress purchases",
    ],
    outcomes: [
      "Ranking for emergency drainage terms around Essex and London",
      "WhatsApp-first contact converts visitors who'd never fill in a form",
      "A family firm competing with national chains online",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    ...shots(
      "jetnow-drainage",
      "JetNow Drainage",
      ["homepage", "drainage services", "areas covered", "call to action with the van"],
      ["homepage", "contact and WhatsApp"]
    ),
    seoDescription:
      "Case study: JetNow Drainage, an emergency drainage website with fixed pricing, two-hour response and WhatsApp contact. Built by Jack Oliver Dev.",
  },
  {
    slug: "imperial-build",
    name: "Imperial Build",
    client: "Commercial groundworks and building contractor",
    clientShort: "Groundworks and building contractor",
    sector: "Construction",
    year: "2026",
    url: "https://imperialbuildlimited.com",
    status: "live",
    tagline: "A contractor's site that reads like a tender: services, sectors and real project quantities, with an admin console the team uses to publish new work.",
    built: ["Website", "Content system", "Analytics", "SEO and AI search"],
    summary:
      "Imperial Build works as a package subcontractor for principal contractors, developers, housing providers, schools and public sector clients across London, Essex and Hertfordshire. The rebuild gives them a site buyers can check in a minute and a back office they run themselves.",
    challenge:
      "Commercial clients check a contractor online before they return a call. They had outgrown their old site: a single page with a video and no proof of work, so it did nothing for tenders.",
    solution:
      "A full rebuild around how buyers assess a contractor: services, sectors, accreditations and project case studies with the quantities delivered. Behind it sits an admin console for projects, services, sectors, media, enquiries and analytics, so the team publishes new work without me.",
    features: [
      "Project case studies with location, sector and quantities delivered",
      "Services, sectors and accreditations pages written for procurement checks",
      "Admin console: projects, pages, media, enquiries, users and settings",
      "Built-in analytics alongside Google Analytics and Search Console",
      "Structured data for search engines and AI answers",
      "Tender enquiry flow that routes straight to the estimators",
    ],
    outcomes: [
      "The credibility to win work, on every device",
      "Ranking on Google and appearing in AI answers like ChatGPT",
      "New projects published by the team the day they finish",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Playwright"],
    ...shots(
      "imperial-build",
      "Imperial Build",
      ["homepage", "services from enquiry to completion", "project case studies with quantities", "sectors"],
      ["homepage", "services"]
    ),
    seoDescription:
      "Case study: Imperial Build, a website and admin console for a commercial groundworks and building contractor in London, Essex and Hertfordshire. Built by Jack Oliver Dev.",
  },
  {
    slug: "advanta-services",
    name: "Advanta Services",
    client: "Electrical and air conditioning, Spalding and Peterborough",
    clientShort: "Electrics and air con, Peterborough",
    sector: "Trades",
    year: "2026",
    url: "https://www.advantaservices.co.uk",
    status: "live",
    tagline: "Real installs and Google reviews front and centre, strong local rankings around Spalding, and an admin panel the owner updates after every good job.",
    built: ["Website", "Content system", "Analytics", "SEO and AI search"],
    summary:
      "Advanta Services does domestic, commercial, industrial and agricultural electrical and air conditioning work around Spalding and Peterborough. The site puts their real jobs and Google reviews up front, and the owner runs it from his own admin panel.",
    challenge:
      "A growing local firm with great reviews and photos of great work, but nowhere to show them and no way to update a site without paying someone every time.",
    solution:
      "A dark, photo-led site built around their own job photos, a coverage map by county, reviews pulled from Google, and an admin panel for content, enquiries, theme, backups and users. Analytics and search are wired in from day one.",
    features: [
      "Service pages for electrical and air conditioning work",
      "Gallery of real installs, rewires, fuse boards and EV chargers",
      "Coverage map across Lincolnshire, Cambridgeshire and beyond",
      "Admin panel: content, enquiries, theme, backups and users",
      "Google Analytics, Search Console and structured data for AI search",
    ],
    outcomes: [
      "Real work and real reviews in front of every visitor",
      "Updates made by the owner, not a developer",
      "Ranking for electrical and air conditioning searches around Spalding",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Resend"],
    ...shots(
      "advanta-services",
      "Advanta Services",
      ["homepage", "services with real job photos", "coverage map", "Google reviews"],
      ["homepage", "services"]
    ),
    seoDescription:
      "Case study: Advanta Services, a website and admin panel for an electrical and air conditioning business in Spalding and Peterborough. Built by Jack Oliver Dev.",
  },
  {
    slug: "excel-electrics",
    name: "Excel Electrics",
    client: "Electrical and fire safety specialist, Essex and London",
    clientShort: "Electrical and fire safety, Essex",
    sector: "Trades",
    year: "2025",
    url: "https://excelelectrics.com",
    status: "live",
    tagline: "A trust-first site for homeowners, with an AI assistant built around Excel's own enquiry flow that answers questions and takes jobs at any hour.",
    built: ["Website", "Custom AI assistant", "Local SEO"],
    summary:
      "Excel Electrics covers electrics, fire safety, access control, gates and EV charging across Essex, Suffolk, Cambridgeshire, Hertfordshire and London. The site wins local searches and its assistant handles the questions customers ask before they book.",
    challenge:
      "Homeowners pick a tradesperson in seconds, on a phone, from a Google search. Excel needed to look established and make enquiring effortless, against national lead-gen sites with big budgets.",
    solution:
      "A fast site with the services laid out plainly, an interactive county coverage map, an enquiry form that takes photos of the job, and an AI assistant trained on the business that answers questions and captures the enquiry.",
    features: [
      "AI assistant custom-built around Excel's own enquiry flows",
      "Interactive coverage map across six counties",
      "Enquiry form with photo and document upload",
      "Town-level local SEO across Essex and beyond",
      "Light and dark themes, built for phones first",
    ],
    outcomes: [
      "Customer questions answered out of hours",
      "Photo uploads mean quotes go out without a site visit",
      "A small firm that presents like an established one",
    ],
    stack: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "Resend"],
    ...shots(
      "excel-electrics",
      "Excel Electrics",
      ["homepage", "services", "areas covered map", "small jobs and contact"],
      ["homepage", "areas covered map"]
    ),
    seoDescription:
      "Case study: Excel Electrics, a local SEO website with an AI assistant for an electrical and fire safety business covering Essex and London. Built by Jack Oliver Dev.",
  },
  {
    slug: "hand-line",
    name: "Hand Line",
    client: "Industrial safety glove manufacturer, 40 years trading",
    clientShort: "Safety glove maker, 40 years trading",
    sector: "B2B e-commerce",
    year: "2025",
    url: "https://www.handlineco.com",
    status: "live",
    tagline: "From a list of gloves to a full product range in five languages, with EN standards built in and a portal the team uses to add products, brands and articles.",
    built: ["Website", "Product catalogue", "Five languages", "Product portal"],
    summary:
      "Hand Line has designed and made industrial safety gloves for over 40 years. The platform started as a list of gloves and grew into a full product range in five languages, with a portal where the team manages products, brands, articles and certifications.",
    challenge:
      "Over 100 technical products across heat, cut, mechanical and respiratory protection, each tied to EN safety standards, buyers in five languages, and a team that needed to publish without a developer.",
    solution:
      "A multilingual catalogue in five languages with managed translation, structured product data for EN certifications and applications, industry pages for the sectors they serve, and a portal where the team uploads products, brands and articles themselves.",
    features: [
      "Five languages with managed translation",
      "100+ products with EN certification data and filtering",
      "Industry pages for glass, steel and other high-heat work",
      "Portal for products, brands, articles and certifications",
      "Wholesale enquiry flows for trade buyers",
    ],
    outcomes: [
      "A heritage manufacturer presented the way industrial buyers expect",
      "Catalogue and content run in-house",
      "A clear route from product to trade enquiry",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    ...shots(
      "hand-line",
      "Hand Line",
      ["homepage", "expertise and product ranges", "featured products", "industry solutions"],
      ["homepage", "featured products"]
    ),
    seoDescription:
      "Case study: Hand Line, a multilingual B2B catalogue and content system for an Italian safety glove manufacturer. Built by Jack Oliver Dev.",
  },
  {
    slug: "gym-tours-ai",
    name: "Gym Tours AI",
    client: "VR tours and lead generation for independent UK gyms",
    clientShort: "VR tours and leads for UK gyms",
    sector: "SaaS",
    year: "2025",
    url: "https://www.gymtours.ai",
    status: "live",
    tagline: "VR gym tours with an AI assistant that signs members up while the gym is closed, plus the marketing site and the admin system that takes the payments.",
    built: ["Marketing site", "SaaS platform", "AI assistant", "Admin and payments"],
    summary:
      "Gym Tours AI pairs a Matterport 3D tour with an assistant trained on each gym's prices, classes and policies, so gyms capture and qualify leads around the clock.",
    challenge:
      "Independent gyms lose a big share of enquiries outside opening hours, and reception staff spend hours answering the same questions about prices, classes and equipment.",
    solution:
      "Prospects walk the gym in 3D while an assistant trained on that gym answers questions and captures their details. Owners get a dashboard with lead scoring, analytics and instant notifications, and the whole thing goes live from one line of embed code.",
    features: [
      "Embedded Matterport 3D tours, built for phones",
      "An assistant trained per gym on pricing, classes and policies",
      "Lead capture from tours and conversations",
      "Lead scoring, analytics and instant notifications",
      "One-line website embed, live within a week of the shoot",
      "Admin system for every gym account, onboarding and payments",
    ],
    outcomes: [
      "Gyms capture leads around the clock, including when competitors are closed",
      "Front desk questions answered without a member of staff",
      "Used by independent gyms across the UK",
    ],
    stack: ["Next.js", "TypeScript", "OpenAI", "Matterport SDK", "Supabase", "Stripe"],
    ...shots(
      "gym-tours-ai",
      "Gym Tours AI",
      ["homepage with a live virtual tour", "24/7 tours, assistant and lead capture", "lead dashboard", "how it works"],
      ["homepage with the tour", "platform overview"]
    ),
    seoDescription:
      "Case study: Gym Tours AI, a lead generation platform for gyms combining Matterport VR tours with a custom-trained AI assistant, lead scoring and analytics. Built by Jack Oliver Dev.",
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};
