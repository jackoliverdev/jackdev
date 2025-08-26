'use client'

import React, { useState, useEffect } from 'react'

// Move codeLines outside component to prevent recreation on every render
const codeLines = [
  "const developWebsite = (idea) => {",
  "  return {",
  "    design: 'modern',",
  "    strategy: 'business-aligned',",
  "    technology: 'cutting-edge',",
  "    performance: 'optimised',",
  "    ROI: 'exceptional',",
  "    client: 'satisfied'",
  "  };",
  "};"
]

export function BrowserMockup() {
  // Typing animation states
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  
  const typingSpeed = 24 // ms per character (faster)
  const lineDelay = 80 // ms delay between lines (faster)
  
  // Start typing after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Starting typing animation...')
      setHasStarted(true)
    }, 3500) // Start typing slightly sooner

    return () => clearTimeout(timer)
  }, [])

  // Typing effect
  useEffect(() => {
    if (!hasStarted || isTypingComplete) return
    
    if (currentLineIndex >= codeLines.length) {
      setIsTypingComplete(true)
      return
    }

    const currentLine = codeLines[currentLineIndex]
    
    if (currentText.length < currentLine.length) {
      // Still typing current line
      const timeout = setTimeout(() => {
        setCurrentText(prev => currentLine.substring(0, prev.length + 1))
      }, typingSpeed)
      
      return () => clearTimeout(timeout)
    } else {
      // Line complete - move to next line
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, currentText])
        setCurrentLineIndex(prev => prev + 1)
        setCurrentText('')
      }, lineDelay)
      
      return () => clearTimeout(timeout)
    }
  }, [currentLineIndex, currentText, hasStarted, isTypingComplete])

  // Function to render syntax highlighted text as JSX
  const renderSyntaxHighlighted = (text: string) => {
    // Split text into parts and apply different colors
    const parts: JSX.Element[] = []
    let remaining = text
    let key = 0

    // Keywords
    remaining = remaining.replace(/(const|return)/g, (match) => {
      parts.push(<span key={key++} className="text-purple-400">{match}</span>)
      return `__PART_${parts.length - 1}__`
    })

    // Arrow functions
    remaining = remaining.replace(/(=>)/g, (match) => {
      parts.push(<span key={key++} className="text-yellow-300">{match}</span>)
      return `__PART_${parts.length - 1}__`
    })

    // Strings
    remaining = remaining.replace(/('[^']*')/g, (match) => {
      parts.push(<span key={key++} className="text-green-400">{match}</span>)
      return `__PART_${parts.length - 1}__`
    })

    // Brackets and parentheses
    remaining = remaining.replace(/([{}()])/g, (match) => {
      parts.push(<span key={key++} className="text-yellow-300">{match}</span>)
      return `__PART_${parts.length - 1}__`
    })

    // Object keys
    remaining = remaining.replace(/(design|strategy|technology|performance|ROI|client)/g, (match) => {
      parts.push(<span key={key++} className="text-orange-400">{match}</span>)
      return `__PART_${parts.length - 1}__`
    })

    // Colons
    remaining = remaining.replace(/(:)/g, (match) => {
      parts.push(<span key={key++} className="text-blue-400">{match}</span>)
      return `__PART_${parts.length - 1}__`
    })

    // Split the remaining text and rebuild with colored parts
    const finalParts = remaining.split(/(__PART_\d+__)/g).map((part, index) => {
      const partMatch = part.match(/__PART_(\d+)__/)
      if (partMatch) {
        return parts[parseInt(partMatch[1])]
      }
      return <span key={`text-${index}`} className="text-white">{part}</span>
    })

    return <>{finalParts}</>
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Browser/IDE Window */}
      <div className="rounded-xl overflow-hidden shadow-2xl border border-border/50 backdrop-blur-sm bg-card/30">
        {/* Browser-like header */}
        <div className="bg-card/90 px-4 py-3 flex items-center border-b border-border/50">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 bg-muted/70 rounded-md py-1 px-3 text-xs text-muted-foreground flex items-center">
            <svg className="w-3 h-3 mr-2 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            <span>https://jackoliverdev.co.uk</span>
          </div>
        </div>
        
        {/* IDE-style content area */}
        <div className="bg-gray-900 text-white font-mono text-sm">
          <div className="flex min-h-[280px]">
            {/* Left gutter with line numbers */}
            <div className="py-5 px-2 md:px-3 text-right text-gray-500 select-none bg-gray-900/95 border-r border-gray-700/30 min-w-[2rem] md:min-w-[3rem]">
              {/* Show line numbers only for displayed lines */}
              {displayedLines.map((_, index) => (
                <div key={index} className="h-6 leading-6 text-xs">
                  {index + 1}
                </div>
              ))}
              {/* Current line number if typing */}
              {hasStarted && !isTypingComplete && (
                <div className="h-6 leading-6 text-xs">
                  {displayedLines.length + 1}
                </div>
              )}
              {/* Empty state line number */}
              {!hasStarted && (
                <div className="h-6 leading-6 text-xs opacity-30">
                  1
                </div>
              )}
            </div>
            
            {/* Code content area */}
            <div className="py-5 px-2 md:px-6 flex-1 relative overflow-hidden">
              {/* Show completed lines only if we have any */}
              {displayedLines.length > 0 && displayedLines.map((line, index) => (
                <div 
                  key={index} 
                  className="h-6 leading-6 text-xs text-left pl-1 md:pl-2 whitespace-pre relative z-10"
                  style={{ fontFamily: "monospace" }}
                >
                  {renderSyntaxHighlighted(line)}
                </div>
              ))}
              
              {/* Current typing line - only show if typing has started */}
              {hasStarted && !isTypingComplete && currentText && (
                <div className="h-6 leading-6 text-xs text-left flex items-center pl-1 md:pl-2 whitespace-pre relative z-10" style={{ fontFamily: "monospace" }}>
                  {renderSyntaxHighlighted(currentText)}
                  <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse"></span>
                </div>
              )}
              
              {/* Empty state cursor - only show if typing hasn't started */}
              {!hasStarted && (
                <div className="h-6 leading-6 text-xs flex items-center pl-1 md:pl-2 relative z-10">
                  <span className="inline-block w-2 h-4 bg-gray-500 animate-pulse"></span>
                </div>
              )}
            </div>
          </div>
          
          {/* Terminal-like footer */}
          <div className="bg-gray-900/95 px-4 py-2 border-t border-gray-700/50 flex items-center text-xs text-gray-400">
            <div className="mr-3 w-2 h-2 bg-green-500 rounded-full"></div>
            <span>No errors</span>
            <div className="ml-auto flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Optimised</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 