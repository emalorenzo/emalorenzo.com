/**
 * @type {import('next').NextConfig}
 **/
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  swcMinify: true,
  images: {
    // ADD in case you need to import SVGs in next/image component
    // dangerouslyAllowSVG: true,
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  // add @import 'styles/_functions'; to all scss files.
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import '~/styles/_functions';`,
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  webpack: (config, options) => {
    const { dir } = options;

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            memo: true,
            dimensions: false,
            svgoConfig: {
              multipass: true,
              plugins: [
                "removeDimensions",
                "removeOffCanvasPaths",
                "reusePaths",
                "removeElementsByAttr",
                "removeStyleElement",
                "removeScriptElement",
                "prefixIds",
                "cleanupIDs",
                {
                  name: "cleanupNumericValues",
                  params: {
                    floatPrecision: 1,
                  },
                },
                {
                  name: "convertPathData",
                  params: {
                    floatPrecision: 1,
                  },
                },
                {
                  name: "convertTransform",
                  params: {
                    floatPrecision: 1,
                  },
                },
                {
                  name: "cleanupListOfValues",
                  params: {
                    floatPrecision: 1,
                  },
                },
              ],
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

module.exports = () => {
  const plugins = [withBundleAnalyzer];
  return plugins.reduce((acc, plugin) => plugin(acc), {
    ...nextConfig,
  });
};
