'use client';

import type { ComponentProps, CSSProperties, FC } from 'react';
import { useReactCompareSliderContext } from './context';

type ThisArrowProps = {
  /** Whether to flip the arrow direction. */
  flip?: boolean;
};

const ThisArrow: FC<ThisArrowProps> = ({ flip }) => {
  const style: CSSProperties = {
    width: 0,
    height: 0,
    borderTop: '0.5rem solid transparent',
    borderRight: '0.625rem solid',
    borderBottom: '0.5rem solid transparent',
    transform: flip ? 'rotate(180deg)' : undefined,
  };

  return <div className="__rcs-handle-arrow" style={style} />;
};

/** Props for `ReactCompareSliderHandle`. */
export type ReactCompareSliderHandleProps = {
  /** Optional styles for handle the button. */
  buttonStyle?: CSSProperties;
  /** Optional styles for lines either side of the handle button. */
  linesStyle?: CSSProperties;
  /** Optional styles for the handle root. */
  style?: CSSProperties;
};

export type ReactCompareSliderDetailedHandleProps = ComponentProps<'div'> & ReactCompareSliderHandleProps;

/** Default `handle`. */
export const ReactCompareSliderHandle: FC<ReactCompareSliderDetailedHandleProps> = ({
  className = '__rcs-handle-root',
  buttonStyle,
  linesStyle,
  style,
  ...props
}) => {
  const { disabled, portrait } = useReactCompareSliderContext();

  const appliedStyle: CSSProperties = {
    display: 'flex',
    flexDirection: portrait ? 'row' : 'column',
    placeItems: 'center',
    height: '100%',
    cursor: disabled ? 'not-allowed' : portrait ? 'ns-resize' : 'ew-resize',
    pointerEvents: 'none',
    color: '#fff',
    ...style,
  };

  const appliedLinesStyle: CSSProperties = {
    flexGrow: 1,
    height: portrait ? 2 : '100%',
    width: portrait ? '100%' : 2,
    backgroundColor: 'currentColor',
    pointerEvents: 'auto',
    boxShadow: '0 0 4px rgba(0,0,0,.5)',
    ...linesStyle,
  };

  const appliedButtonStyle: CSSProperties = {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '0.5rem',
    placeContent: 'center',
    flexShrink: 0,
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: 2,
    pointerEvents: 'auto',
    backdropFilter: 'blur(0.5rem)',
    WebkitBackdropFilter: 'blur(0.5rem)', // For Safari.
    backgroundColor: 'rgba(0, 0, 0, 0.125)',
    boxShadow: '0 0 4px rgba(0,0,0,.35)',
    transform: `${portrait ? 'rotate(90deg) ' : ''}translateZ(0)`,
    backfaceVisibility: 'hidden',
    ...buttonStyle,
  };

  return (
    <div {...props} className={className} style={appliedStyle}>
      <div className="__rcs-handle-line" style={appliedLinesStyle} />
      <div className="__rcs-handle-button" style={appliedButtonStyle}>
        <ThisArrow />
        <ThisArrow flip />
      </div>
      <div className="__rcs-handle-line" style={appliedLinesStyle} />
    </div>
  );
};
