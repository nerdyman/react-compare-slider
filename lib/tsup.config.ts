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
  format: ['esm', 'cjs'],
  outExtension: (context) => {
    return {
      js: context.format === 'esm' ? '.mjs' : '.cjs',
    };
  },
  minify: !options.watch,
  target,
  sourcemap: true,
  splitting: true,
  onSuccess: 'mkdir -p ../docs/storybook/lib && cp -r ./src ../docs/storybook/lib',
  esbuildOptions(esbuild) {
    esbuild.banner = {
      js: '"use client"',
    };
  },
}));
