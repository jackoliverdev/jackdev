'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const technologies = [
  { name: 'Next.js', icon: '/logos/tech/nextjs.svg' },
  { name: 'React', icon: '/logos/tech/react.svg' },
  { name: 'Node.js', icon: '/logos/tech/nodejs.svg' },
  { name: 'JavaScript', icon: '/logos/tech/javascript.svg' },
  { name: 'Supabase', icon: '/logos/tech/supabase.svg' },
  { name: 'MongoDB', icon: '/logos/tech/mongodb.svg' },
  { name: 'Firebase', icon: '/logos/tech/firebase.svg' },
  { name: 'Tailwind CSS', icon: '/logos/tech/tailwind.svg' },
  { name: 'Framer Motion', icon: '/logos/tech/framer.svg' },
  { name: 'OpenAI', icon: '/logos/tech/openai.svg' },
  { name: 'Stripe', icon: '/logos/tech/stripe.svg' },
  { name: 'Matterport', icon: '/logos/tech/matterport.svg' },
  { name: 'HTML5', icon: '/logos/tech/html.svg' }
]

function RowMarquee({ direction = 'left', speed = 30 }: { direction?: 'left' | 'right'; speed?: number }) {
  const items = [...technologies, ...technologies]
  const animateFrom = direction === 'left' ? '0%' : '-50%'
  const animateTo = direction === 'left' ? '-50%' : '0%'

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex items-center gap-6 w-max pr-6"
        aria-hidden
        animate={{ x: [animateFrom, animateTo] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="group flex items-center gap-3 rounded-2xl border border-border/50 bg-card/60 px-4 py-3 backdrop-blur-sm hover:border-border transition-colors"
          >
            <div className="relative w-6 h-6">
              <Image
                src={tech.icon}
                alt={tech.name}
                fill
                className="object-contain transition-all duration-300 dark:filter dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0"
                sizes="24px"
              />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function HomeTechMarquee() {
  return (
    <section className="pt-2 lg:pt-4 pb-12 lg:pb-16 -mt-6 lg:-mt-10 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-4">
          {/* Mobile title (shortened to fit one line) */}
          <h3 className="md:hidden mt-0 text-2xl font-semibold">
            <span className="text-foreground">Technologies I </span>
            <span className="text-gradient-light-blue">Build With</span>
          </h3>
          {/* Desktop/large screens title */}
          <h3 className="hidden md:block mt-0 text-2xl lg:text-3xl font-semibold">
            <span className="text-foreground">Technologies I </span>
            <span className="text-gradient-light-blue">Design & Build With</span>
          </h3>
        </div>

        <RowMarquee direction="left" speed={30} />
      </div>
    </section>
  )
}


