'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Calendar, Send, CheckCircle, User, Mail, MessageCircle, Phone, Sparkles, Clock, Zap } from 'lucide-react'
import CalendlyForm from '@/components/website/contact/calendly-form'

const FloatingIcon = ({ 
  IconComponent, 
  delay = 0, 
  duration = 6, 
  amplitude = 20,
  className = ""
}: { 
  IconComponent: any
  delay?: number
  duration?: number 
  amplitude?: number
  className?: string
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
    className={className}
  >
    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg border border-white/20">
      <IconComponent className="w-4 h-4 text-blue-400" />
    </div>
  </motion.div>
)

export default function ContactInfo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Replace with your Formspree endpoint
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setIsSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-form" className="py-16 lg:py-20 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      
      {/* Floating Background Icons */}
      <FloatingIcon IconComponent={MessageSquare} delay={0} duration={8} amplitude={30} className="absolute top-20 left-10" />
      <FloatingIcon IconComponent={Calendar} delay={4} duration={7} amplitude={35} className="absolute bottom-32 right-16" />
      <FloatingIcon IconComponent={Sparkles} delay={2} duration={9} amplitude={25} className="absolute top-40 right-20" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-card/80 border border-border/50 rounded-full px-6 py-3 text-sm text-muted-foreground mb-6 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <MessageSquare className="w-4 h-4 text-blue-500" />
            </motion.div>
            <span>Get In Touch</span>
          </motion.div>

          <motion.h2 
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-foreground">Choose Your </span>
            <span className="text-gradient-light-blue">Preferred Method</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Send me a quick message or book a call - either way, I'll get back to you lightning fast
            <br className="hidden lg:block" />
            and we can start building something <span className="text-gradient-blue font-semibold">absolutely epic</span>.
          </motion.p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto items-start lg:items-stretch">
          
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-full"
          >
            <div className="glass-card rounded-2xl border border-border/50 overflow-hidden shadow-glow-blue h-full flex flex-col">
              
              {/* Form Header */}
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
                    <MessageSquare className="w-5 h-5 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">Send a Message</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tell me about your project and I'll get back to you within 24 hours. Let's make it happen!
                </p>
              </div>

              {/* Contact Form */}
              <div className="p-6 flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-8 flex-1 flex flex-col justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: 0.2, 
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }}
                        className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl font-bold text-emerald-400 mb-2"
                      >
                        Message Sent Successfully! 🚀
                      </motion.h4>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-muted-foreground"
                      >
                        Thanks for reaching out! I'll get back to you within 24 hours.
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6 flex-1"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                    >
                      {/* Name Field */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-foreground">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                            placeholder="What should I call you?"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-foreground">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                          Phone Number <span className="text-muted-foreground text-xs">(Optional)</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                            placeholder="+44 7123 456789"
                          />
                        </div>
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-foreground">
                          Your Message
                        </label>
                        <div className="relative">
                          <MessageCircle className="absolute left-3 top-4 w-4 h-4 text-muted-foreground" />
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                            placeholder="Tell me about your project! What are you looking to build?"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:scale-100 shadow-glow-blue flex items-center justify-center gap-2"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Calendly Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="h-full"
          >
            <CalendlyForm />
          </motion.div>
        </div>

        {/* Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto"
        >
          <div className="text-center p-4 glass-card rounded-xl border-border/50">
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-foreground mb-1">Quick Response</h4>
            <p className="text-xs text-muted-foreground">Usually within 24 hours</p>
          </div>
          
          <div className="text-center p-4 glass-card rounded-xl border-border/50">
            <MessageSquare className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-foreground mb-1">Free Consultation</h4>
            <p className="text-xs text-muted-foreground">No commitment required</p>
          </div>
          
          <div className="text-center p-4 glass-card rounded-xl border-border/50">
            <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-foreground mb-1">Lightning Fast</h4>
            <p className="text-xs text-muted-foreground">Rapid project delivery</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 