'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Star, Languages, Award, Heart } from 'lucide-react'

const guides = [
  {
    id: 1,
    name: { zh: '陈雅婷', en: 'Yating Chen' },
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300',
    title: { zh: '资深导游 | 广府文化专家', en: 'Senior Guide | Cantonese Culture Expert' },
    languages: ['中文', 'English', '粤语'],
    experience: 8,
    rating: 4.9,
    reviews: 256,
    specialties: { zh: ['广府文化', '粤剧艺术', '美食探店'], en: ['Cantonese Culture', 'Cantonese Opera', 'Food Tours'] },
    bio: {
      zh: '土生土长的广州人，对广府文化有深入研究。擅长带领游客探索老城区的历史故事，品尝地道美食。',
      en: 'Born and raised in Guangzhou, with deep knowledge of Cantonese culture. Expert at leading visitors through historic neighborhoods and authentic food experiences.',
    },
  },
  {
    id: 2,
    name: { zh: '李伟明', en: 'Weiming Li' },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300',
    title: { zh: '金牌导游 | 潮汕文化大使', en: 'Gold Medal Guide | Chaoshan Culture Ambassador' },
    languages: ['中文', 'English', '潮汕话'],
    experience: 12,
    rating: 5.0,
    reviews: 189,
    specialties: { zh: ['潮汕美食', '工夫茶道', '古建筑'], en: ['Chaoshan Cuisine', 'Kung Fu Tea', 'Ancient Architecture'] },
    bio: {
      zh: '潮州本地人，传承家族工夫茶技艺。多年导游经验，对潮汕历史文化如数家珍。',
      en: 'Chaozhou native with inherited Kung Fu tea skills. Years of guiding experience with encyclopedic knowledge of Chaoshan history.',
    },
  },
  {
    id: 3,
    name: { zh: 'Sarah Johnson', en: 'Sarah Johnson' },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300',
    title: { zh: '双语导游 | 客家文化研究者', en: 'Bilingual Guide | Hakka Culture Researcher' },
    languages: ['English', '中文', 'Hakka'],
    experience: 6,
    rating: 4.8,
    reviews: 142,
    specialties: { zh: ['客家文化', '侨乡历史', '英语讲解'], en: ['Hakka Culture', 'Overseas Chinese History', 'English Tours'] },
    bio: {
      zh: '来自美国，在中国生活10年。热爱客家文化，对侨乡历史有独特见解，英文讲解生动有趣。',
      en: 'From the USA, living in China for 10 years. Passionate about Hakka culture with unique insights into overseas Chinese heritage.',
    },
  },
  {
    id: 4,
    name: { zh: '黄志豪', en: 'Zhihao Huang' },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
    title: { zh: '专业导游 | 非遗传承人', en: 'Professional Guide | Intangible Heritage Inheritor' },
    languages: ['中文', 'English', '日语'],
    experience: 10,
    rating: 4.9,
    reviews: 312,
    specialties: { zh: ['醒狮表演', '粤剧脸谱', '非遗体验'], en: ['Lion Dance', 'Cantonese Opera Masks', 'Heritage Experiences'] },
    bio: {
      zh: '醒狮传人，精通多种非遗技艺。带领游客亲身体验岭南传统文化，深受好评。',
      en: 'Lion dance inheritor with mastery of multiple intangible heritage arts. Leads immersive cultural experiences.',
    },
  },
]

export function GuidesSection() {
  const { language } = useLanguage()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-heritage-ink mb-4">
            {language === 'zh' ? '专业导游团队' : 'Our Expert Guides'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'zh'
              ? '精选资深导游，专业认证，多语种服务'
              : 'Expert certified guides with multilingual services'}
          </p>
        </motion.div>

        {/* 导游卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-100/50 border border-gray-100 group"
            >
              <div className="flex">
                {/* 头像 */}
                <div className="relative w-48 flex-shrink-0">
                  <img
                    src={guide.avatar}
                    alt={guide.name[language]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* 评分 */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                      <span className="text-sm font-semibold text-heritage-ink">{guide.rating}</span>
                    </div>
                    <span className="text-xs text-white">{guide.reviews} {language === 'zh' ? '评价' : 'reviews'}</span>
                  </div>
                </div>

                {/* 内容 */}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-heritage-ink mb-1">
                    {guide.name[language]}
                  </h3>
                  <p className="text-sm text-primary-500 mb-3">{guide.title[language]}</p>

                  {/* 语言能力 */}
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Languages className="w-4 h-4 mr-2 text-secondary-500" />
                    {guide.languages.join(' · ')}
                  </div>

                  {/* 经验 */}
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Award className="w-4 h-4 mr-2 text-amber-500" />
                    {guide.experience} {language === 'zh' ? '年导游经验' : 'years experience'}
                  </div>

                  {/* 专业领域 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.specialties[language].map((specialty, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* 简介 */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {guide.bio[language]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 查看更多 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 mb-4">
            {language === 'zh' ? '所有导游均经过专业培训和认证' : 'All guides are professionally trained and certified'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
