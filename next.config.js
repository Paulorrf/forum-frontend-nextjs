/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    SECRET_WORD: process.env.SECRET_WORD,
  },
};

module.exports = nextConfig;
