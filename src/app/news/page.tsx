'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Calendar, ArrowRight, Search, Filter } from 'lucide-react'
import { useState } from 'react'

const allNews = [
  {
    id: 1,
    title: { zh: '2024岭南文化旅游节盛大开幕', en: '2024 Lingnan Cultural Tourism Festival Grand Opening' },
    excerpt: { zh: '为期一个月的文化旅游节将呈现广府、潮汕、客家三大文化特色活动，包括非遗展演、美食节、民俗体验等精彩内容。市民和游客可在广州、潮州、梅州等地参与特色活动。', en: 'The month-long festival will showcase Cantonese, Chaoshan, and Hakka cultural activities, including intangible heritage performances, food festivals, and folk experiences. Citizens and tourists can participate in various events across Guangzhou, Chaozhou, and Meizhou.' },
    date: '2024-12-15',
    category: { zh: '活动', en: 'Event' },
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=600',
    content: { zh: '2024岭南文化旅游节于12月15日在广州海心沙隆重开幕...', en: 'The 2024 Lingnan Cultural Tourism Festival grandly opened on December 15 at Haixinsha, Guangzhou...' },
  },
  {
    id: 2,
    title: { zh: '广州塔灯光秀跨年演出指南', en: 'Canton Tower Light Show New Year Performance Guide' },
    excerpt: { zh: '跨年夜广州塔将上演震撼灯光秀，最佳观赏点与交通攻略全解析。届时将有无人机表演和烟花汇演。', en: 'Stunning light show at Canton Tower on New Year\'s Eve, with comprehensive guide to best viewing spots and transportation. Drone performances and fireworks display are scheduled.' },
    date: '2024-12-20',
    category: { zh: '攻略', en: 'Guide' },
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600',
  },
  {
    id: 3,
    title: { zh: '潮汕工夫茶入选非遗十周年特展', en: 'Chaoshan Kung Fu Tea Intangible Heritage 10th Anniversary Exhibition' },
    excerpt: { zh: '回顾工夫茶文化传承十年历程，体验传统茶艺，品味千年茶道精髓。展览将在潮州古城举办。', en: 'Reviewing ten years of Kung Fu tea heritage preservation, experiencing traditional tea ceremony, and savoring the essence of millennial tea culture. The exhibition will be held in Chaozhou Ancient City.' },
    date: '2024-12-10',
    category: { zh: '文化', en: 'Culture' },
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=600',
  },
  {
    id: 4,
    title: { zh: '春节假期广东热门景点预约攻略', en: 'Spring Festival Holiday Guangdong Attraction Booking Guide' },
    excerpt: { zh: '春节黄金周热门景点预约指南，避开人流高峰的小众景点推荐，让您的假期旅行更加舒适。', en: 'Spring Festival golden week attraction booking tips, hidden gems recommendations to avoid crowds, making your holiday trip more comfortable.' },
    date: '2024-12-25',
    category: { zh: '攻略', en: 'Guide' },
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=600',
  },
  {
    id: 5,
    title: { zh: '广东美食地图：不可错过的十大地道小吃', en: 'Guangdong Food Map: Top 10 Must-Try Local Snacks' },
    excerpt: { zh: '从广州早茶到潮汕牛肉火锅，从客家盐焗鸡到顺德双皮奶，带你探寻广东舌尖上的美味。', en: 'From Guangzhou morning tea to Chaoshan beef hotpot, from Hakka salt-baked chicken to Shunde double-skin milk, exploring the delicious flavors of Guangdong.' },
    date: '2024-12-08',
    category: { zh: '美食', en: 'Food' },
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600',
  },
  {
    id: 6,
    title: { zh: '梅州客家围龙屋高铁专列开通', en: 'Meizhou Hakka Tulou High-Speed Train Line Opens' },
    excerpt: { zh: '广州至梅州高铁新线路开通，2小时直达客家文化腹地，探秘世界遗产围龙屋群。', en: 'New high-speed train line from Guangzhou to Meizhou opens, 2-hour direct access to the heartland of Hakka culture, exploring the World Heritage Tulou clusters.' },
    date: '2024-12-05',
    category: { zh: '交通', en: 'Transport' },
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600',
  },
]

const categories = [
  { key: 'all', label: { zh: '全部', en: 'All' } },
  { key: 'Event', label: { zh: '活动', en: 'Event' } },
  { key: 'Guide', label: { zh: '攻略', en: 'Guide' } },
  { key: 'Culture', label: { zh: '文化', en: 'Culture' } },
  { key: 'Food', label: { zh: '美食', en: 'Food' } },
  { key: 'Transport', label: { zh: '交通', en: 'Transport' } },
]

export default function NewsPage() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNews = allNews.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category.en === activeCategory
    const matchesSearch = item.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen pt-20">
      {/* Hero区域 */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/10 via-transparent to-accent-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-heritage-ink mb-4">
              {language === 'zh' ? '新闻活动' : 'News & Events'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'zh'
                ? '了解最新文旅资讯，把握精彩活动动态'
                : 'Stay updated with the latest tourism news and exciting events'}
            </p>
          </motion.div>

          {/* 搜索和分类 */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={language === 'zh' ? '搜索新闻...' : 'Search news...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (
                <motion.button
                  key={cat.key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    activeCategory === cat.key
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label[language]}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 新闻列表 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-100/50 border border-gray-100 cursor-pointer"
              >
                {/* 图片 */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title[language]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                    {item.category[language]}
                  </div>
                </div>

                {/* 内容 */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-heritage-ink mb-3 line-clamp-2 group-hover:text-primary-500 transition-colors">
                    {item.title[language]}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {item.excerpt[language]}
                  </p>
                  <div className="flex items-center text-primary-500 text-sm font-medium">
                    <span>{language === 'zh' ? '阅读更多' : 'Read More'}</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                {language === 'zh' ? '暂无相关新闻' : 'No news found'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
