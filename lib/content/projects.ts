export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  name: string;
  sector: string;
  year: string;
  url?: string;
  live: boolean;
  /** One line for the homepage gallery. */
  tagline: string;
  /** Short intro paragraph for the case study. */
  summary: string;
  role: string;
  stack: string[];
  challenge: string;
  solution: string;
  features: string[];
  results: string[];
  cover: ProjectImage;
  shots: ProjectImage[];
  /** Per-project accent, used for subtle case-study theming. */
  accent: string;
  seoDescription: string;
};

export const projects: Project[] = [
  {
    slug: "centrus-ai",
    name: "Centrus AI",
    sector: "AI Platform · Field Service",
    year: "2023 to present",
    url: "https://centrus.ai",
    live: true,
    tagline: "An AI platform for field-service businesses, built and led end to end.",
    summary:
      "Centrus AI gives field-service businesses one conversational interface for everything they know. As lead developer I build the whole product: the assistant, the integrations and the agents that automate the back office.",
    role: "Lead Developer",
    stack: [
      "Next.js",
      "TypeScript",
      "OpenAI",
      "PostgreSQL",
      "WhatsApp API",
      "Microsoft Teams",
    ],
    challenge:
      "Field-service businesses run on scattered knowledge: job-management systems, shared drives, inboxes and the heads of a few key people. Engineers on site cannot get answers, and the office burns hours on repetitive admin.",
    solution:
      "A single AI assistant connected to the tools a business already uses. It plugs into job-management systems like BigChange and Joblogic, learns from uploaded SOPs and pricing guides, and answers via the web app, Microsoft Teams or WhatsApp, so an engineer in a van gets the same answers as the office. Custom agents go further, handling quoting, reporting and inbox triage in the background.",
    features: [
      "Conversational access to live job data: schedules, customers, site history",
      "Deep integrations with BigChange, Joblogic, SharePoint, Google Drive and more",
      "WhatsApp access for engineers in the field, Teams for the office",
      "Custom AI agents for quoting, reporting and inbox management",
      "Document training on SOPs, manuals and pricing guides",
      "Enterprise-grade security with encrypted data in transit and at rest",
    ],
    results: [
      "A production SaaS platform serving field-service businesses across the UK",
      "Engineers self-serve answers on site instead of ringing the office",
      "Entire back-office workflows handled by agents, not admin staff",
    ],
    cover: { src: "/portfolio/centrus-ai/cover.png", alt: "Centrus AI platform homepage" },
    shots: [
      { src: "/portfolio/new/centrus2.png", alt: "Centrus AI chat interface" },
      { src: "/portfolio/new/centrus3.png", alt: "Centrus AI integrations" },
      { src: "/portfolio/new/centrus4.png", alt: "Centrus AI dashboard" },
    ],
    accent: "224 100% 64%",
    seoDescription:
      "Case study: Centrus AI, an AI assistant platform for field-service businesses with BigChange and Joblogic integrations, WhatsApp access and custom automation agents. Built by Jack Oliver Dev.",
  },
  {
    slug: "gym-tours-ai",
    name: "Gym Tours AI",
    sector: "SaaS · Fitness",
    year: "2024",
    url: "https://gymtours.ai",
    live: true,
    tagline: "VR gym tours and an AI assistant that signs up members while the gym sleeps.",
    summary:
      "An all-in-one platform that pairs Matterport virtual tours with a trained AI assistant, so gyms capture and convert leads 24/7, complete with lead scoring, analytics and notifications.",
    role: "Design & Development",
    stack: ["Next.js", "TypeScript", "Matterport", "OpenAI", "Supabase", "Tailwind CSS"],
    challenge:
      "Independent gyms lose roughly 40% of leads outside opening hours, and reception staff spend thousands of pounds' worth of time answering the same questions about prices, classes and equipment.",
    solution:
      "A digital employee that never clocks off. Prospects explore the gym through a professional 3D tour while an AI assistant, trained on that gym's memberships, timetable and policies, answers questions and captures qualified leads. Owners get a dashboard with lead scoring, analytics and instant notifications.",
    features: [
      "Embedded Matterport 3D tours, mobile-optimised",
      "AI assistant trained per-gym on pricing, classes and policies",
      "Automatic lead capture from tours and chat conversations",
      "Lead scoring, analytics dashboard and engagement notifications",
      "One-line website embed, live within a week of capture",
      "Round-the-clock answers on memberships, classes and opening hours",
    ],
    results: [
      "Gyms capture leads around the clock, including when competitors are closed",
      "Enquiry handling automated from £20k+ in annual staff time to a monthly subscription",
      "Used by independent gyms across the UK",
    ],
    cover: { src: "/portfolio/gym-tours-ai/cover.png", alt: "Gym Tours AI homepage with virtual tour" },
    shots: [
      { src: "/portfolio/new/gymtours2.png", alt: "Gym Tours AI platform overview" },
      { src: "/portfolio/new/gymtours3.png", alt: "Gym Tours AI lead capture" },
      { src: "/portfolio/new/gymtours4.png", alt: "Gym Tours AI analytics" },
    ],
    accent: "152 76% 52%",
    seoDescription:
      "Case study: Gym Tours AI, a lead generation platform for gyms combining Matterport VR tours with a custom-trained AI assistant, lead scoring and analytics. Built by Jack Oliver Dev.",
  },
  {
    slug: "tourbots-ai",
    name: "TourBots AI",
    sector: "SaaS · White-label AI",
    year: "2025",
    url: "https://tourbots.ai",
    live: true,
    tagline: "An AI guide for any virtual tour. One line of embed code, fully white-label.",
    summary:
      "TourBots layers a conversational AI guide onto Matterport tours: answering questions, navigating visitors to the right room and capturing leads. Tour agencies white-label it to turn one-off hosting into recurring revenue.",
    role: "Design & Development",
    stack: ["Next.js", "TypeScript", "OpenAI", "Matterport SDK", "Stripe", "Supabase"],
    challenge:
      "Virtual tours are passive. Most visitors click one room and leave without finding what makes a space valuable, and the tour cannot answer a single question about pricing, capacity or availability.",
    solution:
      "A self-serve platform where anyone can paste a Matterport link, train an AI on their space in under thirty minutes, and go live with a single embed line. The AI answers from the owner's content, physically navigates the tour to the areas visitors ask about, and triggers actions like lead capture at the right moment. A white-label portal lets tour agencies resell it under their own brand.",
    features: [
      "AI guide that navigates the tour while it answers",
      "Self-serve training: tour points, FAQs, brochures and pricing context",
      "Single-line embed with engagement analytics built in",
      "Custom triggers for lead capture and calls to action",
      "White-label agency workspace with per-client deployments",
      "Subscription billing from £19.99 per space",
    ],
    results: [
      "Live SaaS with a free tier and self-serve onboarding",
      "Agencies add a recurring AI revenue line to existing tour clients",
      "Visitors discover spaces they would otherwise never click into",
    ],
    cover: { src: "/portfolio/tourbots-ai/cover.png", alt: "TourBots AI homepage" },
    shots: [],
    accent: "264 84% 66%",
    seoDescription:
      "Case study: TourBots AI, a white-label SaaS that adds an AI guide to Matterport virtual tours with one line of embed code. Designed and built by Jack Oliver Dev.",
  },
  {
    slug: "hand-line",
    name: "Hand Line Company",
    sector: "E-commerce · B2B",
    year: "2024",
    url: "https://www.handlineco.com",
    live: true,
    tagline: "A multilingual B2B storefront for an Italian safety equipment manufacturer.",
    summary:
      "Hand Line has designed and manufactured industrial safety gloves for over 40 years. Their new platform brings a full multilingual product catalogue, dynamic content management and a modern B2B presence to a heritage manufacturer.",
    role: "Design & Development",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    challenge:
      "A catalogue of over 100 technical products across gloves and respiratory protection, two languages, and a team that needed to publish products and articles themselves without touching code.",
    solution:
      "A multilingual storefront with full English and Italian support, a dynamic backend for publishing products, categories and blog content, and structured product data covering certifications and applications. Built to present a 40-year-old manufacturer the way modern industrial buyers expect.",
    features: [
      "Full English and Italian language support",
      "Catalogue of 100+ products with filtering by certification and application",
      "Dynamic backend: the team publishes products and blog posts themselves",
      "Category structure across heat, cut, mechanical and respiratory protection",
      "Product detail pages with EN-standard certifications",
      "Wholesale enquiry flows for B2B buyers",
    ],
    results: [
      "A heritage manufacturer with a digital presence to match its products",
      "Content and catalogue managed in-house, no developer needed",
      "Streamlined operations and a significantly raised online profile",
    ],
    cover: { src: "/portfolio/hand-line/cover.png", alt: "Hand Line Company homepage" },
    shots: [
      { src: "/portfolio/new/handline2.png", alt: "Hand Line product catalogue" },
      { src: "/portfolio/new/handline3.png", alt: "Hand Line product detail page" },
      { src: "/portfolio/new/handline4.png", alt: "Hand Line content management" },
    ],
    accent: "28 92% 56%",
    seoDescription:
      "Case study: Hand Line Company, a multilingual B2B e-commerce platform for an Italian safety equipment manufacturer with dynamic catalogue and content management. Built by Jack Oliver Dev.",
  },
  {
    slug: "excel-electrics",
    name: "Excel Electrics",
    sector: "Trades · Local SEO",
    year: "2025",
    url: "https://excelelectrics.com",
    live: true,
    tagline: "A local electrician's site that ranks, reassures and wins the job.",
    summary:
      "A clean, conversion-focused site for an electrical and fire-safety specialist covering Essex, Suffolk, Cambridgeshire, Hertfordshire and London, built to win local search and make enquiring effortless.",
    role: "Design, Development & SEO",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Resend", "Vercel"],
    challenge:
      "Homeowners choose tradespeople in seconds, on their phones, usually from a Google search. Excel Electrics needed to look established, communicate trust instantly and convert visits into enquiries, against national lead-gen sites with big budgets.",
    solution:
      "A fast single-page site with the five service areas laid out plainly, an interactive county coverage map, and an enquiry form that accepts photos of the job, removing the friction of describing a fuse board over the phone. Structured data and locally targeted copy handle the SEO.",
    features: [
      "Interactive coverage map across six counties",
      "Enquiry form with photo and document upload",
      "Service breakdown: electrical, fire safety, access control, gates and EV charging",
      "Local SEO with town-level targeting across Essex and beyond",
      "Same-day response promise built into the contact flow",
      "Mobile-first design tuned for homeowners searching on the go",
    ],
    results: [
      "Page-one local rankings for target service and area terms",
      "Photo uploads mean quotes go out without a site visit",
      "A one-man business that presents like an established firm",
    ],
    cover: { src: "/portfolio/excel-electrics/cover.png", alt: "Excel Electrics homepage" },
    shots: [],
    accent: "42 96% 56%",
    seoDescription:
      "Case study: Excel Electrics, a local SEO website for an electrical and fire safety business covering Essex and London, with coverage maps and photo-upload enquiries. Built by Jack Oliver Dev.",
  },
  {
    slug: "jetnow-drainage",
    name: "JetNow Drainage",
    sector: "Trades · Local SEO",
    year: "2025",
    url: "https://jetnowdrainage.co.uk",
    live: true,
    tagline: "Emergency drainage, found fast. Built for the 2am blocked-drain search.",
    summary:
      "A high-urgency site for a family drainage firm: fixed pricing, two-hour response and WhatsApp contact, all surfaced in seconds for people searching with water rising.",
    role: "Design, Development & SEO",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp API", "Vercel"],
    challenge:
      "Drainage is a distress purchase. Visitors arrive stressed, on mobile, and pick whoever looks trustworthy and answers fastest. The site had to communicate speed, fixed pricing and professionalism in a single screen.",
    solution:
      "An unmissable hierarchy: two-hour response, fixed prices and ten years' experience above the fold, one-tap WhatsApp and phone contact, and a coverage map spanning ten counties around London. Service pages target the searches people actually make: drain unblocking, CCTV surveys, high-pressure jetting.",
    features: [
      "Two-hour response and fixed-price promises front and centre",
      "One-tap WhatsApp and phone contact for emergencies",
      "Coverage mapping across ten counties with town-level SEO",
      "Service pages for unblocking, CCTV surveys, jetting, relining and repairs",
      "Testimonials and trust signals tuned for distress purchases",
      "Mobile-first layout built for the 2am blocked-drain search",
    ],
    results: [
      "Ranking for emergency drainage terms across Essex and surrounding counties",
      "WhatsApp-first contact converts mobile visitors who would never fill a form",
      "A small family firm competing with national chains online",
    ],
    cover: { src: "/portfolio/jetnow-drainage/cover.png", alt: "JetNow Drainage homepage" },
    shots: [],
    accent: "199 89% 56%",
    seoDescription:
      "Case study: JetNow Drainage, an emergency drainage services website with fixed pricing, two-hour response messaging and WhatsApp contact. Built by Jack Oliver Dev.",
  },
  // Temporarily hidden. Uncomment to restore case study pages.
  // {
  //   slug: "imperial-build",
  //   name: "Imperial Build",
  //   sector: "Construction · Brochure",
  //   year: "2025",
  //   url: "https://imperialbuildlimited.com",
  //   live: true,
  //   tagline: "A groundworks contractor with a website as solid as its foundations.",
  //   summary:
  //     "A straightforward, credible web presence for an Essex external-works contractor serving self-builders, developers and local councils: demolition, groundworks, drainage and landscaping.",
  //   role: "Design & Development",
  //   stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  //   challenge:
  //     "Imperial Build wins work from councils, house builders and developers, clients who check a contractor's web presence before returning a call. The site needed to feel established and safety-conscious without a single line of fluff.",
  //   solution:
  //     "A no-nonsense brochure site: clear service breakdown across groundworks, drainage, general building and landscaping, site video, company registration details up front and a direct enquiry route. Professional, fast and exactly as serious as the industry expects.",
  //   features: [
  //     "Service pages for groundworks, drainage, general building and landscaping",
  //     "On-site video showcasing live projects",
  //     "Company credentials and registration details surfaced for procurement checks",
  //     "Direct enquiry routing with phone-first contact",
  //     "Coverage messaging for Essex, Hertfordshire and North and East London",
  //     "Project gallery showcasing completed groundworks and external works",
  //   ],
  //   results: [
  //     "A credible digital front door for council and developer tenders",
  //     "Clear service positioning across four trade disciplines",
  //     "Fast, low-maintenance site the client never has to think about",
  //   ],
  //   cover: { src: "/portfolio/imperial-build/cover.png", alt: "Imperial Build homepage" },
  //   shots: [],
  //   accent: "16 84% 56%",
  //   seoDescription:
  //     "Case study: Imperial Build, a professional website for an Essex groundworks, demolition and landscaping contractor. Built by Jack Oliver Dev.",
  // },
  // {
  //   slug: "advanta-services",
  //   name: "ADVANTA Services",
  //   sector: "Trades · Local SEO",
  //   year: "2026",
  //   url: "https://advantaservices.co.uk",
  //   live: false,
  //   tagline: "Air conditioning and electrical services for Peterborough. Launching soon.",
  //   summary:
  //     "A local-SEO site in build for a qualified electrician specialising in air conditioning installation and electrical works across Peterborough and the surrounding area.",
  //   role: "Design, Development & SEO",
  //   stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  //   challenge:
  //     "A new one-van business with no web presence needs to compete for air conditioning searches in Peterborough against established firms from day one, on a small-business budget.",
  //   solution:
  //     "The same playbook proven on JetNow Drainage and Excel Electrics: a fast, trust-first single-page site with clear services, area coverage and frictionless contact, plus locally targeted structured data so Google understands exactly who it serves and where.",
  //   features: [
  //     "Air conditioning installation, servicing and repair pages",
  //     "Electrical works by a fully qualified electrician",
  //     "Peterborough and surrounding-area coverage targeting",
  //     "Trust-first design: qualifications, insurance and clear pricing",
  //     "Built on the proven local-SEO architecture from my other trades sites",
  //     "Frictionless enquiry flow with one-tap call and message",
  //   ],
  //   results: [
  //     "Launching ahead of the 2026 summer air-conditioning season",
  //     "Local search foundations in place from day one",
  //   ],
  //   cover: { src: "/portfolio/advanta-services/cover.png", alt: "ADVANTA Services website preview" },
  //   shots: [],
  //   accent: "190 90% 50%",
  //   seoDescription:
  //     "Case study: ADVANTA Services, a local SEO website for an air conditioning and electrical services business in Peterborough. Built by Jack Oliver Dev.",
  // },
];

// Slugs to skip in "next project" navigation. Comment a line out to restore it.
const HIDDEN_FROM_NAV = new Set<string>([
  "tourbots-ai",
]);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  for (let step = 1; step <= projects.length; step++) {
    const candidate = projects[(index + step) % projects.length];
    if (!HIDDEN_FROM_NAV.has(candidate.slug)) return candidate;
  }
  return projects[(index + 1) % projects.length];
}
