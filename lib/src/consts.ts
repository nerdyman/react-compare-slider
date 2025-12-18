export const EVENT_PASSIVE_PARAMS = { capture: false, passive: true };
export const EVENT_CAPTURE_PARAMS = { capture: true, passive: false };

/** Keyboard `key` events to trigger slider movement. */
export enum KeyboardEventKeys {
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
}

export const ReactCompareSliderClipOption = {
  both: 'both',
  itemOne: 'itemOne',
  itemTwo: 'itemTwo',
} as const;

export const ReactCompareSliderCssVars = {
  /** The unclamped position of the slider as a percentage. */
  rawPosition: '--rcs-raw-position',
  /** The current position of the slider as a percentage. */
  currentPosition: '--rcs-current-position',
  /** The `boundsPadding` value. */
  boundsPadding: '--rcs-bounds-padding',
} as const;
