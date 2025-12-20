export const ReactCompareSliderClipOption = {
  both: 'both',
  itemOne: 'itemOne',
  itemTwo: 'itemTwo',
} as const;

export const ReactCompareSliderCssVars = {
  /** The unclamped position of the slider as a percentage. */
  rawPosition: '--rcs-raw-position',
  /** The clamped position of the slider with bounds padding applied. */
  currentPosition: '--rcs-current-position',
  /** The `boundsPadding` prop value. */
  boundsPadding: '--rcs-bounds-padding',
} as const;
