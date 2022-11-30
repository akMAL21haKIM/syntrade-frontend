/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

// const withTM = require("next-transpile-modules")([
//   "lightweight-charts",
//   "fancy-canvas",
// ]);

// module.exports = withTM(nextConfig);

module.exports = nextConfig;
