'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Quote } from 'lucide-react'

// Simplified static testimonials section – removed floating icons and scroll logic

const testimonials = [
  {
    id: 1,
    name: 'Chris Hartney',
    position: 'Chief Revenue Officer',
    company: 'Centrus AI',
    logoLight: '/portfolio/logos/centrus icon light mode.png',
    logoDark: '/portfolio/logos/Centrus_White_Icon dark mode.png',
    content:
      'Jack transformed our vision into a robust, user-friendly SaaS platform. The delivery quality and communication were excellent throughout.'
  },
  {
    id: 2,
    name: 'Luca Castronuvo',
    position: 'Managing Director',
    company: 'Hand Line Safety Company',
    logoLight: '/portfolio/logos/Logo HLC.png',
    logoDark: '/portfolio/logos/Logo HLC.png',
    content:
      'The multilingual B2B storefront and CMS streamlined our operations and raised our online presence significantly.'
  },
  {
    id: 3,
    name: 'Chris Martin',
    position: 'COO',
    company: 'Gym Tours AI',
    logoLight: '/portfolio/logos/Gym Tour AI logo lightmode.png',
    logoDark: '/portfolio/logos/Gym Tour AI logo Icon dark mode.png',
    content:
      'Jack was a pleasure to work with, he went above and beyond! The final product delivered was better than I could have imagined.'
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-foreground">What Clients </span>
            <span className="text-gradient-light-blue">Are Saying</span>
          </motion.h2>
          <motion.p
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Real feedback from recent projects delivered with care and precision.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              className="rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm p-6 hover:border-border transform-gpu transition-colors duration-200"
              style={{ willChange: 'transform, opacity', contain: 'layout paint' }}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/60 border border-border/50 text-xs text-muted-foreground">
                  <span className="relative w-4 h-4">
                    <Image src={t.logoLight} alt={`${t.company} logo`} fill sizes="16px" className="object-contain block dark:hidden" />
                    <Image src={t.logoDark} alt="" fill sizes="16px" className="object-contain hidden dark:block" />
                  </span>
                  {t.company}
                </span>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary text-white">
                  <Quote className="w-4 h-4" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  “{t.content}”
                </p>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.position} • {t.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}