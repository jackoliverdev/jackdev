'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Lightbulb, Code, Settings, Rocket } from 'lucide-react'

const processSteps = [
  { step: 1, icon: MessageCircle, title: 'Discovery & Strategy', duration: '1-2 weeks', description: 'We dive into your goals and define a focused plan.', gradient: 'from-blue-500 to-cyan-500' },
  { step: 2, icon: Lightbulb, title: 'Design & Planning', duration: '1-3 weeks', description: 'Wireframes, design system, and technical specifications.', gradient: 'from-purple-500 to-pink-500' },
  { step: 3, icon: Code, title: 'Development', duration: '2-8 weeks', description: 'Implementation with clean code and best practices.', gradient: 'from-orange-500 to-red-500' },
  { step: 4, icon: Settings, title: 'Testing & Refinement', duration: '1-2 weeks', description: 'QA, performance tuning, and polish.', gradient: 'from-emerald-500 to-green-500' },
  { step: 5, icon: Rocket, title: 'Launch & Support', duration: 'Ongoing', description: 'Deployment, monitoring, and ongoing support.', gradient: 'from-yellow-500 to-orange-500' }
]

export default function HomeProcess() {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
            <span className="text-foreground">A Process That </span>
            <span className="text-gradient-light-blue">Works</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From consultation to launch, every step delivers results on time.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden md:block relative mt-4 mb-10">
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 via-orange-500 via-emerald-500 to-yellow-500 z-10"
          />

          <div className="relative">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex ${index % 2 === 0 ? '' : 'flex-row-reverse'} ${index !== 0 ? 'mt-[-16px]' : ''} mb-2 items-center`}
                  style={{ zIndex: 30 - index }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-6' : 'pl-6'}`}>
                    <div className="glass-card rounded-lg p-4 border-border/50 bg-card/60 backdrop-blur-sm h-24 relative">
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 bg-gradient-to-r ${step.gradient} text-white text-xs font-medium rounded-md`}>
                          {step.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 h-full pr-12">
                        <div className={`p-3 rounded-md bg-gradient-to-br ${step.gradient} shadow-lg flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-foreground mb-1">{step.title}</h3>
                          <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-2/12 flex justify-center">
                    <div className="z-20 relative">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.gradient} border-4 border-card flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="w-5/12"></div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile list */}
        <div className="md:hidden relative">
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 via-orange-500 via-emerald-500 to-yellow-500 z-0"
          />

          <div className="space-y-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon
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
                  <div className="absolute left-0 flex items-center justify-center z-10">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.gradient} border-4 border-card flex items-center justify-center shadow-lg`} style={{ marginLeft: '2px' }}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="glass-card rounded-lg p-3 border-border/50 bg-card/60 backdrop-blur-sm h-20 w-full relative">
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 bg-gradient-to-r ${step.gradient} text-white text-xs font-medium rounded-md`}>
                        {step.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 h-full pr-10">
                      <div className={`p-2.5 rounded-md bg-gradient-to-br ${step.gradient} shadow-lg flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
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
      </div>
    </section>
  )
}


