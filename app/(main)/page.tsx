'use client'

import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/website/home/hero').then(m => m.Hero), { ssr: false })
const HomeTechMarquee = dynamic(() => import('@/components/website/home/tech-marquee'), { ssr: false })
const ServicesOverview = dynamic(() => import('@/components/website/home/services-overview'), { ssr: false })
const HomeProcess = dynamic(() => import('@/components/website/home/process'), { ssr: false })
const FeaturedProjects = dynamic(() => import('@/components/website/home/featured-projects'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/website/home/testimonials'), { ssr: false })
const FinalCTA = dynamic(() => import('@/components/website/home/final-cta'), { ssr: false })

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <HomeTechMarquee />
      <ServicesOverview />
      <HomeProcess />
      <FeaturedProjects />
      <Testimonials />
      <FinalCTA />
    </div>
  )
}
