import React from 'react';

import { ReactCompareSliderCommonProps } from './types';

interface ThisArrowProps {
    /** Whether to flip the arrow direction. */
    flip?: boolean;
}

const ThisArrow: React.FC<ThisArrowProps> = ({ flip }) => {
    const style: React.CSSProperties = {
        width: 0,
        height: 0,
        borderTop: '8px solid transparent',
        borderRight: '10px solid',
        borderBottom: '8px solid transparent',
        transform: flip ? 'rotate(180deg)' : undefined,
    };

    return <div style={style} />;
};

/** Props for `ReactCompareSliderHandle`. */
export interface ReactCompareSliderHandleProps
    extends Pick<ReactCompareSliderCommonProps, 'portrait'> {
    /** Optional styles for handle the button. */
    buttonStyle?: React.CSSProperties;
    /** Optional styles for lines either side of the handle button. */
    linesStyle?: React.CSSProperties;
    /** Optional styles for the handle root. */
    style?: React.CSSProperties;
}

/** Default `handle`. */
export const ReactCompareSliderHandle: React.FC<ReactCompareSliderHandleProps> = ({
    portrait,
    buttonStyle,
    linesStyle,
    style,
    ...props
}): React.ReactElement => {
    const _style: React.CSSProperties = {
        display: 'flex',
        flexDirection: portrait ? 'row' : 'column',
        placeItems: 'center',
        height: '100%',
        cursor: portrait ? 'ns-resize' : 'ew-resize',
        pointerEvents: 'none',
        color: '#fff',
        ...style,
    };

    const _linesStyle: React.CSSProperties = {
        flexGrow: 1,
        height: portrait ? 2 : '100%',
        width: portrait ? '100%' : 2,
        backgroundColor: 'currentColor',
        pointerEvents: 'auto',
        boxShadow: '0 0 7px rgba(0,0,0,.35)',
        ...linesStyle,
    };

    const _buttonStyle: React.CSSProperties = {
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
        boxShadow: '0 0 7px rgba(0,0,0,.35)',
        transform: portrait ? 'rotate(90deg)' : undefined,
        ...buttonStyle,
    };

    return (
        <div className="__rcs-handle-root" {...props} style={_style}>
            <div className="__rcs-handle-line" style={_linesStyle} />
            <div className="__rcs-handle-button" style={_buttonStyle}>
                <ThisArrow />
                <ThisArrow flip />
            </div>
            <div className="__rcs-handle-line" style={_linesStyle} />
        </div>
    );
};
