# Contributing

Thanks for contributing!

## Getting Started

Ensure you're using the Node version specified in [.nvmrc](./.nvmrc) and run the following to
bootstrap the project:

```sh
yarn
```

To start the library build and `example` project, run the following commands in separate terminals:

```sh
# Start the library build
yarn start

# Start the example build
cd ./example
yarn
yarn start
```

To start Storybook run the following command:

```sh
yarn storybook
```

## Standards

- Commits use the [Conventional Commits](https://conventionalcommits.org/) standard
- yarn to manage dependencies
- Use a tool (e.g. nvm or fnm) to use the correct Node.js version
- Prettier & EditorConfig for code style
- ESLint for quality
- Husky for Git hooks

## VS Code

If you're using VS Code please make sure you install the [recommended extensions](./.vscode/extensions.json).
