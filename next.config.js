/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Sized to the frames the site actually renders.
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 2048],
    imageSizes: [96, 160, 240, 320, 480],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

module.exports = nextConfig
