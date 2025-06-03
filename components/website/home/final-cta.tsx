'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Calendar, MessageCircle, Star, CheckCircle, ArrowRight, Zap, Globe } from 'lucide-react'
import Button, { ButtonGroup } from '../button'

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

const trustIndicators = [
  {
    icon: Globe,
    text: 'UK-Based Developer',
    description: 'Professional communication & timezone alignment'
  },
  {
    icon: Zap,
    text: 'Lightning Fast Delivery',
    description: 'Rapid development with Cursor AI assistance'
  },
  {
    icon: CheckCircle,
    text: 'Ongoing Support',
    description: 'Continued maintenance & feature updates'
  }
]

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={containerRef}
      className="py-12 lg:py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      {/* Floating Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16">
          <FloatingIcon IconComponent={Calendar} delay={0} duration={8} amplitude={30} />
        </div>
        <div className="absolute top-40 right-20">
          <FloatingIcon IconComponent={MessageCircle} delay={2} duration={7} amplitude={25} />
        </div>
        <div className="absolute bottom-32 left-20">
          <FloatingIcon IconComponent={Star} delay={4} duration={9} amplitude={35} />
        </div>
        <div className="absolute bottom-20 right-16">
          <FloatingIcon IconComponent={CheckCircle} delay={6} duration={6} amplitude={20} />
        </div>
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
          <FloatingIcon IconComponent={Zap} delay={1} duration={10} amplitude={40} />
        </div>
        <div className="absolute bottom-40 right-32">
          <FloatingIcon IconComponent={Globe} delay={5} duration={8} amplitude={30} />
        </div>
        <div className="absolute top-60 left-32">
          <FloatingIcon IconComponent={ArrowRight} delay={3} duration={7} amplitude={25} />
        </div>
        <div className="absolute bottom-60 right-10">
          <FloatingIcon IconComponent={Star} delay={7} duration={9} amplitude={35} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Main CTA Content - Centered */}
        <motion.div
          className="text-center space-y-6 lg:space-y-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-card/80 border border-border/50 rounded-full px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span>Ready to Transform Your Business?</span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 lg:mb-6 overflow-visible" style={{ lineHeight: '1.1' }}>
              <motion.span 
                className="text-foreground overflow-visible"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Let's Build Something{' '}
              </motion.span>
              <motion.span 
                className="text-gradient-light-blue overflow-visible"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Extraordinary
              </motion.span>
            </h2>
            
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              From initial concept to live deployment, I'll transform your vision into a 
              <span className="text-gradient-blue font-semibold"> modern digital solution</span> that drives real results.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <ButtonGroup>
              <Button href="/contact" variant="primary" icon={Calendar}>
                Book a Discovery Call
              </Button>
              <Button href="/portfolio" variant="secondary" icon={MessageCircle}>
                Send Me a Message
              </Button>
            </ButtonGroup>
          </motion.div>

          {/* Trust Indicators - More compact on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto"
          >
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.6 }}
                  className="flex flex-col items-center text-center space-y-1 lg:space-y-2"
                >
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-5 lg:w-6 h-5 lg:h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{indicator.text}</p>
                    <p className="text-xs text-muted-foreground hidden md:block">{indicator.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom Social Proof - More compact on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4 lg:p-6 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center mb-2 lg:mb-3">
              <div className="flex -space-x-1 lg:-space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.0 + (i * 0.1), duration: 0.4 }}
                    className="w-6 lg:w-8 h-6 lg:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-background flex items-center justify-center"
                  >
                    <Star className="w-3 lg:w-4 h-3 lg:h-4 text-white fill-current" />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <p className="text-foreground font-semibold mb-1 text-sm lg:text-base">
              Join satisfied clients across the UK
            </p>
            <p className="text-xs lg:text-sm text-muted-foreground">
              Fast, reliable, and results-driven development
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 