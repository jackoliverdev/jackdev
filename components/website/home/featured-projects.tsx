'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Globe, Bot, ShoppingCart, Fish, Camera, MapPin, ArrowRight, Star, ExternalLink } from 'lucide-react'

const featuredProjects = [
  {
    id: 1,
    title: 'Centrus AI',
    subtitle: 'SaaS Platform',
    description: 'Comprehensive AI-powered business solution enabling company sign-up, employee onboarding, and workplace automation tools.',
    image: '/projects/centrus-ai.jpg',
    gradient: 'from-blue-600 to-purple-600',
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
    image: '/projects/jasper-boats.jpg',
    gradient: 'from-cyan-500 to-blue-600',
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
    image: '/projects/hand-line-safety.jpg',
    gradient: 'from-emerald-500 to-cyan-600',
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
    image: '/projects/rippa-tackle.jpg',
    gradient: 'from-green-500 to-emerald-600',
    icon: Fish,
    category: 'E-commerce & AI',
    technologies: ['Headless Shopify', 'AI Chatbot', 'Next.js'],
    featured: true
  },
  {
    id: 5,
    title: 'The Venue Verse',
    subtitle: 'Virtual Tour Platform',
    description: 'AI-powered virtual tour booking platform for wedding venues with comprehensive marketplace functionality.',
    image: '/projects/venue-verse.jpg',
    gradient: 'from-purple-500 to-pink-600',
    icon: Camera,
    category: 'Wedding Industry SaaS',
    technologies: ['Virtual Tours', 'AI Integration', 'Marketplace'],
    featured: true
  },
  {
    id: 6,
    title: 'North Weald Golf',
    subtitle: 'Booking System',
    description: 'Comprehensive booking management for golf services including lessons, club fitting, and bay reservations.',
    image: '/projects/north-weald-golf.jpg',
    gradient: 'from-yellow-500 to-orange-600',
    icon: Globe,
    category: 'Service Industry',
    technologies: ['Booking System', 'Management Portal', 'Professional Services'],
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const IconComponent = project.icon

  return (
    <div className="flex-shrink-0 w-80 mx-4">
      <Link
        href="/portfolio"
        className="block group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
      >
        <div className="relative h-96 rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:shadow-glow-blue transition-all duration-500">
          
          {/* Background Image Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/80">
            <div className="absolute inset-0 flex items-center justify-center">
              <IconComponent className="w-24 h-24 text-muted-foreground/30" />
            </div>
          </div>
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient}/90 via-background/60 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between text-foreground">
            
            {/* Top Section */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg`}
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
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex flex-col gap-1">
                  <span className="px-3 py-1 bg-card/80 border border-border/50 backdrop-blur-sm rounded-full text-xs font-medium text-muted-foreground">
                    {project.category}
                  </span>
                  {project.featured && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      <span className="text-xs text-muted-foreground">Featured</span>
                    </div>
                  )}
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:scale-110 group-hover:text-foreground transition-all duration-300" />
            </div>

            {/* Bottom Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold leading-tight mb-1 text-white">
                  {project.title}
                </h3>
                <p className="text-white/80 text-sm font-medium mb-2">
                  {project.subtitle}
                </p>
                <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-white">
                <span className="text-sm font-medium">View Case Study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Animated hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Subtle glow effect */}
          <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient}/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />
        </div>
      </Link>
    </div>
  )
}

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Create multiple sets for infinite scroll
  const infiniteProjects = [...featuredProjects, ...featuredProjects, ...featuredProjects]

  return (
    <section 
      ref={containerRef}
      className="py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
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
            <Star className="w-4 h-4 fill-current text-yellow-400" />
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
            <span className="text-gradient-blue">Projects</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Showcasing successful digital solutions across various industries,
            <br />
            from AI-powered platforms to modern e-commerce experiences.
          </motion.p>
        </motion.div>

        {/* Sliding Projects Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative h-[420px] flex items-center overflow-hidden mb-12"
        >
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
          
          {/* Moving carousel */}
          <motion.div
            className="flex items-center"
            animate={{
              x: [0, -2016], // Width calculation: 6 cards × (320px + 32px margin) = 2016px
            }}
            transition={{
              duration: 40, // Slower for smooth viewing
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {infiniteProjects.map((project, index) => (
              <ProjectCard
                key={`${project.id}-${Math.floor(index / featuredProjects.length)}-${index}`}
                project={project}
                index={index}
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
          <p className="text-lg text-muted-foreground">
            Ready to bring your vision to life?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portfolio">
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-glow-blue transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center space-x-2">
                  <span>View All Projects</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </Link>
            
            <Link href="/contact">
              <motion.button
                className="group px-8 py-4 border border-border bg-card/80 text-card-foreground font-semibold rounded-xl hover:border-border/80 hover:bg-card transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center space-x-2">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 