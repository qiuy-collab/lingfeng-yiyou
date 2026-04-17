'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Clock, MapPin, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

const routes = [
  {
    id: 1,
    title: { zh: '广州历史文化深度游', en: 'Guangzhou History & Culture Deep Dive' },
    duration: { zh: '3天2夜', en: '3 Days 2 Nights' },
    location: { zh: '广州', en: 'Guangzhou' },
    price: '¥1,999',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=800',
    highlights: { zh: ['陈家祠', '沙面', '广州塔'], en: ['Chen Clan Academy', 'Shamian Island', 'Canton Tower'] },
  },
  {
    id: 2,
    title: { zh: '潮汕美食文化之旅', en: 'Chaoshan Culinary Adventure' },
    duration: { zh: '4天3夜', en: '4 Days 3 Nights' },
    location: { zh: '潮州·汕头', en: 'Chaozhou · Shantou' },
    price: '¥2,599',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800',
    highlights: { zh: ['潮州古城', '牛肉火锅', '工夫茶'], en: ['Chaozhou Old Town', 'Beef Hotpot', 'Kung Fu Tea'] },
  },
  {
    id: 3,
    title: { zh: '梅州客家文化寻根游', en: 'Meizhou Hakka Heritage Tour' },
    duration: { zh: '2天1夜', en: '2 Days 1 Night' },
    location: { zh: '梅州', en: 'Meizhou' },
    price: '¥1,299',
    rating: 4.7,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800',
    highlights: { zh: ['客家围龙屋', '雁南飞茶园', '叶剑英故居'], en: ['Hakka Tulou', 'Yan Nan Fei Tea Garden', 'Ye Jianying Memorial'] },
  },
]

export function RoutesSection() {
  const { t, language } = useLanguage()

  return (
    <section className="py-24 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-50/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-heritage-ink mb-4">
              {t.home.routes.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              {t.home.routes.subtitle}
            </p>
          </div>
          <Link href="/routes">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 md:mt-0 inline-flex items-center text-primary-500 font-semibold hover:text-primary-600 transition-colors"
            >
              {t.common.viewAll}
              <ArrowRight className="ml-1" size={20} />
            </motion.button>
          </Link>
        </motion.div>

        {/* 路线卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-100/50 border border-gray-100"
            >
              {/* 图片区域 */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={route.image}
                  alt={route.title[language]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* 遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-ink/60 via-transparent to-transparent" />

                {/* 评分标签 */}
                <div className="absolute top-4 right-4 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="ml-1 text-sm font-semibold text-heritage-ink">{route.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({route.reviews})</span>
                </div>

                {/* 价格标签 */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-2xl font-bold text-white">{route.price}</span>
                  <span className="text-sm text-white/80 ml-1">起</span>
                </div>
              </div>

              {/* 内容区域 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-heritage-ink mb-3 group-hover:text-primary-500 transition-colors">
                  {route.title[language]}
                </h3>

                {/* 信息行 */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-primary-500" />
                    {route.duration[language]}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-secondary-500" />
                    {route.location[language]}
                  </div>
                </div>

                {/* 亮点标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {route.highlights[language].map((highlight, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* 按钮 */}
                <Link href={`/routes/${route.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-400 hover:to-primary-500 transition-all shadow-lg shadow-primary-500/20"
                  >
                    {t.common.bookNow}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
