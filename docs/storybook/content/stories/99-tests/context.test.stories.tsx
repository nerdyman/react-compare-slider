import type { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';
import { type ReactCompareSlider, useReactCompareSliderContext } from 'react-compare-slider';
import { expect, waitFor, within } from 'storybook/test';

const meta: Meta<typeof ReactCompareSlider> = {
  title: 'Tests/Browser/Custom Components',
};

export default meta;

class TestErrorBoundary extends React.Component<React.PropsWithChildren> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <div data-testid="error">{this.state.error.message}</div>;
    }

    return this.props.children;
  }
}

const ComponentWithoutProvider = () => {
  useReactCompareSliderContext();
  return null;
};

export const UseReactCompareSliderContextThrows: StoryFn = () => (
  <TestErrorBoundary>
    <ComponentWithoutProvider />
  </TestErrorBoundary>
);

UseReactCompareSliderContextThrows.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() => {
    expect(canvas.getByTestId('error')).toHaveTextContent(
      'useReactCompareSliderContext must be used within the Provider component',
    );
  });
};
