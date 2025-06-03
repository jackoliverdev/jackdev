'use client'

import { motion } from 'framer-motion'
import { Globe, Bot, Wrench, ArrowRight, Code, Sparkles, Zap, Lightbulb, Laptop, Brain } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Button, { ButtonGroup } from '../button'

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Modern, responsive websites that deliver exceptional user experiences and drive business growth.',
    features: [
      'E-commerce platforms',
      'Custom web applications',
      'Booking management systems',
      'Customer portals'
    ],
    gradient: 'from-purple-500 to-purple-600',
    glowColour: 'rgba(168, 85, 247, 0.4)',
    floatingIcons: [Code, Laptop, Globe]
  },
  {
    icon: Bot,
    title: 'AI Solutions',
    description: 'Cutting-edge AI integrations that automate workflows and enhance customer interactions.',
    features: [
      'Custom AI chatbots',
      'AI workflow automation',
      'AI applications',
      'System integrations'
    ],
    gradient: 'from-orange-500 to-orange-600',
    glowColour: 'rgba(251, 146, 60, 0.4)',
    floatingIcons: [Brain, Bot, Sparkles]
  },
  {
    icon: Wrench,
    title: 'Consulting & Support',
    description: 'Expert guidance and ongoing support to maximise your digital investment and performance.',
    features: [
      'Technical consulting',
      'Website maintenance',
      'Performance optimisation',
      'Strategic planning'
    ],
    gradient: 'from-green-500 to-green-600',
    glowColour: 'rgba(34, 197, 94, 0.4)',
    floatingIcons: [Wrench, Zap, Lightbulb]
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

const FloatingServiceIcon = ({ 
  IconComponent, 
  delay = 0, 
  duration = 8, 
  amplitude = 15,
  position = { top: '20%', left: '20%' }
}: { 
  IconComponent: any
  delay?: number
  duration?: number 
  amplitude?: number
  position?: { top: string, left: string }
}) => (
  <motion.div
    className="absolute pointer-events-none z-10"
    style={position}
    animate={{
      y: [0, -amplitude, 0],
      x: [0, amplitude / 2, 0],
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
    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
      <IconComponent className="w-4 h-4 text-white/80" />
    </div>
  </motion.div>
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function ServicesOverview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="pt-8 lg:pt-12 pb-16 lg:pb-20 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      
      {/* Floating Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16">
          <FloatingIcon IconComponent={Globe} delay={0} duration={8} amplitude={30} />
        </div>
        <div className="absolute top-40 right-20">
          <FloatingIcon IconComponent={Bot} delay={2} duration={7} amplitude={25} />
        </div>
        <div className="absolute bottom-32 left-20">
          <FloatingIcon IconComponent={Wrench} delay={4} duration={9} amplitude={35} />
        </div>
        <div className="absolute bottom-20 right-16">
          <FloatingIcon IconComponent={Code} delay={6} duration={6} amplitude={20} />
        </div>
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
          <FloatingIcon IconComponent={Sparkles} delay={1} duration={10} amplitude={40} />
        </div>
        <div className="absolute bottom-40 right-32">
          <FloatingIcon IconComponent={Zap} delay={5} duration={8} amplitude={30} />
        </div>
        <div className="absolute top-60 left-32">
          <FloatingIcon IconComponent={Lightbulb} delay={3} duration={7} amplitude={25} />
        </div>
        <div className="absolute bottom-60 right-10">
          <FloatingIcon IconComponent={Laptop} delay={7} duration={9} amplitude={35} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated Badge */}
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
              <Wrench className="w-4 h-4 text-yellow-400" />
            </motion.div>
            <span>Services & Skills</span>
          </motion.div>

          <motion.h2 
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-foreground">
              What I Do{' '}
            </span>
            <span className="text-gradient-light-blue">
              Exceptionally Well
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            I specialise in building modern web applications and AI-powered solutions
            <br />
            that help businesses <span className="text-gradient-blue font-semibold">grow, scale, and dominate</span> their markets.
          </motion.p>
        </motion.div>

        {/* Enhanced Services Grid */}
        <motion.div 
          className="grid lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isHovered = hoveredIndex === index
            
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Animated Glow Effect */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${service.glowColour} 0%, transparent 70%)`
                  }}
                  animate={isHovered ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating Icons Around Card */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {service.floatingIcons.map((FloatingIconComponent, iconIndex) => (
                    <FloatingServiceIcon
                      key={iconIndex}
                      IconComponent={FloatingIconComponent}
                      delay={iconIndex * 0.5}
                      duration={6 + iconIndex}
                      amplitude={12 + iconIndex * 3}
                      position={{
                        top: iconIndex === 1 ? '10%' : `${20 + iconIndex * 25}%`,
                        left: iconIndex === 1 ? '50%' : (iconIndex % 2 === 0 ? '85%' : '5%')
                      }}
                    />
                  ))}
                </div>

                {/* Main Service Card */}
                <div className="relative h-full p-6 lg:p-8 rounded-3xl border border-border/50 bg-card/70 backdrop-blur-sm hover:border-border transition-all duration-500 group-hover:shadow-glow-blue overflow-hidden">
                  
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    animate={isHovered ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 1, 0]
                    } : {}}
                    transition={{ duration: 4, ease: "easeInOut" }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* Enhanced Icon with Multiple Animations */}
                  <motion.div 
                    className="mb-6"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  >
                    {/* Icon Glow Ring */}
                    <motion.div 
                      className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${service.gradient}/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      animate={isHovered ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      } : {}}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                    
                    {/* Main Icon Container */}
                    <motion.div 
                      className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    
                    {/* Floating particles around icon */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={isHovered ? {
                        rotate: 360
                      } : {}}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                      {[...Array(3)].map((_, particleIndex) => (
                        <motion.div
                          key={particleIndex}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            top: `${30 + particleIndex * 15}%`,
                            left: `${20 + particleIndex * 20}%`
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: particleIndex * 0.3
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Content */}
                  <div className="space-y-4 relative z-10">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-white transition-all duration-300">
                        {service.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Enhanced Features List */}
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-3 group/feature"
                        >
                          <motion.div 
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} group-hover/feature:scale-125 transition-transform duration-200`}
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: featureIndex * 0.2
                            }}
                          />
                          <span className="text-sm text-muted-foreground group-hover/feature:text-foreground transition-colours duration-200">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div 
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <ButtonGroup>
            <Button href="/services" variant="primary">
              Explore All Services
            </Button>
            <Button href="/contact" variant="secondary">
              Start Your Project
            </Button>
          </ButtonGroup>
        </motion.div>
      </div>
    </section>
  )
} 