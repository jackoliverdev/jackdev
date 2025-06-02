'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Profile Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <Image
                    src="/jackoliver2.png"
                    alt="Jack Oliver"
                    fill
                    className="rounded-full object-cover ring-4 ring-blue-500/30"
                  />
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-red-400">🇬🇧</span>
                  <span className="text-muted-foreground">England</span>
                </div>

                {/* Language/Location badges */}
                <div className="flex justify-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-card border border-card-border rounded-full text-sm text-muted-foreground">
                    English
                  </span>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                  <Link 
                    href="#introduction" 
                    className="block px-4 py-2 text-left text-muted-foreground hover:text-white hover:bg-card/50 rounded-lg transition-all duration-200"
                  >
                    Introduction
                  </Link>
                  <Link 
                    href="#work-experience" 
                    className="block px-4 py-2 text-left text-muted-foreground hover:text-white hover:bg-card/50 rounded-lg transition-all duration-200"
                  >
                    Work Experience
                  </Link>
                  <Link 
                    href="#technical-skills" 
                    className="block px-4 py-2 text-left text-muted-foreground hover:text-white hover:bg-card/50 rounded-lg transition-all duration-200"
                  >
                    Technical Skills
                  </Link>
                </nav>
              </motion.div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <Button 
                size="sm"
                className="mb-6 bg-primary hover:bg-primary-hover glow-blue"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule a call
              </Button>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-white">Jack Oliver Dev</span>
              </h1>
              
              <p className="text-xl text-gradient-blue font-medium mb-6">
                Full Stack & AI Developer
              </p>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start gap-4 mb-8">
                <Link 
                  href="https://github.com/jackoliverdev" 
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-card-border rounded-lg hover:bg-card/80 transition-all duration-200 group"
                >
                  <Github className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm">GitHub</span>
                </Link>
                <Link 
                  href="https://linkedin.com/in/jackoliverdev" 
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-card-border rounded-lg hover:bg-card/80 transition-all duration-200 group"
                >
                  <Linkedin className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm">LinkedIn</span>
                </Link>
              </div>

              {/* Introduction */}
              <div id="introduction" className="mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Jack is an England-based full stack developer with a passion for transforming 
                  complex challenges into simple, elegant digital solutions. His work spans 
                  modern web applications, AI integrations, and the convergence of design and 
                  technology. Specialising in rapid development with cutting-edge tools and 
                  delivering exceptional user experiences.
                </p>
              </div>
            </motion.div>

            {/* Work Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              id="work-experience"
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-white mb-8">Work Experience</h2>

              {/* Centrus AI */}
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Centrus AI</h3>
                    <p className="text-cyan-400 font-medium">Chief Technology Officer</p>
                  </div>
                  <span className="text-muted-foreground">2023 - Present</span>
                </div>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></span>
                    Led the development of an AI-powered SaaS platform for startups, resulting in streamlined business operations and enhanced productivity.
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></span>
                    Architected integrations with Google Drive, MS Teams, and custom systems, enabling seamless workflow automation.
                  </li>
                </ul>
              </div>

              {/* Freelance */}
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Freelance</h3>
                    <p className="text-cyan-400 font-medium">Software Developer</p>
                  </div>
                  <span className="text-muted-foreground">2019 - Present</span>
                </div>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></span>
                    Delivered custom web applications and AI solutions for various clients, specialising in modern tech stacks and rapid development.
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></span>
                    Built e-commerce platforms, booking systems, and AI chatbots with focus on user experience and performance optimisation.
                  </li>
                </ul>
              </div>

              {/* Orange Light Marketing */}
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Orange Light Marketing</h3>
                    <p className="text-cyan-400 font-medium">Website Developer</p>
                  </div>
                  <span className="text-muted-foreground">2017 - 2020</span>
                </div>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></span>
                    Developed responsive marketing websites and landing pages, improving client conversion rates by an average of 35%.
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></span>
                    Collaborated with design and marketing teams to create compelling digital experiences that drive business growth.
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              id="technical-skills"
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-white mb-8">Technical Skills</h2>

              {/* Next.js */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Next.js</h3>
                <p className="text-muted-foreground">
                  Building modern, performant React applications with server-side rendering and optimal user experiences.
                </p>
              </div>

              {/* React */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">React</h3>
                <p className="text-muted-foreground">
                  Creating dynamic, interactive user interfaces with component-based architecture and modern React patterns.
                </p>
              </div>

              {/* OpenAI */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">OpenAI</h3>
                <p className="text-muted-foreground">
                  Integrating AI capabilities into applications, from chatbots to content generation and workflow automation.
                </p>
              </div>

              {/* Figma */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Figma</h3>
                <p className="text-muted-foreground">
                  Designing user interfaces and prototyping with precision, bridging the gap between design and development.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 