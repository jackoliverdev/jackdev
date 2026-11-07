import { HeroSection } from "@/components/website/home/hero-section";
import { SelectedWork } from "@/components/website/home/selected-work";
import { ServicesSection } from "@/components/website/home/services-section";
import { ProcessSection } from "@/components/website/home/process-section";
import { TestimonialsSection } from "@/components/website/home/testimonials-section";
import { AboutSection } from "@/components/website/home/about-section";
import { ContactSection } from "@/components/website/home/contact-section";
import { site, services } from "@/lib/content/site";
import { projects } from "@/lib/content/projects";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.personName,
      url: site.url,
      email: site.email,
      jobTitle: "Web and AI developer",
      sameAs: [site.linkedin],
      address: { "@type": "PostalAddress", addressCountry: "GB" },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: site.legalName,
      url: site.url,
      description: site.description,
      founder: { "@id": `${site.url}/#person` },
      areaServed: "United Kingdom",
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, description: service.summary },
      })),
    },
    {
      "@type": "ItemList",
      name: "Selected work",
      itemListElement: projects.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/projects/${project.slug}`,
        name: project.name,
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSection />
      <SelectedWork />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
