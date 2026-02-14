/// <reference types="../vitest.d.ts" />

import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { type ReactRenderer, setProjectAnnotations } from '@storybook/react-vite';
import type { NamedOrDefaultProjectAnnotations } from 'storybook/internal/types';
import { beforeAll } from 'vitest';
import { commands } from 'vitest/browser';

import * as projectAnnotations from './preview';

const emulateMediaAnnotation: NamedOrDefaultProjectAnnotations<ReactRenderer> = {
  beforeEach: async (context) => {
    const emulateMedia = context.parameters?.test?.emulateMedia;

    if (emulateMedia) {
      await commands.emulateMedia(emulateMedia);
    }
  },
  afterEach: async (context) => {
    const emulateMedia = context.parameters?.test?.emulateMedia;

    if (emulateMedia) {
      await commands.emulateMedia({ colorScheme: null, reducedMotion: null, forcedColors: null });
    }
  },
};

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const annotations = setProjectAnnotations([projectAnnotations, a11yAddonAnnotations, emulateMediaAnnotation]);

beforeAll(annotations.beforeAll);
