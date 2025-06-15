import type { HtmlHTMLAttributes, ReactNode, RefAttributes } from 'react';

/** Slider position property. */
export type ReactCompareSliderPropPosition = number;

/** Common props shared between components. */
export type ReactCompareSliderCommonProps = {
  /**
   * Whether to disable slider movement (items are still interactable).
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to use portrait (vertical) orientation.
   * @default false
   */
  portrait?: boolean;

  /**
   * Divider position.
   * @default 50
   */
  position: ReactCompareSliderPropPosition;

  /**
   * Shorthand CSS `transition` property to apply to handle movement. The specific CSS property
   * to transition **must not** be provided.
   * @example '.5s ease-in-out'
   */
  transition?: string;
};

export const ReactCompareSliderClipOption = {
  both: 'both',
  itemOne: 'itemOne',
  itemTwo: 'itemTwo',
} as const;

export type ReactCompareSliderClip =
  (typeof ReactCompareSliderClipOption)[keyof typeof ReactCompareSliderClipOption];

/** Slider component props *without* ref return props. */
export type ReactCompareSliderRootProps = Partial<ReactCompareSliderCommonProps> & {
  /**
   * Padding in pixels to limit the slideable bounds on the X-axis (landscape) or Y-axis (portrait).
   * @default 0
   */
  boundsPadding?: number;

  /**
   * Custom browsing context to use instead of the global `window` object.
   * @default globalThis
   */
  browsingContext?: Window;

  /**
   * Whether the slider should follow the pointer on hover.
   * @default false
   */
  changePositionOnHover?: boolean;

  /**
   * Whether to clip `itemOne`, `itemTwo` or both items.
   * @default 'both'
   */
  clip?: ReactCompareSliderClip;

  /** Custom handle component. */
  handle?: ReactNode;
  /** First item to show. */
  itemOne: ReactNode;
  /** Second item to show. */
  itemTwo: ReactNode;

  /**
   * Percentage or pixel amount to move when the slider handle is focused and keyboard arrow is pressed.
   * @default '5%'
   */
  keyboardIncrement?: number | `${number}%`;

  /**
   * Whether to only change position when handle is interacted with (useful for touch devices).
   * @default false
   */
  onlyHandleDraggable?: boolean;

  /** Callback on position change with position as percentage. */
  onPositionChange?: (position: ReactCompareSliderPropPosition) => void;
};

/** Properties returned by the `useReactCompareSliderRef` hook. */
export type UseReactCompareSliderRefReturn = {
  /**
   * DOM node of the root container of the slider.
   * @NOTE This value is only populated **after** the slider has mounted.
   */
  rootContainer: HTMLDivElement | null;

  /**
   * DOM node of the container of the `handle` component.
   * @NOTE This value is only populated **after** the slider has mounted.
   */
  handleContainer: HTMLButtonElement | null;

  /**
   * Set the position of the slider as a percentage between `0` and `100`.
   * Updates the slider position after render without triggering re-renders.
   * @NOTE This function is only actionable **after** the slider has mounted.
   */
  setPosition: (position: ReactCompareSliderPropPosition) => void;
};

/** Slider component props *with* ref return props. */
export type ReactCompareSliderProps = ReactCompareSliderRootProps &
  RefAttributes<UseReactCompareSliderRefReturn>;

/** `ReactCompareSliderProps` and all valid `div` element props. */
export type ReactCompareSliderDetailedProps = ReactCompareSliderProps & HtmlHTMLAttributes<HTMLDivElement>;
