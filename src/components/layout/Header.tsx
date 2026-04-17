'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'

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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
          : 'bg-transparent'
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
              <span className={`text-xl font-bold font-serif tracking-wider ${
                isScrolled ? 'text-heritage-ink' : 'text-white'
              }`}>
                {t.home.hero.title}
              </span>
              <span className={`text-xs tracking-widest ${
                isScrolled ? 'text-primary-500' : 'text-white/80'
              }`}>
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
                  className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
                    isScrolled
                      ? 'text-heritage-ink hover:text-primary-500'
                      : 'text-white/90 hover:text-white'
                  }`}
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
              className={`ml-4 flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isScrolled
                  ? 'bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Globe size={16} className="mr-1.5" />
              {language === 'zh' ? 'EN' : '中文'}
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-heritage-ink' : 'text-white'
            }`}
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
