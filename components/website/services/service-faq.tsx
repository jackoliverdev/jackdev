'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  HelpCircle, ChevronDown, Clock, CreditCard, Code, 
  MessageSquare, Shield, Zap, CheckCircle, Star, Calendar
} from 'lucide-react'
import { useState } from 'react'
import CalendlyModal from '@/components/website/contact/calendly-modal'

const faqs = [
  {
    id: 1,
    icon: Clock,
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity, but here\'s what you can expect: Simple websites (2-3 weeks), Professional websites with advanced features (3-4 weeks), Enterprise solutions with AI integration (4-6 weeks). I always provide a detailed timeline during our initial consultation, and I\'ll keep you updated every step of the way.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    icon: Code,
    question: 'Do you work with existing websites?',
    answer: 'Absolutely! Whether you need to modernise an outdated website, fix performance issues, add new features, or completely rebuild from scratch, I can help. I\'ll audit your current site and provide recommendations on the best path forward - sometimes a refresh is all you need, other times a complete rebuild delivers better value.',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    id: 4,
    icon: Zap,
    question: 'What makes your AI solutions special?',
    answer: 'My AI integrations aren\'t just fancy chatbots - they\'re powerful business tools trained on your specific data and processes. I use cutting-edge APIs from OpenAI, custom training data, and seamless integration with your existing systems. The result? AI that actually understands your business and provides real value to your customers.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    icon: MessageSquare,
    question: 'How involved do I need to be during development?',
    answer: 'As much or as little as you prefer! I provide regular updates and seek your feedback at key milestones, but I don\'t need you holding my hand every day. Most clients prefer weekly check-ins via email or quick calls. You\'ll always know what\'s happening, but you won\'t be bombarded with unnecessary details.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 6,
    icon: Shield,
    question: 'What about ongoing maintenance and support?',
    answer: 'Every project includes free support for 3-6 months (depending on your package), covering bug fixes, minor updates, and technical guidance. After that, I offer flexible maintenance plans or ad-hoc support as needed. I\'m not going anywhere - I want to see your business succeed long-term.',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 8,
    icon: Star,
    question: 'Can you help with digital marketing and SEO?',
    answer: 'Yes, but with a focus on technical excellence rather than ongoing marketing campaigns. I build SEO-optimised websites from the ground up, set up analytics and tracking, and ensure fast loading speeds. For ongoing SEO and marketing campaigns, I can recommend trusted specialists I work with regularly.',
    gradient: 'from-indigo-500 to-purple-500'
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

export default function ServiceFAQ() {
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
            <FloatingIcon IconComponent={Code} delay={0} duration={8} amplitude={30} />
          </div>
          <div className="absolute top-40 right-20">
            <FloatingIcon IconComponent={Zap} delay={2} duration={7} amplitude={25} />
          </div>
          <div className="absolute bottom-32 left-20">
            <FloatingIcon IconComponent={Clock} delay={4} duration={9} amplitude={35} />
          </div>
          <div className="absolute bottom-20 right-16">
            <FloatingIcon IconComponent={MessageSquare} delay={6} duration={6} amplitude={20} />
          </div>
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
            <FloatingIcon IconComponent={Shield} delay={1} duration={10} amplitude={40} />
          </div>
          <div className="absolute bottom-40 right-32">
            <FloatingIcon IconComponent={Star} delay={5} duration={8} amplitude={30} />
          </div>
          <div className="absolute top-60 left-32">
            <FloatingIcon IconComponent={CheckCircle} delay={3} duration={7} amplitude={25} />
          </div>
          <div className="absolute bottom-60 right-10">
            <FloatingIcon IconComponent={Calendar} delay={7} duration={9} amplitude={35} />
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
              <span>Frequently Asked Questions</span>
            </motion.div>

            <motion.h2 
              className="text-2xl lg:text-3xl font-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-foreground">
                Questions?{' '}
              </span>
              <span className="text-gradient-light-blue">
                I've Got Answers
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              Here are the most common questions I get asked about my services. 
              <br className="hidden lg:block" />
              Can't find what you're looking for? <span className="text-gradient-blue font-semibold">Just drop me a message</span>.
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

          {/* Still Have Questions CTA */}
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
                  Still Have Questions?
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                I'm always happy to have a chat about your specific needs and how I can help your business succeed. 
                Every project is unique, and I'd love to discuss yours.
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
                  href="/contact"
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