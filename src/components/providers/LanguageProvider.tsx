'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations, Language } from '@/lib/i18n'

interface LanguageContextType {
  language: Language
  t: typeof translations.zh
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language, setLanguage, toggleLanguage } = useLanguageStore()
  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
