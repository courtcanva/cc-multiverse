// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")(["@cc/ui-tailwind"]);

module.exports = withTM({
  reactStrictMode: true,
});
