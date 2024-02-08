import React from 'react';
import type { CSSProperties, FC, HtmlHTMLAttributes, ReactElement } from 'react';

import type { ReactCompareSliderCommonProps } from './types';

interface ThisArrowProps {
  /** Whether to flip the arrow direction. */
  flip?: boolean;
}

const ThisArrow: FC<ThisArrowProps> = ({ flip }) => {
  const style: CSSProperties = {
    width: 0,
    height: 0,
    borderTop: '8px solid transparent',
    borderRight: '10px solid',
    borderBottom: '8px solid transparent',
    transform: flip ? 'rotate(180deg)' : undefined,
  };

  return <div className="__rcs-handle-arrow" style={style} />;
};

/** Props for `ReactCompareSliderHandle`. */
export interface ReactCompareSliderHandleProps
  extends Pick<ReactCompareSliderCommonProps, 'disabled' | 'portrait'> {
  /** Optional styles for handle the button. */
  buttonStyle?: CSSProperties;
  /** Optional styles for lines either side of the handle button. */
  linesStyle?: CSSProperties;
  /** Optional styles for the handle root. */
  style?: CSSProperties;
}

/** Default `handle`. */
export const ReactCompareSliderHandle: FC<
  ReactCompareSliderHandleProps & HtmlHTMLAttributes<HTMLDivElement>
> = ({
  className = '__rcs-handle-root',
  disabled,
  buttonStyle,
  linesStyle,
  portrait,
  style,
  ...props
}): ReactElement => {
  const _style: CSSProperties = {
    display: 'flex',
    flexDirection: portrait ? 'row' : 'column',
    placeItems: 'center',
    height: '100%',
    cursor: disabled ? 'not-allowed' : portrait ? 'ns-resize' : 'ew-resize',
    pointerEvents: 'none',
    color: '#fff',
    ...style,
  };

  const _linesStyle: CSSProperties = {
    flexGrow: 1,
    height: portrait ? 2 : '100%',
    width: portrait ? '100%' : 2,
    backgroundColor: 'currentColor',
    pointerEvents: 'auto',
    boxShadow: '0 0 4px rgba(0,0,0,.5)',
    ...linesStyle,
  };

  const _buttonStyle: CSSProperties = {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: 8,
    placeContent: 'center',
    flexShrink: 0,
    width: 56,
    height: 56,
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: 2,
    pointerEvents: 'auto',
    backdropFilter: 'blur(7px)',
    WebkitBackdropFilter: 'blur(7px)', // For Safari.
    backgroundColor: 'rgba(0, 0, 0, 0.125)',
    boxShadow: '0 0 4px rgba(0,0,0,.35)',
    transform: portrait ? 'rotate(90deg)' : undefined,
    ...buttonStyle,
  };

  return (
    <div {...props} className={className} style={_style}>
      <div className="__rcs-handle-line" style={_linesStyle} />
      <div className="__rcs-handle-button" style={_buttonStyle}>
        <ThisArrow />
        <ThisArrow flip />
      </div>
      <div className="__rcs-handle-line" style={_linesStyle} />
    </div>
  );
};
