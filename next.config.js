/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },
}

module.exports = nextConfig
