module.exports = {
  ...require("./common"),
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["<rootDir>/src/__tests__/**/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  coveragePathIgnorePatterns: [],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
