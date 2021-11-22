import React, { forwardRef } from 'react';

import type { ReactCompareSliderCommonProps } from './types';

/** Container for clipped item. */
export const ContainerClip = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref): React.ReactElement => {
    const style: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      willChange: 'clip',
      userSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
    };

    return <div {...props} style={style} data-rcs="clip-item" ref={ref} />;
  }
);

ContainerClip.displayName = 'ContainerClip';

/** Container to control the handle's position. */
export const ContainerHandle = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & Pick<ReactCompareSliderCommonProps, 'portrait'>
>(
  ({ children, portrait }, ref): React.ReactElement => {
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
  }
);

ContainerHandle.displayName = 'ThisHandleContainer';
