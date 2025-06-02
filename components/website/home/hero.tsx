'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar, Monitor, Sparkles, Zap, Code2, Brain, Lightbulb, Laptop } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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

const AnimatedText = ({ text, delay = 0, charDelay = 0.03, lineDelay = 0.5 }: { text: string; delay?: number; charDelay?: number, lineDelay?: number }) => {
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

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [7.5, -7.5])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7.5, 7.5])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.documentElement.getBoundingClientRect()
      const x = (e.clientX - rect.width / 2) / rect.width
      const y = (e.clientY - rect.height / 2) / rect.height
      
      mouseX.set(x)
      mouseY.set(y)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative overflow-hidden pt-20 lg:pt-32 pb-16 lg:pb-24">
      
      {/* Background Elements - REMOVED */}
      {/* <div className="absolute inset-0 bg-gradient-radial opacity-50" /> */}
      {/* <div className="absolute inset-0 bg-gradient-mesh opacity-30" /> */}
      
      {/* Floating Background Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Large floating orbs - REMOVED */}
        {/* <FloatingElement delay={0} duration={8} amplitude={30}> */}
        {/*   <div className="absolute top-20 left-[10%] w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-xl" /> */}
        {/* </FloatingElement> */}
        {/*  */}
        {/* <FloatingElement delay={2} duration={10} amplitude={40}> */}
        {/*   <div className="absolute top-40 right-[15%] w-24 h-24 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-lg" /> */}
        {/* </FloatingElement> */}
        {/*  */}
        {/* <FloatingElement delay={4} duration={12} amplitude={25}> */}
        {/*   <div className="absolute bottom-40 left-[20%] w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl" /> */}
        {/* </FloatingElement> */}

        {/* --- Desktop Floating Icons --- */}
        <div className="hidden lg:block">
          <FloatingElement delay={1} duration={7} amplitude={15}>
            <div className="absolute top-32 right-[20%] p-3 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl backdrop-blur-sm border border-blue-500/20">
              <Code2 className="w-6 h-6 text-blue-400" />
            </div>
          </FloatingElement>
        </div>
        
        <div className="hidden lg:block">
          <FloatingElement delay={3.5} duration={7} amplitude={15}>
            <div className="absolute top-[26rem] right-[20%] p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl backdrop-blur-sm border border-green-500/20">
              <Laptop className="w-6 h-6 text-green-400" />
            </div>
          </FloatingElement>
        </div>

        <div className="hidden lg:block">
          <FloatingElement delay={5} duration={6} amplitude={15}>
            <div className="absolute top-32 left-[20%] p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl backdrop-blur-sm border border-yellow-500/20">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
            </div>
          </FloatingElement>
        </div>

        <div className="hidden lg:block">
          <FloatingElement delay={2.5} duration={8} amplitude={15}>
            <div className="absolute top-[26rem] left-[20%] p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-purple-500/20">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
          </FloatingElement>
        </div>

        {/* --- Mobile Floating Icons --- */}
        <div className="block lg:hidden">
          <FloatingElement delay={0.5} duration={8} amplitude={10}>
            <div className="absolute top-20 left-5 p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg backdrop-blur-sm border border-yellow-500/20">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
            </div>
          </FloatingElement>
        </div>

        <div className="block lg:hidden">
          <FloatingElement delay={1.0} duration={9} amplitude={8}>
            <div className="absolute top-24 right-5 p-2 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg backdrop-blur-sm border border-blue-500/20">
              <Code2 className="w-5 h-5 text-blue-400" />
            </div>
          </FloatingElement>
        </div>

        {/* New Bottom Mobile Icons -  ONLY VERTICAL MOVEMENT */}
        <div className="block lg:hidden">
          <FloatingElement delay={1.2} duration={8} amplitude={15} verticalOnly={true}>
            <div className="absolute top-[32rem] left-5 p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg backdrop-blur-sm border border-purple-500/20">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
          </FloatingElement>
        </div>

        <div className="block lg:hidden">
          <FloatingElement delay={1.7} duration={7} amplitude={15} verticalOnly={true}>
            <div className="absolute top-[34rem] right-5 p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg backdrop-blur-sm border border-green-500/20">
              <Laptop className="w-5 h-5 text-green-400" />
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
        <motion.div
          style={{ rotateX, rotateY }}
          className="text-center perspective-1000"
        >
          {/* Badge with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-8 inline-flex items-center rounded-full bg-card/60 border border-card-border/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm hover:bg-card/80 hover:border-card-border transition-all duration-500 hover:scale-105"
          >
            <motion.span 
              className="mr-2 h-2 w-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            Available for new projects
          </motion.div>

          {/* Main Heading with staggered word animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8 px-4"
          >
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl xl:text-7xl leading-tight lg:leading-tight xl:leading-tight">
              {/* Desktop First Line */}
              <div className="text-foreground hidden lg:block">
                <AnimatedText text="Transforming Ideas into" delay={0.4} charDelay={0.04} />
              </div>
              {/* Mobile First Line */}
              <div className="text-foreground block lg:hidden">
                <AnimatedText text="From Idea to" delay={0.4} charDelay={0.04} />
              </div>

              {/* Desktop Second Line */}
              <div className="text-gradient-blue hidden lg:block">
                <AnimatedText text="Digital Experiences" delay={0.4 + "Transforming Ideas into".length * 0.04 + 0.2} charDelay={0.04} />
              </div>
              {/* Mobile Second Line */}
              <div className="text-gradient-blue block lg:hidden">
                <AnimatedText text="Digital Experience" delay={0.4 + "From Idea to".length * 0.04 + 0.2} charDelay={0.04} />
              </div>
            </h1>
          </motion.div>

          {/* Subheading with typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mx-auto mb-8 max-w-4xl"
          >
            <motion.p
              className="text-lg text-muted-foreground lg:text-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
            >
              🇬🇧 UK-based developer specialising in modern websites and AI chatbots.
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                Fast delivery, excellent communication, and ongoing support.
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8, type: "spring", stiffness: 100 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/contact">
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.6, type: "spring", bounce: 0.3 }}
              >
                {/* Pulsing glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Hover shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <span className="relative flex items-center space-x-2">
                  <Calendar className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span>Book a Discovery Call</span>
                </span>
              </motion.button>
            </Link>
            
            <Link href="/portfolio">
              <motion.button
                className="group px-8 py-4 border border-border bg-card/60 text-card-foreground font-semibold rounded-xl backdrop-blur-sm hover:border-border/80 hover:bg-card/80 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.6, duration: 0.6, type: "spring", bounce: 0.3 }}
              >
                <span className="flex items-center space-x-2">
                  <Monitor className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-3" />
                  <span>View My Work</span>
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Enhanced About Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2.8, duration: 0.8, type: "spring", stiffness: 120 }}
            className="mt-8 flex justify-center"
          >
            <Link 
              href="/about"
              className="group relative flex items-center gap-2.5 rounded-full bg-card/40 border border-card-border/30 px-4 py-2 backdrop-blur-sm hover:bg-card/70 hover:border-card-border/60 transition-all duration-500 hover:scale-105"
            >
              {/* Subtle glow on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
              
              <motion.div 
                className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-blue-500/30 group-hover:ring-blue-400/50 transition-all duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/jackoliver2.png"
                  alt="Jack Oliver"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <span className="relative text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colours duration-300">
                About – Jack Oliver
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 