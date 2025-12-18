'use client';

import type { FC } from 'react';

import { HandleRoot, Item, Root } from './components';
import { Provider } from './context';
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
  onlyHandleDraggable,
  portrait,
  transition,
  canTransition,
  isDragging,
  onKeyDown,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onTouchEnd,
  handleRootRef,
  hasBrowsingContextBinding,
  rootRef,
  setPosition,
  interactiveTarget,
  position,
  setPositionFromBounds,
  ...props
}) => {
  return (
    <Provider
      boundsPadding={boundsPadding}
      browsingContext={browsingContext}
      changePositionOnHover={changePositionOnHover}
      clip={clip}
      defaultPosition={defaultPosition}
      disabled={disabled}
      keyboardIncrement={keyboardIncrement}
      onlyHandleDraggable={onlyHandleDraggable}
      portrait={portrait}
      transition={transition}
      canTransition={canTransition}
      isDragging={isDragging}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onTouchEnd={onTouchEnd}
      handleRootRef={handleRootRef}
      rootRef={rootRef}
      interactiveTarget={interactiveTarget}
      setPosition={setPosition}
      position={position}
      setPositionFromBounds={setPositionFromBounds}
      hasBrowsingContextBinding={hasBrowsingContextBinding}
    >
      <Root {...props}>
        <Item item="itemOne">{itemOne}</Item>
        <Item item="itemTwo">{itemTwo}</Item>
        <HandleRoot>{handle || <ReactCompareSliderHandle />}</HandleRoot>
      </Root>
    </Provider>
  );
};
