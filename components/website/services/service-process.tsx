'use client'

import { motion } from 'framer-motion'
import { 
  MessageCircle, Lightbulb, Code, Rocket, Settings, 
  CheckCircle, Clock, Target, Zap, Sparkles, Star, Layers
} from 'lucide-react'

const processSteps = [
  {
    step: 1,
    icon: MessageCircle,
    title: 'Discovery & Strategy',
    duration: '1-2 weeks',
    description: 'We dive deep into your business goals and craft the perfect strategy.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    step: 2,
    icon: Lightbulb,
    title: 'Design & Planning',
    duration: '1-3 weeks',
    description: 'Creating stunning wireframes, mockups, and technical specifications.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    step: 3,
    icon: Code,
    title: 'Development',
    duration: '2-8 weeks',
    description: 'Building your project with obsessive attention to detail.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    step: 4,
    icon: Settings,
    title: 'Testing & Refinement',
    duration: '1-2 weeks',
    description: 'Rigorous testing to ensure everything works flawlessly.',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    step: 5,
    icon: Rocket,
    title: 'Launch & Support',
    duration: 'Ongoing',
    description: 'Smooth deployment and ongoing support for continued success.',
    gradient: 'from-yellow-500 to-orange-500'
  }
]

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

export default function ServiceProcess() {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />

      {/* Floating Background Icons */}
      <FloatingIcon IconComponent={Code} delay={0} duration={8} amplitude={30} className="absolute top-20 left-10" />
      <FloatingIcon IconComponent={Rocket} delay={4} duration={7} amplitude={35} className="absolute bottom-32 right-16" />
      <FloatingIcon IconComponent={Sparkles} delay={2} duration={9} amplitude={25} className="absolute top-40 right-20" />
      <FloatingIcon IconComponent={Lightbulb} delay={6} duration={8} amplitude={40} className="absolute bottom-20 left-20" />
      <FloatingIcon IconComponent={Star} delay={1} duration={10} amplitude={20} className="absolute top-32 left-1/2" />
      <FloatingIcon IconComponent={Zap} delay={5} duration={6} amplitude={30} className="absolute bottom-40 right-32" />
      <FloatingIcon IconComponent={Settings} delay={3} duration={9} amplitude={35} className="absolute top-60 left-16" />
      <FloatingIcon IconComponent={Layers} delay={7} duration={7} amplitude={25} className="absolute bottom-60 right-10" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 lg:mb-20"
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
              <Settings className="w-4 h-4 text-orange-500" />
            </motion.div>
            <span>How We Work Together</span>
          </motion.div>

          <motion.h2 
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-foreground">
              A Process That{' '}
            </span>
            <span className="text-gradient-light-blue">
              Actually Works
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            From initial consultation to launch and beyond, every step delivers 
            <br className="hidden lg:block" />
            <span className="text-gradient-blue font-semibold"> exceptional results on time</span>.
          </motion.p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative mt-8 mb-12">
          {/* Main central timeline line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 via-orange-500 via-emerald-500 to-yellow-500 z-10"
          />
          
          <div className="relative">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              
              return (
                <motion.div 
                  key={step.step} 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex ${index % 2 === 0 ? '' : 'flex-row-reverse'} ${index !== 0 ? 'mt-[-20px]' : ''} mb-2 items-center`}
                  style={{ zIndex: 30 - index }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-6' : 'pl-6'}`}>
                    <div className="glass-card rounded-lg p-4 border-border/50 hover:shadow-glow-blue transition-all duration-500 bg-card/60 backdrop-blur-sm h-24 relative">
                      {/* Time tag in top right */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 bg-gradient-to-r ${step.gradient} text-white text-xs font-medium rounded-md`}>
                          {step.duration}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 h-full pr-12">
                        {/* Icon on left */}
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                          className={`p-3 rounded-md bg-gradient-to-br ${step.gradient} shadow-lg flex-shrink-0`}
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.05, 1],
                              rotate: [0, 2, -2, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: index * 0.5
                            }}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </motion.div>
                        </motion.div>
                        
                        {/* Content on right */}
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-foreground mb-1">{step.title}</h3>
                          <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-2/12 flex justify-center">
                    {/* Timeline circle with icon */}
                    <div className="z-20 relative">
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.gradient} border-4 border-card flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative">
          {/* Vertical timeline line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 via-orange-500 via-emerald-500 to-yellow-500 z-0"
          />
          
          <div className="space-y-4">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              
              return (
                <motion.div 
                  key={step.step} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-16 flex items-center" 
                  style={{ zIndex: 20 - index }}
                >
                  {/* Timeline circle */}
                  <div className="absolute left-0 flex items-center justify-center z-10">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.gradient} border-4 border-card flex items-center justify-center shadow-lg`}
                      style={{ marginLeft: '2px' }}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="glass-card rounded-lg p-3 border-border/50 bg-card/60 backdrop-blur-sm h-20 w-full relative">
                    {/* Time tag in top right */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 bg-gradient-to-r ${step.gradient} text-white text-xs font-medium rounded-md`}>
                        {step.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 h-full pr-10">
                      {/* Icon on left */}
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                        className={`p-2.5 rounded-md bg-gradient-to-br ${step.gradient} shadow-lg flex-shrink-0`}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, -2, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.5
                          }}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </motion.div>
                      </motion.div>
                      
                      {/* Content on right */}
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-foreground mb-1">{step.title}</h3>
                        <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-12 max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-md p-3 border-border/50 text-center bg-card/60 backdrop-blur-sm hover:shadow-glow-blue transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-lg font-bold text-foreground">2-12</span>
            </div>
            <p className="text-xs text-muted-foreground">Weeks typical delivery</p>
          </div>
          
          <div className="glass-card rounded-md p-3 border-border/50 text-center bg-card/60 backdrop-blur-sm hover:shadow-glow-blue transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-lg font-bold text-foreground">100%</span>
            </div>
            <p className="text-xs text-muted-foreground">Satisfaction rate</p>
          </div>
          
          <div className="glass-card rounded-md p-3 border-border/50 text-center bg-card/60 backdrop-blur-sm hover:shadow-glow-blue transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Rocket className="w-4 h-4 text-purple-400" />
              <span className="text-lg font-bold text-foreground">3</span>
            </div>
            <p className="text-xs text-muted-foreground">Months free support</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const FloatingProcessIcon = ({ 
  delay = 0, 
  duration = 8, 
  amplitude = 15,
  children
}: { 
  delay?: number
  duration?: number 
  amplitude?: number
  children: React.ReactNode
}) => (
  <motion.div
    animate={{
      y: [0, -amplitude, 0],
      rotate: [0, 360],
      scale: [1, 1.1, 1],
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