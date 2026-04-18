'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Compass, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-heritage-paper relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      {/* 岭南风格装饰 */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {[...Array(10)].map((_, i) => (
          <motion.circle
            key={i}
            cx={10 + i * 10}
            cy={20 + (i % 3) * 30}
            r={5}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        ))}
      </svg>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        {/* 404 标题 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[200px] md:text-[280px] font-bold font-serif leading-none text-gradient">
            404
          </h1>
        </motion.div>

        {/* 岭南风格插画 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <svg
            viewBox="0 0 200 100"
            className="w-48 h-24 mx-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="notFoundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ee7510" />
                <stop offset="50%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
            {/* 镬耳屋轮廓 */}
            <path
              d="M20 80 L20 50 Q30 30 40 50 L40 80"
              stroke="url(#notFoundGradient)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M50 80 L50 50 Q60 30 70 50 L70 80"
              stroke="url(#notFoundGradient)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M80 80 L80 50 Q90 30 100 50 L100 80"
              stroke="url(#notFoundGradient)"
              strokeWidth="3"
              fill="none"
            />
            {/* 门 */}
            <rect x="55" y="60" width="20" height="25" stroke="url(#notFoundGradient)" strokeWidth="2" />
            {/* 窗户 */}
            <rect x="25" y="55" width="10" height="10" stroke="url(#notFoundGradient)" strokeWidth="2" />
            <rect x="85" y="55" width="10" height="10" stroke="url(#notFoundGradient)" strokeWidth="2" />
            {/* 文字 */}
            <text x="130" y="65" className="text-sm font-serif" fill="url(#notFoundGradient)">
              迷路了
            </text>
          </svg>
        </motion.div>

        {/* 提示文字 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-heritage-ink mb-4">
            哎呀，迷失在岭南巷子里了
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            您寻找的页面似乎已经消失在历史长河中。不如让我们带您回到正轨，继续探索岭南文化之美。
          </p>
        </motion.div>

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full shadow-lg shadow-primary-500/30 flex items-center"
            >
              <Home className="w-5 h-5 mr-2" />
              返回首页
            </motion.button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white text-heritage-ink font-semibold rounded-full border-2 border-gray-200 hover:border-primary-500 hover:text-primary-500 transition-colors flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回上页
          </button>

          <Link href="/routes">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-heritage-ink font-semibold rounded-full border border-heritage-ink/20 hover:border-primary-500 transition-colors flex items-center"
            >
              <Compass className="w-5 h-5 mr-2" />
              探索路线
            </motion.button>
          </Link>
        </motion.div>

        {/* 推荐链接 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">或者探索这些热门内容：</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: '广府文化', href: '/culture' },
              { name: '陪游服务', href: '/service' },
              { name: '文创商城', href: '/shop' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
