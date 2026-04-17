'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  hover?: boolean
  glass?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glass = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -8 } : undefined}
        className={cn(
          'bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-100/50 border border-gray-100',
          glass && 'bg-white/70 backdrop-blur-xl border-white/20',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export const CardImage = forwardRef<HTMLDivElement, { src: string; alt: string; className?: string }>(
  ({ src, alt, className }, ref) => {
    return (
      <div ref={ref} className={cn('relative overflow-hidden', className)}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    )
  }
)

CardImage.displayName = 'CardImage'

export const CardContent = forwardRef<HTMLDivElement, { className?: string; children: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div ref={ref} className={cn('p-6', className)}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'
