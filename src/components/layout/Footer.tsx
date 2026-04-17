'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook } from 'lucide-react'

const quickLinks = [
  { key: 'home', href: '/' },
  { key: 'culture', href: '/culture' },
  { key: 'routes', href: '/routes' },
  { key: 'service', href: '/service' },
  { key: 'shop', href: '/shop' },
  { key: 'cooperation', href: '/cooperation' },
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
]

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative bg-heritage-ink text-white overflow-hidden">
      {/* 装饰性背景 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 主内容 */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* 品牌介绍 */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ee7510" />
                        <stop offset="50%" stopColor="#d946ef" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                    <circle cx="24" cy="24" r="22" stroke="url(#footerLogoGradient)" strokeWidth="2" fill="none" />
                    <path d="M24 8 L32 20 L28 20 L28 32 L20 32 L20 20 L16 20 Z" fill="url(#footerLogoGradient)" />
                    <circle cx="24" cy="38" r="2" fill="url(#footerLogoGradient)" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif">{t.home.hero.title}</h3>
                  <p className="text-xs text-gray-400 tracking-wider">LINGFENG YIYOU</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {t.footer.aboutText}
              </p>

              {/* 社交链接 */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 快速链接 */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                {t.footer.quickLinks}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary-500 transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all" />
                      {t.nav[link.key as keyof typeof t.nav]}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* 联系方式 */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2" />
                {t.footer.contactUs}
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-400">
                  <MapPin size={18} className="text-primary-500 mt-1 flex-shrink-0" />
                  <span>{t.contact.info.address}</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Mail size={18} className="text-secondary-500 flex-shrink-0" />
                  <a href={`mailto:${t.contact.info.email}`} className="hover:text-white transition-colors">
                    {t.contact.info.email}
                  </a>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Phone size={18} className="text-accent-500 flex-shrink-0" />
                  <a href={`tel:${t.contact.info.phone}`} className="hover:text-white transition-colors">
                    {t.contact.info.phone}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>{t.footer.copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
