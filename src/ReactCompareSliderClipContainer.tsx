import React, { forwardRef } from 'react';

/** Container for clipped item. */
const ReactCompareSliderClipContainer = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(
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

ReactCompareSliderClipContainer.displayName = 'ReactCompareSliderClipContainer';

export { ReactCompareSliderClipContainer };
