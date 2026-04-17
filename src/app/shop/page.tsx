'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { ShoppingCart, Heart, Star, Filter, Search } from 'lucide-react'
import { useState } from 'react'

const products = [
  {
    id: 1,
    name: { zh: '广彩瓷茶具套装', en: 'Canton Porcelain Tea Set' },
    description: { zh: '手工绘制广彩瓷茶具，岭南传统工艺', en: 'Hand-painted Canton porcelain tea set, traditional Lingnan craftsmanship' },
    price: '¥688',
    originalPrice: '¥888',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=600',
    category: 'craft',
    rating: 4.9,
    reviews: 56,
  },
  {
    id: 2,
    name: { zh: '潮汕牛肉丸礼盒', en: 'Chaoshan Beef Ball Gift Set' },
    description: { zh: '正宗潮汕手打牛肉丸，地道风味', en: 'Authentic hand-made Chaoshan beef balls' },
    price: '¥128',
    originalPrice: '¥168',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600',
    category: 'food',
    rating: 4.8,
    reviews: 128,
  },
  {
    id: 3,
    name: { zh: '岭南醒狮挂件', en: 'Lingnan Lion Dance Pendant' },
    description: { zh: '精美醒狮造型挂件，民族特色', en: 'Exquisite lion dance pendant with ethnic flair' },
    price: '¥68',
    originalPrice: '¥88',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600',
    category: 'souvenir',
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 4,
    name: { zh: '客家娘酒', en: 'Hakka Rice Wine' },
    description: { zh: '传统客家娘酒，醇香甘甜', en: 'Traditional Hakka rice wine, mellow and sweet' },
    price: '¥98',
    originalPrice: '¥128',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=600',
    category: 'food',
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 5,
    name: { zh: '广绣团扇', en: 'Guangzhou Embroidery Fan' },
    description: { zh: '精美广绣工艺团扇，艺术品级别', en: 'Exquisite Canton embroidery fan, art-grade quality' },
    price: '¥398',
    originalPrice: '¥498',
    image: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=600',
    category: 'art',
    rating: 5.0,
    reviews: 42,
  },
  {
    id: 6,
    name: { zh: '粤剧脸谱摆件', en: 'Cantonese Opera Mask Ornament' },
    description: { zh: '传统粤剧脸谱装饰摆件', en: 'Traditional Cantonese opera mask ornament' },
    price: '¥188',
    originalPrice: '¥238',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=600',
    category: 'souvenir',
    rating: 4.8,
    reviews: 73,
  },
  {
    id: 7,
    name: { zh: '工夫茶具套装', en: 'Kung Fu Tea Set' },
    description: { zh: '潮汕工夫茶专业茶具', en: 'Professional Chaoshan Kung Fu tea set' },
    price: '¥268',
    originalPrice: '¥328',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=600',
    category: 'craft',
    rating: 4.9,
    reviews: 96,
  },
  {
    id: 8,
    name: { zh: '岭南建筑模型', en: 'Lingnan Architecture Model' },
    description: { zh: '精美岭南古建筑模型摆件', en: 'Exquisite Lingnan ancient architecture model' },
    price: '¥588',
    originalPrice: '¥688',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600',
    category: 'art',
    rating: 4.7,
    reviews: 31,
  },
]

const categories = [
  { key: 'all', label: { zh: '全部', en: 'All' } },
  { key: 'craft', label: { zh: '工艺品', en: 'Crafts' } },
  { key: 'food', label: { zh: '特产美食', en: 'Specialty Foods' } },
  { key: 'souvenir', label: { zh: '纪念品', en: 'Souvenirs' } },
  { key: 'art', label: { zh: '艺术收藏', en: 'Art Collections' } },
]

export default function ShopPage() {
  const { t, language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory
    const matchesSearch = product.name[language].toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero区域 */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/10 via-transparent to-accent-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-heritage-ink mb-4">
              {t.shop.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.shop.subtitle}
            </p>
          </motion.div>

          {/* 搜索和分类 */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={language === 'zh' ? '搜索商品...' : 'Search products...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (
                <motion.button
                  key={cat.key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    activeCategory === cat.key
                      ? 'bg-secondary-500 text-white shadow-lg shadow-secondary-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label[language]}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 商品网格 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-100/50 border border-gray-100"
              >
                {/* 图片 */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* 折扣标签 */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    {language === 'zh' ? '限时特惠' : 'SALE'}
                  </div>

                  {/* 收藏按钮 */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'
                      }`}
                    />
                  </button>

                  {/* 快速加入购物车 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button className="w-full py-2 bg-white text-heritage-ink font-medium rounded-lg flex items-center justify-center space-x-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>{language === 'zh' ? '加入购物车' : 'Add to Cart'}</span>
                    </button>
                  </motion.div>
                </div>

                {/* 内容 */}
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm text-gray-500 ml-1">{product.rating} ({product.reviews})</span>
                  </div>

                  <h3 className="font-bold text-heritage-ink mb-1 group-hover:text-primary-500 transition-colors">
                    {product.name[language]}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {product.description[language]}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-primary-500">{product.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t.common.noData}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
