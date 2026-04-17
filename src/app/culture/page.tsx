'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { ArrowRight, BookOpen, Music, UtensilsCrossed, Building2, Palette } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const cultureData = {
  guangfu: {
    image: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=600',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=600',
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600',
    ],
    highlights: {
      zh: ['粤剧艺术', '岭南建筑', '广绣工艺', '广州塔', '沙面风情'],
      en: ['Cantonese Opera', 'Lingnan Architecture', 'Guangzhou Embroidery', 'Canton Tower', 'Shamian Island'],
    },
  },
  chaoshan: {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=600',
    ],
    highlights: {
      zh: ['工夫茶道', '潮州木雕', '潮剧表演', '古城区', '潮汕美食'],
      en: ['Kung Fu Tea', 'Chaozhou Woodcarving', 'Teochew Opera', 'Ancient Town', 'Chaoshan Cuisine'],
    },
  },
  hakka: {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600',
      'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=600',
    ],
    highlights: {
      zh: ['客家围龙屋', '客家山歌', '客家美食', '梅州茶田', '侨乡文化'],
      en: ['Hakka Tulou', 'Hakka Folk Songs', 'Hakka Cuisine', 'Meizhou Tea Fields', 'Overseas Chinese Heritage'],
    },
  },
  heritage: {
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600',
      'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=600',
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=600',
    ],
    highlights: {
      zh: ['粤剧', '醒狮', '广彩瓷', '岭南剪纸', '广东音乐'],
      en: ['Cantonese Opera', 'Lion Dance', 'Canton Porcelain', 'Lingnan Paper Cutting', 'Guangdong Music'],
    },
  },
  food: {
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=600',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=600',
    ],
    highlights: {
      zh: ['粤菜', '早茶文化', '潮汕牛肉火锅', '广式点心', '煲仔饭'],
      en: ['Cantonese Cuisine', 'Dim Sum Culture', 'Chaoshan Beef Hotpot', 'Cantonese Pastries', 'Clay Pot Rice'],
    },
  },
}

const iconMap = {
  guangfu: Building2,
  chaoshan: Music,
  hakka: BookOpen,
  heritage: Palette,
  food: UtensilsCrossed,
}

export default function CulturePage() {
  const { t, language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>('guangfu')

  const categories = t.home.culture.categories

  return (
    <div className="min-h-screen pt-20">
      {/* Hero区域 */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${cultureData[activeCategory as keyof typeof cultureData]?.image}')` }}
          />
          <div className="absolute inset-0 bg-heritage-ink/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-heritage-paper via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-4"
          >
            {t.culture.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80"
          >
            {t.culture.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 分类选择器 */}
      <section className="sticky top-20 z-20 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-thin py-4 gap-2">
            {categories.map((category) => {
              const Icon = iconMap[category.key as keyof typeof iconMap]
              const isActive = activeCategory === category.key
              return (
                <motion.button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5 mr-2" />}
                  {category.name}
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 内容区域 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: activeCategory === category.key ? 1 : 0,
                y: activeCategory === category.key ? 0 : 30,
                display: activeCategory === category.key ? 'block' : 'none'
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* 左侧：图片画廊 */}
                <div className="space-y-4">
                  <motion.div
                    key={category.key}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="aspect-[4/3] rounded-2xl overflow-hidden"
                  >
                    <img
                      src={cultureData[category.key as keyof typeof cultureData]?.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="grid grid-cols-3 gap-4">
                    {cultureData[category.key as keyof typeof cultureData]?.gallery.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 右侧：描述和亮点 */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold font-serif text-heritage-ink mb-6">
                    {t.culture.categories[category.key as keyof typeof t.culture.categories]?.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {t.culture.categories[category.key as keyof typeof t.culture.categories]?.description}
                  </p>

                  {/* 亮点标签 */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      {language === 'zh' ? '精选亮点' : 'Highlights'}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {cultureData[category.key as keyof typeof cultureData]?.highlights[language].map((highlight, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium hover:bg-primary-100 transition-colors cursor-default"
                        >
                          {highlight}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href={`/routes?category=${category.key}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary inline-flex items-center"
                    >
                      {t.common.readMore}
                      <ArrowRight className="ml-2" size={20} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
