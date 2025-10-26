import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Using App Router (default in Next.js 13+)
  images: {
    qualities: [75, 85, 90],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
