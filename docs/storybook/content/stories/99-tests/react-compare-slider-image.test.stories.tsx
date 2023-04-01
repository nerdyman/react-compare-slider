import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { waitFor, within } from '@storybook/testing-library';
import React from 'react';
import {
  ReactCompareSliderImage as BaseReactCompareSliderImage,
  styleFitContainer,
} from 'react-compare-slider';

export default {
  title: 'Tests/E2E/ReactCompareSliderImage',
} as Meta;

/** Default image. */
export const ReactCompareSliderImage = (args) => <BaseReactCompareSliderImage {...args} />;

ReactCompareSliderImage.args = {
  alt: 'testaroo',
  src: 'https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-1.png',
};

ReactCompareSliderImage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() =>
    expect(canvas.getByAltText(ReactCompareSliderImage.args.alt)).toBeInTheDocument(),
  );

  // Ensure default styles have been applied to `ReactCompareSliderImage`.
  expect(canvas.getByAltText(ReactCompareSliderImage.args.alt).style).toMatchObject(
    styleFitContainer() as Record<string, unknown>,
  );
};
