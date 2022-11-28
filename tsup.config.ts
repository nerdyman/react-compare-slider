/* eslint no-console: 0 */
import browserslist from 'browserslist';
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist';
import { defineConfig } from 'tsup';

const target = resolveToEsbuildTarget(browserslist());

console.info('[tsup] Target:', target);

export default defineConfig((options) => ({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  minify: !options.watch,
  target,
  sourcemap: true,
  splitting: true,
  treeshake: true,
  // Storybook docgen won't work with source files outside of its root directory, so we need to copy
  // them into the docs folder.
  onSuccess: 'cp -r src ./docs/storybook',
}));
