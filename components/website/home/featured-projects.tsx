'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Globe, Bot, ShoppingCart, Fish, Camera, MapPin, ArrowRight, Star, ExternalLink, Code, Zap } from 'lucide-react'
import CaseStudyModal from '../contact/case-study-modal'
import Button, { ButtonGroup } from '../button'

const featuredProjects = [
  {
    id: 1,
    title: 'Centrus AI',
    subtitle: 'SaaS Platform',
    description: 'Comprehensive AI-powered business solution enabling company sign-up, employee onboarding, and workplace automation tools.',
    image: '/portfolio/CentrusImage.png',
    gradient: 'from-purple-600 to-violet-600',
    icon: Bot,
    category: 'AI Solutions',
    technologies: ['Next.js', 'AI Integration', 'SaaS'],
    featured: true
  },
  {
    id: 2,
    title: 'Jasper Luxury Boat Tours',
    subtitle: 'Booking Platform',
    description: 'Sophisticated booking website with unified calendar system and multi-platform integration for luxury tourism experiences.',
    image: '/portfolio/JasperBoats.png',
    gradient: 'from-sky-400 to-blue-500',
    icon: MapPin,
    category: 'Tourism & Booking',
    technologies: ['Booking System', 'API Integration', 'Luxury Design'],
    featured: true
  },
  {
    id: 3,
    title: 'Hand Line Safety Company',
    subtitle: 'Multilingual E-commerce',
    description: 'B2B wholesale safety equipment platform with dynamic content management and multilingual support.',
    image: '/portfolio/HandLine.png',
    gradient: 'from-yellow-500 to-orange-600',
    icon: ShoppingCart,
    category: 'B2B E-commerce',
    technologies: ['Multilingual', 'E-commerce', 'B2B Platform'],
    featured: true
  },
  {
    id: 4,
    title: 'Rippa Tackle',
    subtitle: 'Headless Shopify Solution',
    description: 'Modern Next.js storefront for carp fishing equipment with AI-powered customer support and advanced filtering.',
    image: '/portfolio/RippaTackle.png',
    gradient: 'from-blue-600 to-indigo-700',
    icon: Fish,
    category: 'E-commerce & AI',
    technologies: ['Headless Shopify', 'AI Chatbot', 'Next.js'],
    featured: true
  },
  {
    id: 6,
    title: 'North Weald Golf',
    subtitle: 'Booking System',
    description: 'Comprehensive booking management for golf services including lessons, club fitting, and bay reservations.',
    image: '/portfolio/NorthWeald.png',
    gradient: 'from-green-500 to-emerald-600',
    icon: Globe,
    category: 'Service Industry',
    technologies: ['Booking System', 'Management Portal', 'Website'],
    featured: true
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

interface ProjectCardProps {
  project: typeof featuredProjects[0]
  index: number
  onProjectClick: (project: typeof featuredProjects[0]) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onProjectClick }) => {
  const IconComponent = project.icon

  return (
    <div className="flex-shrink-0 w-[376px] mx-4">
      <div
        className="block group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
        onClick={() => onProjectClick(project)}
      >
        <div className="relative h-[26rem] rounded-2xl overflow-hidden border border-border/50 bg-card backdrop-blur-sm hover:border-border hover:shadow-glow-blue transition-all duration-500">
          
          {/* Top Half - Clean Image */}
          {project.image ? (
            <div className="absolute inset-x-0 top-0 h-48 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-br from-muted/50 to-muted/80 flex items-center justify-center">
              <IconComponent className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
          
          {/* Top Overlay - Icon and Category */}
          <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-10">
            <div className="flex items-center gap-3">
              <motion.div 
                className={`p-2.5 rounded-lg bg-gradient-to-br ${project.gradient} shadow-lg`}
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.3,
                }}
              >
                <IconComponent className="w-5 h-5 text-white" />
              </motion.div>
              <span className="px-2.5 py-1 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium text-white">
                {project.category}
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-white/80 group-hover:scale-110 group-hover:text-white transition-all duration-300" />
          </div>
          
          {/* Bottom Half - Content Area with Gradient - No gap */}
          <div className={`absolute inset-x-0 top-48 bottom-0 bg-gradient-to-br ${project.gradient}`}>
            <div className="p-6 h-full flex flex-col justify-between">
              
              {/* Project Details */}
              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="text-lg font-bold leading-tight mb-1 text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-white/80 mb-2">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white/20 backdrop-blur-sm border border-white/20 rounded text-xs text-white/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-white pt-2">
                  <span className="text-sm font-medium">View Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Hover shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Subtle glow effect */}
          <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient}/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />
        </div>
      </div>
    </div>
  )
}

const FloatingIcon = ({ 
  IconComponent, 
  delay = 0, 
  duration = 8, 
  amplitude = 15
}: { 
  IconComponent: any
  delay?: number
  duration?: number 
  amplitude?: number
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      y: [0, -amplitude, 0],
      x: [0, amplitude/2, -amplitude/2, 0],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  >
    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg border border-white/20">
      <IconComponent className="w-4 h-4 text-blue-400" />
    </div>
  </motion.div>
)

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<typeof featuredProjects[0] | null>(null)
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false)

  const handleProjectClick = (project: typeof featuredProjects[0]) => {
    setSelectedProject(project)
    setIsCaseStudyModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsCaseStudyModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300) // Delay to allow exit animation
  }

  // Create multiple sets for seamless infinite scroll
  const infiniteProjects = [...featuredProjects, ...featuredProjects, ...featuredProjects, ...featuredProjects]

  return (
    <>
      <section 
        ref={containerRef}
        className="py-16 lg:py-20 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        
        {/* Floating Background Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-16">
            <FloatingIcon IconComponent={Code} delay={0} duration={8} amplitude={30} />
          </div>
          <div className="absolute top-40 right-20">
            <FloatingIcon IconComponent={Globe} delay={2} duration={7} amplitude={25} />
          </div>
          <div className="absolute bottom-32 left-20">
            <FloatingIcon IconComponent={Bot} delay={4} duration={9} amplitude={35} />
          </div>
          <div className="absolute bottom-20 right-16">
            <FloatingIcon IconComponent={ShoppingCart} delay={6} duration={6} amplitude={20} />
          </div>
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
            <FloatingIcon IconComponent={Star} delay={1} duration={10} amplitude={40} />
          </div>
          <div className="absolute bottom-40 right-32">
            <FloatingIcon IconComponent={Zap} delay={5} duration={8} amplitude={30} />
          </div>
          <div className="absolute top-60 left-32">
            <FloatingIcon IconComponent={Camera} delay={3} duration={7} amplitude={25} />
          </div>
          <div className="absolute bottom-60 right-10">
            <FloatingIcon IconComponent={Fish} delay={7} duration={9} amplitude={35} />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-card/60 border border-border/50 rounded-full px-4 py-2 text-sm text-muted-foreground mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-4 h-4 fill-current text-yellow-400" />
              </motion.div>
              <span>Featured Work</span>
            </motion.div>

            {/* Main Heading */}
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
              className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A comprehensive showcase of my development work, from modern websites and e-commerce platforms
              to <span className="text-gradient-blue font-semibold">cutting-edge AI solutions and custom applications</span>.
            </motion.p>
          </motion.div>

          {/* Sliding Projects Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative h-[28rem] flex items-center overflow-hidden mb-12 rounded-xl shadow-2xl border border-border/50 backdrop-blur-sm bg-card/5"
          >
            {/* Moving carousel */}
            <motion.div
              className="flex items-center"
              initial={{ x: -2040 }} // Start from one full set in (5 cards × 408px = 2040px)
              animate={{
                x: [-2040, -4080], // Move exactly one set worth (5 cards × 408px = 2040px)
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            >
              {infiniteProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.id}-${Math.floor(index / featuredProjects.length)}-${index}`}
                  project={project}
                  index={index}
                  onProjectClick={handleProjectClick}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center space-y-6"
          >
            <ButtonGroup>
              <Button href="/portfolio" variant="primary">
                View All Projects
              </Button>
              <Button href="/contact" variant="secondary">
                Start Your Project
              </Button>
            </ButtonGroup>
          </motion.div>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  )
} 