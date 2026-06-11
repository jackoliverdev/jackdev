import { HeroSection } from "@/components/website/home/hero-section";
import { ServicesSection } from "@/components/website/home/services-section";
import { SelectedWork } from "@/components/website/home/selected-work";
import { AiSpotlight } from "@/components/website/home/ai-spotlight";
import { AboutSection } from "@/components/website/home/about-section";
import { TestimonialsSection } from "@/components/website/home/testimonials-section";
import { ContactSection } from "@/components/website/home/contact-section";
import { site, services } from "@/lib/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.personName,
      url: site.url,
      email: site.email,
      jobTitle: "Web & AI Developer",
      sameAs: [site.github, site.linkedin],
      address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
      },
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
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <main className="max-md:overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ServicesSection />
      <SelectedWork />
      <AiSpotlight />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
