'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import { Calendar, MapPin, Clock, Users, Star, Filter, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Booking {
  id: string
  routeId: string
  routeName: { zh: string; en: string }
  cover: string
  date: string
  duration: { zh: string; en: string }
  location: { zh: string; en: string }
  travelers: number
  status: 'upcoming' | 'completed' | 'cancelled'
  total: number
  guideName?: string
  createdAt: string
}

const mockBookings: Booking[] = [
  {
    id: 'B001',
    routeId: '1',
    routeName: { zh: '广州历史文化深度游', en: 'Guangzhou History Tour' },
    cover: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=400',
    date: '2024-02-20',
    duration: { zh: '3天2夜', en: '3 Days 2 Nights' },
    location: { zh: '广州', en: 'Guangzhou' },
    travelers: 2,
    status: 'upcoming',
    total: 3998,
    guideName: '陈雅婷',
    createdAt: '2024-01-10',
  },
  {
    id: 'B002',
    routeId: '2',
    routeName: { zh: '潮汕美食文化之旅', en: 'Chaoshan Culinary Tour' },
    cover: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=400',
    date: '2024-01-15',
    duration: { zh: '4天3夜', en: '4 Days 3 Nights' },
    location: { zh: '潮州·汕头', en: 'Chaozhou · Shantou' },
    travelers: 3,
    status: 'completed',
    total: 7797,
    guideName: '林志伟',
    createdAt: '2024-01-05',
  },
  {
    id: 'B003',
    routeId: '1',
    routeName: { zh: '广州历史文化深度游', en: 'Guangzhou History Tour' },
    cover: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=400',
    date: '2024-03-10',
    duration: { zh: '3天2夜', en: '3 Days 2 Nights' },
    location: { zh: '广州', en: 'Guangzhou' },
    travelers: 4,
    status: 'cancelled',
    total: 7996,
    createdAt: '2024-02-01',
  },
]

const statusConfig = {
  upcoming: { bg: 'bg-blue-100', text: 'text-blue-600', label: { zh: '待出行', en: 'Upcoming' } },
  completed: { bg: 'bg-green-100', text: 'text-green-600', label: { zh: '已完成', en: 'Completed' } },
  cancelled: { bg: 'bg-gray-100', text: 'text-gray-600', label: { zh: '已取消', en: 'Cancelled' } },
}

export default function BookingsPage() {
  const { language } = useLanguage()
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    )
  }

  const filteredBookings = mockBookings.filter(
    (b) => activeFilter === 'all' || b.status === activeFilter
  )

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* 头部 */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-heritage-ink">
                {language === 'zh' ? '我的预约' : 'My Bookings'}
              </h1>
              <p className="text-gray-500 mt-1">
                {language === 'zh' ? `共 ${mockBookings.length} 条预约记录` : `${mockBookings.length} total bookings`}
              </p>
            </div>
            <Link
              href="/routes"
              className="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors"
            >
              {language === 'zh' ? '预约新行程' : 'Book New Trip'}
            </Link>
          </div>

          {/* 筛选标签 */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'all'
                  ? language === 'zh'
                    ? '全部'
                    : 'All'
                  : statusConfig[filter].label[language]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 预约列表 */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* 图片 */}
                      <div
                        className="w-full sm:w-48 h-40 sm:h-auto bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url('${booking.cover}')` }}
                      />

                      {/* 内容 */}
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-heritage-ink text-lg">
                              {booking.routeName[language]}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {language === 'zh' ? '预约编号：' : 'Booking ID: '}
                              {booking.id}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              statusConfig[booking.status].bg
                            } ${statusConfig[booking.status].text}`}
                          >
                            {statusConfig[booking.status].label[language]}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {booking.duration[language]}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {booking.location[language]}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            {booking.travelers} {language === 'zh' ? '人' : 'travelers'}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div>
                            <span className="text-gray-500 text-sm">
                              {language === 'zh' ? '总价：' : 'Total: '}
                            </span>
                            <span className="text-xl font-bold text-primary-500">
                              ¥{booking.total.toLocaleString()}
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="flex items-center gap-1 text-primary-500 font-medium hover:text-primary-600 transition-colors"
                          >
                            {language === 'zh' ? '查看详情' : 'View Details'}
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  {language === 'zh' ? '暂无预约记录' : 'No bookings yet'}
                </p>
                <Link
                  href="/routes"
                  className="inline-block mt-4 px-6 py-2 bg-primary-500 text-white rounded-full font-medium"
                >
                  {language === 'zh' ? '立即预约' : 'Book Now'}
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto"
            >
              {/* 头部 */}
              <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-heritage-ink">
                  {language === 'zh' ? '预约详情' : 'Booking Details'}
                </h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 内容 */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url('${selectedBooking.cover}')` }}
                  />
                  <div>
                    <h3 className="font-bold text-heritage-ink">
                      {selectedBooking.routeName[language]}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {language === 'zh' ? '预约编号：' : 'Booking ID: '}
                      {selectedBooking.id}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">{language === 'zh' ? '出行日期' : 'Travel Date'}</span>
                    <span className="font-medium">{selectedBooking.date}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">{language === 'zh' ? '行程时长' : 'Duration'}</span>
                    <span className="font-medium">{selectedBooking.duration[language]}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">{language === 'zh' ? '目的地' : 'Destination'}</span>
                    <span className="font-medium">{selectedBooking.location[language]}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">{language === 'zh' ? '出行人数' : 'Travelers'}</span>
                    <span className="font-medium">
                      {selectedBooking.travelers} {language === 'zh' ? '人' : 'persons'}
                    </span>
                  </div>
                  {selectedBooking.guideName && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">{language === 'zh' ? '导游' : 'Guide'}</span>
                      <span className="font-medium">{selectedBooking.guideName}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">{language === 'zh' ? '预订时间' : 'Booked At'}</span>
                    <span className="font-medium">{selectedBooking.createdAt}</span>
                  </div>
                  <div className="flex justify-between py-3 bg-gray-50 -mx-3 px-3 rounded-lg">
                    <span className="text-gray-700 font-medium">{language === 'zh' ? '订单总额' : 'Total'}</span>
                    <span className="text-xl font-bold text-primary-500">
                      ¥{selectedBooking.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 flex gap-3">
                {selectedBooking.status === 'upcoming' && (
                  <>
                    <button className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                      {language === 'zh' ? '取消预约' : 'Cancel'}
                    </button>
                    <button className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
                      {language === 'zh' ? '联系客服' : 'Contact Support'}
                    </button>
                  </>
                )}
                {selectedBooking.status === 'completed' && (
                  <button className="w-full py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    {language === 'zh' ? '评价行程' : 'Rate Trip'}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
