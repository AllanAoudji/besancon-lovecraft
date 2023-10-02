/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
        port: '',
      },
    ],
    // Besoin de cette ligne pour ne pas passer à la caisse.
    // https://vercel.com/docs/image-optimization/limits-and-pricing
    // https://vercel.com/docs/image-optimization/managing-image-optimization-costs
  },
};

module.exports = nextConfig;
