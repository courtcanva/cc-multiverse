# 🌌🚀 CourtCanva Multiverse 🏸🎾🏀🏐

TL;DR;

This is courtcanva's multiverse world, it's aim is to house `cc-galaxy` and `cc-startrek` projects where they will share `@cc/ui-chakra`, `@cc/ui-tailwind`, `@cc/eslint-config`, `@cc/tsconfig` libraries.

This monorepo was bootstrapped using [`create-turbo`](https://turborepo.org/docs/getting-started/create-new) command and is being managed using [`turborepo`](https://turborepo.org/docs)

## Table of contents

- [🤓 How to set up this repo?](#🤓-how-to-set-up-this-repo)
- [🤔 What's inside?](#🤔-whats-inside)
  - [💻📱 Apps](#💻📱-apps)
  - [📦 Packages](#📦-packages)
- [🏗️ How to build this project?](#🏗️-how-to-build-this-project)
- [🧪 How to run test for this project?](#)
- [🧑‍💻 How to start the developement server?](#🧑‍💻-how-to-start-the-developement-server)
- [📚 How to open storybooks?](#📚-how-to-open-storybooks)
- [📝 Are there any caveats I should know?](#📝-are-there-any-caveats-i-should-know)
- [🥞 What tech is in this project?](#🥞-what-tech-is-in-this-project)

## 🤓 How to set up this repo?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager, for a start, install the dependencies with

```
npm install
```

Then you all set!

## 🤔 What's inside?

This repo is using [`npm workspaces`](https://docs.npmjs.com/cli/v7/using-npm/workspaces). To find the name of a workspace/package, you just need to traverse to the `package.json` file in each of the workspace directories, the `name` property will indiciate the name of the workspace.

It includes the following packages/apps:

### 💻📱 Apps

- `galaxy`: a franchisee-facing [Next.js](https://nextjs.org) app.
- `startrek`: a franchisee-admin panel [Next.js](https://nextjs.org) app.

### 📦 Packages

- `@cc/eslint-config`: `eslint` configurations for [`next`](https://nextjs.org/) apps
- `@cc/tsconfig`: `tsconfig.json`s used throughout the monorepo
- `@cc/ui-chakra`: a stub React component library made with [`@chakra-ui`](https://chakra-ui.com/) and [`storybook`](https://storybook.js.org/).
- `@cc/ui-tailwind`: a stub React component library made with [`tailwindcss`](https://tailwindcss.com/) ~~and [`storybook`](https://storybook.js.org/)~~.

Each package/app is and should be 100% [TypeScript](https://www.typescriptlang.org/).
Only the config files can be written in js.

### 🏗️ How to build this project?

To build all apps and packages, run the following command:

```bash
# This will start the `build` pipeline specified in `turbo.json`
npm run build

# The `--force` tag will override the cache and run a fresh build
npm run build --force
```

### 🧪 How to run test for this project?

Test is a bit special, it has three different mode at the moment.

- `test`: just gooo o tests
- `test:watch`: run test that watch for file changes, recommend to run this with `--workplace` option.
- `test:coverage`: run test and generates a coverage report for your satisfaction

### 🧑‍💻 How to start the developement server?

To develop all apps and packages, run the following command:

```bash
# This will start the `dev` pipeline specified in `turbo.json`
npm run dev

# The `-w=` will specify a workspace to run the `dev` script with
npm run dev -w=galaxy
```

### 📚 How to open storybooks?

To open storybook of ui packages, run the following command:

```bash
# This will start the `storybook` pipeline specified in `turbo.json`
npm run storybook

# The `-w=` will specify a workspace to run the `storybook` script with
npm run storybook -w=galaxy
```

### 📝 Are there any caveats I should know?

1. You might see messages like `npm ERR! Workspaces are not supported for global packages` when you are running scripts with `npm`. I think it's not project related but an issue with the package manager. But nothing to be worried about! _(I hope)_
2. If you have changes that only modify the `eslint` rules, turborepo might not detect these changes when comparing caches. Suggest running `npm run eslint --force` to overwrite the existing cache to validate if the new `eslint` rules are working as intended.
3. The grammar errors in this `README.md` is to be unseen. 😊

### 🥞 What tech is in this project?

| Category           | Packages                                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Framework          | `turbo`, `next`                                                                                                  |
| BootStrapper       | `create-turbo`, `create-next-app`                                                                                |
| Scripting Language | `typescript`                                                                                                     |
| ApiClient          |                                                                                                                  |
| Styling            | [`@chakra-ui`](https://chakra-ui.com/), `framer-motion`, `fontsource`, [`tailwindcss`](https://tailwindcss.com/) |
| State-Management   |                                                                                                                  |
| Testing            | `jest`, `swc/jest`, `react-testign-library`                                                                      |
| Localisation       |                                                                                                                  |
| Code Control       | `husky`, `commitlint`, `eslint`, `prettier`                                                                      |
| CI/CD              |                                                                                                                  |
| Others             |                                                                                                                  |

### 💾 Remote Caching

_PS. This turborepo is not currently linked to remote caches, below in this section is just FYI._

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## 🔗 Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
