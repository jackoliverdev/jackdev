'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock } from 'lucide-react'

interface CalendlyWindow extends Window {
  Calendly?: {
    initInlineWidget: (options: {
      url: string
      parentElement: HTMLElement
      prefill?: object
      utm?: object
    }) => void
    // Calendly in-app event listener
    initBadgeWidget?: (options: any) => void
  }
}

declare const window: CalendlyWindow

interface HomeCalendlyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HomeCalendlyModal({ isOpen, onClose }: HomeCalendlyModalProps) {
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

  // Load Calendly widget when modal opens
  useEffect(() => {
    if (isOpen) {
      if (!window.Calendly) {
        const script = document.createElement('script')
        script.src = 'https://assets.calendly.com/assets/external/widget.js'
        script.async = true
        script.onload = () => initCalendlyWidget()
        document.head.appendChild(script)

        const link = document.createElement('link')
        link.href = 'https://assets.calendly.com/assets/external/widget.css'
        link.rel = 'stylesheet'
        document.head.appendChild(link)
      } else {
        initCalendlyWidget()
      }
    }

    function initCalendlyWidget() {
      setTimeout(() => {
        const container = document.getElementById('home-calendly-modal-container')
        if (container && window.Calendly) {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/jackoliverdev/30min',
            parentElement: container,
            prefill: {},
            utm: {}
          })

          // Attach Calendly event listener to detect scheduled events
          const handler = (e: MessageEvent) => {
            if (typeof e.data !== 'object' || !e.data) return
            const { event, payload } = e.data as any
            if (event === 'calendly.event_scheduled') {
              const inviteeName = payload?.invitee?.name
              const inviteeEmail = payload?.invitee?.email
              const eventName = payload?.event?.name
              const eventStart = payload?.event?.start_time
              const eventEnd = payload?.event?.end_time
              fetch('/api/calendly', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inviteeName, inviteeEmail, eventName, eventStart, eventEnd, payload }),
              }).catch(() => {})
            }
          }
          window.addEventListener('message', handler)
        }
      }, 100)
    }
  }, [isOpen])

  // Close handlers
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
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
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, duration: 0.4 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl shadow-glow-blue"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/50 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 relative z-10">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg"
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Calendar className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Book a Discovery Call</h2>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>30 minutes</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>💬</span>
                      <span>Free consultation</span>
                    </div>
                  </div>
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
            <div className="w-full h-[calc(90vh-80px)] max-h-[700px] overflow-hidden relative">
              <div id="home-calendly-modal-container" className="min-h-[600px] w-full h-full" />

              {/* Loading state */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div
                  className="flex items-center gap-3 text-muted-foreground"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm">Loading calendar...</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Ambient glows */}
            <motion.div
              className="absolute top-1/2 right-4 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


