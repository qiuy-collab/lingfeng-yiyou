'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景 */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=2070')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-heritage-ink/60 via-heritage-ink/40 to-heritage-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-transparent to-secondary-900/30" />
      </motion.div>

      {/* 主内容 */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
        {/* 标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full mr-2 animate-pulse" />
          {t.home.hero.subtitle}
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-serif text-white mb-4 sm:mb-6 leading-tight"
        >
          <span className="block">{t.home.hero.title}</span>
          <motion.span
            className="block mt-2 sm:mt-4"
            style={{
              background: 'linear-gradient(135deg, #ee7510 0%, #d946ef 50%, #14b8a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            岭风译游
          </motion.span>
        </motion.h1>

        {/* 描述 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2"
        >
          {t.home.hero.description}
        </motion.p>

        {/* CTA 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link href="/routes" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full text-base sm:text-lg shadow-lg shadow-primary-500/30"
            >
              <span className="flex items-center justify-center">
                {t.home.hero.cta}
                <ArrowRight className="ml-2" size={18} />
              </span>
            </motion.button>
          </Link>

          <Link href="/culture" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 text-base sm:text-lg"
            >
              <span className="flex items-center justify-center">
                <Play className="mr-2" size={18} />
                {t.home.hero.secondaryCta}
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* 统计数据 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {[
            { number: '100+', label: '文化景点' },
            { number: '50+', label: '精品路线' },
            { number: '1000+', label: '满意游客' },
            { number: '24/7', label: '在线服务' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-white/60"
        >
          <span className="text-xs mb-1">{t.common.readMore}</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* 底部过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-heritage-paper to-transparent z-[2]" />
    </section>
  )
}
