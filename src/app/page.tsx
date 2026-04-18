'use client'

import { HeroSection } from '@/components/sections/HeroSection'
import { BannerSlider } from '@/components/sections/BannerSlider'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { CultureSection } from '@/components/sections/CultureSection'
import { RoutesSection } from '@/components/sections/RoutesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 relative overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=2070')`,
          }}
        />
        <div className="absolute inset-0 bg-heritage-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-transparent to-secondary-900/30" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white mb-6">
            {t.home.cta.title}
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            {t.home.cta.description}
          </p>
          <Link href="/service">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full text-lg shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
            >
              <span className="flex items-center">
                {t.home.cta.button}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BannerSlider />
      <FeaturesSection />
      <CultureSection />
      <RoutesSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </>
  )
}
