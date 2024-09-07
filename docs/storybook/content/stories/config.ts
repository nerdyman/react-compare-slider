import type { ArgTypes } from '@storybook/react';
import { ReactCompareSliderClipOption, type ReactCompareSliderProps } from 'react-compare-slider';

/**
 * @NOTE These must reflect the default values defined in the `types.ts`.
 */
export const args: ReactCompareSliderProps = {
  boundsPadding: 0,
  changePositionOnHover: false,
  clip: ReactCompareSliderClipOption.both,
  disabled: false,
  handle: undefined,
  keyboardIncrement: '5%',
  itemOne: undefined,
  itemTwo: undefined,
  onlyHandleDraggable: false,
  onPositionChange: undefined,
  portrait: false,
  position: 50,
  transition: undefined,
};

export const argTypes: ArgTypes<Partial<ReactCompareSliderProps>> = {
  handle: { control: { type: 'function' } },
  itemOne: { control: { type: 'function' } },
  itemTwo: { control: { type: 'function' } },
  onPositionChange: { control: { type: 'function' } },
  position: { control: { type: 'range', min: 0, max: 100 } },
};
