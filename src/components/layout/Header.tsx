'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import { useCartStore } from '@/store/useCartStore'
import { Menu, X, Globe, User, ShoppingCart, LogOut, ChevronDown } from 'lucide-react'

const navItems = [
  { key: 'home', href: '/' },
  { key: 'culture', href: '/culture' },
  { key: 'routes', href: '/routes' },
  { key: 'service', href: '/service' },
  { key: 'shop', href: '/shop' },
  { key: 'cooperation', href: '/cooperation' },
]

export function Header() {
  const { language, t, toggleLanguage } = useLanguage()
  const { user, logout } = useAuth()
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              className="relative w-12 h-12"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo SVG - 岭南风格图案 */}
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ee7510" />
                    <stop offset="50%" stopColor="#d946ef" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
                <circle cx="24" cy="24" r="22" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
                <path
                  d="M24 8 L32 20 L28 20 L28 32 L20 32 L20 20 L16 20 Z"
                  fill="url(#logoGradient)"
                  className="group-hover:scale-105 transition-transform origin-center"
                />
                <circle cx="24" cy="38" r="2" fill="url(#logoGradient)" />
              </svg>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-serif tracking-wider text-heritage-ink">
                {t.home.hero.title}
              </span>
              <span className="text-xs tracking-widest text-primary-500">
                LINGFENG YIYOU
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors group text-heritage-ink hover:text-primary-500"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}

            {/* 语言切换 */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              onClick={toggleLanguage}
              className="ml-2 flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white"
            >
              <Globe size={16} className="mr-1.5" />
              {language === 'zh' ? 'EN' : '中文'}
            </motion.button>

            {/* 购物车 */}
            <Link href="/my/cart">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* 用户状态 */}
            {user ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-primary-200"
                  />
                </button>

                {/* 用户下拉菜单 */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-heritage-ink">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/my"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          {language === 'zh' ? '个人中心' : 'My Account'}
                        </Link>
                        <Link
                          href="/my/bookings"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {language === 'zh' ? '我的预约' : 'My Bookings'}
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          {language === 'zh' ? '退出登录' : 'Log Out'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-2 px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  {language === 'zh' ? '登录' : 'Login'}
                </motion.button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors text-heritage-ink"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-heritage-ink hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-all"
                  >
                    {t.nav[item.key as keyof typeof t.nav]}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-4 border-t border-gray-100"
              >
                {/* 用户状态（移动端） */}
                {user ? (
                  <>
                    <Link
                      href="/my"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center w-full px-4 py-3 text-heritage-ink hover:bg-gray-50 rounded-lg transition-all"
                    >
                      <img
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      {user.name}
                    </Link>
                    <Link
                      href="/my/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center w-full px-4 py-3 text-heritage-ink hover:bg-gray-50 rounded-lg transition-all"
                    >
                      <ShoppingCart size={20} className="mr-2" />
                      {language === 'zh' ? '购物车' : 'Cart'}
                      {getTotalItems() > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          {getTotalItems()}
                        </span>
                      )}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <LogOut size={20} className="mr-2" />
                      {language === 'zh' ? '退出登录' : 'Log Out'}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center w-full px-4 py-3 text-primary-500 hover:bg-primary-50 rounded-lg transition-all"
                  >
                    <User size={20} className="mr-2" />
                    {language === 'zh' ? '登录 / 注册' : 'Login / Register'}
                  </Link>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.05 }}
                className="pt-2"
              >
                <button
                  onClick={toggleLanguage}
                  className="flex items-center w-full px-4 py-3 text-primary-500 hover:bg-primary-50 rounded-lg transition-all"
                >
                  <Globe size={20} className="mr-2" />
                  {language === 'zh' ? 'Switch to English' : '切换到中文'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
