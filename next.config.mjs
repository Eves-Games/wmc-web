/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crafatar.com'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/gateway/start',
        destination: 'https://api.minecraft.id/gateway/start',
      },
      {
        source: '/api/gateway/verify',
        destination: 'https://api.minecraft.id/gateway/verify',
      },
    ];
  },
};

export default nextConfig;
