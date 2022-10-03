/** Slider position property. */
export type ReactCompareSliderPropPosition = number;

/** Common props shared between components. */
export interface ReactCompareSliderCommonProps {
  /** Orientation. */
  portrait?: boolean;
  /** Divider position. */
  position: ReactCompareSliderPropPosition;
}

/** Comparison slider properties. */
export interface ReactCompareSliderProps extends Partial<ReactCompareSliderCommonProps> {
  /** Padding in pixels to limit the slideable bounds on the X-axis (landscape) or Y-axis (portrait). */
  boundsPadding?: number;
  /** Whether the slider should follow the pointer on hover. */
  changePositionOnHover?: boolean;
  /** Custom handle component. */
  handle?: React.ReactNode;
  /** First item to show. */
  itemOne: React.ReactNode;
  /** Second item to show. */
  itemTwo: React.ReactNode;
  /** How many pixels to move when the slider handle is focused and keyboard arrow is pressed. */
  keyboardIncrement?: number;
  /** Whether to only change position when handle is interacted with (useful for touch devices). */
  onlyHandleDraggable?: boolean;
  /** Callback on position change with position as percentage. */
  onPositionChange?: (position: ReactCompareSliderPropPosition) => void;
}

/** `ReactCompareSliderProps` *and* all valid `div` element props.  */
export type ReactCompareSliderDetailedProps = ReactCompareSliderProps &
  React.HtmlHTMLAttributes<HTMLDivElement>;
