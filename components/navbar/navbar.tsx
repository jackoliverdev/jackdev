'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { FC } from "react"
import { Home, Wrench, Monitor, User, Mail, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Services", href: "/services", icon: Wrench },
  { name: "Portfolio", href: "/portfolio", icon: Monitor },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
]

export const NavBar: FC = () => {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      {/* Gradient fade overlay */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-background via-background/80 to-transparent z-40 pointer-events-none" />
      
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-card/80 backdrop-blur-md border border-card-border rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-muted-foreground hover:text-white hover:bg-card/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:block">{item.name}</span>
                </Link>
              )
            })}
            
            {/* Theme Toggle */}
            <div className="ml-2 pl-2 border-l border-card-border">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-7 h-7 rounded-full text-muted-foreground hover:text-white hover:bg-card/60 transition-all duration-300"
                aria-label="Toggle theme"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
