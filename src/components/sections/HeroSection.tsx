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

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景 */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        {/* 主背景图 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=2070')`,
          }}
        />
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-heritage-ink/60 via-heritage-ink/40 to-heritage-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-transparent to-secondary-900/30" />
      </motion.div>

      {/* 装饰性图案 */}
      <div className="absolute inset-0 z-[1] opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* 岭南传统纹样 */}
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={i}
              cx={20 + i * 15}
              cy={50 + Math.sin(i) * 20}
              r={10 + i * 2}
              fill="none"
              stroke="white"
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.3 }}
            />
          ))}
        </svg>
      </div>

      {/* 主内容 */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* 标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8"
        >
          <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse" />
          {t.home.hero.subtitle}
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-serif text-white mb-6 leading-tight"
        >
          <span className="block">{t.home.hero.title}</span>
          <motion.span
            className="block text-gradient mt-2"
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
          className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {t.home.hero.description}
        </motion.p>

        {/* CTA 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/routes">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full overflow-hidden shadow-lg shadow-primary-500/30"
            >
              <span className="relative z-10 flex items-center">
                {t.home.hero.cta}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </Link>

          <Link href="/culture">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all"
            >
              <span className="flex items-center">
                <Play className="mr-2" size={20} />
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
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
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
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-white/60"
        >
          <span className="text-xs mb-2">{t.common.readMore}</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>

      {/* 装饰性元素 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-heritage-paper to-transparent z-[2]" />
    </section>
  )
}
