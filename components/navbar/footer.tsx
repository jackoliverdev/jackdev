'use client'

import Link from "next/link"
import { FC, useState } from "react"
import { Github, Linkedin, Mail, Calendar } from "lucide-react"
import HomeCalendlyModal from '@/components/website/home/calendly-modal'
import HomeContactModal from '@/components/website/home/contact-modal'

const socialLinks = [
  { name: "Email", href: "mailto:jackoliverdev@gmail.com", icon: Mail },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jack-melluish/", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/jackoliverdev", icon: Github },
]

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear()
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <footer className="mt-20 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="bg-card/90 backdrop-blur-md border border-card-border rounded-full px-4 sm:px-6 py-3 shadow-lg">
            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center justify-center gap-6">
              {/* Book a call */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsCalendlyOpen(true)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-all duration-300"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book a call</span>
                </button>
              </div>
              
              {/* Social Links */}
              <div className="border-l border-card-border pl-6">
                <div className="flex items-center gap-2">
                  {socialLinks.map((item) => {
                    const Icon = item.icon
                    
                    if (item.name === 'Email') {
                      return (
                        <button
                          key={item.name}
                          onClick={() => setIsContactOpen(true)}
                          className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-white hover:bg-card/80 transition-all duration-300"
                          aria-label={item.name}
                          type="button"
                        >
                          <Icon className="h-4 w-4" />
                        </button>
                      )
                    }
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-white hover:bg-card/80 transition-all duration-300"
                        aria-label={item.name}
                      >
                        <Icon className="h-4 w-4" />
                      </Link>
                    )
                  })}
                </div>
              </div>
              
              {/* Copyright */}
              <div className="text-sm text-muted-foreground border-l border-card-border pl-6">
                <span>© {currentYear} Jack Oliver • UK</span>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="sm:hidden flex flex-col items-center gap-2">
              {/* Top Row - 2 Column Grid */}
              <div className="grid grid-cols-2 gap-1 w-full">
                {/* Column 1: Book a call */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsCalendlyOpen(true)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-all duration-300"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Book a call</span>
                  </button>
                </div>
                
                {/* Column 2: Social Links */}
                <div className="flex items-center justify-center gap-1 border-l border-card-border pl-4">
                  {socialLinks.map((item) => {
                    const Icon = item.icon
                    
                    if (item.name === 'Email') {
                      return (
                        <button
                          key={item.name}
                          onClick={() => setIsContactOpen(true)}
                          className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-white hover:bg-card/80 transition-all duration-300"
                          aria-label={item.name}
                          type="button"
                        >
                          <Icon className="h-5 w-5" />
                        </button>
                      )
                    }
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full text-muted-foreground hover:text-white hover:bg-card/80 transition-all duration-300"
                        aria-label={item.name}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    )
                  })}
                </div>
              </div>
              
              {/* Bottom: Copyright */}
              <div className="text-xs text-muted-foreground text-center border-t border-card-border pt-3 w-full">
                <span>© {currentYear} Jack Oliver • UK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <HomeCalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      <HomeContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  )
}
