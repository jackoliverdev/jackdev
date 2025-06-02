'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    position: 'CEO, Centrus AI',
    company: 'Centrus AI',
    logo: '/logos/apple.png',
    content: 'Jack transformed our vision into a comprehensive SaaS platform that revolutionised our business operations. The AI integration and employee onboarding system exceeded all expectations.',
    project: 'AI-Powered SaaS Platform',
    rating: 5,
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    id: 2,
    name: 'Marcus Thompson',
    position: 'Director, Jasper Luxury Tours',
    company: 'Jasper Luxury Boat Tours',
    logo: '/logos/facebook.png',
    content: 'The booking platform Jack built has transformed our business. The unified calendar system and multi-platform integration have increased our bookings by 300%.',
    project: 'Luxury Tourism Booking Platform',
    rating: 5,
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 3,
    name: 'Giuseppe Rossi',
    position: 'Managing Director',
    company: 'Hand Line Safety Company',
    logo: '/logos/line.png',
    content: 'Jack delivered a perfect multilingual e-commerce solution for our B2B operations. The dynamic content management system has streamlined our entire workflow.',
    project: 'B2B E-commerce Platform',
    rating: 5,
    gradient: 'from-emerald-500 to-cyan-600'
  },
  {
    id: 4,
    name: 'David Clarke',
    position: 'Founder, Rippa Tackle',
    company: 'Rippa Tackle',
    logo: '/logos/linkedin.png',
    content: 'The headless Shopify solution with AI chatbot has revolutionised our customer experience. Sales have increased by 250% since launch. Absolutely brilliant work.',
    project: 'E-commerce with AI Integration',
    rating: 5,
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 5,
    name: 'Emma Richardson',
    position: 'Co-Founder, The Venue Verse',
    company: 'The Venue Verse',
    logo: '/logos/twitter.png',
    content: 'Jack created an innovative virtual tour platform that has completely transformed how couples discover wedding venues. The AI features are game-changing.',
    project: 'Virtual Tour SaaS Platform',
    rating: 5,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 6,
    name: 'James Wilson',
    position: 'Golf Professional',
    company: 'North Weald Golf',
    logo: '/logos/youtube.png',
    content: 'The comprehensive booking system Jack developed has modernised our entire operation. Managing lessons, fittings, and bay reservations has never been easier.',
    project: 'Golf Management System',
    rating: 5,
    gradient: 'from-yellow-500 to-orange-600'
  }
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Calculate which testimonial should be active based on scroll progress
  const testimonialProgress = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0, testimonials.length - 1, testimonials.length - 1]
  )

  // Smooth spring animation for testimonial index
  const smoothProgress = useSpring(testimonialProgress, {
    stiffness: 150,
    damping: 40,
    restDelta: 0.001
  })

  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((latest) => {
      const newIndex = Math.round(latest)
      if (newIndex !== currentTestimonial && newIndex >= 0 && newIndex < testimonials.length) {
        setCurrentTestimonial(newIndex)
      }
    })

    return () => unsubscribe()
  }, [smoothProgress, currentTestimonial])

  // Track if we're in the scrolling section
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setIsScrolling(latest > 0.1 && latest < 0.9)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const activeTestimonial = testimonials[currentTestimonial]

  return (
    <section 
      ref={containerRef}
      className="relative"
      style={{ height: `${testimonials.length * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-background overflow-hidden">
        
        {/* Background Elements - Same as featured-projects */}
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        
        {/* Spotlight Glow Effect - Only During Transitions */}
        <motion.div 
          key={`spotlight-${currentTestimonial}`}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.4, 1] }}
        >
          {/* Main spotlight glow */}
          <motion.div
            className={`w-[800px] h-[600px] bg-gradient-radial from-transparent via-transparent to-transparent rounded-full blur-3xl`}
            style={{
              background: `radial-gradient(circle, ${activeTestimonial.gradient.includes('blue-600') ? 'rgba(37, 99, 235, 0.2)' :
                activeTestimonial.gradient.includes('cyan-500') ? 'rgba(6, 182, 212, 0.2)' :
                activeTestimonial.gradient.includes('emerald-500') ? 'rgba(16, 185, 129, 0.2)' :
                activeTestimonial.gradient.includes('green-500') ? 'rgba(34, 197, 94, 0.2)' :
                activeTestimonial.gradient.includes('purple-500') ? 'rgba(168, 85, 247, 0.2)' :
                'rgba(251, 146, 60, 0.2)'} 0%, transparent 70%)`
            }}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: [0.8, 1.3, 1], 
            }}
            transition={{ 
              duration: 1.5, 
              ease: [0.25, 0.1, 0.25, 1],
              times: [0, 0.5, 1]
            }}
          />
          
          {/* Secondary inner glow */}
          <motion.div
            className={`absolute w-[400px] h-[300px] rounded-full blur-2xl`}
            style={{
              background: `radial-gradient(circle, ${activeTestimonial.gradient.includes('blue-600') ? 'rgba(59, 130, 246, 0.3)' :
                activeTestimonial.gradient.includes('cyan-500') ? 'rgba(34, 211, 238, 0.3)' :
                activeTestimonial.gradient.includes('emerald-500') ? 'rgba(52, 211, 153, 0.3)' :
                activeTestimonial.gradient.includes('green-500') ? 'rgba(74, 222, 128, 0.3)' :
                activeTestimonial.gradient.includes('purple-500') ? 'rgba(196, 118, 254, 0.3)' :
                'rgba(251, 191, 36, 0.3)'} 0%, transparent 60%)`
            }}
            initial={{ scale: 0.5 }}
            animate={{ 
              scale: [0.5, 1.2, 0.9], 
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut"
            }}
          />
          
          {/* Pulsing core highlight */}
          <motion.div
            className={`absolute w-[200px] h-[150px] rounded-full blur-xl`}
            style={{
              background: `radial-gradient(circle, ${activeTestimonial.gradient.includes('blue-600') ? 'rgba(99, 102, 241, 0.4)' :
                activeTestimonial.gradient.includes('cyan-500') ? 'rgba(56, 189, 248, 0.4)' :
                activeTestimonial.gradient.includes('emerald-500') ? 'rgba(74, 222, 128, 0.4)' :
                activeTestimonial.gradient.includes('green-500') ? 'rgba(101, 163, 13, 0.4)' :
                activeTestimonial.gradient.includes('purple-500') ? 'rgba(217, 70, 239, 0.4)' :
                'rgba(245, 158, 11, 0.4)'} 0%, transparent 50%)`
            }}
            initial={{ scale: 0.3 }}
            animate={{ 
              scale: [0.3, 1, 0.8]
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* Main Testimonial Bar */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
          
          {/* Progress Indicator */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-700 ease-out ${
                    index === currentTestimonial 
                      ? 'w-8 bg-gradient-to-r ' + activeTestimonial.gradient 
                      : 'w-1 bg-muted-foreground/30'
                  }`}
                  animate={{
                    scale: index === currentTestimonial ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </div>

          {/* Testimonial Card with AnimatePresence for smooth transitions */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`testimonial-${currentTestimonial}`}
                initial={{ 
                  opacity: 0, 
                  y: 30,
                  scale: 0.95,
                  filter: "blur(10px)"
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)"
                }}
                exit={{ 
                  opacity: 0, 
                  y: -30,
                  scale: 0.95,
                  filter: "blur(10px)"
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.1, 0.25, 1],
                  opacity: { duration: 0.6 },
                  filter: { duration: 0.6 }
                }}
                className="relative"
              >
                
                {/* Main Testimonial Bar */}
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 hover:border-border hover:shadow-glow-blue transition-all duration-500">
                  
                  {/* Quote Icon */}
                  <motion.div
                    className={`absolute -top-6 left-8 p-4 bg-gradient-to-br ${activeTestimonial.gradient} rounded-2xl shadow-lg`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 0,
                      y: [0, -2, 0]
                    }}
                    transition={{ 
                      scale: { duration: 0.5, delay: 0.2 },
                      rotate: { duration: 0.5, delay: 0.2 },
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Quote className="w-6 h-6 text-white" />
                  </motion.div>

                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    
                    {/* Left: Company Logo & Info */}
                    <motion.div 
                      className="flex flex-col items-center text-center space-y-4"
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <motion.div
                        className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white p-3 shadow-lg"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, duration: 0.6, type: "spring", bounce: 0.3 }}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                      >
                        <Image
                          src={activeTestimonial.logo}
                          alt={activeTestimonial.company}
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                      >
                        <h4 className="font-bold text-lg text-foreground">
                          {activeTestimonial.name}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {activeTestimonial.position}
                        </p>
                        <p className={`text-sm font-medium bg-gradient-to-r ${activeTestimonial.gradient} bg-clip-text text-transparent`}>
                          {activeTestimonial.company}
                        </p>
                      </motion.div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(activeTestimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0, rotate: 180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 0.6 + (i * 0.1), duration: 0.4, type: "spring" }}
                          >
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Center: Testimonial Content */}
                    <div className="lg:col-span-2 space-y-6">
                      <motion.blockquote
                        className="text-lg lg:text-xl text-foreground leading-relaxed font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      >
                        "{activeTestimonial.content}"
                      </motion.blockquote>

                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        <motion.div 
                          className={`h-1 bg-gradient-to-r ${activeTestimonial.gradient} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: 48 }}
                          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                        />
                        <span className="text-sm text-muted-foreground font-medium">
                          {activeTestimonial.project}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Instruction Text */}
          <motion.div
            className="text-center mt-8"
            animate={{
              opacity: isScrolling ? 0.7 : 1,
              y: isScrolling ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
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
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
} 