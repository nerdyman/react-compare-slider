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
  onSuccess:
    // Storybook codegen and coverage only works if the source is alongside the `.storybook` directory so
    // we copy it on build. We also match the `lib/src` dir since we want Sonar to check the actual source,
    // not the copied one.
    'rm -rf ../docs/storybook/lib && mkdir -p ../docs/storybook/lib && cp -r ./src ../docs/storybook/lib',
  failOnWarn: true,
  fixedExtension: true,

  attw: {
    enabled: true,
    profile: 'node16',
  },
  publint: {
    enabled: true,
    level: 'suggestion',
  },
}));
