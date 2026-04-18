'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const banners = [
  {
    id: 1,
    title: { zh: '探索岭南千年文化', en: 'Explore Lingnan Culture' },
    subtitle: { zh: '感受广东独特魅力，体验广府、潮汕、客家文化', en: 'Experience the charm of Guangdong, discover Cantonese, Chaoshan, Hakka culture' },
    cta: { text: { zh: '立即探索', en: 'Explore Now' }, href: '/culture' },
    image: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=1920',
  },
  {
    id: 2,
    title: { zh: '陪游口译服务', en: 'Guide & Translation Service' },
    subtitle: { zh: '专业中英双语陪同，让旅行更轻松', en: 'Professional bilingual guides for a seamless journey' },
    cta: { text: { zh: '预约服务', en: 'Book Now' }, href: '/service' },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920',
  },
  {
    id: 3,
    title: { zh: '潮汕美食之旅', en: 'Chaoshan Culinary Adventure' },
    subtitle: { zh: '品尝正宗牛肉火锅，体验工夫茶道', en: 'Taste authentic beef hotpot, experience Kung Fu tea ceremony' },
    cta: { text: { zh: '查看路线', en: 'View Routes' }, href: '/routes' },
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1920',
  },
  {
    id: 4,
    title: { zh: '岭南文创精品', en: 'Lingnan Creative Products' },
    subtitle: { zh: '广彩瓷器、粤剧脸谱、醒狮工艺品', en: 'Canton porcelain, opera masks, lion dance crafts' },
    cta: { text: { zh: '前往商城', en: 'Visit Shop' }, href: '/shop' },
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920',
  },
]

export function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { language } = useLanguage()

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const currentBanner = banners[currentIndex]

  return (
    <section
      className="relative h-[70vh] min-h-[500px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 背景图片 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={currentBanner.image}
            alt={currentBanner.title[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-heritage-ink/70 via-heritage-ink/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* 内容 */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-6 leading-tight"
            >
              {currentBanner.title[language]}
            </motion.h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              {currentBanner.subtitle[language]}
            </p>
            <Link href={currentBanner.cta.href}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
              >
                {currentBanner.cta.text[language]}
              </motion.button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 导航箭头 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

// 添加缺失的 import
import { useLanguage } from '@/components/providers/LanguageProvider'
