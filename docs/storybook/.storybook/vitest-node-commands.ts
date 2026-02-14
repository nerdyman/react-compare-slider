import type { BrowserCommand } from 'vitest/node';

import type { EmulateMediaProps } from './vitest-types';

export const emulateMedia: BrowserCommand<[options: EmulateMediaProps]> = async (
  { page, provider },
  options,
) => {
  if (provider.name !== 'playwright') {
    throw new Error(`provider ${provider.name} is not supported`);
  }
  await page.emulateMedia(options);
};
