'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageSquare, Send, User, Mail, Phone, MessageCircle } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HomeContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose() }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      setIsSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setIsSuccess(false), 4000)
    } catch (error) {
      // Basic fallback UI; consider toasting in future
      alert('Sorry, there was a problem sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl shadow-glow-blue"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/50 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 relative z-10">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg"
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Send a Message</h2>
                  <p className="text-xs text-muted-foreground">I usually reply within 24 hours</p>
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
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-64px)]">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input id="name" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all" placeholder="What should I call you?" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone Number <span className="text-muted-foreground text-xs">(Optional)</span></label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input id="phone" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all" placeholder="+44 7123 456789" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">Your Message</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-4 w-4 h-4 text-muted-foreground" />
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                      className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none" placeholder="Tell me about your project! What are you looking to build?" />
                  </div>
                </div>

                <motion.button type="submit" disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:scale-100 shadow-glow-blue flex items-center justify-center gap-2"
                  whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  {isSubmitting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Success overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm rounded-2xl border border-border/50">
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center p-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4" />
                      <p className="text-foreground font-medium">Message sent! I'll be in touch shortly.</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ambient glows */}
            <motion.div className="absolute top-1/2 right-4 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.div className="absolute bottom-4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


