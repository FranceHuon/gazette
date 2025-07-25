/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  // Transpile le package shared car il contient des types/DTOs utilisés côté client
  transpilePackages: ['@gazette/shared'],

  experimental: {
    // Optimise les imports des packages UI
    optimizePackageImports: [
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
  },

  compiler: {
    emotion: true,
  },

  // Optimisations pour les images et polices
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Optimisations de performance
  compress: true,

  // Optimisations de build
  swcMinify: true,

  // Optimisations de bundle
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimisations de production
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          chakra: {
            test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
            name: 'chakra',
            chunks: 'all',
            priority: 10,
          },
        },
      }
    }
    return config
  },

  // Optimisations de cache
  generateEtags: true,

  // Optimisations de compression
  poweredByHeader: false,

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              'default-src \'self\'',
              'script-src \'self\' \'unsafe-eval\' \'unsafe-inline\'',
              'style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com',
              'font-src \'self\' https://fonts.gstatic.com',
              'img-src \'self\' data: https:',
              'connect-src \'self\' http://localhost:3000',
              'frame-ancestors \'none\'',
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
