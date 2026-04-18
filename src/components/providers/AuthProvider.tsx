'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 模拟用户数据库
const USERS_KEY = 'lingnan_users'
const CURRENT_USER_KEY = 'lingnan_current_user'

function getUsers(): Record<string, { email: string; password: string; user: User }> {
  if (typeof window === 'undefined') return {}
  const data = localStorage.getItem(USERS_KEY)
  return data ? JSON.parse(data) : {}
}

function saveUsers(users: Record<string, { email: string; password: string; user: User }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 初始化时检查登录状态
    const savedUser = localStorage.getItem(CURRENT_USER_KEY)
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem(CURRENT_USER_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const users = getUsers()
    const userData = users[email]

    if (!userData) {
      return { success: false, error: '该邮箱未注册' }
    }

    if (userData.password !== password) {
      return { success: false, error: '密码错误' }
    }

    setUser(userData.user)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData.user))
    return { success: true }
  }

  const register = async (email: string, password: string, name: string) => {
    const users = getUsers()

    if (users[email]) {
      return { success: false, error: '该邮箱已被注册' }
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      createdAt: new Date().toISOString(),
    }

    users[email] = { email, password, user: newUser }
    saveUsers(users)
    setUser(newUser)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  const updateProfile = (data: Partial<User>) => {
    if (!user) return
    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))

    // 同时更新用户数据库中的信息
    const users = getUsers()
    if (users[user.email]) {
      users[user.email].user = updatedUser
      saveUsers(users)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
