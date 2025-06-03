'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'

interface CalendlyWindow extends Window {
  Calendly?: {
    initInlineWidget: (options: {
      url: string
      parentElement: HTMLElement
      prefill?: object
      utm?: object
    }) => void
  }
}

declare const window: CalendlyWindow

export default function CalendlyForm() {
  const [loaded, setLoaded] = useState(false)

  // Initialize Calendly widget when component mounts or becomes visible
  useEffect(() => {
    // Make sure Calendly script is loaded
    if (!window.Calendly) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = initCalendly
      document.head.appendChild(script)
      
      const link = document.createElement('link')
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    } else {
      initCalendly()
    }
    
    function initCalendly() {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const container = document.getElementById('calendly-inline-container')
        if (container && window.Calendly && !loaded) {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/jackoliverdev/30min',
            parentElement: container,
            prefill: {},
            utm: {}
          })
          setLoaded(true)
        }
      }, 300)
    }
    
    // Reinitialize on resize (helps with mobile/desktop transitions)
    window.addEventListener('resize', initCalendly)
    
    return () => {
      window.removeEventListener('resize', initCalendly)
    }
  }, [loaded])

  return (
    <motion.div 
      className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-glow-blue h-full flex flex-col relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="flex items-center gap-3 mb-2">
          <motion.div 
            className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Calendar className="w-5 h-5 text-white" />
          </motion.div>
          <h2 className="text-xl font-bold text-foreground">Schedule a Discovery Call</h2>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Pick a time that works for you to discuss your project and explore how I can help bring your vision to life.
        </p>
      </div>
      
      {/* Calendly container */}
      <div className="w-full flex-1 min-h-[500px] relative">
        <div
          id="calendly-inline-container"
          className="w-full h-full"
        />
        
        {/* Loading overlay */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm">
            <motion.div
              className="flex items-center gap-3 text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm">Loading calendar...</span>
            </motion.div>
          </div>
        )}
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
        <div className="absolute top-0 left-0 w-3 h-10 border-t-2 border-l-2 border-blue-500/50 rounded-tl-2xl" />
        <div className="absolute top-0 left-0 h-3 w-10 border-t-2 border-l-2 border-blue-500/50 rounded-tl-2xl" />
      </div>
      
      <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-3 h-10 border-b-2 border-r-2 border-purple-500/50 rounded-br-2xl" />
        <div className="absolute bottom-0 right-0 h-3 w-10 border-b-2 border-r-2 border-purple-500/50 rounded-br-2xl" />
      </div>

      {/* Subtle glow effects */}
      <motion.div 
        className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
} 