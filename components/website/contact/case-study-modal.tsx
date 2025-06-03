'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Calendar, Users, Zap, Trophy, ArrowRight, Globe, Code, Palette } from 'lucide-react'

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  gradient: string
  icon: any
  category: string
  technologies: string[]
  featured: boolean
  url?: string
  challenge?: string
  solution?: string
  results?: string[]
  timeline?: string
  client?: string
}

interface CaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

const projectUrls: Record<number, string> = {
  1: 'https://www.centrus.ai/',
  2: 'https://lochie.vercel.app/',
  3: 'https://handline2.vercel.app/',
  4: 'https://couldberippa.vercel.app/',
  6: 'https://n-wgolf.vercel.app/'
}

const projectDetails: Record<number, {
  challenge: string
  solution: string
  results: string[]
  timeline: string
  client: string
}> = {
  1: {
    challenge: "Centrus AI needed a comprehensive business platform that could handle company onboarding, employee management, and AI-powered workplace automation in one unified system.",
    solution: "Built a full-stack SaaS platform with Next.js, integrating AI chatbots, document processing, and multi-platform connectivity including Google Drive, MS Teams, and WhatsApp.",
    results: [
      "85% reduction in onboarding time",
      "60% increase in workplace efficiency",
      "Seamless integration with existing tools",
      "AI-powered document processing"
    ],
    timeline: "8 weeks",
    client: "Centrus AI"
  },
  2: {
    challenge: "Jasper Luxury Boat Tours required a sophisticated booking platform with unified calendar management across multiple booking channels including TripAdvisor and GetYourGuide.",
    solution: "Developed a premium booking website with Bokun API integration, unified calendar system, and luxury design aesthetic that reflects the high-end nature of the service.",
    results: [
      "300% increase in direct bookings",
      "Unified calendar management",
      "Premium luxury brand positioning",
      "Multi-platform integration"
    ],
    timeline: "6 weeks",
    client: "Jasper Luxury Boat Tours"
  },
  3: {
    challenge: "Hand Line Safety Company needed a B2B e-commerce platform with multilingual support for their industrial safety equipment, requiring dynamic content management.",
    solution: "Created a multilingual e-commerce platform with dynamic backend for product publishing, blog management, and wholesale pricing structures for gloves and respirators.",
    results: [
      "150% increase in wholesale orders",
      "Multilingual market expansion",
      "Streamlined product management",
      "Enhanced B2B customer experience"
    ],
    timeline: "10 weeks",
    client: "Hand Line Safety Company"
  },
  4: {
    challenge: "Rippa Tackle needed a modern e-commerce solution that could handle their extensive carp fishing inventory while providing AI-powered customer support and advanced filtering.",
    solution: "Built a headless Shopify storefront with Next.js, featuring custom AI chatbot trained on fishing expertise, advanced product filtering, and comprehensive backend management.",
    results: [
      "400% improvement in user engagement",
      "AI-powered customer support",
      "Advanced product discovery",
      "Seamless checkout experience"
    ],
    timeline: "12 weeks",
    client: "Rippa Tackle"
  },
  6: {
    challenge: "North Weald Golf Range required a comprehensive booking management system for golf services including lessons, club fitting, and bay reservations with professional backend management.",
    solution: "Developed a full-service booking platform with professional lesson scheduling, club fitting reservations, bay management, and comprehensive backend for golf professionals.",
    results: [
      "200% increase in lesson bookings",
      "Streamlined bay reservations",
      "Professional club fitting service",
      "Enhanced customer experience"
    ],
    timeline: "8 weeks",
    client: "North Weald Golf Range"
  }
}

export default function CaseStudyModal({ isOpen, onClose, project }: CaseStudyModalProps) {
  if (!project) return null

  const IconComponent = project.icon
  const url = projectUrls[project.id]
  const details = projectDetails[project.id]

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.4
            }}
            className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl shadow-glow-blue"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none z-10">
              <div className="absolute top-0 left-0 w-3 h-10 border-t-2 border-l-2 border-blue-500/50 rounded-tl-2xl" />
              <div className="absolute top-0 left-0 h-3 w-10 border-t-2 border-l-2 border-blue-500/50 rounded-tl-2xl" />
            </div>
            
            <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none z-10">
              <div className="absolute bottom-0 right-0 w-3 h-10 border-b-2 border-r-2 border-purple-500/50 rounded-br-2xl" />
              <div className="absolute bottom-0 right-0 h-3 w-10 border-b-2 border-r-2 border-purple-500/50 rounded-br-2xl" />
            </div>
            
            {/* Modal header */}
            <div className={`px-6 py-4 border-b border-border/50 flex justify-between items-center bg-gradient-to-r ${project.gradient}/10 relative z-10`}>
              <div className="flex items-center gap-4">
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
                  }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-muted-foreground">{project.subtitle}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 bg-gradient-to-r ${project.gradient}/20 border border-current/20 rounded-full text-xs font-medium`}>
                        {project.category}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{details?.timeline}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {url && (
                  <motion.a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-glow-blue transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Globe className="w-4 h-4" />
                    <span>Visit Site</span>
                    <ExternalLink className="w-3 h-3" />
                  </motion.a>
                )}
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-card/80 transition-all duration-200 text-muted-foreground hover:text-foreground group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                </motion.button>
              </div>
            </div>
            
            {/* Modal body - Scrollable */}
            <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
              
              {/* Browser Mockup with Live Site */}
              <div className="p-6 bg-gradient-to-br from-muted/30 to-muted/10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full max-w-4xl mx-auto"
                >
                  <div className="rounded-xl overflow-hidden shadow-2xl border border-border/50 backdrop-blur-sm bg-card/80">
                    {/* Browser-like header */}
                    <div className="bg-card/80 px-4 py-3 flex items-center border-b border-border/50">
                      <div className="flex space-x-2 mr-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-muted/50 rounded-md py-1 px-3 text-xs text-muted-foreground flex items-center">
                        <Globe className="w-3 h-3 mr-2 text-muted-foreground/70" />
                        <span className="truncate">{url}</span>
                      </div>
                    </div>
                    
                    {/* Live site iframe */}
                    <div className="relative bg-white">
                      {url && (
                        <iframe
                          src={url}
                          className="w-full h-[500px] border-0"
                          title={`${project.title} - Live Site`}
                          loading="lazy"
                        />
                      )}
                      
                      {/* Overlay gradient for style */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-card/5 pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Project Details */}
              <div className="p-6 space-y-8">
                
                {/* Overview Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-border/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium text-foreground">Timeline</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{details?.timeline}</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-border/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-foreground">Client</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{details?.client}</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-border/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-5 h-5 text-orange-500" />
                      <span className="text-sm font-medium text-foreground">Type</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{project.category}</p>
                  </div>
                </motion.div>
                
                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20">
                        <Trophy className="w-5 h-5 text-red-500" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Challenge</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{details?.challenge}</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                        <Code className="w-5 h-5 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Solution</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{details?.solution}</p>
                  </motion.div>
                </div>
                
                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <Palette className="w-5 h-5 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Technologies Used</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-3 py-2 bg-gradient-to-r ${project.gradient}/20 border border-current/20 rounded-lg text-sm font-medium text-foreground/80`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
                
                {/* Results */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                      <Trophy className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Results & Impact</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {details?.results.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{result}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50"
                >
                  {url && (
                    <motion.a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-glow-blue transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Globe className="w-5 h-5" />
                      <span>View Live Site</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                  
                  <motion.button
                    onClick={() => {
                      // You can implement contact functionality here
                      onClose()
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-border bg-card/80 text-card-foreground font-semibold rounded-xl hover:border-border/80 hover:bg-card transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
            
            {/* Subtle glow effects */}
            <motion.div 
              className={`absolute top-1/2 right-4 w-32 h-32 bg-gradient-to-br ${project.gradient}/10 rounded-full blur-3xl pointer-events-none`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className={`absolute bottom-4 left-1/4 w-32 h-32 bg-gradient-to-br ${project.gradient}/10 rounded-full blur-3xl pointer-events-none`}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 