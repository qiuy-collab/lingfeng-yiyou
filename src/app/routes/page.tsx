'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Clock, MapPin, Star, Filter, Search } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const routesData = [
  {
    id: 1,
    title: { zh: '广州历史文化深度游', en: 'Guangzhou History & Culture Deep Dive' },
    description: { zh: '探索千年商都的历史文化底蕴，感受岭南建筑之美。', en: 'Explore the historical and cultural heritage of the millennium commercial capital.' },
    duration: { zh: '3天2夜', en: '3 Days 2 Nights' },
    location: { zh: '广州', en: 'Guangzhou' },
    price: '¥1,999',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=800',
    theme: 'culture',
    highlights: { zh: ['陈家祠', '沙面', '广州塔', '北京路'], en: ['Chen Clan Academy', 'Shamian Island', 'Canton Tower', 'Beijing Road'] },
  },
  {
    id: 2,
    title: { zh: '潮汕美食文化之旅', en: 'Chaoshan Culinary Adventure' },
    description: { zh: '品味地道潮汕美食，体验工夫茶道，感受潮汕文化。', en: 'Taste authentic Chaoshan cuisine, experience Kung Fu tea ceremony.' },
    duration: { zh: '4天3夜', en: '4 Days 3 Nights' },
    location: { zh: '潮州·汕头', en: 'Chaozhou · Shantou' },
    price: '¥2,599',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800',
    theme: 'food',
    highlights: { zh: ['潮州古城', '牛肉火锅', '工夫茶', '南澳岛'], en: ['Chaozhou Old Town', 'Beef Hotpot', 'Kung Fu Tea', 'Nanao Island'] },
  },
  {
    id: 3,
    title: { zh: '梅州客家文化寻根游', en: 'Meizhou Hakka Heritage Tour' },
    description: { zh: '探访客家围龙屋，聆听客家山歌，品味客家美食。', en: 'Visit Hakka Tulou, listen to Hakka folk songs, taste Hakka cuisine.' },
    duration: { zh: '2天1夜', en: '2 Days 1 Night' },
    location: { zh: '梅州', en: 'Meizhou' },
    price: '¥1,299',
    rating: 4.7,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800',
    theme: 'heritage',
    highlights: { zh: ['客家围龙屋', '雁南飞茶园', '叶剑英故居'], en: ['Hakka Tulou', 'Yan Nan Fei Tea Garden', 'Ye Jianying Memorial'] },
  },
  {
    id: 4,
    title: { zh: '珠海澳门跨境游', en: 'Zhuhai-Macau Cross-border Tour' },
    description: { zh: '感受珠澳两地风情，体验中西文化交融。', en: 'Experience the blend of Chinese and Western cultures in Zhuhai and Macau.' },
    duration: { zh: '2天1夜', en: '2 Days 1 Night' },
    location: { zh: '珠海·澳门', en: 'Zhuhai · Macau' },
    price: '¥1,899',
    rating: 4.6,
    reviews: 72,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800',
    theme: 'culture',
    highlights: { zh: ['渔女雕像', '澳门历史城区', '威尼斯人'], en: ['Fisherman\'s Daughter Statue', 'Macau Historic Center', 'Venetian'] },
  },
  {
    id: 5,
    title: { zh: '佛山功夫文化之旅', en: 'Foshan Kung Fu Culture Tour' },
    description: { zh: '探索佛山武术发源地，感受岭南功夫文化。', en: 'Explore the birthplace of Foshan martial arts, experience Lingnan Kung Fu culture.' },
    duration: { zh: '1天', en: '1 Day' },
    location: { zh: '佛山', en: 'Foshan' },
    price: '¥699',
    rating: 4.8,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=800',
    theme: 'culture',
    highlights: { zh: ['祖庙', '黄飞鸿纪念馆', '叶问堂'], en: ['Ancestral Temple', 'Huang Feihong Memorial', 'Ip Man Hall'] },
  },
  {
    id: 6,
    title: { zh: '韶关丹霞山生态游', en: 'Shaoguan Danxia Mountain Eco Tour' },
    description: { zh: '探索世界自然遗产丹霞地貌，感受大自然鬼斧神工。', en: 'Explore the World Natural Heritage Danxia landform.' },
    duration: { zh: '2天1夜', en: '2 Days 1 Night' },
    location: { zh: '韶关', en: 'Shaoguan' },
    price: '¥1,199',
    rating: 4.9,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800',
    theme: 'nature',
    highlights: { zh: ['丹霞山', '南华寺', '珠玑巷'], en: ['Danxia Mountain', 'Nanhua Temple', 'Zhujixiang'] },
  },
]

const themeMap = {
  culture: { zh: '文化深度游', en: 'Cultural Deep Dive' },
  food: { zh: '美食探秘游', en: 'Culinary Adventure' },
  heritage: { zh: '侨乡寻根游', en: 'Overseas Chinese Heritage' },
  nature: { zh: '自然生态游', en: 'Nature & Ecology' },
}

export default function RoutesPage() {
  const { t, language } = useLanguage()
  const [activeTheme, setActiveTheme] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRoutes = routesData.filter(route => {
    const matchesTheme = activeTheme === 'all' || route.theme === activeTheme
    const matchesSearch = route.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          route.location[language].toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTheme && matchesSearch
  })

  return (
    <div className="min-h-screen pt-20">
      {/* Hero区域 */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-heritage-ink mb-4">
              {t.routes.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.routes.subtitle}
            </p>
          </motion.div>

          {/* 搜索和筛选 */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* 搜索框 */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={language === 'zh' ? '搜索目的地或路线...' : 'Search destinations or routes...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />
            </div>

            {/* 筛选标签 */}
            <div className="flex flex-wrap gap-2 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTheme('all')}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeTheme === 'all'
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {language === 'zh' ? '全部' : 'All'}
              </motion.button>
              {Object.entries(themeMap).map(([key, label]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTheme(key)}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    activeTheme === key
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {label[language]}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 路线列表 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoutes.map((route, index) => (
              <Link key={route.id} href={`/routes/${route.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-100/50 border border-gray-100 cursor-pointer"
                >
                {/* 图片区域 */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.title[language]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-heritage-ink/60 via-transparent to-transparent" />

                  {/* 主题标签 */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-heritage-ink">
                      {themeMap[route.theme as keyof typeof themeMap][language]}
                    </span>
                  </div>

                  {/* 评分 */}
                  <div className="absolute top-4 right-4 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="ml-1 text-sm font-semibold text-heritage-ink">{route.rating}</span>
                  </div>

                  {/* 价格 */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-2xl font-bold text-white">{route.price}</span>
                    <span className="text-sm text-white/80 ml-1">{language === 'zh' ? '起' : 'from'}</span>
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-heritage-ink mb-2 group-hover:text-primary-500 transition-colors">
                    {route.title[language]}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {route.description[language]}
                  </p>

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
                    {route.highlights[language].slice(0, 3).map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* 按钮 */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-400 hover:to-primary-500 transition-all shadow-lg shadow-primary-500/20"
                  >
                    {language === 'zh' ? '查看详情' : 'View Details'}
                  </motion.button>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {filteredRoutes.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t.common.noData}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
