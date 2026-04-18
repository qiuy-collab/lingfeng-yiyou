'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Landmark, Map, Languages, Gift, ArrowRight } from 'lucide-react'

const iconMap = {
  temple: Landmark,
  map: Map,
  translate: Languages,
  gift: Gift,
}

export function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-heritage-ink mb-4">
            <span className="text-gradient">{t.home.features.title}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.home.features.subtitle}
          </p>
        </motion.div>

        {/* 功能卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.home.features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100 overflow-hidden"
              >
                {/* 悬停背景光效 */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 transition-all duration-500" />

                {/* 图标 */}
                <div className="relative mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30"
                  >
                    <Icon size={28} />
                  </motion.div>
                </div>

                {/* 内容 */}
                <h3 className="text-xl font-bold text-heritage-ink mb-2 group-hover:text-primary-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* 悬停箭头 */}
                <div className="mt-4 flex items-center text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">了解更多</span>
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* 装饰角 */}
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
