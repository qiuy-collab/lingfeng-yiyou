/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
  // 为 GitHub Pages 设置 basePath（仓库地址为 https://qiuy-collab.github.io/lingfeng-yiyou/）
  basePath: process.env.GITHUB_PAGES === 'true' ? '/lingfeng-yiyou' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/lingfeng-yiyou/' : '',
}

module.exports = nextConfig
