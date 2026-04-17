'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Language } from '@/lib/i18n'

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'zh',
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () => {
        const current = get().language
        set({ language: current === 'zh' ? 'en' : 'zh' })
      },
    }),
    {
      name: 'language-storage',
    }
  )
)
