/* eslint no-console: 0, @typescript-eslint/explicit-function-return-type: 0 */
import browserslist from 'browserslist';
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

const target = resolveToEsbuildTarget(browserslist()) as Options['target'];

export default defineConfig((options) => ({
  clean: !options.watch,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  minify: !options.watch,
  target,
  sourcemap: true,
  splitting: true,
  // Storybook test coverage won't work with files sourced from outside of its root directory, so
  // we need to copy the lib into the docs folder.
  onSuccess: 'cp -r src ../docs/storybook',
  esbuildOptions(esbuild) {
    esbuild.banner = {
      js: '"use client"',
    };
  },
}));
