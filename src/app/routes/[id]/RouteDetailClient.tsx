'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Clock, MapPin, Star, Check, X, ChevronRight, Phone } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { RouteMap } from '@/components/ui/RouteMap'

interface RouteData {
  title: { zh: string; en: string }
  cover: string
  duration: { zh: string; en: string }
  location: { zh: string; en: string }
  price: number
  rating: number
  reviews: number
  highlights: { zh: string; en: string }
  itinerary: Array<{
    day: number
    title: { zh: string; en: string }
    spots: Array<{
      name: { zh: string; en: string }
      time: string
      desc: { zh: string; en: string }
    }>
  }>
  includes: { zh: string[]; en: string[] }
  excludes: { zh: string[]; en: string[] }
}

export default function RouteDetailClient({ route }: { route: RouteData }) {
  const { language } = useLanguage()
  const [selectedDay, setSelectedDay] = useState(1)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img src={route.cover} alt={route.title[language]} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-heritage-ink via-heritage-ink/50 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">
                {route.title[language]}
              </h1>
              <p className="text-white/80 text-lg mb-6 max-w-2xl">{route.highlights[language]}</p>

              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary-400" />
                  {route.duration[language]}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-secondary-400" />
                  {route.location[language]}
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-amber-400 fill-amber-400" />
                  {route.rating} ({route.reviews} {language === 'zh' ? '评价' : 'reviews'})
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 价格标签 */}
        <div className="absolute top-24 right-8 bg-white rounded-2xl p-6 shadow-xl">
          <div className="text-center">
            <span className="text-4xl font-bold text-primary-500">¥{route.price}</span>
            <span className="text-gray-500 ml-1">{language === 'zh' ? '起/人' : 'from/person'}</span>
          </div>
          <Link href="/service">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl"
            >
              {language === 'zh' ? '立即预约' : 'Book Now'}
            </motion.button>
          </Link>
        </div>
      </section>

      {/* 地图可视化 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-serif text-heritage-ink mb-6">
            {language === 'zh' ? '路线地图' : 'Route Map'}
          </h2>
          <RouteMap
            spots={route.itinerary.flatMap(day => day.spots)}
            title={route.title}
          />
        </div>
      </section>

      {/* 行程安排 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* 天数选择 */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold font-serif text-heritage-ink mb-6">
                {language === 'zh' ? '行程安排' : 'Itinerary'}
              </h2>
              <div className="space-y-4">
                {route.itinerary.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedDay === day.day
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {language === 'zh' ? `第${day.day}天` : `Day ${day.day}`}
                      </span>
                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        selectedDay === day.day ? 'rotate-90' : ''
                      }`} />
                    </div>
                    <p className={`text-sm mt-1 ${selectedDay === day.day ? 'text-white/80' : 'text-gray-500'}`}>
                      {day.title[language]}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 景点详情 */}
            <div className="lg:col-span-2">
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {route.itinerary
                  .find(d => d.day === selectedDay)
                  ?.spots.map((spot, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-sm text-primary-500 font-medium">{spot.time}</span>
                          <h3 className="text-xl font-bold text-heritage-ink mt-1">{spot.name[language]}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600">{spot.desc[language]}</p>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 包含/不包含 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 费用包含 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-heritage-ink mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-secondary-500" />
                </span>
                {language === 'zh' ? '费用包含' : 'Included'}
              </h3>
              <ul className="space-y-3">
                {route.includes[language].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <Check className="w-4 h-4 text-secondary-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 费用不含 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-heritage-ink mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <X className="w-4 h-4 text-red-500" />
                </span>
                {language === 'zh' ? '费用不含' : 'Not Included'}
              </h3>
              <ul className="space-y-3">
                {route.excludes[language].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <X className="w-4 h-4 text-red-400 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-heritage-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-6">
            {language === 'zh' ? '准备好开启旅程了吗？' : 'Ready to Start Your Journey?'}
          </h2>
          <p className="text-white/80 mb-8">
            {language === 'zh'
              ? '立即预约，专业导游带您探索岭南之美'
              : 'Book now and let our expert guides show you the beauty of Lingnan'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/service">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full shadow-lg"
              >
                {language === 'zh' ? '立即预约' : 'Book Now'}
              </motion.button>
            </Link>
            <a href="tel:+8613800138000">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/30"
              >
                <Phone className="w-5 h-5 inline mr-2" />
                {language === 'zh' ? '电话咨询' : 'Call Us'}
              </motion.button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
