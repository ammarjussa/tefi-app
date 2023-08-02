const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    SERVER_END_POINT: process.env.SERVER_END_POINT,
    DGRAPH_API_KEY: process.env.DGRAPH_API_KEY,
    DGRAPH_API_URL: process.env.DGRAPH_API_URL,
    ADDRESS: process.env.ADDRESS,
    FILTER_POST_UST: process.env.FILTER_POST_UST,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    return config;
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
};

delete nextConfig.pwa;

module.exports = process.env.NODE_ENV === 'production' ? withPWA(nextConfig) : nextConfig;
