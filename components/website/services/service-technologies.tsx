'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Zap, Code, Database, Globe, Cpu, Layers, Terminal } from 'lucide-react'

const technologies = [
  {
    name: 'Next.js',
    icon: '/logos/tech/nextjs.svg',
    color: 'from-white to-gray-300',
    category: 'Frontend'
  },
  {
    name: 'React',
    icon: '/logos/tech/react.svg',
    color: 'from-cyan-400 to-blue-500',
    category: 'Frontend'
  },
  {
    name: 'Node.js',
    icon: '/logos/tech/nodejs.svg',
    color: 'from-green-400 to-green-600',
    category: 'Backend'
  },
  {
    name: 'JavaScript',
    icon: '/logos/tech/javascript.svg',
    color: 'from-yellow-400 to-yellow-500',
    category: 'Language'
  },
  {
    name: 'Supabase',
    icon: '/logos/tech/supabase.svg',
    color: 'from-emerald-400 to-green-500',
    category: 'Database'
  },
  {
    name: 'MongoDB',
    icon: '/logos/tech/mongodb.svg',
    color: 'from-green-500 to-green-700',
    category: 'Database'
  },
  {
    name: 'Firebase',
    icon: '/logos/tech/firebase.svg',
    color: 'from-orange-400 to-orange-600',
    category: 'Backend'
  },
  {
    name: 'Tailwind CSS',
    icon: '/logos/tech/tailwind.svg',
    color: 'from-cyan-400 to-blue-500',
    category: 'Styling'
  },
  {
    name: 'Framer Motion',
    icon: '/logos/tech/framer.svg',
    color: 'from-purple-500 to-pink-500',
    category: 'Animation'
  },
  {
    name: 'OpenAI',
    icon: '/logos/tech/openai.svg',
    color: 'from-gray-700 to-gray-900',
    category: 'AI'
  },
  {
    name: 'Stripe',
    icon: '/logos/tech/stripe.svg',
    color: 'from-blue-600 to-purple-600',
    category: 'Payments'
  },
  {
    name: 'HTML5',
    icon: '/logos/tech/html.svg',
    color: 'from-orange-500 to-red-500',
    category: 'Frontend'
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

export default function ServiceTechnologies() {
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      
      {/* Floating Background Icons */}
      <FloatingIcon IconComponent={Code} delay={0} duration={8} amplitude={30} className="absolute top-20 left-10" />
      <FloatingIcon IconComponent={Database} delay={4} duration={7} amplitude={35} className="absolute bottom-32 right-16" />
      <FloatingIcon IconComponent={Sparkles} delay={2} duration={9} amplitude={25} className="absolute top-40 right-20" />
      <FloatingIcon IconComponent={Globe} delay={6} duration={8} amplitude={40} className="absolute bottom-20 left-20" />
      <FloatingIcon IconComponent={Cpu} delay={1} duration={10} amplitude={20} className="absolute top-32 left-1/2" />
      <FloatingIcon IconComponent={Zap} delay={5} duration={6} amplitude={30} className="absolute bottom-40 right-32" />
      <FloatingIcon IconComponent={Layers} delay={3} duration={9} amplitude={35} className="absolute top-60 left-16" />
      <FloatingIcon IconComponent={Terminal} delay={7} duration={7} amplitude={25} className="absolute bottom-60 right-10" />

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
              <Zap className="w-4 h-4 text-orange-500" />
            </motion.div>
            <span>Cutting-Edge Technology Stack</span>
          </motion.div>

          <motion.h2 
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-foreground">Built with </span>
            <span className="text-gradient-light-blue">Modern Tech</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            I use the latest technologies to ensure your project is fast, secure, and future-proof.
            <br className="hidden lg:block" />
            <span className="text-gradient-blue font-semibold">Every tool chosen for maximum impact and performance</span>.
          </motion.p>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-7xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group perspective-1000"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${tech.color}/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative glass-card rounded-2xl p-6 border-border/50 hover:border-border transition-all duration-500 hover:shadow-glow-blue h-full text-center transform-gpu min-h-[140px] flex flex-col items-center justify-center">
                  
                  {/* Tech Icon */}
                  <motion.div 
                    className="relative mb-4"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="w-12 h-12 relative">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        fill
                        className="object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                        sizes="48px"
                      />
                    </div>
                    
                    {/* Icon pulse effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${tech.color} opacity-20`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.3,
                      }}
                    />
                  </motion.div>
                  
                  {/* Tech Name */}
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-gradient-blue transition-all duration-300 text-center leading-tight">
                    {tech.name}
                  </h3>
                  
                  {/* Category Badge */}
                  <span className="text-xs text-muted-foreground/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {tech.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
            </motion.div>
            <span className="text-sm font-medium text-muted-foreground">
              Always staying ahead with the latest tech trends
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 