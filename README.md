# 🌌🚀 CourtCanva Multiverse 🏸🎾🏀🏐

TL;DR;

This is courtcanva's multiverse world, it's aim is to house `cc-galaxy` and `cc-startrek` projects where they will share `@cc/ui`, `@cc/eslint-config`, `@cc/tsconfig` libraries.

This monorepo was bootstrapped using [`create-turbo`](https://turborepo.org/docs/getting-started/create-new) command and is being managed using [`turborepo`](https://turborepo.org/docs)

## 🤓 How to set up this repo?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager, for a start, install the dependencies with

```
npm install
```

Then you all set!

## 🤔 What's inside? _[as of this commit]_

It includes the following packages/apps:

### 💻📱 Apps

- `docs`: a [Next.js](https://nextjs.org) app
- `web`: another [Next.js](https://nextjs.org) app

### 📦 Packages

- `@cc/eslint-config`: `eslint` configurations for [`next`](https://nextjs.org/) apps
- `@cc/tsconfig`: `tsconfig.json`s used throughout the monorepo
- `@cc/ui`: a stub React component library shared by both `web` and `docs` applications

Each package/app is and should be 100% [TypeScript](https://www.typescriptlang.org/).

### 🏗️ How to build this project?

To build all apps and packages, run the following command:

```bash
# This will start the `build` pipeline specified in `turbo.json`
npm run build

# The `--force` tag will override the cache and run a fresh build
npm run build --force
```

### 🧑‍💻 How to start the developement server?

To develop all apps and packages, run the following command:

```bash
# This will start the `dev` pipeline specified in `turbo.json`
npm run dev

# The `-w=` will specify a workspace to run the `dev` script with
npm run dev -w=docs
```

### 📝 Are there any caveats I should know?

1. You might see messages like `npm ERR! Workspaces are not supported for global packages` when you are running scripts with `npm`. I think it's not project related but an issue with the package manager. But nothing to be worried about! _(I hope)_
2. If you have changes that only modify the `eslint` rules, turborepo might not detect these changes when comparing caches. Suggest running `npm run eslint --force` to overwrite the existing cache to validate if the new `eslint` rules are working as intended.
3. The grammar errors in this `README.md` is to be unseen. 😊

### 🥞 What tech is in this project?

| Category           | Packages                                    |
| ------------------ | ------------------------------------------- |
| Framework          | `turbo`, `next`                             |
| BootStrapper       | `create-turbo`, `create-next-app`           |
| Scripting Language | `typescript`                                |
| ApiClient          |                                             |
| Styling            | `chakra-ui`, `framer-motion`, `fontsource`  |
| State-Management   |                                             |
| Testing            |                                             |
| Localisation       |                                             |
| Code Control       | `husky`, `commitlint`, `eslint`, `prettier` |
| CI/CD              |                                             |
| Others             |                                             |

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
