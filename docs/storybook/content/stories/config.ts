import type { ArgTypes } from '@storybook/react';
import type { ReactCompareSliderProps } from 'react-compare-slider';

export const args: ReactCompareSliderProps = {
  handle: undefined,
  itemOne: undefined,
  itemTwo: undefined,
  portrait: false,
  position: 50,
  boundsPadding: 0,
  onlyHandleDraggable: false,
  changePositionOnHover: false,
  keyboardIncrement: '5%',
  onPositionChange: undefined,
};

export const argTypes: ArgTypes<Partial<ReactCompareSliderProps>> = {
  handle: { control: { type: 'function' } },
  itemOne: { control: { type: 'function' } },
  itemTwo: { control: { type: 'function' } },
  onPositionChange: { control: { type: 'function' } },
  position: { control: { type: 'range', min: 0, max: 100 } },
};
