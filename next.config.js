/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Not exposed to browser; available in server-side code only
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;