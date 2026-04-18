'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Clock, MapPin, Users, Star, Check, X, ChevronRight, Phone, Mail, Calendar } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { RouteMap } from '@/components/ui/RouteMap'

const routeData = {
  1: {
    title: { zh: '广州历史文化深度游', en: 'Guangzhou History & Culture Deep Dive' },
    cover: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=1920',
    duration: { zh: '3天2夜', en: '3 Days 2 Nights' },
    location: { zh: '广州', en: 'Guangzhou' },
    price: 1999,
    rating: 4.9,
    reviews: 128,
    highlights: { zh: '探索千年商都，感受岭南建筑之美，品尝地道粤菜', en: 'Explore the millennium-old commercial capital, experience Lingnan architecture, taste authentic Cantonese cuisine' },
    itinerary: [
      {
        day: 1,
        title: { zh: '西关风情·老广州记忆', en: 'Xiguan Style · Old Guangzhou Memories' },
        spots: [
          { name: { zh: '陈家祠', en: 'Chen Clan Academy' }, time: '09:00-11:00', desc: { zh: '岭南建筑瑰宝，精美的木雕、石雕、砖雕艺术', en: 'Gem of Lingnan architecture with exquisite wood, stone, and brick carvings' } },
          { name: { zh: '沙面岛', en: 'Shamian Island' }, time: '14:00-16:00', desc: { zh: '欧式建筑群，中西文化交融的历史见证', en: 'European architecture complex, witness of East-West cultural fusion' } },
          { name: { zh: '上下九步行街', en: 'Shangxiajiu Pedestrian Street' }, time: '16:30-19:00', desc: { zh: '老广州商业街，品尝传统小吃', en: 'Historic commercial street for traditional snacks' } },
        ],
      },
      {
        day: 2,
        title: { zh: '现代广州·活力都市', en: 'Modern Guangzhou · Vibrant City' },
        spots: [
          { name: { zh: '广州塔', en: 'Canton Tower' }, time: '09:00-11:30', desc: { zh: '登顶小蛮腰，俯瞰珠江两岸美景', en: 'Ascend the tower for panoramic views of the Pearl River' } },
          { name: { zh: '珠江新城', en: 'Zhujiang New Town' }, time: '14:00-16:00', desc: { zh: 'CBD核心区，现代都市风光', en: 'Core CBD area with modern cityscapes' } },
          { name: { zh: '珠江夜游', en: 'Pearl River Night Cruise' }, time: '19:00-21:00', desc: { zh: '乘船游览珠江，欣赏两岸夜景', en: 'Boat cruise along the Pearl River with stunning night views' } },
        ],
      },
      {
        day: 3,
        title: { zh: '文化寻根·岭南精粹', en: 'Cultural Roots · Essence of Lingnan' },
        spots: [
          { name: { zh: '西汉南越王博物馆', en: 'Museum of the Nanyue King' }, time: '09:00-11:30', desc: { zh: '探索两千年前南越国历史', en: 'Explore the history of Nanyue Kingdom from 2000 years ago' } },
          { name: { zh: '北京路步行街', en: 'Beijing Road Pedestrian Street' }, time: '14:00-17:00', desc: { zh: '千年古道遗址，购物美食一条街', en: 'Ancient road ruins with shopping and dining options' } },
        ],
      },
    ],
    includes: {
      zh: ['专业导游全程陪同', '景点门票', '当地交通', '2晚四星酒店住宿', '每日早餐', '行程规划'],
      en: ['Professional guide throughout', 'Attraction tickets', 'Local transportation', '2 nights 4-star hotel', 'Daily breakfast', 'Itinerary planning'],
    },
    excludes: {
      zh: ['往返大交通', '个人消费', '午餐晚餐'],
      en: ['Round-trip transportation', 'Personal expenses', 'Lunch and dinner'],
    },
  },
  2: {
    title: { zh: '潮汕美食文化之旅', en: 'Chaoshan Culinary Adventure' },
    cover: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1920',
    duration: { zh: '4天3夜', en: '4 Days 3 Nights' },
    location: { zh: '潮州·汕头', en: 'Chaozhou · Shantou' },
    price: 2599,
    rating: 4.8,
    reviews: 89,
    highlights: { zh: '品尝正宗潮汕美食，体验工夫茶文化，探索潮州古城', en: 'Taste authentic Chaoshan cuisine, experience Kung Fu tea culture, explore Chaozhou ancient town' },
    itinerary: [
      {
        day: 1,
        title: { zh: '抵达汕头·海滨风情', en: 'Arrival in Shantou · Coastal Charm' },
        spots: [
          { name: { zh: '汕头小公园', en: 'Shantou Small Park' }, time: '14:00-16:00', desc: { zh: '民国建筑群，感受老汕头风情', en: 'Republican-era architecture complex' } },
          { name: { zh: '牛肉火锅', en: 'Beef Hotpot Dinner' }, time: '18:00-20:00', desc: { zh: '正宗潮汕牛肉火锅，鲜嫩多汁', en: 'Authentic Chaoshan beef hotpot' } },
        ],
      },
      {
        day: 2,
        title: { zh: '潮州古城·千年文化', en: 'Chaozhou Ancient Town · Millennium Culture' },
        spots: [
          { name: { zh: '广济桥', en: 'Guangji Bridge' }, time: '09:00-10:30', desc: { zh: '中国四大古桥之一，启闭式浮桥奇观', en: 'One of China\'s four ancient bridges' } },
          { name: { zh: '潮州古城', en: 'Chaozhou Ancient Town' }, time: '10:30-12:00', desc: { zh: '保存完好的古城风貌', en: 'Well-preserved ancient town' } },
          { name: { zh: '工夫茶体验', en: 'Kung Fu Tea Experience' }, time: '15:00-17:00', desc: { zh: '学习潮汕工夫茶冲泡技艺', en: 'Learn Chaoshan Kung Fu tea brewing' } },
        ],
      },
      {
        day: 3,
        title: { zh: '南澳岛·海岛风光', en: 'Nanao Island · Island Scenery' },
        spots: [
          { name: { zh: '南澳大桥', en: 'Nanao Bridge' }, time: '09:00-10:00', desc: { zh: '跨海大桥壮丽景色', en: 'Magnificent cross-sea bridge views' } },
          { name: { zh: '青澳湾', en: 'Qingao Bay' }, time: '10:30-16:00', desc: { zh: '清澈海水，金色沙滩', en: 'Crystal clear water, golden beach' } },
        ],
      },
      {
        day: 4,
        title: { zh: '返程·满载而归', en: 'Departure · Full of Memories' },
        spots: [
          { name: { zh: '潮汕特产采购', en: 'Local Products Shopping' }, time: '09:00-11:00', desc: { zh: '牛肉丸、单丛茶等特产', en: 'Beef balls, Dancong tea, and more' } },
        ],
      },
    ],
    includes: {
      zh: ['专业导游全程陪同', '景点门票', '当地交通', '3晚四星酒店住宿', '每日早餐', '牛肉火锅盛宴'],
      en: ['Professional guide throughout', 'Attraction tickets', 'Local transportation', '3 nights 4-star hotel', 'Daily breakfast', 'Beef hotpot feast'],
    },
    excludes: {
      zh: ['往返大交通', '个人消费', '部分餐食'],
      en: ['Round-trip transportation', 'Personal expenses', 'Some meals'],
    },
  },
}

export default function RouteDetailPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage()
  const [selectedDay, setSelectedDay] = useState(1)
  const routeId = parseInt(params.id) as 1 | 2
  const route = routeData[routeId] || routeData[1]

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
                {route.itinerary.map((day, index) => (
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
