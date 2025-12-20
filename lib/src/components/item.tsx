'use client';

import type { ComponentPropsWithoutRef, CSSProperties, FC } from 'react';

import { useReactCompareSliderContext } from './context';
import { ReactCompareSliderClipOption, ReactCompareSliderCssVars } from '../consts';
import type { ReactCompareSliderClip, ReactCompareSliderProps } from '../types';

type GetClipPathProps = Pick<ReactCompareSliderProps, 'portrait'> & {
  itemClip?: Extract<ReactCompareSliderClip, 'itemOne' | 'itemTwo'>;
};

const getClipPath = ({ itemClip, portrait }: GetClipPathProps): CSSProperties['clipPath'] => {
  if (itemClip === ReactCompareSliderClipOption.itemOne) {
    return portrait
      ? `inset(0px 0px calc(100% - var(${ReactCompareSliderCssVars.currentPosition})) 0px)`
      : `inset(0px calc(100% - var(${ReactCompareSliderCssVars.currentPosition})) 0px 0px)`;
  }

  if (itemClip === ReactCompareSliderClipOption.itemTwo) {
    return portrait
      ? `inset(var(${ReactCompareSliderCssVars.currentPosition}) 0px 0px 0px)`
      : `inset(0px 0px 0px var(${ReactCompareSliderCssVars.currentPosition}))`;
  }

  return 'none';
};

export type ContainerItemProps = ComponentPropsWithoutRef<'div'> & {
  item?: Extract<ReactCompareSliderClip, 'itemOne' | 'itemTwo'>;
};

/**
 * Container for `itemOne  and `itemTwo`.
 */
export const Item: FC<ContainerItemProps> = ({ item, style, ...props }) => {
  const { clip, portrait, transition } = useReactCompareSliderContext();

  const shouldClip = clip === ReactCompareSliderClipOption.both || clip === item;
  const itemClip = shouldClip ? item : undefined;

  const appliedStyle: CSSProperties = {
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    WebkitPerspective: 1000,
    gridArea: '1 / 1',
    maxWidth: '100%',
    overflow: 'hidden',
    clipPath: getClipPath({ itemClip, portrait }),
    boxSizing: 'border-box',
    transform: 'translateZ(0)',
    transition: transition ? `clip-path ${transition}` : undefined,
    userSelect: 'none',
    zIndex: item === ReactCompareSliderClipOption.itemOne ? 1 : undefined,
    willChange: 'clip-path',
    ...style,
  };

  return <div {...props} style={appliedStyle} data-rcs="clip-item" data-rcs-item={item} />;
};
