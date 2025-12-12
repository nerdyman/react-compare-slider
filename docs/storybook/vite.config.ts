/// <reference types="vitest/config" />

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  // resolve: {
  //   alias: {
  //     'react-compare-slider': path.resolve(__dirname, '../../lib/src'),
  //   },
  // },
  // resolve: {
  //   alias: [
  //     {
  //       find: 'react-compare-slider',
  //       replacement: path.resolve(dirname, '../../lib'),
  //     },
  //   ],
  // },
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: '../../coverage',
      allowExternal: true,
      include: [
        // path.resolve(dirname, './src/**/*.ts'),
        // path.resolve(dirname, './src/**/*.tsx'),
        path.resolve(dirname, '../../lib/dist/**/*.mjs'),
        path.resolve(dirname, '../../lib/src/**/*.ts'),
        // path.resolve(dirname, '../../lib/src/**/*.tsx'),
      ],
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          allowOnly: !process.env.CI,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
