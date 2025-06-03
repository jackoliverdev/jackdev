'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Globe, Bot, ShoppingCart, Fish, MapPin, ArrowRight, ExternalLink, Zap, Sparkles, Trophy, Star } from 'lucide-react'
import CaseStudyModal from '../contact/case-study-modal'

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
    featured: true,
    size: 'hero'
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
    featured: true,
    size: 'large'
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
    featured: true,
    size: 'medium'
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
    featured: true,
    size: 'medium'
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
    featured: true,
    size: 'small'
  }
]

export default function PortfolioGrid() {
  const [selectedProject, setSelectedProject] = useState<typeof featuredProjects[0] | null>(null)
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const handleProjectClick = (project: typeof featuredProjects[0]) => {
    setSelectedProject(project)
    setIsCaseStudyModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsCaseStudyModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <>
      <section 
        ref={containerRef} 
        className="py-20 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-radial opacity-30" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />

        {/* Floating Background Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-16">
            <FloatingIcon IconComponent={Globe} delay={0} duration={8} amplitude={30} />
          </div>
          <div className="absolute top-40 right-20">
            <FloatingIcon IconComponent={Bot} delay={2} duration={7} amplitude={25} />
          </div>
          <div className="absolute bottom-32 left-20">
            <FloatingIcon IconComponent={ShoppingCart} delay={4} duration={9} amplitude={35} />
          </div>
          <div className="absolute bottom-20 right-16">
            <FloatingIcon IconComponent={Star} delay={6} duration={6} amplitude={20} />
          </div>
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
            <FloatingIcon IconComponent={Zap} delay={1} duration={10} amplitude={40} />
          </div>
          <div className="absolute bottom-40 right-32">
            <FloatingIcon IconComponent={Sparkles} delay={5} duration={8} amplitude={30} />
          </div>
          <div className="absolute top-60 left-32">
            <FloatingIcon IconComponent={Trophy} delay={3} duration={7} amplitude={25} />
          </div>
          <div className="absolute bottom-60 right-10">
            <FloatingIcon IconComponent={ExternalLink} delay={7} duration={9} amplitude={35} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 space-y-6"
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

          {/* Portfolio Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {featuredProjects.map((project, index) => {
              const IconComponent = project.icon
              const isHero = project.size === 'hero'
              const isLarge = project.size === 'large'
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  className={`group cursor-pointer relative ${
                    isHero ? 'md:col-span-3' : isLarge ? 'md:col-span-2' : 'col-span-1'
                  } ${
                    isHero ? 'h-96' : isLarge ? 'h-80' : 'h-64'
                  }`}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    
                    {/* Image */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      
                      {/* Top Section */}
                      <div className="flex items-start justify-between">
                        <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-white text-xs font-medium">
                          {project.category}
                        </span>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Bottom Content */}
                      <div className="text-white">
                        <h3 className={`font-bold mb-2 ${isHero ? 'text-3xl' : isLarge ? 'text-2xl' : 'text-xl'}`}>
                          {project.title}
                        </h3>
                        <p className={`text-gray-200 mb-3 ${isHero ? 'text-base' : 'text-sm'}`}>
                          {project.subtitle}
                        </p>
                        <p className={`text-gray-300 mb-4 line-clamp-2 ${isHero ? 'text-sm' : 'text-xs'}`}>
                          {project.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, isHero ? 4 : 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded text-xs font-medium text-white"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white text-sm font-medium hover:bg-white/30 transition-all duration-300 group/btn">
                          <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                          View Case Study
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + (featuredProjects.length * 0.1) }}
              className="group cursor-pointer relative col-span-1 h-64"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-dashed border-blue-200 dark:border-blue-800">
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center">
                  
                  <motion.div
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="mb-4"
                  >
                    <Trophy className="w-12 h-12 text-yellow-500" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Your Project Here
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-xs">
                    Ready to create something amazing? Let's bring your vision to life.
                  </p>
                  
                  <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-4 py-2 text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300 group/btn">
                    <Sparkles className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </motion.div>
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