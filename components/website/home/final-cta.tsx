'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MessageCircle, CheckCircle, Zap, Globe } from 'lucide-react'
import Button, { ButtonGroup } from '../button'
import HomeCalendlyModal from './calendly-modal'
import HomeContactModal from './contact-modal'

const trustIndicators = [
  {
    icon: Globe,
    text: 'UK-Based Developer',
    description: 'Easy communication & timezone alignment'
  },
  {
    icon: Zap,
    text: 'Lightning Fast Delivery',
    description: 'Rapid development with AI assistance'
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
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <section 
      ref={containerRef}
      className="py-12 lg:py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

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
              <Button variant="primary" icon={Calendar} onClick={() => setIsCalendlyOpen(true)}>
                Book a Discovery Call
              </Button>
              <Button variant="secondary" icon={MessageCircle} onClick={() => setIsContactOpen(true)}>
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

          
        </motion.div>
      </div>

      {/* Modals */}
      <HomeCalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      <HomeContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  )
} 