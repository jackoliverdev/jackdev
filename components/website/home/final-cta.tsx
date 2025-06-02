'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Calendar, MessageCircle, Clock, Users, Star, CheckCircle, ArrowRight, Zap, Globe, Award } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: 50,
    suffix: '+',
    label: 'Projects Delivered',
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '/5',
    label: 'Client Rating',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    icon: Clock,
    value: 24,
    suffix: 'hrs',
    label: 'Response Time',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    icon: Award,
    value: 100,
    suffix: '%',
    label: 'Success Rate',
    gradient: 'from-cyan-500 to-blue-600'
  }
]

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

const AnimatedCounter = ({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const rounded = useTransform(springValue, (latest) => {
    if (value < 10) {
      return Math.round(latest * 10) / 10 // One decimal place for ratings
    }
    return Math.round(latest)
  })

  useState(() => {
    if (isInView) {
      motionValue.set(value)
    }
  })

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={containerRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      {/* Floating Background Elements - REMOVED AS THEY ARE NOW GLOBAL */}
      {/* <div className="absolute inset-0 overflow-hidden"> */}
      {/*   <motion.div */}
      {/*     className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-xl" */}
      {/*     animate={{ */}
      {/*       scale: [1, 1.2, 1], */}
      {/*       x: [0, 20, 0], */}
      {/*       y: [0, -10, 0] */}
      {/*     }} */}
      {/*     transition={{ */}
      {/*       duration: 6, */}
      {/*       repeat: Infinity, */}
      {/*       ease: "easeInOut" */}
      {/*     }} */}
      {/*   /> */}
      {/*   <motion.div */}
      {/*     className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-xl" */}
      {/*     animate={{ */}
      {/*       scale: [1, 1.3, 1], */}
      {/*       x: [0, -20, 0], */}
      {/*       y: [0, 10, 0] */}
      {/*     }} */}
      {/*     transition={{ */}
      {/*       duration: 8, */}
      {/*       repeat: Infinity, */}
      {/*       ease: "easeInOut", */}
      {/*       delay: 1 */}
      {/*     }} */}
      {/*   /> */}
      {/* </div> */}

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Main CTA Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left: Main CTA */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm font-medium"
            >
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Transform Your Business?
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                <span className="text-foreground">Let's Build Something</span>
                <br />
                <span className="text-gradient-blue">Extraordinary</span>
              </h2>
              
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                From initial concept to live deployment, I'll transform your vision into a 
                <span className="text-foreground font-semibold"> modern digital solution</span> that drives real results.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Primary CTA */}
              <Link href="/contact">
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-2xl shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Pulsing glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-purple-400/50 rounded-xl blur-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <span className="relative flex items-center space-x-2">
                    <Calendar className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <span>Book a Discovery Call</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </Link>

              {/* Secondary CTA */}
              <Link href="/portfolio">
                <motion.button
                  className="group px-8 py-4 border-2 border-border bg-card/50 hover:bg-card text-foreground font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span>View My Work</span>
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="space-y-4"
            >
              {trustIndicators.map((indicator, index) => {
                const IconComponent = indicator.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + (index * 0.1), duration: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{indicator.text}</p>
                      <p className="text-sm text-muted-foreground">{indicator.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right: Stats & Social Proof */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.6, type: "spring", bounce: 0.3 }}
                    className="relative group"
                  >
                    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center hover:border-border hover:shadow-glow-blue transition-all duration-500">
                      
                      {/* Icon */}
                      <motion.div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg mb-4`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>

                      {/* Value */}
                      <div className="mb-2">
                        <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </div>
                      </div>

                      {/* Label */}
                      <p className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                    </div>

                    {/* Hover glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient}/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.9 + (i * 0.1), duration: 0.4 }}
                      className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-background flex items-center justify-center"
                    >
                      <Star className="w-4 h-4 text-white fill-current" />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <p className="text-foreground font-semibold mb-1">
                Join satisfied clients across the UK
              </p>
              <p className="text-sm text-muted-foreground">
                Fast, reliable, and results-driven development
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 