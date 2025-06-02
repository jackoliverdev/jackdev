'use client'

import { motion } from 'framer-motion'
import { Globe, Bot, Wrench, ArrowRight } from 'lucide-react'
import Link from 'next/link'

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
    gradient: 'from-blue-600 to-purple-600'
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
    gradient: 'from-purple-600 to-cyan-500'
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
    gradient: 'from-cyan-500 to-emerald-500'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
    rotate: -3
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function ServicesOverview() {
  return (
    <section className="pt-8 lg:pt-12 pb-16 lg:pb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-foreground">What I Do</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I specialise in building modern web applications and AI-powered solutions
            <br />
            that help businesses grow and connect with their customers effectively.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Service Card */}
                <div className="h-full p-6 lg:p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-all duration-500 group-hover:shadow-glow-blue">
                  {/* Icon */}
                  <motion.div 
                    className="mb-6"
                    animate={{
                      scale: [1, 1.03, 1, 1.03, 1],
                      rotate: [0, 1.5, 0, -1.5, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-gradient-blue transition-all duration-300">
                        {service.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.4, 
                            delay: 0.3 + (index * 0.1) + (featureIndex * 0.05) 
                          }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-lg text-muted-foreground mb-8">
            Ready to transform your digital presence?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-glow-blue transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center space-x-2">
                  <span>Explore Services</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </Link>
            
            <Link href="/contact">
              <motion.button
                className="group px-8 py-4 border border-border bg-card/80 text-card-foreground font-semibold rounded-xl hover:border-border/80 hover:bg-card transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center space-x-2">
                  <span>Start Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 