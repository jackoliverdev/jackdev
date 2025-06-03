'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

export interface ButtonProps {
  href?: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  icon?: LucideIcon
  size?: 'default' | 'sm' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ 
  href, 
  children, 
  variant = 'primary', 
  icon: Icon = ArrowRight,
  size = 'default',
  className = '',
  onClick,
  disabled = false
}: ButtonProps) => {
  
  const baseClasses = "group relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    default: "px-6 py-3 text-base rounded-xl", 
    lg: "px-8 py-4 text-lg rounded-xl"
  }
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg",
    secondary: "border border-border bg-card/80 text-card-foreground hover:border-border/80 hover:bg-card"
  }
  
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`
  
  const ButtonContent = () => (
    <motion.div
      className="relative z-10 flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{children}</span>
      
      {Icon && (
        <Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      )}
    </motion.div>
  )
  
  if (href) {
    return (
      <Link href={href}>
        <motion.button 
          className={buttonClasses}
          disabled={disabled}
          onClick={onClick}
        >
          <ButtonContent />
        </motion.button>
      </Link>
    )
  }
  
  return (
    <motion.button 
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      <ButtonContent />
    </motion.button>
  )
}

// Container for multiple buttons with proper spacing
export const ButtonGroup = ({ 
  children, 
  className = "",
  alignment = "center"
}: { 
  children: ReactNode
  className?: string
  alignment?: "left" | "center" | "right"
}) => {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center", 
    right: "justify-end"
  }
  
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${alignmentClasses[alignment]} ${className}`}>
      {children}
    </div>
  )
}

export default Button 