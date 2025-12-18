import type { ComponentProps, Dispatch, ReactNode, RefObject } from 'react';
import type { ReactCompareSliderClipOption } from './consts';

/** Slider position property. */
export type ReactCompareSliderPosition = number;

export type ReactCompareSliderClip =
  (typeof ReactCompareSliderClipOption)[keyof typeof ReactCompareSliderClipOption];

/** Common props shared between components. */
export type ReactCompareSliderCommonProps = {
  /**
   * Divider position.
   * @default 50
   */
  defaultPosition?: ReactCompareSliderPosition;

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
   * Shorthand CSS `transition` property to apply to handle movement. The specific CSS property
   * to transition **must not** be provided.
   * @example '.5s ease-in-out'
   */
  transition?: string;
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
  setPosition: (position: ReactCompareSliderPosition) => void;
};

export type UseReactCompareSliderProps = Partial<ReactCompareSliderCommonProps> & {
  /**
   * CSS unit amount to limit the slideable bounds on the X-axis (landscape) or Y-axis (portrait).
   * @example '20rem'
   * @default '0%'
   */
  boundsPadding?: string;

  /**
   * Custom browsing context to use instead of the global `window` object.
   * @default globalThis
   */
  browsingContext?: typeof globalThis;

  /**
   * Whether the slider should follow the pointer on hover.
   * @default false
   */
  changePositionOnHover?: boolean;

  /**
   * Whether to clip `itemOne`, `itemTwo` or `both` items.
   * @default both
   */
  clip?: ReactCompareSliderClip;

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
  onPositionChange?: (position: ReactCompareSliderPosition) => void;
};

export type SetPositionFromBoundsProps = {
  /** X coordinate to update to (landscape). */
  x: number;
  /** Y coordinate to update to (portrait). */
  y: number;
  /** Whether to calculate using page X and Y offsets (required for pointer events). */
  isOffset?: boolean;
};

export type UseReactCompareSliderReturn = Required<
  Pick<
    UseReactCompareSliderProps,
    | 'boundsPadding'
    | 'browsingContext'
    | 'changePositionOnHover'
    | 'clip'
    | 'defaultPosition'
    | 'disabled'
    | 'keyboardIncrement'
    | 'onlyHandleDraggable'
    | 'portrait'
  >
> &
  Pick<ReactCompareSliderCommonProps, 'transition'> & {
    // Events
    onKeyDown: (event: KeyboardEvent) => void;
    onPointerDown: (event: PointerEvent) => void;
    onPointerMove: (event: PointerEvent) => void;
    onPointerUp: (event: PointerEvent) => void;
    onTouchEnd: (event: TouchEvent) => void;
    onHandleRootClick: (event: PointerEvent) => void;
    // State
    /** Whether the `transition` property should be applied. */
    canTransition: boolean;
    hasBrowsingContextBinding: RefObject<boolean>;
    /** Whether the slider is currently moving. */
    isDragging: boolean;
    /** Ref with the current position. */
    position: RefObject<ReactCompareSliderPosition>;
    // Setters
    /** Set the position directly as a percentage. */
    setPosition: (nextPosition: number) => void;
    /** Set the position from the coords of an event. */
    setPositionFromBounds: (props: SetPositionFromBoundsProps) => void;
    // Elements
    /** Root element. */
    rootRef: RefObject<HTMLDivElement | null>;
    /** The direct parent element of the `handle` component. */
    handleRootRef: RefObject<HTMLButtonElement | null>;
    // TODO: See if this should be ref ??
    interactiveTarget: HTMLElement | null;
  };

/** Props for the pre-built `ReactCompareSlider` component. */
export type ReactCompareSliderProps = UseReactCompareSliderProps & {
  /** Custom handle component. */
  handle?: ReactNode;
  /** First item to show. */
  itemOne: ReactNode;
  /** Second item to show. */
  itemTwo: ReactNode;
};

/** `ReactCompareSliderProps` and all valid `div` element props. */
export type ReactCompareSliderDetailedProps = Omit<
  ReactCompareSliderProps & ComponentProps<'div'>,
  'children'
>;
