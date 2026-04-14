/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [390, 640, 768, 1080, 1200, 1920],
    formats: ["image/webp"],
  },
};

export default nextConfig;
