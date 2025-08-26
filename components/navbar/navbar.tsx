'use client'

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState } from "react"
import { Calendar, Mail, Sun, Moon } from "lucide-react"
import HomeCalendlyModal from "@/components/website/home/calendly-modal"
import HomeContactModal from "@/components/website/home/contact-modal"

export const NavBar = () => {
  const { theme, setTheme } = useTheme()
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      {/* Gradient fade overlay */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-background via-background/80 to-transparent z-40 pointer-events-none" />

      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-card/80 backdrop-blur-md border border-card-border rounded-full pl-4 pr-6 sm:pl-5 sm:pr-5 py-2 shadow-lg">
          <div className="flex items-center gap-3">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2 pr-3 sm:pr-4 border-r border-card-border shrink-0">
              <Image src="/logos/logo.svg" alt="Jack Oliver Dev" width={20} height={20} className="opacity-90" />
              <span className="text-[13px] sm:text-sm font-semibold text-foreground whitespace-nowrap">Jack Oliver Dev</span>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Book a call */}
              <button
                type="button"
                onClick={() => setIsCalendlyOpen(true)}
                className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-white hover:bg-card/60 transition-all duration-300 shrink-0"
                aria-label="Book a call"
              >
                <Calendar className="h-4 w-4" />
              </button>

              {/* Divider */}
              <div className="h-6 w-px bg-card-border mx-0.5 sm:mx-1" />

              {/* Email */}
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-white hover:bg-card/60 transition-all duration-300 shrink-0"
                aria-label="Open contact form"
              >
                <Mail className="h-4 w-4" />
              </button>

              {/* Divider */}
              <div className="h-6 w-px bg-card-border mx-0.5 sm:mx-1" />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-white hover:bg-card/60 transition-all duration-300 shrink-0"
                aria-label="Toggle theme"
              >
                <Sun className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <HomeCalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      <HomeContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
