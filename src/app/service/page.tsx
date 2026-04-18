'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { GuidesSection } from '@/components/sections/GuidesSection'
import { Check, Users, Languages, Clock, Phone, Mail, Calendar, MessageCircle } from 'lucide-react'
import { useState } from 'react'

const services = [
  { zh: '专业导游全程陪同', en: 'Professional guide throughout' },
  { zh: '中英双语无障碍沟通', en: 'Chinese-English bilingual support' },
  { zh: '本地深度体验', en: 'Local immersive experiences' },
  { zh: '灵活定制行程', en: 'Flexible custom itineraries' },
  { zh: '24小时在线客服', en: '24/7 online customer service' },
  { zh: '专业文化讲解', en: 'Professional cultural interpretation' },
]

const pricingPlans = [
  {
    name: { zh: '半天服务', en: 'Half Day' },
    duration: '4 hours',
    price: '¥599',
    features: [
      { zh: '4小时陪同服务', en: '4-hour accompanying service' },
      { zh: '中英双语翻译', en: 'Chinese-English translation' },
      { zh: '景点专业讲解', en: 'Professional site interpretation' },
      { zh: '行程规划建议', en: 'Itinerary planning advice' },
    ],
    popular: false,
  },
  {
    name: { zh: '全天服务', en: 'Full Day' },
    duration: '8 hours',
    price: '¥999',
    features: [
      { zh: '8小时陪同服务', en: '8-hour accompanying service' },
      { zh: '中英双语翻译', en: 'Chinese-English translation' },
      { zh: '景点专业讲解', en: 'Professional site interpretation' },
      { zh: '行程规划建议', en: 'Itinerary planning advice' },
      { zh: '午餐推荐', en: 'Lunch recommendations' },
      { zh: '交通协助', en: 'Transportation assistance' },
    ],
    popular: true,
  },
  {
    name: { zh: '定制套餐', en: 'Custom Package' },
    duration: 'Flexible',
    price: 'Contact',
    features: [
      { zh: '灵活时间安排', en: 'Flexible scheduling' },
      { zh: '多语种服务', en: 'Multi-language support' },
      { zh: '专属行程定制', en: 'Personalized itinerary' },
      { zh: 'VIP级别服务', en: 'VIP-level service' },
      { zh: '特殊需求满足', en: 'Special requirements fulfilled' },
    ],
    popular: false,
  },
]

const faqs = [
  {
    question: { zh: '如何预约陪游服务？', en: 'How to book a guide service?' },
    answer: {
      zh: '您可以通过网站预约表单、微信公众号或电话进行预约。我们会在24小时内与您确认预约信息。',
      en: 'You can book through our website form, WeChat account, or phone. We will confirm your booking within 24 hours.',
    },
  },
  {
    question: { zh: '可以指定导游吗？', en: 'Can I request a specific guide?' },
    answer: {
      zh: '可以。在预约表单中注明您希望指定的导游，我们会尽量安排。如遇档期冲突，我们会推荐同等资质的导游。',
      en: 'Yes. Please specify your preferred guide in the booking form. We will try our best to arrange. If unavailable, we will recommend guides with similar qualifications.',
    },
  },
  {
    question: { zh: '行程可以临时调整吗？', en: 'Can I modify the itinerary on the day?' },
    answer: {
      zh: '可以。我们的导游会根据您的意愿灵活调整行程。如需重大调整，请提前与客服沟通。',
      en: 'Yes. Our guides are flexible and can adjust based on your preferences. For major changes, please contact customer service in advance.',
    },
  },
  {
    question: { zh: '如何取消或改期？', en: 'How to cancel or reschedule?' },
    answer: {
      zh: '服务开始前48小时可免费取消或改期。48小时内取消需支付30%服务费。具体政策请参阅服务条款。',
      en: 'Free cancellation or rescheduling is available 48 hours before the service. Within 48 hours, a 30% service fee applies. Please refer to our terms for details.',
    },
  },
  {
    question: { zh: '支持哪些支付方式？', en: 'What payment methods are accepted?' },
    answer: {
      zh: '支持微信支付、支付宝、银行卡转账、信用卡等多种支付方式。境外游客可使用PayPal或国际信用卡。',
      en: 'We accept WeChat Pay, Alipay, bank transfer, credit cards, and more. International visitors can use PayPal or international credit cards.',
    },
  },
  {
    question: { zh: '除了中英文，还有其他语言服务吗？', en: 'Do you offer languages other than Chinese and English?' },
    answer: {
      zh: '是的，我们有会日语、韩语、法语、德语等语言的导游。请在预约时注明您的语言需求。',
      en: 'Yes, we have guides who speak Japanese, Korean, French, German, and more. Please specify your language requirement when booking.',
    },
  },
]

function FAQSection() {
  const { language } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-heritage-ink mb-4">
            {language === 'zh' ? '常见问题' : 'FAQ'}
          </h2>
          <p className="text-gray-600">
            {language === 'zh' ? '还有疑问？查看常见问题解答' : 'Questions? Check our FAQ'}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between"
              >
                <span className="font-medium text-heritage-ink">{faq.question[language]}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  className="text-gray-400"
                >
                  ▼
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-4 text-gray-600">{faq.answer[language]}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ServicePage() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    location: '',
    people: '1',
    requirements: '',
    language: 'chinese-english',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 处理表单提交
    console.log('Form submitted:', formData)
    alert(language === 'zh' ? '预约已提交，我们会尽快与您联系！' : 'Booking submitted, we will contact you soon!')
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero区域 */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-20"
               style={{ backgroundImage: `url('https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=1200')` }} />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-heritage-ink mb-4">
              {t.service.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.service.subtitle}
            </p>
          </motion.div>

          {/* 服务特色 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                  <Check className="w-5 h-5 text-primary-500" />
                </div>
                <span className="text-gray-700">{service[language]}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 价格套餐 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-heritage-ink mb-4">
              {t.service.price.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative bg-white rounded-2xl p-8 shadow-lg ${
                  plan.popular ? 'ring-2 ring-primary-500' : 'border border-gray-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                    {language === 'zh' ? '最受欢迎' : 'Most Popular'}
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-heritage-ink mb-2">{plan.name[language]}</h3>
                  <p className="text-gray-500">{plan.duration}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary-500">{plan.price}</span>
                    {plan.price !== 'Contact' && (
                      <span className="text-gray-500 ml-2">{language === 'zh' ? '/次' : '/session'}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <Check className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                      {feature[language]}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-gray-100 text-heritage-ink hover:bg-gray-200'
                  }`}
                >
                  {t.common.bookNow}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 预约表单 */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-heritage-ink mb-4">
              {language === 'zh' ? '在线预约' : 'Online Booking'}
            </h2>
            <p className="text-gray-600">
              {language === 'zh' ? '请填写以下信息，我们会尽快与您确认' : 'Please fill in the form below, we will confirm with you soon'}
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
              {/* 姓名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.form.name} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

              {/* 服务日期 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'zh' ? '服务日期' : 'Service Date'} *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              {/* 服务时段 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'zh' ? '服务时段' : 'Service Time'}
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                >
                  <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                  <option value="morning">{language === 'zh' ? '上午 (9:00-12:00)' : 'Morning (9:00-12:00)'}</option>
                  <option value="afternoon">{language === 'zh' ? '下午 (14:00-18:00)' : 'Afternoon (14:00-18:00)'}</option>
                  <option value="fullday">{language === 'zh' ? '全天' : 'Full Day'}</option>
                </select>
              </div>

              {/* 人数 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'zh' ? '人数' : 'Number of People'}
                </label>
                <select
                  value={formData.people}
                  onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                >
                  {[1, 2, 3, 4, 5, '6+'].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {/* 语言需求 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.common.language}
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                >
                  <option value="chinese-english">{language === 'zh' ? '中英双语' : 'Chinese-English'}</option>
                  <option value="chinese">{language === 'zh' ? '仅中文' : 'Chinese Only'}</option>
                  <option value="english">{language === 'zh' ? '仅英文' : 'English Only'}</option>
                </select>
              </div>

              {/* 需求描述 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'zh' ? '需求描述' : 'Requirements'}
                </label>
                <textarea
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder={language === 'zh' ? '请描述您的具体需求...' : 'Please describe your specific requirements...'}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
            >
              {t.common.bookNow}
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* 导游团队 */}
      <GuidesSection />

      {/* FAQ */}
      <FAQSection />
    </div>
  )
}
