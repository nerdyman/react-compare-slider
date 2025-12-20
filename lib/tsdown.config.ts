import { defineConfig } from 'tsdown';

const packageJson = await import('./package.json', { with: { type: 'json' } });

export default defineConfig((options) => ({
  clean: !options.watch,
  dts: true,
  entry: ['src/index.ts', './src/components/index.ts', 'src/hooks.ts', 'src/types.ts'],
  platform: 'neutral',
  format: ['esm', 'cjs'],
  target: packageJson.browserslist,
  minify: !options.watch,
  sourcemap: true,
  splitting: true,
  onSuccess: 'cp -r ./dist ../docs/storybook/lib',
  failOnWarn: true,

  attw: {
    enabled: true,
    profile: 'node16',
  },
  publint: {
    enabled: true,
    level: 'suggestion',
  },
}));
