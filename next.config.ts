import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'znxfrnacvxmavbfsndpd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yenirotaegitim.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kitdemo.moxcreative.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
