'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import { useCartStore, CartItem } from '@/store/useCartStore'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { language } = useLanguage()
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  // 默认全选
  useEffect(() => {
    if (items.length > 0 && selectedItems.length === 0) {
      setSelectedItems(items.map((item) => item.id))
    }
  }, [items])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    )
  }

  const toggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.id))
    }
  }

  const selectedItemsData = items.filter((item) => selectedItems.includes(item.id))
  const totalPrice = selectedItemsData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* 头部 */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl font-bold text-heritage-ink">
            {language === 'zh' ? '我的购物车' : 'My Cart'}
          </h1>
          <p className="text-gray-500 mt-1">
            {language === 'zh'
              ? `共 ${items.length} 件商品`
              : `${items.length} items in cart`}
          </p>
        </div>
      </section>

      {/* 购物车内容 */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {items.length > 0 ? (
              <div className="space-y-4">
                {/* 全选操作栏 */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-4 flex items-center justify-between sticky top-20 z-10 shadow-sm"
                >
                  <button
                    onClick={toggleSelectAll}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedItems.length === items.length
                          ? 'bg-primary-500 border-primary-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedItems.length === items.length && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-600">
                      {language === 'zh' ? '全选' : 'Select All'}
                    </span>
                  </button>
                  <button
                    onClick={clearCart}
                    className="text-red-500 text-sm hover:underline"
                  >
                    {language === 'zh' ? '清空购物车' : 'Clear Cart'}
                  </button>
                </motion.div>

                {/* 商品列表 */}
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex gap-4">
                      {/* 选择框 */}
                      <button
                        onClick={() => toggleSelect(item.id)}
                        className="flex-shrink-0 mt-4"
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            selectedItems.includes(item.id)
                              ? 'bg-primary-500 border-primary-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedItems.includes(item.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>

                      {/* 商品图片 */}
                      <div
                        className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      />

                      {/* 商品信息 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-heritage-ink truncate">{item.name}</h3>
                        <p className="text-primary-500 font-bold mt-1">¥{item.price}</p>

                        {/* 数量控制 */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* 结算栏 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm sticky bottom-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500">
                      {language === 'zh' ? '已选' : 'Selected'}
                      <span className="text-heritage-ink font-bold mx-1">
                        {selectedItemsData.length}
                      </span>
                      {language === 'zh' ? '件商品' : 'items'}
                    </span>
                    <div className="text-right">
                      <span className="text-gray-500 text-sm">
                        {language === 'zh' ? '合计：' : 'Total: '}
                      </span>
                      <span className="text-2xl font-bold text-primary-500">
                        ¥{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all flex items-center justify-center gap-2">
                    {language === 'zh' ? '去结算' : 'Checkout'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-heritage-ink mb-2">
                  {language === 'zh' ? '购物车是空的' : 'Your cart is empty'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {language === 'zh' ? '去商城逛逛吧' : 'Explore our shop for great products'}
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-8 py-3 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors"
                >
                  {language === 'zh' ? '去逛逛' : 'Shop Now'}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
