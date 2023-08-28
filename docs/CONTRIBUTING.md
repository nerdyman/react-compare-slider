# Contributing

Thanks for contributing!

## Getting Started

This is a pnpm monorepo, consisting of the main package in the root of the repo and [`storybook`](./storybook/) and [`example`](./example/) packages in the `docs` directory.
packages in the `docs` folder. Don't worry if you haven't used pnpm or monorepos before, the
commands below will set everything up for you.

Ensure you're using the Node version specified in [.nvmrc](../.nvmrc) and run the following to
bootstrap the project:

```sh
npm run dx
# Also useful but not required, install shell auto completion for pnpm.
pnpm install-completion
```

To start the library in watch mode, run the following command:

```sh
pnpm run start
```

### Storybook

To start Storybook run the following command:

```sh
pnpm run --filter @this/storybook storybook
# You can also run the scripts from the directory itself if you prefer.
cd docs/storybook
pnpm run storybook
```

## Testing

If you already have Storybook running, use the following command:

```sh
pnpm run test
```

If you _don't_ have Storybook running, use the following command:

```sh
pnpm run test:ci
```

## Standards

- Commits use the [Conventional Commits](https://conventionalcommits.org/) standard
- pnpm to manage dependencies
- Use a tool (e.g. nvm or fnm) to use the correct Node.js version
- Prettier & EditorConfig for code style
- ESLint for quality
- Husky for Git hooks

## VS Code

If you're using VS Code please make sure you install the [recommended extensions](../.vscode/extensions.json).
