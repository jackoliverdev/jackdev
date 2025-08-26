'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, Linkedin, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  // Prevent background scroll when modal is open
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

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Compact technologies list for one-line marquee
  const technologies = [
    { name: 'Next.js', icon: '/logos/tech/nextjs.svg' },
    { name: 'React', icon: '/logos/tech/react.svg' },
    { name: 'Node.js', icon: '/logos/tech/nodejs.svg' },
    { name: 'JavaScript', icon: '/logos/tech/javascript.svg' },
    { name: 'Supabase', icon: '/logos/tech/supabase.svg' },
    { name: 'MongoDB', icon: '/logos/tech/mongodb.svg' },
    { name: 'Firebase', icon: '/logos/tech/firebase.svg' },
    { name: 'Tailwind CSS', icon: '/logos/tech/tailwind.svg' },
    { name: 'Framer Motion', icon: '/logos/tech/framer.svg' },
    { name: 'OpenAI', icon: '/logos/tech/openai.svg' },
    { name: 'Stripe', icon: '/logos/tech/stripe.svg' },
    { name: 'Matterport', icon: '/logos/tech/matterport.svg' },
    { name: 'HTML5', icon: '/logos/tech/html.svg' }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280, duration: 0.35 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl shadow-glow-blue"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/50 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 relative z-10">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg"
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">About – Jack Oliver</h2>
                  <p className="text-xs text-muted-foreground">UK-based Full Stack & AI Developer</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-card/80 transition-all duration-200 text-muted-foreground hover:text-foreground group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </motion.button>
            </div>

            {/* Body */}
            <div className="relative p-6 overflow-y-auto max-h-[calc(90vh-64px)]">
              {/* Top profile row */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                <div className="relative w-24 h-24 aspect-square rounded-full overflow-hidden ring-4 ring-blue-500/20 shrink-0">
                  <Image src="/jackoliver2.png" alt="Jack Oliver" fill className="object-cover rounded-full" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-muted-foreground">
                    England-based developer specialising in modern websites, AI chatbots, and rapid delivery.
                    Focused on clean design, performance, and clear communication.
                  </p>
                  <div className="flex justify-center sm:justify-start gap-3 mt-4">
                    <Link href="https://github.com/jackoliverdev" className="flex items-center gap-2 px-3 py-1.5 bg-card border border-card-border rounded-lg hover:bg-card/80 transition-all text-sm">
                      <Github className="h-4 w-4" /> GitHub
                    </Link>
                    <Link href="https://linkedin.com/in/jackoliverdev" className="flex items-center gap-2 px-3 py-1.5 bg-card border border-card-border rounded-lg hover:bg-card/80 transition-all text-sm">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </Link>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl border border-card-border bg-card/60">
                  <div className="text-sm font-medium text-foreground">Centrus AI</div>
                  <div className="text-xs text-cyan-400">CTO · 2023–Present</div>
                  <p className="mt-2 text-sm text-muted-foreground">Led an AI-powered SaaS with company chatbots, workflow integrations, and multi-employee tools.</p>
                </div>
                <div className="p-4 rounded-xl border border-card-border bg-card/60">
                  <div className="text-sm font-medium text-foreground">Freelance</div>
                  <div className="text-xs text-cyan-400">Developer · 2019–Present</div>
                  <p className="mt-2 text-sm text-muted-foreground">Delivered websites, booking systems, and AI solutions with rapid, reliable turnaround.</p>
                </div>
                <div className="p-4 rounded-xl border border-card-border bg-card/60">
                  <div className="text-sm font-medium text-foreground">Orange Light</div>
                  <div className="text-xs text-cyan-400">Web Dev · 2017–2020</div>
                  <p className="mt-2 text-sm text-muted-foreground">Built responsive marketing sites that improved conversion rates for clients.</p>
                </div>
              </div>

              {/* Technologies Marquee (single line) */}
              <div className="mb-6">
                <div className="overflow-hidden rounded-xl border border-border/50 bg-card/60">
                  <motion.div
                    className="flex items-center gap-4 w-max pr-4 py-3"
                    aria-hidden
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  >
                    {[...technologies, ...technologies].map((tech, index) => (
                      <div
                        key={`${tech.name}-${index}`}
                        className="group flex items-center gap-2 rounded-full border border-border/40 bg-card/70 px-3 py-2 backdrop-blur-sm hover:border-border transition-colors"
                      >
                        <div className="relative w-5 h-5">
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            fill
                            className="object-contain transition-all duration-300 dark:filter dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0"
                            sizes="20px"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Closing note */}
              <div className="rounded-xl border border-card-border bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4">
                <p className="text-sm text-muted-foreground">
                  I build modern, performant digital experiences and AI solutions with a premium finish. If you have a project in mind, I would love to help bring it to life.
                </p>
              </div>

              {/* Ambient glows */}
              <motion.div
                className="absolute top-4 right-6 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-6 left-1/4 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


