/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Paket server-only yang tidak perlu di-bundle oleh webpack
  serverExternalPackages: [
    "genkit",
    "@genkit-ai/googleai",
    "@genkit-ai/core",
    "@genkit-ai/next",
    "@opentelemetry/sdk-node",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Abaikan modul optional dari opentelemetry yang tidak terinstall
      config.ignoreWarnings = [
        ...(config.ignoreWarnings || []),
        { module: /@opentelemetry\/exporter-jaeger/ },
        { module: /@genkit-ai\/firebase/ },
      ];
    }
    return config;
  },
};

module.exports = withPWA(nextConfig);
