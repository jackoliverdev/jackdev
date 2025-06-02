'use client'

import { Hero } from '@/components/website/home/hero'
import ServicesOverview from '@/components/website/home/services-overview'
import FeaturedProjects from '@/components/website/home/featured-projects'
import Testimonials from '@/components/website/home/testimonials'
import FinalCTA from '@/components/website/home/final-cta'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ServicesOverview />
      <FeaturedProjects />
      <Testimonials />
      <FinalCTA />
    </div>
  )
}
