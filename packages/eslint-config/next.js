module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "next",
    "next/core-web-vitals",
    "turbo",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended",
    "plugin:jest/recommended",
    "plugin:react/recommended",
    "google",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "@typescript-eslint", "jest", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "no-console": 1,
    // do not require JSDoc for your functions
    "require-jsdoc": "off",
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    // we want to avoid extraneous spaces
    "no-multi-spaces": ["error"],
    // turn off `no-unused-vars` to prevent duplicated warnings
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
  },
  overrides: [
    {
      // Now we enable eslint-plugin-testing-library rules or preset only for matching files!
      env: {
        jest: true,
      },
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react", "plugin:jest/recommended"],
      rules: {
        "import/no-extraneous-dependencies": [
          "off",
          { devDependencies: ["**/?(*.)+(spec|test).[jt]s?(x)"] },
        ],
      },
    },
  ],
  ignorePatterns: ["node_modules", ".turbo", "dist", "next-env.d.ts", "coverage"],
};
