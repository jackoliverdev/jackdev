'use client'

import { motion } from 'framer-motion'
import { 
  Globe, Bot, Wrench, Code2, Smartphone, Palette, Search, 
  Zap, Brain, MessageSquare, Cog, LineChart, Shield, 
  Database, Cloud, Users, CheckCircle, ArrowRight, Sparkles
} from 'lucide-react'
import { useState } from 'react'

const services = [
  {
    id: 'websites',
    icon: Globe,
    title: 'Website Development',
    subtitle: 'Modern, Responsive & Lightning Fast',
    description: 'I craft websites that not only look absolutely gorgeous but convert visitors into customers faster than you can say "bloody hell".',
    gradient: 'from-purple-500 to-purple-600',
    features: [
      {
        icon: Code2,
        title: 'Custom Web Applications',
        description: 'Bespoke web apps tailored to your business needs'
      },
      {
        icon: Smartphone,
        title: 'E-commerce Platforms',
        description: 'Online stores that sell like hotcakes'
      },
      {
        icon: Palette,
        title: 'Modern Design',
        description: 'Stunning visuals that make competitors jealous'
      },
      {
        icon: Search,
        title: 'SEO Optimised',
        description: 'Built to dominate search engine rankings'
      }
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Shopify'],
    deliverables: [
      'Fully responsive design across all devices',
      'Lightning-fast page load speeds',
      'SEO-optimised structure and content',
      'Modern animations and micro-interactions',
      'Content management system',
      '3 months of free maintenance'
    ]
  },
  {
    id: 'ai',
    icon: Bot,
    title: 'AI Solutions',
    subtitle: 'Cutting-Edge Intelligence That Works',
    description: 'AI integrations that will make your business run like a well-oiled machine whilst your competitors are still figuring out what ChatGPT is.',
    gradient: 'from-orange-500 to-orange-600',
    features: [
      {
        icon: MessageSquare,
        title: 'AI Chatbots',
        description: 'Customer support that never sleeps'
      },
      {
        icon: Brain,
        title: 'Workflow Automation',
        description: 'Let AI handle the boring stuff'
      },
      {
        icon: Zap,
        title: 'Custom AI Applications',
        description: 'Tailored AI solutions for your industry'
      },
      {
        icon: Database,
        title: 'Data Integration',
        description: 'Connect AI to your existing systems'
      }
    ],
    technologies: ['OpenAI APIs', 'Python', 'Machine Learning', 'Natural Language Processing', 'TensorFlow'],
    deliverables: [
      'Custom AI chatbot trained on your data',
      'Workflow automation setup',
      'API integrations with existing systems',
      'Training and documentation',
      'Performance monitoring dashboard',
      'Ongoing AI model improvements'
    ]
  },
  {
    id: 'consulting',
    icon: Wrench,
    title: 'Consulting & Support',
    subtitle: 'Expert Guidance & Ongoing Excellence',
    description: 'Strategic consulting and rock-solid support to ensure your digital presence stays ahead of the curve and your competitors stay behind.',
    gradient: 'from-emerald-500 to-emerald-600',
    features: [
      {
        icon: LineChart,
        title: 'Performance Optimisation',
        description: 'Make everything faster and better'
      },
      {
        icon: Shield,
        title: 'Security Audits',
        description: 'Keep the bad guys out'
      },
      {
        icon: Cloud,
        title: 'Technical Strategy',
        description: 'Plan your digital future'
      },
      {
        icon: Users,
        title: 'Team Training',
        description: 'Get your team up to speed'
      }
    ],
    technologies: ['Performance Monitoring', 'Security Tools', 'Analytics', 'Training Materials'],
    deliverables: [
      'Comprehensive technical audit',
      'Performance optimisation recommendations',
      'Security vulnerability assessment',
      'Strategic roadmap development',
      'Team training sessions',
      'Priority support access'
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

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

export default function ServiceDetails() {
  const [activeService, setActiveService] = useState(services[0].id)

  return (
    <section id="service-details" className="py-16 lg:py-24 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />

      {/* Floating Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16">
          <FloatingIcon IconComponent={Code2} delay={0} duration={8} amplitude={30} />
        </div>
        <div className="absolute top-40 right-20">
          <FloatingIcon IconComponent={Bot} delay={2} duration={7} amplitude={25} />
        </div>
        <div className="absolute bottom-32 left-20">
          <FloatingIcon IconComponent={Sparkles} delay={4} duration={9} amplitude={35} />
        </div>
        <div className="absolute bottom-20 right-16">
          <FloatingIcon IconComponent={Globe} delay={6} duration={6} amplitude={20} />
        </div>
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
          <FloatingIcon IconComponent={Zap} delay={1} duration={10} amplitude={40} />
        </div>
        <div className="absolute bottom-40 right-32">
          <FloatingIcon IconComponent={Database} delay={5} duration={8} amplitude={30} />
        </div>
        <div className="absolute top-60 left-32">
          <FloatingIcon IconComponent={Brain} delay={3} duration={7} amplitude={25} />
        </div>
        <div className="absolute bottom-60 right-10">
          <FloatingIcon IconComponent={Shield} delay={7} duration={9} amplitude={35} />
        </div>
      </div>

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
              <Cog className="w-4 h-4 text-blue-500" />
            </motion.div>
            <span>Detailed Services Breakdown</span>
          </motion.div>

          <motion.h2 
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-foreground">
              What I Can Do{' '}
            </span>
            <span className="text-gradient-light-blue">
              (For You)
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Each service is crafted with obsessive attention to detail and delivered with the kind of quality
            <br className="hidden lg:block" />
            that makes your business <span className="text-gradient-blue font-semibold">absolutely unstoppable</span>.
          </motion.p>
        </motion.div>

        {/* Service Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col lg:flex-row gap-3 mb-16 max-w-5xl mx-auto"
        >
          {services.map((service) => {
            const IconComponent = service.icon
            const isActive = activeService === service.id
            
            return (
              <motion.button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`group relative flex-1 p-4 rounded-xl border transition-all duration-300 ${
                  isActive 
                    ? 'bg-card border-border shadow-glow-blue' 
                    : 'bg-card/40 border-border/30 hover:bg-card/60 hover:border-border/60'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Glow effect */}
                {isActive && (
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient}/20 rounded-xl blur-sm -z-10`} />
                )}
                
                <div className="flex items-center gap-3 text-left">
                  <motion.div 
                    className={`p-2 rounded-lg bg-gradient-to-br ${service.gradient} shadow-lg`}
                    animate={isActive ? {
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground mb-1 whitespace-nowrap">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {service.subtitle}
                    </p>
                  </div>
                  
                  <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                    isActive ? 'text-blue-400 rotate-90' : 'text-muted-foreground group-hover:translate-x-1'
                  }`} />
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Active Service Details */}
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          {services
            .filter(service => service.id === activeService)
            .map((service) => {
              const IconComponent = service.icon
              
              return (
                <div key={service.id} className="grid lg:grid-cols-2 gap-12 items-stretch">
                  
                  {/* Left Column - Service Overview */}
                  <div className="flex flex-col">
                    
                    {/* Service Header */}
                    <div className="glass-card rounded-2xl p-6 border-border/50 flex-1">
                      <div className="flex items-start gap-4 mb-6">
                        <motion.div 
                          className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg flex-shrink-0`}
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
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {service.title}
                          </h3>
                          <p className="text-base text-gradient-blue font-semibold mb-2">
                            {service.subtitle}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
                          Technologies & Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, index) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                              className="px-2.5 py-1.5 bg-muted/50 border border-border/50 rounded-lg text-xs font-medium text-foreground"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Key Features Grid */}
                      <div className="flex-1">
                        <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                          {service.features.map((feature, index) => {
                            const FeatureIcon = feature.icon
                            return (
                              <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex gap-3 p-3 bg-muted/30 rounded-lg border border-border/30 hover:bg-muted/40 transition-colors duration-200"
                              >
                                <div className="w-8 h-8 rounded-lg bg-card border border-border/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                                  <FeatureIcon className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h5 className="font-semibold text-foreground text-xs mb-0.5">
                                    {feature.title}
                                  </h5>
                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                    {feature.description}
                                  </p>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Deliverables */}
                  <div className="glass-card rounded-2xl p-8 border-border/50 relative flex flex-col">
                    
                    {/* Floating Icons */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute top-6 right-6">
                        <FloatingIcon IconComponent={Sparkles} delay={0} duration={6} amplitude={10} />
                      </div>
                      <div className="absolute bottom-6 left-6">
                        <FloatingIcon IconComponent={CheckCircle} delay={2} duration={8} amplitude={12} />
                      </div>
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col">
                      <h4 className="text-xl font-bold text-foreground mb-2">
                        What You'll Receive
                      </h4>
                      <p className="text-muted-foreground mb-6">
                        Every project includes these deliverables as standard
                      </p>

                      <div className="space-y-4 flex-1">
                        {service.deliverables.map((deliverable, index) => (
                          <motion.div
                            key={deliverable}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex items-start gap-3"
                          >
                            <div className="p-1 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full mt-0.5">
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            </div>
                            <p className="text-sm text-foreground">
                              {deliverable}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-semibold text-blue-400">
                            Bonus Included
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Free consultation call to discuss your specific requirements and ensure everything exceeds your expectations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </motion.div>
      </div>
    </section>
  )
} 