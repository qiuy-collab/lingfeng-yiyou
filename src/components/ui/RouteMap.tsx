'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'

interface MapSpot {
  name: { zh: string; en: string }
  desc?: { zh: string; en: string }
  lat?: number
  lng?: number
}

interface RouteMapProps {
  spots: MapSpot[]
  title?: { zh: string; en: string }
}

// 模拟地图组件（实际项目中可集成高德地图/百度地图 API）
export function RouteMap({ spots, title }: RouteMapProps) {
  const { language } = useLanguage()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeSpot, setActiveSpot] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 模拟地图加载
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden h-[400px]">
        {/* 地图占位/加载状态 */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-2 animate-bounce" />
              <p className="text-gray-500">{language === 'zh' ? '地图加载中...' : 'Loading map...'}</p>
            </div>
          </div>
        )}

        {/* 模拟地图背景 - 实际项目中替换为真实地图 */}
        <div className="absolute inset-0">
          {/* 使用渐变和纹理创建更美观的地图背景 */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 30% 40%, rgba(180, 83, 9, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(217, 119, 6, 0.05) 0%, transparent 50%),
                linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)
              `,
            }}
          />
          {/* 地图网格线 */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
              </pattern>
              <pattern id="smallGrid" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#e2e8f0" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* 模拟道路 */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <path
              d="M 0 200 Q 200 180 400 220 T 800 200"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 300 0 Q 280 150 320 300 T 300 500"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 100 0 L 150 400"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="3"
            />
            <path
              d="M 500 500 Q 600 300 550 100"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="3"
            />
          </svg>
          {/* 模拟水域 */}
          <div
            className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at bottom right, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            }}
          />
          {/* 模拟绿地 */}
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 opacity-20"
            style={{
              background: 'radial-gradient(ellipse, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-24 h-24 opacity-20"
            style={{
              background: 'radial-gradient(ellipse, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
        </div>

        {/* 路线连线 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b45309" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {spots.map((_, index) => {
            if (index === spots.length - 1) return null
            const x1 = 15 + (index * 70 / (spots.length - 1))
            const y1 = 30 + Math.sin(index * 0.8) * 15
            const x2 = 15 + ((index + 1) * 70 / (spots.length - 1))
            const y2 = 30 + Math.sin((index + 1) * 0.8) * 15
            return (
              <line
                key={index}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeDasharray="8,4"
                strokeLinecap="round"
              />
            )
          })}
        </svg>

        {/* 景点标记 */}
        {spots.map((spot, index) => {
          const x = 15 + (index * 70 / Math.max(spots.length - 1, 1))
          const y = 30 + Math.sin(index * 0.8) * 15

          return (
            <motion.button
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.5 }}
              onClick={() => setActiveSpot(activeSpot === index ? null : index)}
              className="absolute transform -translate-x-1/2 -translate-y-full"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className={`
                relative flex flex-col items-center
                ${activeSpot === index ? 'z-20' : 'z-10'}
              `}>
                {/* 信息气泡 */}
                <AnimatePresence>
                  {activeSpot === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
                    >
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-100" />
                      <h4 className="font-bold text-heritage-ink text-sm">{spot.name[language]}</h4>
                      {spot.desc && (
                        <p className="text-xs text-gray-500 mt-1">{spot.desc[language]}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 标记点 */}
                <div className={`
                  relative w-10 h-10 rounded-full
                  flex items-center justify-center
                  ${activeSpot === index
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-secondary-500 text-white shadow-lg shadow-secondary-500/30'
                  }
                  transition-all duration-200
                `}>
                  <MapPin className="w-5 h-5" />
                  {/* 序号 */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full text-xs font-bold flex items-center justify-center text-heritage-ink shadow">
                    {index + 1}
                  </span>
                </div>

                {/* 景点名称 */}
                <div className="mt-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm max-w-[120px]">
                  <p className="text-xs font-medium text-heritage-ink text-center truncate">
                    {spot.name[language]}
                  </p>
                </div>
              </div>
            </motion.button>
          )
        })}

        {/* 控制按钮 */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => setIsFullscreen(true)}
            className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* 图例 */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-secondary-500" />
              <span>{language === 'zh' ? '景点' : 'Attraction'}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-0.5 bg-gradient-to-r from-secondary-600 to-secondary-400" />
              <span>{language === 'zh' ? '路线' : 'Route'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 全屏弹窗 */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 全屏地图 */}
              <div className="w-full h-full">
                <RouteMap spots={spots} title={title} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
