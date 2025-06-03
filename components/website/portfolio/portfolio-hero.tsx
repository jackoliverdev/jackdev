'use client'

import { motion } from 'framer-motion'
import { Briefcase, Star, Zap, Code2, Globe, Bot, Trophy, Sparkles, ArrowRight, Calendar, Monitor } from 'lucide-react'
import Button from '@/components/website/button'
import { useState } from 'react'
import CalendlyModal from '@/components/website/contact/calendly-modal'

const FloatingElement = ({ 
  children, 
  delay = 0, 
  duration = 6, 
  amplitude = 20,
  verticalOnly = false
}: { 
  children: React.ReactNode
  delay?: number
  duration?: number 
  amplitude?: number
  verticalOnly?: boolean
}) => (
  <motion.div
    animate={{
      y: [0, -amplitude, 0],
      x: verticalOnly ? 0 : [0, amplitude / 2, 0],
      rotate: verticalOnly ? 0 : [0, 5, -5, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  >
    {children}
  </motion.div>
)

const AnimatedText = ({ text, delay = 0, charDelay = 0.03 }: { text: string; delay?: number; charDelay?: number }) => {
  const characters = Array.from(text)

  return (
    <span className="block">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + (i * charDelay),
            type: "spring",
            stiffness: 100
          }}
          className="inline-block"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function PortfolioHero() {
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden pt-20 lg:pt-32 pb-16 lg:pb-24">
        
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* Desktop Floating Icons */}
          <div className="hidden lg:block">
            <FloatingElement delay={1} duration={7} amplitude={15}>
              <div className="absolute top-40 right-[15%] p-3 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl backdrop-blur-sm border border-blue-500/20">
                <Trophy className="w-6 h-6 text-blue-400" />
              </div>
            </FloatingElement>
          </div>
          
          <div className="hidden lg:block">
            <FloatingElement delay={3.5} duration={8} amplitude={18}>
              <div className="absolute top-[28rem] right-[25%] p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-purple-500/20">
                <Star className="w-6 h-6 text-purple-400 fill-current" />
              </div>
            </FloatingElement>
          </div>

          <div className="hidden lg:block">
            <FloatingElement delay={5} duration={6} amplitude={15}>
              <div className="absolute top-40 left-[15%] p-3 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl backdrop-blur-sm border border-emerald-500/20">
                <Briefcase className="w-6 h-6 text-emerald-400" />
              </div>
            </FloatingElement>
          </div>

          <div className="hidden lg:block">
            <FloatingElement delay={2.5} duration={9} amplitude={20}>
              <div className="absolute top-[30rem] left-[20%] p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl backdrop-blur-sm border border-orange-500/20">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
            </FloatingElement>
          </div>

          {/* Mobile Floating Icons */}
          <div className="block lg:hidden">
            <FloatingElement delay={0.5} duration={8} amplitude={10}>
              <div className="absolute top-28 left-5 p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg backdrop-blur-sm border border-blue-500/20">
                <Trophy className="w-5 h-5 text-blue-400" />
              </div>
            </FloatingElement>
          </div>

          <div className="block lg:hidden">
            <FloatingElement delay={1.0} duration={9} amplitude={8}>
              <div className="absolute top-32 right-5 p-2 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg backdrop-blur-sm border border-purple-500/20">
                <Star className="w-5 h-5 text-purple-400 fill-current" />
              </div>
            </FloatingElement>
          </div>

          {/* Geometric shapes */}
          <FloatingElement delay={2.5} duration={11} amplitude={35}>
            <div className="absolute top-[60%] left-[80%] w-6 h-6 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rotate-45 blur-sm" />
          </FloatingElement>
          
          <FloatingElement delay={1.5} duration={8} amplitude={22}>
            <div className="absolute top-[80%] right-[70%] w-4 h-4 bg-gradient-to-br from-cyan-500/40 to-blue-500/40 rounded-full blur-sm" />
          </FloatingElement>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="text-center">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                delay: 0.5, 
                duration: 0.6, 
                ease: "easeInOut"
              }}
              className="mb-6 lg:mb-8 inline-flex items-center rounded-full bg-card/60 border border-card-border/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm hover:bg-card/80 hover:border-card-border transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="mr-2 w-4 h-4 text-purple-500" />
              Featured Work & Case Studies
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mb-8 px-4"
            >
              <h1 className="text-4xl font-bold tracking-tight lg:text-6xl xl:text-7xl leading-tight lg:leading-tight xl:leading-tight">
                {/* Desktop */}
                <div className="text-foreground hidden lg:block">
                  <AnimatedText text="Work That" delay={0.8} charDelay={0.04} />
                </div>
                {/* Mobile */}
                <div className="text-foreground block lg:hidden">
                  <AnimatedText text="Work That" delay={0.8} charDelay={0.06} />
                </div>

                {/* Desktop Second Line */}
                <div className="text-gradient-light-blue hidden lg:block">
                  <AnimatedText text="Speaks for Itself" delay={1.4} charDelay={0.04} />
                </div>
                {/* Mobile Second Line */}
                <div className="text-gradient-light-blue block lg:hidden">
                  <AnimatedText text="Speaks for Itself" delay={1.4} charDelay={0.06} />
                </div>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
              className="mx-auto mb-8 max-w-3xl"
            >
              <motion.p
                className="text-lg text-muted-foreground lg:text-xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.4, duration: 1 }}
              >
                From AI-powered SaaS platforms to luxury booking systems and e-commerce solutions,
                <br />
                every project delivers exceptional results that exceed expectations.
              </motion.p>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.2, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center items-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 4.4, duration: 0.6, ease: "easeOut" }}
              >
                <Button
                  variant="primary"
                  icon={Calendar}
                  onClick={() => setIsCalendlyModalOpen(true)}
                  className="relative overflow-hidden"
                >
                  Start Your Project
                  
                  {/* Pulsing glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-xl blur-xl -z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "loop"
                    }}
                  />
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 4.6, duration: 0.6, ease: "easeOut" }}
              >
                <Button
                  href="#portfolio-grid"
                  variant="secondary"
                  icon={ArrowRight}
                >
                  View All Projects
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendly Modal */}
      <CalendlyModal 
        isOpen={isCalendlyModalOpen} 
        onClose={() => setIsCalendlyModalOpen(false)} 
      />
    </>
  )
} 