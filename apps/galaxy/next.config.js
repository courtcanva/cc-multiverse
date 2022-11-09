// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")(["@cc/ui-chakra"]);

module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      // 接口请求 前缀带上/api-text/
      { source: "/api/:path*", destination: `http://127.0.0.1:8000//api/v1/:path*` },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
});
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const withTM = require("next-transpile-modules")(["@cc/ui-chakra"]);

// module.exports = withTM({
//   reactStrictMode: true,

//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ["@svgr/webpack"],
//     });
//     return config;
//   },
// });
