'use client'

import { useRef } from 'react'
import NextImage from 'next/image'
import React from 'react'
import PortfolioItemModal, { PortfolioItem } from './portfolio-item-modal'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Bot, ShoppingCart, Camera, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const featuredProjects = [
  {
    id: 1,
    title: 'Centrus AI',
    subtitle: 'AI SaaS Platform',
    description:
      'Comprehensive AI-powered business solution enabling company sign-up, employee onboarding, and workplace automation tools.',
    images: [
      '/portfolio/new/centrus.png',
      '/portfolio/new/centrus2.png',
      '/portfolio/new/centrus3.png',
      '/portfolio/new/centrus4.png',
      '/portfolio/new/centrus5.png',
      '/portfolio/new/centrus6.png',
      '/portfolio/new/centrus7.png'
    ],
    icon: Bot,
    technologies: ['Next.js', 'AI Integration', 'SaaS'],
    url: 'https://www.centrus.ai/'
  },
  {
    id: 2,
    title: 'Hand Line Safety Company',
    subtitle: 'Multilingual E-commerce',
    description:
      'B2B wholesale safety equipment platform with multilingual storefront, dynamic product publishing and blog management.',
    images: [
      '/portfolio/new/handline.png',
      '/portfolio/new/handline2.png',
      '/portfolio/new/handline3.png',
      '/portfolio/new/handline4.png',
      '/portfolio/new/handline5.png'
    ],
    icon: ShoppingCart,
    technologies: ['Multilingual', 'E-commerce', 'B2B Platform'],
    url: 'https://www.handlineco.com/'
  },
  {
    id: 3,
    title: 'Gym Tours AI',
    subtitle: 'Virtual Tours & AI Platform',
    description:
      'Hosts Matterport gym tours with an AI chatbot overlay and a portal for gyms to train responses. Captures enquiries and emails qualified leads to owners.',
    images: [
      '/portfolio/new/gymtours.png',
      '/portfolio/new/gymtours2.png',
      '/portfolio/new/gymtours3.png',
      '/portfolio/new/gymtours4.png',
      '/portfolio/new/gymtours5.png'
    ],
    icon: Camera,
    technologies: ['Matterport', 'AI Chatbot', 'Lead Capture'],
    url: 'https://www.gymtours.ai/'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

interface ProjectCardProps {
  project: typeof featuredProjects[0]
  onViewInfo: (project: typeof featuredProjects[0]) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewInfo }) => {
  const IconComponent = project.icon
  const images = (project as any).images as string[] | undefined
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
      duration: 20
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: true,
        stopOnMouseEnter: true
      })
    ]
  )

  React.useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  const CardContent = (
    <div className="h-full rounded-xl overflow-hidden border border-border/50 bg-card hover:border-border transition-all duration-300">
      <motion.div className="relative overflow-hidden group/embla" style={{ aspectRatio: '16 / 9' }} initial={{ scale: 1.02 }} animate={{ scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
        {images && images.length > 0 ? (
          <div className="h-full" ref={emblaRef}>
            <div className="flex h-full">
              {images.map((src, i) => (
                <div key={src} className="min-w-0 flex-[0_0_100%] relative">
                  <NextImage
                    src={src}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/40">
            <IconComponent className="w-10 h-10 text-muted-foreground" />
          </div>
        )}

        {/* Arrows */}
        {images && images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-8 w-8 rounded-full bg-card/80 backdrop-blur border border-border/60 text-foreground shadow hover:bg-card"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-8 w-8 rounded-full bg-card/80 backdrop-blur border border-border/60 text-foreground shadow hover:bg-card"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Dots */}
        {images && images.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                className={`inline-flex items-center justify-center shrink-0 h-2.5 w-2.5 rounded-full p-0 appearance-none border ${i === selectedIndex ? 'bg-primary' : 'bg-primary/30'} border-primary/40`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* subtle top gradient for brand feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/0 via-card/0 to-card/10 pointer-events-none" />
      </motion.div>
      <div className="p-6 space-y-3">
        <div>
          <h3 className="text-lg font-bold leading-tight mb-1 text-foreground">{project.title}</h3>
          <p className="text-sm font-medium text-muted-foreground mb-2">{project.subtitle}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2 py-1 bg-muted/40 rounded text-xs text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
        <div className="pt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onViewInfo(project)}
            className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-card border border-border/60 hover:bg-card/80 transition-all"
          >
            View info
          </button>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-primary text-white shadow-sm group-hover:shadow transition-all"
            >
              Visit site
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )

  return <div className="block group">{CardContent}</div>
}

// Removed floating background icons for a clean, static layout

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selected, setSelected] = React.useState<PortfolioItem | undefined>(undefined)


  function getTechFor(title: string) {
    const logos = {
      next: '/logos/tech/nextjs.svg',
      openai: '/logos/tech/openai.svg',
      supabase: '/logos/tech/supabase.svg',
      firebase: '/logos/tech/firebase.svg',
      railway: '/logos/tech/nodejs.svg',
      vercel: '/vercel.svg',
      tailwind: '/logos/tech/tailwind.svg',
      matterport: '/logos/tech/matterport.svg'
    }

    if (title.includes('Centrus')) {
      return [
        { name: 'Next.js', icon: logos.next },
        { name: 'OpenAI', icon: logos.openai },
        { name: 'Supabase', icon: logos.supabase },
        { name: 'Firebase', icon: logos.firebase },
        { name: 'Railway', icon: logos.railway },
        { name: 'Vercel', icon: logos.vercel },
        { name: 'Tailwind CSS', icon: logos.tailwind },
      ]
    }
    if (title.includes('Gym')) {
      return [
        { name: 'Next.js', icon: logos.next },
        { name: 'OpenAI', icon: logos.openai },
        { name: 'Supabase', icon: logos.supabase },
        { name: 'Firebase', icon: logos.firebase },
        { name: 'Matterport', icon: logos.matterport },
        { name: 'Vercel', icon: logos.vercel },
        { name: 'Tailwind CSS', icon: logos.tailwind },
      ]
    }
    return [
      { name: 'Next.js', icon: logos.next },
      { name: 'Vercel', icon: logos.vercel },
      { name: 'Supabase', icon: logos.supabase },
      { name: 'Firebase', icon: logos.firebase },
      { name: 'Tailwind CSS', icon: logos.tailwind },
    ]
  }

  return (
    <section ref={containerRef} className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-foreground">Recent </span>
            <span className="text-gradient-light-blue">Projects</span>
          </motion.h2>
          <motion.p
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed md:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A selection of recent work delivered with a focus on performance,
            design, and real business outcomes.
          </motion.p>
          <motion.p
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A concise selection of recent work delivered with a focus on performance,
            clean design, and real business outcomes.
          </motion.p>
        </motion.div>

        {/* Clean, on-brand entry animations */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard
                project={project}
                onViewInfo={(p) => setSelected({
                  id: p.id,
                  title: p.title,
                  subtitle: p.subtitle,
                  description: p.description,
                  images: (p as any).images || [],
                  url: p.url,
                  tech: getTechFor(p.title)
                })}
              />
            </motion.div>
          ))}
        </motion.div>

        <PortfolioItemModal isOpen={!!selected} onClose={() => setSelected(undefined)} item={selected} />

        {/* Bottom CTA removed per request for a cleaner section */}
      </div>
    </section>
  )
}