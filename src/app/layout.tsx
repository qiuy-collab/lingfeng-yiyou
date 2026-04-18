import type { Metadata } from 'next'
import { Noto_Serif_SC, Noto_Sans_SC } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { FloatingElements } from '@/components/effects/FloatingElements'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

const notoSerif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const notoSans = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '岭风译游 | Lingfeng Yiyou - 广东跨境文旅服务平台',
  description: '探索广东之美，体验岭南文化。提供陪游口译、文旅路线、文创商品等一站式跨境文旅服务。Explore the beauty of Guangdong, experience Lingnan culture.',
  keywords: ['广东旅游', '岭南文化', '陪游口译', 'Guangdong tourism', 'Lingnan culture', 'translation services'],
  authors: [{ name: '岭风译游团队' }],
  openGraph: {
    title: '岭风译游 | Lingfeng Yiyou',
    description: '探索广东之美，体验岭南文化',
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className="font-sans bg-heritage-paper min-h-screen">
        <LanguageProvider>
          {/* 背景装饰元素 */}
          <FloatingElements />

          {/* 主内容 */}
          <div className="relative z-10">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>

          {/* 返回顶部按钮 */}
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  )
}
