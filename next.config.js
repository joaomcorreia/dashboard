/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  images: {
    domains: ['localhost', '127.0.0.1'],
  },
  env: {
    DJANGO_API_URL: process.env.DJANGO_API_URL || 'http://127.0.0.1:8000',
  },
};

module.exports = withNextIntl(nextConfig);