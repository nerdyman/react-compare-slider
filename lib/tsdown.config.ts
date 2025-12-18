import { defineConfig } from 'tsdown';

const packageJson = await import('./package.json', { with: { type: 'json' } });

export default defineConfig((options) => ({
  clean: !options.watch,
  dts: true,
  entry: ['src/index.ts', './src/components.tsx', 'src/hooks.ts', 'src/types.ts'],
  format: ['esm', 'cjs'],
  outExtension: (context) => {
    return {
      js: context.format === 'esm' ? '.mjs' : '.cjs',
    };
  },
  minify: !options.watch,
  target: packageJson.browserslist,
  sourcemap: true,
  splitting: true,
  onSuccess: 'mkdir -p ../docs/storybook/lib && cp -r ./src ../docs/storybook/lib',
  attw: {
    enabled: !options.watch,
    profile: 'node16',
  },
  publint: {
    enabled: !options.watch,
    level: 'suggestion',
  },
}));
