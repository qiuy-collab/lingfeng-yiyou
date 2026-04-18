'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const partners = [
  { name: '广州塔', logo: ' Canton Tower' },
  { name: '长隆集团', logo: 'Chimelong' },
  { name: '白天鹅宾馆', logo: 'White Swan' },
  { name: '陈家祠', logo: 'Chen Clan' },
  { name: '开平碉楼', logo: 'Kaiping' },
  { name: '丹霞山', logo: 'Danxia' },
  { name: '华侨城', logo: 'OCT' },
  { name: '岭南印象园', logo: 'Lingnan Park' },
]

export function PartnersSection() {
  const { language } = useLanguage()

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-heritage-ink mb-4">
            {language === 'zh' ? '合作伙伴' : 'Our Partners'}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {language === 'zh'
              ? '与广东顶级景区、酒店、文化机构深度合作'
              : 'Deep partnerships with top scenic spots, hotels, and cultural institutions in Guangdong'}
          </p>
        </motion.div>

        {/* Logo滚动墙 */}
        <div className="relative">
          {/* 左右渐变遮罩 */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          {/* 滚动容器 */}
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex space-x-8"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-20 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-md hover:border-primary-200 transition-all cursor-pointer"
              >
                <span className="text-lg font-semibold text-gray-400 group-hover:text-primary-500">
                  {partner.logo}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 成为合作伙伴按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/cooperation">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 border-2 border-primary-500 text-primary-500 font-semibold rounded-full hover:bg-primary-500 hover:text-white transition-all"
            >
              {language === 'zh' ? '成为合作伙伴' : 'Become a Partner'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
