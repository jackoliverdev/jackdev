import ServicesHero from '@/components/website/services/services-hero'
import ServiceDetails from '@/components/website/services/service-details'
import ServiceTechnologies from '@/components/website/services/service-technologies'
import ServiceProcess from '@/components/website/services/service-process'
import ServiceFAQ from '@/components/website/services/service-faq'
import FinalCTA from '@/components/website/home/final-cta'

export const metadata = {
  title: 'Services | Website Development & AI Solutions | Jack Oliver Development',
  description: 'Professional website development, AI chatbot solutions, and consulting services. Specialising in modern web applications, e-commerce platforms, and custom AI integrations for UK businesses.',
  keywords: 'website development services, AI chatbot development, web development UK, e-commerce development, custom web applications, AI solutions, consulting services',
  openGraph: {
    title: 'Services | Website Development & AI Solutions | Jack Oliver Development',
    description: 'Professional website development, AI chatbot solutions, and consulting services for modern businesses.',
  },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesHero />
      <ServiceDetails />
      <ServiceTechnologies />
      <ServiceProcess />
      <ServiceFAQ />
      <FinalCTA />
    </main>
  )
} 