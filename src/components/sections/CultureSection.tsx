'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const cultureImages = [
  {
    key: 'guangfu',
    image: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=800',
    color: 'from-orange-500/80',
  },
  {
    key: 'chaoshan',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800',
    color: 'from-teal-500/80',
  },
  {
    key: 'hakka',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800',
    color: 'from-purple-500/80',
  },
  {
    key: 'heritage',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800',
    color: 'from-rose-500/80',
  },
  {
    key: 'food',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800',
    color: 'from-amber-500/80',
  },
]

export function CultureSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-heritage-ink relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white mb-4">
            {t.home.culture.title}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.home.culture.subtitle}
          </p>
        </motion.div>

        {/* 文化卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.home.culture.categories.map((category, index) => {
            const imageConfig = cultureImages.find(img => img.key === category.key)
            const isLarge = index === 0 || index === 2

            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  isLarge ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
                style={{ aspectRatio: isLarge ? '4/3' : '1/1' }}
              >
                {/* 背景图 */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${imageConfig?.image}')` }}
                />

                {/* 遮罩 */}
                <div className={`absolute inset-0 bg-gradient-to-t ${imageConfig?.color} to-transparent`} />

                {/* 内容 */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t.culture.categories[category.key as keyof typeof t.culture.categories]?.description}
                    </p>
                    <div className="flex items-center text-white mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">{t.common.readMore}</span>
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </div>

                {/* 边框装饰 */}
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/30 transition-colors" />
              </motion.div>
            )
          })}
        </div>

        {/* 查看更多按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/culture">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all inline-flex items-center"
            >
              {t.common.viewAll}
              <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
