import type { ArgTypes } from '@storybook/react';
import type { ReactCompareSliderProps } from 'react-compare-slider';

export const args: ReactCompareSliderProps = {
  boundsPadding: 0,
  handle: undefined,
  itemOne: undefined,
  itemTwo: undefined,
  onlyHandleDraggable: false,
  onPositionChange: undefined,
  keyboardIncrement: 20,
  portrait: false,
  position: 50,
};

export const argTypes: ArgTypes<ReactCompareSliderProps> = {
  boundsPadding: { control: { type: 'number' } },
  handle: { control: { type: 'function' } },
  itemOne: { control: { type: 'function' } },
  itemTwo: { control: { type: 'function' } },
  onlyHandleDraggable: { control: { type: 'boolean' } },
  onPositionChange: { control: { type: 'function' } },
  portrait: { control: { type: 'boolean' } },
  position: { control: { type: 'range', min: 0, max: 100 } },
  changePositionOnHover: { control: { type: 'boolean' } },
  keyboardIncrement: { control: { type: 'number' } },
};
