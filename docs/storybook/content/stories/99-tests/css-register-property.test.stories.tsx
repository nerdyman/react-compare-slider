import type { Meta, StoryFn } from '@storybook/react-vite';
import type { ReactCompareSlider, ReactCompareSliderProps } from 'react-compare-slider';
import { ReactCompareSliderCssVars } from 'react-compare-slider/consts';
import { expect, waitFor } from 'storybook/test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/CssRegisterProperty',
};
export default meta;

export const CssRegisterProperty: StoryFn<ReactCompareSliderProps> = () => <></>;

// CSS.registerProperty will throw if registered multiple times the lib handles this and should not throw.
CssRegisterProperty.play = async ({ mount }) => {
  CSS.registerProperty({
    name: ReactCompareSliderCssVars.rawPosition,
    syntax: '<percentage>',
    inherits: true,
    initialValue: '50%',
  });

  let Slider: typeof ReactCompareSlider = undefined as unknown as typeof ReactCompareSlider;

  await expect(
    (async () => {
      Slider = (await import('react-compare-slider')).ReactCompareSlider;
    })(),
  ).resolves.not.toThrowError();

  const canvas = await mount(<Slider itemOne={<div>One</div>} itemTwo={<div>Two</div>} />);
  const slider = await canvas.findByRole('slider');

  await waitFor(() => expect(slider).toBeInTheDocument());
};
