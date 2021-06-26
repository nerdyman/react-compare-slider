import React, { forwardRef } from 'react';

import { ReactCompareSliderCommonProps } from './types';

/** Internal container for clipped item. */
export const ThisClipContainer = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref): React.ReactElement => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    willChange: 'clip-path',
    userSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
  };

  return <div {...props} style={style} data-rcs="clip-item" ref={ref} />;
});

ThisClipContainer.displayName = 'ThisClipContainer';

/** Internal handle container to control position. */
export const ThisHandleContainer = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & Pick<ReactCompareSliderCommonProps, 'portrait'>
>(({ children, portrait }, ref): React.ReactElement => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  };

  const innerStyle: React.CSSProperties = {
    position: 'absolute',
    width: portrait ? '100%' : undefined,
    height: portrait ? undefined : '100%',
    transform: portrait ? 'translateY(-50%)' : 'translateX(-50%)',
    pointerEvents: 'all',
  };

  return (
    <div style={style} data-rcs="handle-container" ref={ref}>
      <div style={innerStyle}>{children}</div>
    </div>
  );
});

ThisHandleContainer.displayName = 'ThisHandleContainer';
