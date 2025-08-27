'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Globe, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

export type PortfolioTech = {
  name: string
  icon?: string
}

export type PortfolioItem = {
  id: number
  title: string
  subtitle: string
  description: string
  images: string[]
  url: string
  tech: PortfolioTech[]
}

interface PortfolioItemModalProps {
  isOpen: boolean
  onClose: () => void
  item?: PortfolioItem
}

export default function PortfolioItemModal({ isOpen, onClose, item }: PortfolioItemModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose() }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [isOpen, onClose])

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!isOpen) setIndex(0)
  }, [isOpen])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 20
  })

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg"
          onClick={handleBackdrop}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280, duration: 0.35 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl shadow-glow-blue"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/50 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 relative z-10">
              <div>
                <h2 className="text-xl font-bold text-foreground">{item.title}</h2>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-card/80 transition-all duration-200 text-muted-foreground hover:text-foreground group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </motion.button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-64px)] space-y-6">
              {/* Image slider with Embla */}
              <div className="relative w-full overflow-hidden rounded-xl border border-border/50" style={{ aspectRatio: '16 / 9' }}>
                <div className="h-full" ref={emblaRef}>
                  <div className="flex h-full">
                    {item.images.map((src, i) => (
                      <div key={src} className="min-w-0 flex-[0_0_100%] relative">
                        <Image src={src} alt={item.title} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px" />
                      </div>
                    ))}
                  </div>
                </div>

                {item.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => emblaApi?.scrollPrev()}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-9 w-9 rounded-full bg-card/80 backdrop-blur border border-border/60 text-foreground shadow hover:bg-card"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => emblaApi?.scrollNext()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-9 w-9 rounded-full bg-card/80 backdrop-blur border border-border/60 text-foreground shadow hover:bg-card"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                {item.images.length > 1 && (
                  <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
                    {item.images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => emblaApi?.scrollTo(i)}
                        className={`inline-flex items-center justify-center shrink-0 h-2.5 w-2.5 rounded-full p-0 appearance-none border ${i === index ? 'bg-primary' : 'bg-primary/30'} border-primary/40`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Tech stack chips (dark/light aware) */}
              <div className="flex flex-wrap gap-2">
                {item.tech.map((t) => (
                  <span key={t.name} className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground">
                    {t.icon ? (
                      <span className="relative w-4 h-4">
                        <Image src={t.icon} alt={t.name} fill className="object-contain transition-all duration-300 dark:filter dark:brightness-0 dark:invert" />
                      </span>
                    ) : (
                      <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />
                    )}
                    {t.name}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-primary text-white shadow-sm">
                  <Globe className="w-4 h-4" /> Visit live site
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


