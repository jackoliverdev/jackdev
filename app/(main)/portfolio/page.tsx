import PortfolioHero from '@/components/website/portfolio/portfolio-hero'
import PortfolioGrid from '@/components/website/portfolio/portfolio-grid'
import FinalCTA from '@/components/website/home/final-cta'

export const metadata = {
  title: 'Portfolio | Featured Projects & Case Studies | Jack Oliver Development',
  description: 'Explore Jack Oliver\'s portfolio showcasing cutting-edge web development projects, AI solutions, e-commerce platforms, and custom applications. From SaaS platforms to luxury booking systems.',
  keywords: 'web development portfolio, AI solutions portfolio, e-commerce projects, SaaS development, booking systems, custom applications, project case studies',
  openGraph: {
    title: 'Portfolio | Featured Projects & Case Studies | Jack Oliver Development',
    description: 'Explore cutting-edge web development projects, AI solutions, and custom applications that deliver exceptional results.',
  },
}

export default function PortfolioPage() {
  return (
    <main className="relative">
      <PortfolioHero />
      <PortfolioGrid />
      <FinalCTA />
    </main>
  )
} 