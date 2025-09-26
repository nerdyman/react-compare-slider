import type { MutableRefObject } from 'react';
import { useRef } from 'react';

import type { UseReactCompareSliderRefReturn } from './types';

/**
 * Control the position and access or modify the DOM elements of the slider.
 */
export const useReactCompareSliderRef = (): MutableRefObject<UseReactCompareSliderRefReturn> =>
  useRef<UseReactCompareSliderRefReturn>({
    rootContainer: null,
    handleContainer: null,
    setPosition: () =>
      // biome-ignore lint/suspicious/noConsole: This intentionally warns users to help with debugging.
      console.warn('[react-compare-slider] `setPosition` cannot be used until the component has mounted.'),
  });
