import process from 'node:process'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configuration de développement - CORRIGÉE
  devIndicators: {
    position: 'bottom-right',
  },

  // Transpile le package shared
  transpilePackages: ['@gazette/shared'],

  // Optimisations de packages
  experimental: {
    optimizePackageImports: [
      '@chakra-ui/react',
      '@chakra-ui/icons',
      'lucide-react',
      'react-icons',
      '@tanstack/react-query',
    ],
  },

  // Configuration Turbopack (CORRIGÉE - plus experimental)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Configuration optimisée du compilateur
  compiler: {
    emotion: true,
    removeConsole: process.env.NODE_ENV === 'production'
      ? {
          exclude: ['error', 'warn'],
        }
      : false,
  },

  // Configuration d'images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  // Optimisations de performance
  compress: true,
  poweredByHeader: false,

  // Configuration webpack simplifiée
  webpack: (config, { dev }) => {
    if (dev) {
      // Configuration simple pour le développement
      return config
    }

    // Optimisations légères pour la production
    if (config.optimization) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }

    return config
  },
}

export default nextConfig
