module.exports = {
  ...require("@cc/jest-config/next"),
  rootDir: ".",
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
    "^@src/(.*)$": ["<rootDir>/src/$1"],
  },
};
