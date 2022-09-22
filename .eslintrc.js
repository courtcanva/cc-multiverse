module.exports = {
  root: true,
  ...require("@cc/eslint-config/next"),
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
