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
        source: '/map',
        destination: 'https://map.worldmc.net',
      },
      {
        source: '/store',
        destination: 'https://worldmc-710.tebex.io/',
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/g4stgqxahv',
      }
    ];
  },
};

export default nextConfig;
