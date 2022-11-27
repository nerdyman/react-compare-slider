import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  minify: !options.watch,
  target: 'es2021',
  sourcemap: true,
  splitting: true,
  treeshake: true,
  // Storybook docgen won't work with source files outside of its root directory, so we need to copy
  // them into the docs folder.
  onSuccess: 'cp -r src ./docs/storybook',
}));
