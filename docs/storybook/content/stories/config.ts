import type { ArgTypes } from '@storybook/react';
import type { ReactCompareSliderProps } from 'react-compare-slider';

/**
 * @NOTE These must reflect the default values defined in the code and in `README.md`.
 */
export const args: ReactCompareSliderProps = {
  clip: 'all',
  disabled: false,
  portrait: false,
  position: 50,
  boundsPadding: 0,
  onlyHandleDraggable: false,
  changePositionOnHover: false,
  keyboardIncrement: '5%',
  itemOne: undefined,
  itemTwo: undefined,
  handle: undefined,
  onPositionChange: undefined,
  transition: undefined,
};

export const argTypes: ArgTypes<Partial<ReactCompareSliderProps>> = {
  handle: { control: { type: 'function' } },
  itemOne: { control: { type: 'function' } },
  itemTwo: { control: { type: 'function' } },
  onPositionChange: { control: { type: 'function' } },
  position: { control: { type: 'range', min: 0, max: 100 } },
};
