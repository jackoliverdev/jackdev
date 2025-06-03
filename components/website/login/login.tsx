'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Code2, Bot, Sparkles, Database, Brain, Globe } from 'lucide-react'
import { AuthCard } from "@/components/auth-card"
import { ProviderLoginButtons } from "@/components/auth/provider-login-buttons"
import { OrSeparator } from "@/components/ui/or-separator"

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

export default function Login() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-background pt-24 pb-12">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      {/* Floating Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-20">
          <FloatingIcon IconComponent={Shield} delay={0} duration={8} amplitude={25} />
        </div>
        <div className="absolute bottom-32 left-20">
          <FloatingIcon IconComponent={Lock} delay={2} duration={6} amplitude={20} />
        </div>
        <div className="absolute top-40 left-16">
          <FloatingIcon IconComponent={Code2} delay={1} duration={7} amplitude={30} />
        </div>
        <div className="absolute bottom-40 right-16">
          <FloatingIcon IconComponent={Bot} delay={3} duration={9} amplitude={25} />
        </div>
        <div className="absolute top-60 right-32">
          <FloatingIcon IconComponent={Sparkles} delay={4} duration={6} amplitude={15} />
        </div>
        <div className="absolute bottom-60 left-32">
          <FloatingIcon IconComponent={Database} delay={5} duration={8} amplitude={35} />
        </div>
        <div className="absolute top-20 left-1/3">
          <FloatingIcon IconComponent={Brain} delay={6} duration={10} amplitude={20} />
        </div>
        <div className="absolute bottom-20 right-1/3">
          <FloatingIcon IconComponent={Globe} delay={7} duration={7} amplitude={25} />
        </div>
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto space-y-8"
        >
          
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl lg:text-4xl font-bold text-foreground"
            >
              Welcome Back
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground"
            >
              Sign in to access your account
            </motion.p>
          </div>

          {/* Auth Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AuthCard />
          </motion.div>

          {/* Provider Login Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4"
          >
            <OrSeparator />
            <ProviderLoginButtons />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 