'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Check, Users, Target, TrendingUp, Handshake, Send } from 'lucide-react'
import { useState } from 'react'

const benefits = [
  {
    zh: '精准触达目标客群',
    en: 'Reach target audience precisely',
    icon: Target,
  },
  {
    zh: '中英双语展示',
    en: 'Chinese-English bilingual display',
    icon: Users,
  },
  {
    zh: '多渠道推广',
    en: 'Multi-channel promotion',
    icon: TrendingUp,
  },
  {
    zh: '专业运营支持',
    en: 'Professional operation support',
    icon: Handshake,
  },
]

const cooperationTypes = [
  {
    id: 'ad',
    name: { zh: '广告投放', en: 'Advertising' },
    description: { zh: '在平台首页、内容页、路线页等位置投放广告', en: 'Place ads on homepage, content pages, route pages, etc.' },
  },
  {
    id: 'content',
    name: { zh: '内容合作', en: 'Content Partnership' },
    description: { zh: '共同创作文旅内容，景区/酒店推广专题', en: 'Co-create tourism content, scenic spot/hotel promotion specials' },
  },
  {
    id: 'product',
    name: { zh: '商品入驻', en: 'Product Listing' },
    description: { zh: '将您的文创产品上架到我们的商城', en: 'List your creative products in our shop' },
  },
  {
    id: 'route',
    name: { zh: '路线推广', en: 'Route Promotion' },
    description: { zh: '推荐您的旅游路线到平台精选路线', en: 'Promote your travel routes on our featured routes' },
  },
]

export default function CooperationPage() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    type: '',
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(language === 'zh' ? '合作申请已提交，我们会尽快与您联系！' : 'Application submitted, we will contact you soon!')
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero区域 */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-heritage-ink via-heritage-ink/95 to-heritage-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-transparent to-secondary-500/20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-6">
              {t.cooperation.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t.cooperation.subtitle}
            </p>

            {/* 合作优势 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white font-medium">{benefit[language]}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 合作类型 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-heritage-ink mb-4">
              {language === 'zh' ? '合作方式' : 'Cooperation Types'}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {language === 'zh' ? '我们提供多种合作方式，满足不同需求' : 'We offer various cooperation types to meet different needs'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cooperationTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 group cursor-pointer"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-heritage-ink mb-2">
                  {type.name[language]}
                </h3>
                <p className="text-gray-600 text-sm">
                  {type.description[language]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 申请表单 */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-heritage-ink mb-4">
              {language === 'zh' ? '合作申请' : 'Partnership Application'}
            </h2>
            <p className="text-gray-600">
              {language === 'zh' ? '请填写以下信息，我们的商务团队会尽快与您联系' : 'Please fill in the form below, our business team will contact you soon'}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 公司/品牌名 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'zh' ? '公司/品牌名称' : 'Company/Brand Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              {/* 联系人 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'zh' ? '联系人' : 'Contact Person'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              {/* 邮箱 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.form.email} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              {/* 电话 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.form.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              {/* 合作类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'zh' ? '合作类型' : 'Cooperation Type'} *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                >
                  <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                  {cooperationTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name[language]}</option>
                  ))}
                </select>
              </div>

              {/* 合作描述 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'zh' ? '合作意向描述' : 'Cooperation Description'}
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={language === 'zh' ? '请描述您的合作意向...' : 'Please describe your cooperation intention...'}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>{language === 'zh' ? '提交申请' : 'Submit Application'}</span>
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  )
}
