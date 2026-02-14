import type { ArgTypes } from '@storybook/react-vite';
import { ReactCompareSliderClip, type ReactCompareSliderProps } from 'react-compare-slider';

/**
 * @NOTE These must reflect the default values defined in the `types.ts`.
 */
export const args: ReactCompareSliderProps = {
  boundsPadding: '0px',
  changePositionOnHover: false,
  clip: ReactCompareSliderClip.all,
  disabled: false,
  handle: undefined,
  keyboardIncrement: '5%',
  itemOne: undefined,
  itemTwo: undefined,
  onlyHandleDraggable: false,
  onPositionChange: undefined,
  portrait: false,
  defaultPosition: 50,
  transition: '0.15s ease-out',
  browsingContext: undefined,
};

export const argTypes: ArgTypes<Partial<ReactCompareSliderProps>> = {
  browsingContext: { control: { type: 'object', disable: true } },
  handle: { control: { type: 'object', disable: true } },
  itemOne: { control: { type: 'object', disable: true } },
  itemTwo: { control: { type: 'object', disable: true } },
  onPositionChange: { control: { type: 'object', disable: true } },
  defaultPosition: { control: { type: 'range', min: 0, max: 100 } },
  transition: { control: { type: 'text' } },
};
