'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: { zh: '张明', en: 'Michael Zhang' },
    location: { zh: '美国加州', en: 'California, USA' },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    rating: 5,
    content: {
      zh: '陪游服务太棒了！导游不仅专业，还带我去了很多只有本地人才知道的小众景点。强烈推荐给想来广东旅游的外国朋友。',
      en: 'The guide service was amazing! Our guide was professional and took us to hidden gems only locals know about. Highly recommend to anyone visiting Guangdong.',
    },
    date: '2024-03',
  },
  {
    id: 2,
    name: { zh: 'Emma Watson', en: 'Emma Watson' },
    location: { zh: '英国伦敦', en: 'London, UK' },
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    rating: 5,
    content: {
      zh: '潮汕美食之旅让我终生难忘！牛肉火锅的鲜美、工夫茶的韵味，还有导游生动的讲解，让我深深爱上了岭南文化。',
      en: 'The Chaoshan food tour was unforgettable! The fresh beef hotpot, Kung Fu tea ceremony, and the guide\'s vivid explanations made me fall in love with Lingnan culture.',
    },
    date: '2024-02',
  },
  {
    id: 3,
    name: { zh: '李佳琪', en: 'Jiaqi Li' },
    location: { zh: '新加坡', en: 'Singapore' },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150',
    rating: 5,
    content: {
      zh: '作为华裔，这次寻根之旅让我重新认识了自己的文化根源。客家围龙屋、祖先的故事，让我感动落泪。感谢岭风译游！',
      en: 'As a Chinese descendant, this heritage tour helped me reconnect with my roots. The Hakka Tulou and ancestral stories moved me to tears. Thank you Lingfeng Yiyou!',
    },
    date: '2024-01',
  },
  {
    id: 4,
    name: { zh: '佐藤健', en: 'Ken Sato' },
    location: { zh: '日本东京', en: 'Tokyo, Japan' },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150',
    rating: 4,
    content: {
      zh: '广府文化深度游览非常精彩！陈家祠的雕刻艺术让我惊叹，导游的中英日三语服务很贴心。下次还要来！',
      en: 'The Cantonese culture tour was wonderful! The wood carvings at Chen Clan Academy were breathtaking. The trilingual guide service was very thoughtful. Will come again!',
    },
    date: '2024-01',
  },
]

export function TestimonialsSection() {
  const { language } = useLanguage()

  return (
    <section className="py-20 bg-heritage-ink relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
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
            {language === 'zh' ? '游客真实评价' : 'What Our Guests Say'}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {language === 'zh'
              ? '听听世界各地游客的真实体验分享'
              : 'Real experiences from travelers around the world'}
          </p>
        </motion.div>

        {/* 评价卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors"
            >
              {/* 头部 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name[language]}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name[language]}</h4>
                    <p className="text-sm text-gray-400">{testimonial.location[language]}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 内容 */}
              <div className="relative">
                <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary-500/30" />
                <p className="text-gray-300 leading-relaxed pl-6">
                  {testimonial.content[language]}
                </p>
              </div>

              {/* 日期 */}
              <p className="text-xs text-gray-500 mt-4">{testimonial.date}</p>
            </motion.div>
          ))}
        </div>

        {/* 统计数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '98%', label: { zh: '好评率', en: 'Satisfaction Rate' } },
            { number: '50+', label: { zh: '国家和地区', en: 'Countries & Regions' } },
            { number: '1000+', label: { zh: '服务游客', en: 'Happy Travelers' } },
            { number: '4.9', label: { zh: '平均评分', en: 'Average Rating' } },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label[language]}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
