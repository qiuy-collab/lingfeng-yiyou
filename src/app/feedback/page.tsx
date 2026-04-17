'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { MessageSquare, Send, ThumbsUp, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function FeedbackPage() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    type: '',
    content: '',
    followUp: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Feedback submitted:', formData)
    setSubmitted(true)
  }

  const feedbackTypes = t.feedback.types

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-heritage-ink mb-4">
            {language === 'zh' ? '感谢您的反馈！' : 'Thank you for your feedback!'}
          </h2>
          <p className="text-gray-600 mb-8">
            {language === 'zh'
              ? '您的意见对我们非常重要，我们会认真处理您的反馈。'
              : 'Your opinion is very important to us, we will take your feedback seriously.'}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSubmitted(false)
              setFormData({ name: '', contact: '', type: '', content: '', followUp: false })
            }}
            className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 transition-colors"
          >
            {language === 'zh' ? '返回' : 'Go Back'}
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero区域 */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/10 via-transparent to-accent-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-heritage-ink mb-4">
              {t.feedback.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.feedback.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 反馈表单 */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="space-y-6">
              {/* 姓名/昵称 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.feedback.form.name} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 outline-none transition-all"
                  placeholder={language === 'zh' ? '请输入您的姓名或昵称' : 'Enter your name or nickname'}
                />
              </div>

              {/* 联系方式 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.feedback.form.contact}
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 outline-none transition-all"
                  placeholder={language === 'zh' ? '手机号或邮箱（选填）' : 'Phone or email (optional)'}
                />
              </div>

              {/* 反馈类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.feedback.form.type} *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 outline-none transition-all"
                >
                  <option value="">{language === 'zh' ? '请选择反馈类型' : 'Select feedback type'}</option>
                  {feedbackTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* 反馈内容 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.feedback.form.content} *
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder={language === 'zh' ? '请详细描述您的反馈意见...' : 'Please describe your feedback in detail...'}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20 outline-none transition-all resize-none"
                />
              </div>

              {/* 是否愿意回访 */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="followUp"
                  checked={formData.followUp}
                  onChange={(e) => setFormData({ ...formData, followUp: e.target.checked })}
                  className="w-5 h-5 text-secondary-500 border-gray-300 rounded focus:ring-secondary-500"
                />
                <label htmlFor="followUp" className="ml-3 text-gray-700 flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-2 text-secondary-500" />
                  {t.feedback.form.followUp}
                </label>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold rounded-xl shadow-lg shadow-secondary-500/30 hover:shadow-secondary-500/50 transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>{t.feedback.form.submit}</span>
            </motion.button>
          </motion.form>

          {/* 帮助提示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 bg-secondary-50 rounded-2xl border border-secondary-100"
          >
            <h4 className="font-semibold text-heritage-ink mb-2">
              {language === 'zh' ? '需要即时帮助？' : 'Need immediate help?'}
            </h4>
            <p className="text-gray-600 text-sm">
              {language === 'zh'
                ? '如果您有紧急问题，请直接联系我们的客服团队，我们将尽快为您解答。'
                : 'If you have urgent questions, please contact our support team directly.'}
            </p>
            <a
              href="/contact"
              className="inline-block mt-4 text-secondary-500 font-medium hover:text-secondary-600 transition-colors"
            >
              {language === 'zh' ? '联系客服 →' : 'Contact Support →'}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
