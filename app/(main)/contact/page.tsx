import ContactHero from '@/components/website/contact/contact-hero'
import ContactInfo from '@/components/website/contact/contact-info'
import ContactFAQ from '@/components/website/contact/contact-faq'

export const metadata = {
  title: 'Contact Jack Oliver | Book a Discovery Call | Web Development & AI Solutions',
  description: 'Ready to start your project? Book a discovery call or send a message to discuss your website development, AI chatbot solutions, or consulting needs. Fast response guaranteed.',
  keywords: 'contact Jack Oliver, book discovery call, web development consultation, AI solutions consultation, project inquiry, UK developer contact',
  openGraph: {
    title: 'Contact Jack Oliver | Book a Discovery Call | Web Development & AI Solutions',
    description: 'Ready to start your project? Book a discovery call or send a message to discuss your development needs.',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <ContactHero />
      <ContactInfo />
      <ContactFAQ />
    </main>
  )
} 