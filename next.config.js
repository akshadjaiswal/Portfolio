/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      }
    ]
  },
  // Ensure proper static generation
  output: 'standalone',
}

module.exports = nextConfig
