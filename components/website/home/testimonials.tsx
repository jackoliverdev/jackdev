'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Star, Quote, Users, MessageCircle, ThumbsUp, Heart, Award, CheckCircle } from 'lucide-react'

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

const testimonials = [
  {
    id: 1,
    name: 'Chris Hartney',
    position: 'Chief Revenue Officer',
    company: 'Centrus AI',
    logo: '/portfolio/CentrusImage.png',
    content: 'Jack transformed our vision into a comprehensive SaaS platform beyond our imagination. The AI performance, UI/UX and customer service all exceeded all expectations.',
    project: 'AI-Powered SaaS Platform',
    rating: 5,
    gradient: 'from-purple-600 to-violet-600',
    glowColor: 'rgba(139, 92, 246, 0.15)'
  },
  {
    id: 2,
    name: 'Lochie McLellan',
    position: 'Managing Director',
    company: 'Jasper Luxury Boat Tours',
    logo: '/portfolio/JasperBoats.png',
    content: 'The booking platform Jack built has transformed our business. The unified calendar system and multi-platform integration have increased our bookings by 300%.',
    project: 'Luxury Tourism Booking Platform',
    rating: 5,
    gradient: 'from-sky-400 to-blue-500',
    glowColor: 'rgba(56, 189, 248, 0.15)'
  },
  {
    id: 3,
    name: 'Luca Castronuvo',
    position: 'Managing Director',
    company: 'Hand Line Company',
    logo: '/portfolio/HandLine.png',
    content: 'Jack delivered a perfect multilingual e-commerce solution for our B2B operations. The dynamic content management system has streamlined our entire workflow.',
    project: 'B2B E-commerce Platform',
    rating: 5,
    gradient: 'from-yellow-500 to-orange-600',
    glowColor: 'rgba(251, 191, 36, 0.15)'
  },
  {
    id: 4,
    name: 'Jacob Worth',
    position: 'Founder & CEO',
    company: 'Rippa Tackle',
    logo: '/portfolio/RippaTackle.png',
    content: 'The headless Shopify solution with AI chatbot has revolutionised our customer experience. Sales have increased by 250% since launch. Absolutely brilliant work.',
    project: 'E-commerce with AI Integration',
    rating: 5,
    gradient: 'from-blue-600 to-indigo-700',
    glowColor: 'rgba(79, 70, 229, 0.15)'
  },
  {
    id: 5,
    name: 'Stacey Ferguson',
    position: 'Founder & CEO',
    company: 'The Venue Verse',
    logo: '/portfolio/HandLine.png',
    content: 'Jack created an innovative virtual tour platform that has completely transformed how couples discover wedding venues. The AI features are game-changing.',
    project: 'Virtual Tour SaaS Platform',
    rating: 5,
    gradient: 'from-purple-500 to-pink-600',
    glowColor: 'rgba(196, 118, 254, 0.15)'
  },
  {
    id: 6,
    name: 'Paul Sullivan',
    position: 'PGA Golf Professional',
    company: 'North Weald Golf Driving Range',
    logo: '/portfolio/NorthWeald.png',
    content: 'The comprehensive booking system Jack developed has modernised our entire operation. Managing lessons, fittings, and bay reservations has never been easier.',
    project: 'Golf Management System',
    rating: 5,
    gradient: 'from-green-500 to-emerald-600',
    glowColor: 'rgba(34, 197, 94, 0.15)'
  }
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mobileContainerRef = useRef<HTMLDivElement>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start end", "end start"]
  })

  // Calculate which testimonial should be active based on scroll progress
  const testimonialProgress = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0, testimonials.length - 1, testimonials.length - 1]
  )

  const mobileTestimonialProgress = useTransform(
    mobileScrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0, testimonials.length - 1, testimonials.length - 1]
  )

  // Smooth spring animation for testimonial index - optimised
  const smoothProgress = useSpring(testimonialProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const mobileSmoothProgress = useSpring(mobileTestimonialProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  })

  useEffect(() => {
    const progress = isMobile ? mobileSmoothProgress : smoothProgress
    const unsubscribe = progress.onChange((latest) => {
      const newIndex = Math.round(latest)
      if (newIndex !== currentTestimonial && newIndex >= 0 && newIndex < testimonials.length) {
        setCurrentTestimonial(newIndex)
      }
    })

    return () => unsubscribe()
  }, [smoothProgress, mobileSmoothProgress, currentTestimonial, isMobile])

  // Track if we're in the scrolling section
  useEffect(() => {
    const progress = isMobile ? mobileScrollYProgress : scrollYProgress
    const unsubscribe = progress.onChange((latest) => {
      setIsScrolling(latest > 0.1 && latest < 0.9)
    })

    return () => unsubscribe()
  }, [scrollYProgress, mobileScrollYProgress, isMobile])

  const activeTestimonial = testimonials[currentTestimonial]

  // Mobile version - similar to desktop but optimized
  if (isMobile) {
    return (
      <section 
        ref={mobileContainerRef}
        className="relative"
        style={{ height: `${testimonials.length * 100}vh` }}
      >
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-background overflow-hidden px-4">
          
          {/* Simplified background for mobile */}
          <div className="absolute inset-0 bg-gradient-radial opacity-40" />
          <div className="absolute inset-0 bg-gradient-mesh opacity-20" />

          {/* Floating Background Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-16">
              <FloatingIcon IconComponent={Star} delay={0} duration={8} amplitude={30} />
            </div>
            <div className="absolute top-40 right-20">
              <FloatingIcon IconComponent={Quote} delay={2} duration={7} amplitude={25} />
            </div>
            <div className="absolute bottom-32 left-20">
              <FloatingIcon IconComponent={Users} delay={4} duration={9} amplitude={35} />
            </div>
            <div className="absolute bottom-20 right-16">
              <FloatingIcon IconComponent={MessageCircle} delay={6} duration={6} amplitude={20} />
            </div>
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
              <FloatingIcon IconComponent={ThumbsUp} delay={1} duration={10} amplitude={40} />
            </div>
            <div className="absolute bottom-40 right-32">
              <FloatingIcon IconComponent={Heart} delay={5} duration={8} amplitude={30} />
            </div>
            <div className="absolute top-60 left-32">
              <FloatingIcon IconComponent={Award} delay={3} duration={7} amplitude={25} />
            </div>
            <div className="absolute bottom-60 right-10">
              <FloatingIcon IconComponent={CheckCircle} delay={7} duration={9} amplitude={35} />
            </div>
          </div>

          {/* Header Section */}
          <motion.div 
            className="text-center mb-12 lg:mb-16 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-card/80 border border-border/50 rounded-full px-4 py-2 text-sm text-muted-foreground mb-8 backdrop-blur-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Users className="w-4 h-4 text-blue-400" />
              </motion.div>
              <span>Client Testimonials</span>
            </motion.div>

            <motion.h2 
              className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-foreground block">What Clients </span>
              <span className="text-gradient-blue block">Are Saying</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Real feedback from businesses achieving results with{' '}
              <span className="text-gradient-blue font-semibold">modern digital solutions</span>.
            </motion.p>

            {/* Progress Indicator - Moved below subtitle */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-0.5 rounded-full transition-all duration-400 ease-out ${
                      index === currentTestimonial 
                        ? 'w-6 bg-gradient-to-r ' + activeTestimonial.gradient 
                        : 'w-0.5 bg-muted-foreground/30'
                    }`}
                    animate={{
                      scale: index === currentTestimonial ? [1, 1.05, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ willChange: 'transform' }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Optimised Glow Effect */}
          <motion.div 
            key={`mobile-spotlight-${currentTestimonial}`}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 1, ease: "easeInOut", times: [0, 0.5, 1] }}
            style={{ willChange: 'opacity' }}
          >
            <motion.div
              className="w-[300px] h-[150px] rounded-full blur-xl"
              style={{
                background: `radial-gradient(ellipse, ${activeTestimonial.glowColor} 0%, transparent 70%)`,
                willChange: 'transform'
              }}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: [0.8, 1.05, 1] 
              }}
              transition={{ 
                duration: 1, 
                ease: [0.25, 0.1, 0.25, 1],
                times: [0, 0.6, 1]
              }}
            />
          </motion.div>

          {/* Mobile Testimonial Card */}
          <div className="relative z-10 w-full max-w-lg mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-testimonial-${currentTestimonial}`}
                initial={{ 
                  opacity: 0, 
                  y: 15,
                  scale: 0.98
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1
                }}
                exit={{ 
                  opacity: 0, 
                  y: -15,
                  scale: 0.98
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                style={{ willChange: 'transform, opacity' }}
                className="relative"
              >
                <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-border transition-all duration-300">
                  {/* Quote Icon */}
                  <motion.div
                    className={`absolute -top-3 left-6 p-3 bg-gradient-to-br ${activeTestimonial.gradient} rounded-xl shadow-lg`}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 0
                    }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.2,
                      type: "spring",
                      bounce: 0.3
                    }}
                    style={{ willChange: 'transform' }}
                  >
                    <Quote className="w-4 h-4 text-white" />
                  </motion.div>

                  <div className="pt-4 space-y-4">
                    {/* Left: Project Image & Company Info */}
                    <motion.div 
                      className="flex flex-col space-y-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {/* Project Image */}
                      <motion.div
                        className="relative w-full h-32 rounded-xl overflow-hidden shadow-lg border border-border/20"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        style={{ willChange: 'transform' }}
                      >
                        <Image
                          src={activeTestimonial.logo}
                          alt={activeTestimonial.company}
                          fill
                          className="object-cover object-center"
                        />
                        {/* Project overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className={`text-xs font-semibold bg-gradient-to-r ${activeTestimonial.gradient} bg-clip-text text-transparent`}>
                            {activeTestimonial.project}
                          </p>
                        </div>
                      </motion.div>
                      
                      {/* Company & Contact Info */}
                      <motion.div
                        className="text-center space-y-2"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <div>
                          <h4 className="font-bold text-base text-foreground">
                            {activeTestimonial.name}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {activeTestimonial.position}
                          </p>
                          <p className="text-muted-foreground text-sm font-medium">
                            {activeTestimonial.company}
                          </p>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center justify-center gap-1">
                          {[...Array(activeTestimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + (i * 0.05), duration: 0.3 }}
                              style={{ willChange: 'transform, opacity' }}
                            >
                              <Star className="w-4 h-4 fill-current text-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.blockquote 
                      className="text-sm text-foreground leading-relaxed text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      "{activeTestimonial.content}"
                    </motion.blockquote>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Instruction Text */}
          <motion.div
            className="text-center mt-6"
            animate={{
              opacity: isScrolling ? 0.7 : 1,
              y: isScrolling ? 0 : 3
            }}
            transition={{ duration: 0.3 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <p className="text-sm text-muted-foreground">
              {currentTestimonial < testimonials.length - 1 
                ? 'Scroll for more testimonials'
                : 'Continue scrolling'
              }
            </p>
            <motion.div
              className="w-0.5 h-6 bg-gradient-to-b from-muted-foreground to-transparent mx-auto mt-2 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scaleY: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ willChange: 'transform, opacity' }}
            />
          </motion.div>
        </div>
      </section>
    )
  }

  // Desktop version - optimised with adjusted positioning
  return (
    <section 
      ref={containerRef}
      className="relative"
      style={{ height: `${testimonials.length * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

        {/* Floating Background Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-16">
            <FloatingIcon IconComponent={Star} delay={0} duration={8} amplitude={30} />
          </div>
          <div className="absolute top-40 right-20">
            <FloatingIcon IconComponent={Quote} delay={2} duration={7} amplitude={25} />
          </div>
          <div className="absolute bottom-32 left-20">
            <FloatingIcon IconComponent={Users} delay={4} duration={9} amplitude={35} />
          </div>
          <div className="absolute bottom-20 right-16">
            <FloatingIcon IconComponent={MessageCircle} delay={6} duration={6} amplitude={20} />
          </div>
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
            <FloatingIcon IconComponent={ThumbsUp} delay={1} duration={10} amplitude={40} />
          </div>
          <div className="absolute bottom-40 right-32">
            <FloatingIcon IconComponent={Heart} delay={5} duration={8} amplitude={30} />
          </div>
          <div className="absolute top-60 left-32">
            <FloatingIcon IconComponent={Award} delay={3} duration={7} amplitude={25} />
          </div>
          <div className="absolute bottom-60 right-10">
            <FloatingIcon IconComponent={CheckCircle} delay={7} duration={9} amplitude={35} />
          </div>
        </div>

        {/* Header Section */}
        <motion.div 
          className="text-center mb-12 lg:mb-16 relative z-10 overflow-visible"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="inline-flex items-center gap-2 bg-card/80 border border-border/50 rounded-full px-4 py-2 text-sm text-muted-foreground mb-6 backdrop-blur-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Users className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span>Client Testimonials</span>
          </motion.div>

          <motion.h2 
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 overflow-visible"
            style={{ lineHeight: '1.1' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.span 
              className="text-foreground overflow-visible"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              What Clients{' '}
            </motion.span>
            <motion.span 
              className="text-gradient-light-blue overflow-visible"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Are Saying
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed overflow-visible"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Real feedback from businesses that have transformed their digital presence
            <br />
            with <span className="text-gradient-blue font-semibold">modern solutions and exceptional results</span>.
          </motion.p>
        </motion.div>
        
        {/* Optimised Spotlight Glow Effect - Moved down and centered on testimonial bar */}
        <motion.div 
          key={`spotlight-${currentTestimonial}`}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ paddingTop: '160px' }} // Move glow down to center with testimonial box
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.2, ease: "easeInOut", times: [0, 0.5, 1] }}
        >
          {/* Single optimised glow - smaller and more focused */}
          <motion.div
            className="w-[400px] h-[180px] rounded-full blur-2xl"
            style={{
              background: `radial-gradient(ellipse, ${activeTestimonial.glowColor} 0%, transparent 70%)`,
              willChange: 'transform'
            }}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: [0.8, 1.1, 1] 
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.1, 0.25, 1],
              times: [0, 0.6, 1]
            }}
          />
        </motion.div>

        {/* Main Testimonial Bar */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
          
          {/* Progress Indicator */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6">
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ease-out ${
                    index === currentTestimonial 
                      ? 'w-8 bg-gradient-to-r ' + activeTestimonial.gradient 
                      : 'w-1 bg-muted-foreground/30'
                  }`}
                  animate={{
                    scale: index === currentTestimonial ? [1, 1.05, 1] : 1
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ willChange: 'transform' }}
                />
              ))}
            </div>
          </div>

          {/* Testimonial Card with optimised AnimatePresence */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`testimonial-${currentTestimonial}`}
                initial={{ 
                  opacity: 0, 
                  y: 20,
                  scale: 0.98
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1
                }}
                exit={{ 
                  opacity: 0, 
                  y: -20,
                  scale: 0.98
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                style={{ willChange: 'transform, opacity' }}
                className="relative"
              >
                
                {/* Main Testimonial Bar - Reduced height */}
                <div className="relative bg-card/70 backdrop-blur-sm border border-border/50 rounded-2xl p-6 lg:p-8 hover:border-border hover:shadow-glow-blue transition-all duration-500">
                  
                  {/* Quote Icon */}
                  <motion.div
                    className={`absolute -top-4 left-6 p-3 bg-gradient-to-br ${activeTestimonial.gradient} rounded-xl shadow-lg`}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 0
                    }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.2,
                      type: "spring",
                      bounce: 0.3
                    }}
                    style={{ willChange: 'transform' }}
                  >
                    <Quote className="w-5 h-5 text-white" />
                  </motion.div>

                  <div className="grid lg:grid-cols-4 gap-6 items-start">
                    
                    {/* Left: Project Image Only */}
                    <motion.div 
                      className="lg:col-span-1"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {/* Project Image */}
                      <motion.div
                        className="relative w-full h-32 rounded-xl overflow-hidden shadow-lg border border-border/20"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        style={{ willChange: 'transform' }}
                      >
                        <Image
                          src={activeTestimonial.logo}
                          alt={activeTestimonial.company}
                          fill
                          className="object-cover object-center"
                        />
                        {/* Project overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className={`text-xs font-semibold bg-gradient-to-r ${activeTestimonial.gradient} bg-clip-text text-transparent`}>
                            {activeTestimonial.project}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Right: Company Info + Testimonial Content */}
                    <div className="lg:col-span-3 space-y-4">
                      
                      {/* Company Info & Stars */}
                      <motion.div
                        className="flex items-center justify-between"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <div>
                          <h4 className="font-bold text-base text-foreground">
                            {activeTestimonial.name}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {activeTestimonial.position}
                          </p>
                          <p className="text-muted-foreground text-sm font-medium">
                            {activeTestimonial.company}
                          </p>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1">
                          {[...Array(activeTestimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + (i * 0.05), duration: 0.3 }}
                              style={{ willChange: 'transform, opacity' }}
                            >
                              <Star className="w-4 h-4 fill-current text-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Testimonial Content */}
                      <motion.blockquote
                        className="text-base lg:text-lg text-foreground leading-relaxed font-medium"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        style={{ willChange: 'transform, opacity' }}
                      >
                        "{activeTestimonial.content}"
                      </motion.blockquote>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Instruction Text */}
          <motion.div
            className="text-center mt-6"
            animate={{
              opacity: isScrolling ? 0.7 : 1,
              y: isScrolling ? 0 : 5
            }}
            transition={{ duration: 0.3 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <p className="text-lg text-muted-foreground">
              {currentTestimonial < testimonials.length - 1 
                ? 'Scroll to see more testimonials'
                : 'Continue scrolling to explore more'
              }
            </p>
            <motion.div
              className="w-1 h-8 bg-gradient-to-b from-muted-foreground to-transparent mx-auto mt-2 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scaleY: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ willChange: 'transform, opacity' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
} 