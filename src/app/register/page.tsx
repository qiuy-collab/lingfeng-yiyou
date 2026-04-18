'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import { Mail, Lock, User, Eye, EyeOff, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const { language } = useLanguage()
  const { register } = useAuth()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError(language === 'zh' ? '请填写完整信息' : 'Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError(language === 'zh' ? '两次密码不一致' : 'Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError(language === 'zh' ? '密码至少6位' : 'Password must be at least 6 characters')
      return
    }

    if (!agreeTerms) {
      setError(language === 'zh' ? '请同意用户协议' : 'Please agree to the terms')
      return
    }

    setIsLoading(true)
    const result = await register(email, password, name)
    setIsLoading(false)

    if (result.success) {
      router.push('/my')
    } else {
      setError(result.error || (language === 'zh' ? '注册失败' : 'Registration failed'))
    }
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-serif text-heritage-ink">
              {language === 'zh' ? '创建账号' : 'Create Account'}
            </h1>
            <p className="text-gray-500 mt-2">
              {language === 'zh' ? '加入岭南逸游，开启精彩旅程' : 'Join Lingnan Travel for amazing journeys'}
            </p>
          </div>

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 昵称 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'zh' ? '昵称' : 'Nickname'}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'zh' ? '请输入昵称' : 'Enter your nickname'}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* 邮箱 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'zh' ? '邮箱地址' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'zh' ? '请输入邮箱' : 'Enter your email'}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'zh' ? '密码' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'zh' ? '请输入密码（至少6位）' : 'Enter password (at least 6 chars)'}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* 确认密码 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'zh' ? '确认密码' : 'Confirm Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={language === 'zh' ? '请再次输入密码' : 'Confirm your password'}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* 用户协议 */}
            <div className="flex items-start gap-2">
              <button
                type="button"
                onClick={() => setAgreeTerms(!agreeTerms)}
                className={`mt-0.5 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                  agreeTerms ? 'bg-primary-500 border-primary-500' : 'border-gray-300'
                }`}
              >
                {agreeTerms && <Check className="w-3 h-3 text-white" />}
              </button>
              <span className="text-sm text-gray-600">
                {language === 'zh' ? (
                  <>
                    我已阅读并同意
                    <span className="text-primary-500 cursor-pointer hover:underline">《用户协议》</span>
                    和
                    <span className="text-primary-500 cursor-pointer hover:underline">《隐私政策》</span>
                  </>
                ) : (
                  <>
                    I agree to the
                    <span className="text-primary-500 cursor-pointer hover:underline ml-1">Terms of Service</span>
                    and
                    <span className="text-primary-500 cursor-pointer hover:underline ml-1">Privacy Policy</span>
                  </>
                )}
              </span>
            </div>

            {/* 错误信息 */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            {/* 注册按钮 */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {language === 'zh' ? '注册中...' : 'Creating account...'}
                </span>
              ) : (
                language === 'zh' ? '立即注册' : 'Create Account'
              )}
            </motion.button>
          </form>

          {/* 登录链接 */}
          <div className="mt-6 text-center">
            <p className="text-gray-500">
              {language === 'zh' ? '已有账号？' : 'Already have an account?'}
              <Link href="/login" className="ml-2 text-primary-500 font-medium hover:text-primary-600">
                {language === 'zh' ? '立即登录' : 'Login now'}
              </Link>
            </p>
          </div>
        </div>

        {/* 返回首页 */}
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-500 hover:text-primary-500 transition-colors">
            {language === 'zh' ? '← 返回首页' : '← Back to Home'}
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
