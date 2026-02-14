import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

describe('SSR', () => {
  it('renders the slider', async () => {
    expect(globalThis.CSS).toBeUndefined();

    const { ReactCompareSlider } = await import('react-compare-slider');

    const html = renderToString(
      <ReactCompareSlider itemOne={<div>Item one</div>} itemTwo={<div>Item two</div>} />,
    );

    expect(html).toContain('Item one');
    expect(html).toContain('Item two');
  });
});
