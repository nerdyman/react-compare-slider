import React, { forwardRef } from 'react';

import { ReactCompareSliderCommonProps } from './types';

/** Handle container to control position. */
export const ReactCompareSliderHandleContainer = forwardRef<
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

ReactCompareSliderHandleContainer.displayName = 'ReactCompareSliderHandleContainer';

/** Props for `ReactCompareSliderHandle`. */
export interface ReactCompareSliderHandleProps
  extends Pick<ReactCompareSliderCommonProps, 'portrait'> {
  /** Optional styles for handle button. */
  innerStyle?: React.CSSProperties;
  /** Optional styles for handle root. */
  style?: React.CSSProperties;
}

/** Overridable handle. */
export const ReactCompareSliderHandle: React.FC<ReactCompareSliderHandleProps> = ({
  portrait,
  style,
  ...props
}): React.ReactElement => {
  const rootStyle: React.CSSProperties = {
    height: portrait ? 4 : '100%',
    width: portrait ? '100%' : 4,
    backgroundColor: '#fff',
    boxShadow: '0 0 .2rem #000',
    cursor: portrait ? 'ns-resize' : 'ew-resize',
    ...style,
  };

  return <div {...props} style={rootStyle} data-rcs="handle-inner" />;
};
