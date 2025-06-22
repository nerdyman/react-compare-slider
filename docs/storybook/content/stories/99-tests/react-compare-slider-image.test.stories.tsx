import { expect } from '@storybook/jest';
import type { Meta, StoryFn } from '@storybook/react';
import { waitFor, within } from '@storybook/testing-library';
import type { ReactCompareSlider, ReactCompareSliderImageProps } from 'react-compare-slider';
import {
  ReactCompareSliderImage as BaseReactCompareSliderImage,
  styleFitContainer,
} from 'react-compare-slider';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/ReactCompareSliderImage',
};
export default meta;

/** Default image. */
export const ReactCompareSliderImage: StoryFn<ReactCompareSliderImageProps> = (args) => (
  <BaseReactCompareSliderImage {...args} />
);

ReactCompareSliderImage.args = {
  alt: 'testaroo',
  src: 'https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-1.png',
};

ReactCompareSliderImage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() => expect(canvas.getByAltText(ReactCompareSliderImage.args!.alt!)).toBeInTheDocument());

  // Ensure default styles have been applied to `ReactCompareSliderImage`.
  await waitFor(() =>
    expect(canvas.getByAltText(ReactCompareSliderImage.args!.alt!).style).toMatchObject(
      styleFitContainer() as Record<string, unknown>,
    ),
  );
};

/** Default image. */
export const ReactCompareSliderImageCustomStyle = (args) => <BaseReactCompareSliderImage {...args} />;

ReactCompareSliderImageCustomStyle.args = {
  alt: 'testaroo',
  src: 'https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/e2e-test-1.png',
  style: { objectFit: 'fill', objectPosition: 'left center', boxSizing: 'content-box' },
};

ReactCompareSliderImageCustomStyle.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() => expect(canvas.getByAltText(ReactCompareSliderImage.args!.alt!)).toBeInTheDocument());

  // Ensure default styles have been applied to `ReactCompareSliderImage`.
  await waitFor(() =>
    expect(canvas.getByAltText(ReactCompareSliderImage.args!.alt!).style).toMatchObject(
      styleFitContainer({
        objectFit: 'fill',
        objectPosition: 'left center',
        boxSizing: 'content-box',
      }),
    ),
  );
};
