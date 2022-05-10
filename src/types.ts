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
  /** Padding to limit the slideable bounds in pixels on the X-axis (landscape) or Y-axis (portrait). */
  boundsPadding?: number;
  /** Whether the slider should follow the pointer on hover. */
  changePositionOnHover?: boolean;
  /** Custom handle component. */
  handle?: React.ReactNode;
  /** First item to show. */
  itemOne: React.ReactNode;
  /** Second item to show. */
  itemTwo: React.ReactNode;
  /** Whether to only change position when handle is interacted with (useful for touch devices). */
  onlyHandleDraggable?: boolean;
  /** Callback on position change with position as percentage. */
  onPositionChange?: (position: ReactCompareSliderPropPosition) => void;
  /** CSS `transition` to apply when slider is touched / clicked. */
  transition?: string;
}

/** `ReactCompareSliderProps` combined with all valid `div` element props. */
export type ReactCompareSliderDetailedProps = ReactCompareSliderProps &
  React.HtmlHTMLAttributes<HTMLDivElement>;

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

/** Props for `ReactCompareSliderImage`. */
export type ReactCompareSliderImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
