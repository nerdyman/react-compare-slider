/// <reference types="vitest/config" />

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';

import * as vitestCommands from './.storybook/vitest-node-commands';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    alias: {
      'react-compare-slider': path.resolve(dirname, './lib/src'),
    },
  },
  plugins: [react()],
  test: {
    allowOnly: !process.env.CI,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov', 'text-summary'],
      reportsDirectory: '../../coverage',
      allowExternal: true,
      include: [path.resolve(dirname, './lib/**/*.{ts,tsx}')],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          typecheck: { enabled: true },
          include: ['content/**/*.node.test.tsx'],
        },
      },
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
          typecheck: { enabled: true },
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            commands: { ...vitestCommands },
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
