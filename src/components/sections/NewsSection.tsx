'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'

const news = [
  {
    id: 1,
    title: { zh: '2024岭南文化旅游节盛大开幕', en: '2024 Lingnan Cultural Tourism Festival Grand Opening' },
    excerpt: { zh: '为期一个月的文化旅游节将呈现广府、潮汕、客家三大文化特色活动...', en: 'The month-long festival will showcase Cantonese, Chaoshan, and Hakka cultural activities...' },
    date: '2024-12-15',
    category: { zh: '活动', en: 'Event' },
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=600',
  },
  {
    id: 2,
    title: { zh: '广州塔灯光秀跨年演出指南', en: 'Canton Tower Light Show New Year Performance Guide' },
    excerpt: { zh: '跨年夜广州塔将上演震撼灯光秀，最佳观赏点与交通攻略...', en: 'Stunning light show at Canton Tower on New Year\'s Eve, best viewing spots and transportation guide...' },
    date: '2024-12-20',
    category: { zh: '攻略', en: 'Guide' },
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600',
  },
  {
    id: 3,
    title: { zh: '潮汕工夫茶入选非遗十周年特展', en: 'Chaoshan Kung Fu Tea Intangible Heritage 10th Anniversary Exhibition' },
    excerpt: { zh: '回顾工夫茶文化传承十年历程，体验传统茶艺...', en: 'Reviewing ten years of Kung Fu tea heritage, experiencing traditional tea ceremony...' },
    date: '2024-12-10',
    category: { zh: '文化', en: 'Culture' },
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=600',
  },
  {
    id: 4,
    title: { zh: '春节假期广东热门景点预约攻略', en: 'Spring Festival Holiday Guangdong Attraction Booking Guide' },
    excerpt: { zh: '春节黄金周热门景点预约指南，避开人流高峰的小众景点推荐...', en: 'Spring Festival golden week attraction booking tips, hidden gems to avoid crowds...' },
    date: '2024-12-25',
    category: { zh: '攻略', en: 'Guide' },
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=600',
  },
]

export function NewsSection() {
  const { language } = useLanguage()

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-heritage-ink mb-4">
            {language === 'zh' ? '新闻活动' : 'News & Events'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'zh'
              ? '了解最新文旅资讯，把握精彩活动动态'
              : 'Stay updated with the latest tourism news and exciting events'}
          </p>
        </motion.div>

        {/* 新闻网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-100/50 border border-gray-100 cursor-pointer"
            >
              {/* 图片 */}
              <div className="relative h-48 overflow-hidden">
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
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-bold text-heritage-ink mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                  {item.title[language]}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
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

        {/* 查看更多 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/news">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-white text-primary-500 font-semibold rounded-full border-2 border-primary-500 hover:bg-primary-50 transition-colors"
            >
              {language === 'zh' ? '查看全部新闻' : 'View All News'}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
