/** Slider position property. */
export type ReactCompareSliderPropPosition = number;

/** Common props shared between components. */
export interface ReactCompareSliderCommonProps {
    /** Orientation. */
    portrait?: boolean;
    /** Divider position. */
    position: ReactCompareSliderPropPosition;
}
