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

export const argTypes: ArgTypes<ReactCompareSliderProps> = {
  handle: { control: { type: 'function' } },
  itemOne: { control: { type: 'function' } },
  itemTwo: { control: { type: 'function' } },
  portrait: { control: { type: 'boolean' } },
  position: { control: { type: 'range', min: 0, max: 100 } },
  boundsPadding: { control: { type: 'number' } },
  onlyHandleDraggable: { control: { type: 'boolean' } },
  changePositionOnHover: { control: { type: 'boolean' } },
  keyboardIncrement: { control: { type: 'text' } },
  onPositionChange: { control: { type: 'function' } },
};
