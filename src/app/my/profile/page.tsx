'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import {
  User, Mail, Phone, Camera, Lock, Bell, Shield, HelpCircle, ChevronRight, LogOut, Check
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { language } = useLanguage()
  const { user, isLoading, logout, updateProfile } = useAuth()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    } else if (user) {
      setFormData({
        name: user.name,
        phone: user.phone || '',
      })
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    )
  }

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const menuItems = [
    { icon: Bell, label: { zh: '消息通知', en: 'Notifications' }, href: '#' },
    { icon: Shield, label: { zh: '账号安全', en: 'Account Security' }, href: '#' },
    { icon: Lock, label: { zh: '隐私设置', en: 'Privacy Settings' }, href: '#' },
    { icon: HelpCircle, label: { zh: '帮助中心', en: 'Help Center' }, href: '#' },
  ]

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* 头像区域 */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-500 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <h1 className="text-white text-2xl font-bold mt-4">{user.name}</h1>
            <p className="text-white/80 text-sm">{user.email}</p>
          </motion.div>
        </div>
      </section>

      {/* 个人信息 */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-heritage-ink">
                {language === 'zh' ? '个人信息' : 'Personal Info'}
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-primary-500 text-sm font-medium hover:underline"
                >
                  {language === 'zh' ? '编辑' : 'Edit'}
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({ name: user.name, phone: user.phone || '' })
                    }}
                    className="text-gray-500 text-sm font-medium hover:underline"
                  >
                    {language === 'zh' ? '取消' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleSave}
                    className="text-primary-500 text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    {saved ? (
                      <>
                        <Check className="w-4 h-4" />
                        {language === 'zh' ? '已保存' : 'Saved'}
                      </>
                    ) : (
                      language === 'zh' ? '保存' : 'Save'
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="divide-y divide-gray-100">
              {/* 头像 */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{language === 'zh' ? '头像' : 'Avatar'}</span>
                </div>
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              </div>

              {/* 昵称 */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{language === 'zh' ? '昵称' : 'Name'}</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-right px-3 py-1 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
                  />
                ) : (
                  <span className="text-heritage-ink">{user.name}</span>
                )}
              </div>

              {/* 邮箱 */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{language === 'zh' ? '邮箱' : 'Email'}</span>
                </div>
                <span className="text-heritage-ink">{user.email}</span>
              </div>

              {/* 手机 */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{language === 'zh' ? '手机' : 'Phone'}</span>
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={language === 'zh' ? '请输入手机号' : 'Enter phone number'}
                    className="text-right px-3 py-1 border border-gray-200 rounded-lg focus:border-primary-500 outline-none"
                  />
                ) : (
                  <span className="text-heritage-ink">{user.phone || (language === 'zh' ? '未设置' : 'Not set')}</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 设置菜单 */}
      <section className="py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <item.icon className="w-5 h-5 text-gray-400" />
                <span className="flex-1 text-heritage-ink">{item.label[language]}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 退出登录 */}
      <section className="py-4 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleLogout}
            className="w-full py-4 bg-white rounded-2xl shadow-sm text-red-500 font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            {language === 'zh' ? '退出登录' : 'Log Out'}
          </motion.button>
        </div>
      </section>
    </div>
  )
}
