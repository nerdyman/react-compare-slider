'use client';

import type { FC } from 'react';

import { HandleRoot, Item, Root } from './components';
import { Provider } from './context';
import { useReactCompareSlider } from './hooks';
import { ReactCompareSliderHandle } from './ReactCompareSliderHandle';
import type { ReactCompareSliderDetailedProps } from './types';

export const ReactCompareSlider: FC<ReactCompareSliderDetailedProps> = ({
  boundsPadding,
  browsingContext,
  changePositionOnHover,
  clip,
  defaultPosition,
  disabled,
  handle,
  itemOne,
  itemTwo,
  keyboardIncrement,
  onPositionChange,
  onlyHandleDraggable,
  portrait,
  transition,
  ...props
}) => {
  const contextProps = useReactCompareSlider({
    boundsPadding,
    browsingContext,
    changePositionOnHover,
    clip,
    defaultPosition,
    disabled,
    keyboardIncrement,
    onPositionChange,
    onlyHandleDraggable,
    portrait,
    transition,
  });

  return (
    <Provider {...contextProps}>
      <Root {...props}>
        <Item item="itemOne">{itemOne}</Item>
        <Item item="itemTwo">{itemTwo}</Item>
        <HandleRoot>{handle || <ReactCompareSliderHandle />}</HandleRoot>
      </Root>
    </Provider>
  );
};
