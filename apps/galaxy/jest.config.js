module.exports = {
  ...require("@cc/jest-config/next"),
  rootDir: ".",
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/svgMock.js",
    "^@src/(.*)$": ["<rootDir>/src/$1"],
  },
  collectCoverageFrom: [
    "**/src/**/*.{js,ts,jsx,tsx}",
    "!**/src/pages/_app.tsx",
    "!<rootDir>/src/layouts/index.tsx",
    "!<rootDir>/**/__tests__/**",
  ],
};
