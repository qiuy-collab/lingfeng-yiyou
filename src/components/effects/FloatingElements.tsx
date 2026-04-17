'use client'

import { motion } from 'framer-motion'

// 岭南风格装饰元素
const decorElements = [
  { id: 1, type: 'circle', size: 300, x: '10%', y: '20%', color: 'primary', delay: 0 },
  { id: 2, type: 'diamond', size: 200, x: '80%', y: '30%', color: 'secondary', delay: 1 },
  { id: 3, type: 'circle', size: 150, x: '70%', y: '70%', color: 'accent', delay: 2 },
  { id: 4, type: 'diamond', size: 100, x: '20%', y: '80%', color: 'primary', delay: 0.5 },
  { id: 5, type: 'circle', size: 80, x: '50%', y: '50%', color: 'secondary', delay: 1.5 },
]

const colorMap = {
  primary: 'rgba(238, 117, 16, 0.08)',
  secondary: 'rgba(20, 184, 166, 0.08)',
  accent: 'rgba(217, 70, 239, 0.08)',
}

export function FloatingElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-heritage-paper via-white to-secondary-50/30" />

      {/* 浮动装饰元素 */}
      {decorElements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{
            left: el.x,
            top: el.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -30, 0],
            rotate: el.type === 'diamond' ? [0, 10, 0] : [0, 360],
          }}
          transition={{
            opacity: { duration: 1, delay: el.delay },
            scale: { duration: 1, delay: el.delay },
            y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          }}
        >
          {el.type === 'circle' ? (
            <div
              className="rounded-full"
              style={{
                width: el.size,
                height: el.size,
                background: colorMap[el.color as keyof typeof colorMap],
                filter: 'blur(40px)',
              }}
            />
          ) : (
            <div
              style={{
                width: el.size,
                height: el.size,
                background: colorMap[el.color as keyof typeof colorMap],
                transform: 'rotate(45deg)',
                filter: 'blur(40px)',
              }}
            />
          )}
        </motion.div>
      ))}

      {/* 岭南风格装饰线条 */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>

      {/* 满洲窗风格的几何图案 */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-5">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ee7510" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
          {[...Array(20)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${i * 60} 100 L ${i * 60 + 30} 0 L ${i * 60 + 60} 100`}
              fill="none"
              stroke="url(#windowGradient)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
