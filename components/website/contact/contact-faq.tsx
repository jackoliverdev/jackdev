'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  HelpCircle, ChevronDown, Clock, MessageSquare, Phone, 
  Calendar, CheckCircle, Zap, Mail, MapPin
} from 'lucide-react'
import { useState } from 'react'
import CalendlyModal from '@/components/website/contact/calendly-modal'

const faqs = [
  {
    id: 1,
    icon: Clock,
    question: 'How quickly will you respond to my message?',
    answer: 'I typically respond within 24 hours, often much faster! I\'m passionate about what I do and love hearing about new projects. If you message me during UK business hours, you\'ll usually hear back within a few hours. For urgent matters, booking a call is the fastest way to get a response.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    icon: Calendar,
    question: 'What happens during a discovery call?',
    answer: 'It\'s a relaxed 30-minute chat where we discuss your project, goals, and vision. I\'ll ask about your business, target audience, and any specific features you need. You can ask me anything about my process, timeline, or costs. No pressure, no hard sell - just an honest conversation about how I can help your project succeed.',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    id: 3,
    icon: MessageSquare,
    question: 'Do you prefer email or calls for initial contact?',
    answer: 'Both work brilliantly! Email is great if you want to share detailed project information or prefer written communication. Calls are perfect for quick discussions or if you have lots of questions. Choose whatever feels most comfortable for you - I\'m flexible and responsive either way.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 4,
    icon: Phone,
    question: 'Can we meet in person?',
    answer: 'Absolutely! I\'m based in the UK and happy to meet for coffee or visit your office if you\'re within reasonable distance. For projects further afield, I find video calls work just as well. Many of my best client relationships started with a good old-fashioned face-to-face chat.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    icon: CheckCircle,
    question: 'What information should I include in my message?',
    answer: 'Tell me about your business, what you\'re looking to build, and any specific features you need. Your timeline, rough budget range, and any inspiration sites are helpful too. Don\'t worry about having everything figured out - part of my job is helping you clarify your vision and suggest the best approach.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 6,
    icon: Zap,
    question: 'Do you offer free consultations?',
    answer: 'Yes! Initial consultations are always free, whether by call, email, or in person. I want to understand your project properly and ensure we\'re a good fit before discussing any costs. This helps both of us make informed decisions about moving forward together.',
    gradient: 'from-cyan-500 to-blue-500'
  }
]

const FloatingIcon = ({ 
  IconComponent, 
  delay = 0, 
  duration = 8, 
  amplitude = 15
}: { 
  IconComponent: any
  delay?: number
  duration?: number 
  amplitude?: number
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
  >
    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg border border-white/20">
      <IconComponent className="w-4 h-4 text-blue-400" />
    </div>
  </motion.div>
)

export default function ContactFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1) // First FAQ open by default
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false)

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <>
      <section className="py-12 lg:py-16 relative overflow-hidden">
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-radial opacity-30" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />

        {/* Floating Background Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-16">
            <FloatingIcon IconComponent={HelpCircle} delay={0} duration={8} amplitude={30} />
          </div>
          <div className="absolute top-40 right-20">
            <FloatingIcon IconComponent={MessageSquare} delay={2} duration={7} amplitude={25} />
          </div>
          <div className="absolute bottom-32 left-20">
            <FloatingIcon IconComponent={Phone} delay={4} duration={9} amplitude={35} />
          </div>
          <div className="absolute bottom-20 right-16">
            <FloatingIcon IconComponent={Calendar} delay={6} duration={6} amplitude={20} />
          </div>
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
            <FloatingIcon IconComponent={CheckCircle} delay={1} duration={10} amplitude={40} />
          </div>
          <div className="absolute bottom-40 right-32">
            <FloatingIcon IconComponent={Zap} delay={5} duration={8} amplitude={30} />
          </div>
          <div className="absolute top-60 left-32">
            <FloatingIcon IconComponent={Mail} delay={3} duration={7} amplitude={25} />
          </div>
          <div className="absolute bottom-60 right-10">
            <FloatingIcon IconComponent={MapPin} delay={7} duration={9} amplitude={35} />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
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
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <HelpCircle className="w-4 h-4 text-cyan-500" />
              </motion.div>
              <span>Contact Questions</span>
            </motion.div>

            <motion.h2 
              className="text-2xl lg:text-3xl font-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-foreground">
                Common{' '}
              </span>
              <span className="text-gradient-light-blue">
                Contact Questions
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              Everything you need to know about getting in touch and starting your project. 
              <br className="hidden lg:block" />
              Still have questions? <span className="text-gradient-blue font-semibold">I'm just a message away</span>!
            </motion.p>
          </motion.div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const IconComponent = faq.icon
                const isOpen = openFAQ === faq.id
                
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                    className="group relative"
                  >
                    <div className={`glass-card rounded-xl border-border/50 hover:border-border transition-all duration-300 overflow-hidden ${
                      isOpen ? 'shadow-glow-blue' : ''
                    }`}>
                      
                      {/* Glow effect when open */}
                      {isOpen && (
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${faq.gradient}/20 rounded-xl blur-sm -z-10`} />
                      )}
                      
                      {/* Question */}
                      <motion.button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full p-4 text-left flex items-center gap-3 hover:bg-muted/10 transition-colors duration-200"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div 
                          className={`p-2 rounded-lg bg-gradient-to-br ${faq.gradient} shadow-lg flex-shrink-0`}
                          animate={isOpen ? {
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, -2, 0],
                          } : {}}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-foreground group-hover:text-blue-400 transition-colors duration-200">
                            {faq.question}
                          </h3>
                        </div>
                        
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className={`w-5 h-5 transition-colors duration-200 ${
                            isOpen ? 'text-blue-400' : 'text-muted-foreground group-hover:text-foreground'
                          }`} />
                        </motion.div>
                      </motion.button>

                      {/* Answer */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-4 pb-4">
                              <div className="pl-12">
                                <motion.div
                                  initial={{ y: -10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -10, opacity: 0 }}
                                  transition={{ delay: 0.1, duration: 0.3 }}
                                  className="text-sm text-muted-foreground leading-relaxed"
                                >
                                  {faq.answer}
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Ready to Get Started CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mt-12"
          >
            <div className="glass-card rounded-xl p-6 border-border/50 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-foreground">
                  Ready to Get Started?
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Don't see your question answered? No worries! I'm always happy to chat about your specific needs 
                and how we can make your project absolutely epic.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={() => setIsCalendlyModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-glow-blue"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-4 h-4" />
                  Book a Call
                </motion.button>
                
                <motion.a
                  href="#contact-form"
                  className="inline-flex items-center gap-2 border border-border/50 hover:border-border text-foreground hover:bg-card/50 px-6 py-3 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Me a Message
                </motion.a>
              </div>
            </div>
          </motion.div>
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