'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import { useCartStore } from '@/store/useCartStore'
import {
  User, ShoppingCart, Calendar, Heart, Settings, ChevronRight, MapPin, Clock, Star, Phone, Mail
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const menuItems = [
  { icon: Calendar, label: { zh: '我的预约', en: 'My Bookings' }, href: '/my/bookings', color: 'bg-blue-500' },
  { icon: ShoppingCart, label: { zh: '我的购物车', en: 'My Cart' }, href: '/my/cart', color: 'bg-green-500' },
  { icon: Heart, label: { zh: '我的收藏', en: 'Favorites' }, href: '/my/favorites', color: 'bg-red-500' },
  { icon: Settings, label: { zh: '个人设置', en: 'Settings' }, href: '/my/profile', color: 'bg-gray-500' },
]

export default function MyPage() {
  const { language } = useLanguage()
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const getTotalItems = useCartStore((state) => state.getTotalItems)

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

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* 用户信息卡片 */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white"
          >
            <div className="flex items-center gap-4">
              {/* 头像 */}
              <div className="relative">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.name}
                  className="w-20 h-20 rounded-full border-4 border-white/30"
                />
                <Link
                  href="/my/profile"
                  className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <Settings className="w-4 h-4 text-primary-500" />
                </Link>
              </div>

              {/* 用户信息 */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
                  {user.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </span>
                  )}
                  {user.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {user.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* 会员标识 */}
              <div className="hidden sm:block">
                <div className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  {language === 'zh' ? '普通会员' : 'Member'}
                </div>
              </div>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
              <Link href="/my/bookings" className="text-center group">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-white/70 group-hover:text-white transition-colors">
                  {language === 'zh' ? '预约记录' : 'Bookings'}
                </div>
              </Link>
              <Link href="/my/cart" className="text-center group">
                <div className="text-2xl font-bold">{getTotalItems()}</div>
                <div className="text-sm text-white/70 group-hover:text-white transition-colors">
                  {language === 'zh' ? '购物车' : 'Cart'}
                </div>
              </Link>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-white/70">
                  {language === 'zh' ? '收藏' : 'Favorites'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 功能菜单 */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="flex-1 font-medium text-heritage-ink">{item.label[language]}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 最近预约 */}
      <section className="py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-heritage-ink">
                {language === 'zh' ? '最近预约' : 'Recent Bookings'}
              </h2>
              <Link href="/my/bookings" className="text-primary-500 text-sm hover:underline">
                {language === 'zh' ? '查看全部' : 'View All'}
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 flex items-center gap-4 border-b border-gray-100">
                <div
                  className="w-16 h-16 rounded-xl bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=200')"
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-heritage-ink truncate">
                    {language === 'zh' ? '广州历史文化深度游' : 'Guangzhou History Tour'}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      2024-01-15
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      广州
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                  {language === 'zh' ? '已完成' : 'Completed'}
                </div>
              </div>

              <div className="p-4 flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-xl bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=200')"
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-heritage-ink truncate">
                    {language === 'zh' ? '潮汕美食文化之旅' : 'Chaoshan Culinary Tour'}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      2024-02-20
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      潮州
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {language === 'zh' ? '待出行' : 'Upcoming'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
