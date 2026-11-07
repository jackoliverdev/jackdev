/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets phones on the local network load the dev server's scripts (npm run dev).
  allowedDevOrigins: ['192.168.0.197'],
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75],
    // Sized to the frames the site actually renders.
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 2048],
    imageSizes: [96, 160, 240, 320, 480],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

module.exports = nextConfig
