import type { EmulateMediaFn } from './.storybook/vitest-types';

declare module 'vitest/browser' {
  interface BrowserCommands {
    emulateMedia: EmulateMediaFn;
  }
}
