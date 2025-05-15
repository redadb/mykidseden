/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config options
  webpack: (config, { isServer }) => {
    // Ignore the punycode warning
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ];
    return config;
  },
}

module.exports = nextConfig 