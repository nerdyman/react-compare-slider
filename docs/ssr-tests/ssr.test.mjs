// @ts-check
/* eslint no-console: 0 */
const assert = await import('node:assert');
const { describe, it } = await import('node:test');

const React = await import('react');
const { renderToStaticMarkup } = await import('react-dom/server');

const { render } = await import('./ssr.mjs');

describe('SSR', () => {
  it('should render without error', ({ mock }) => {
    const mockConsoleError = mock.method(console, 'error');
    const mockConsoleWarn = mock.method(console, 'warn');

    const root = render();

    assert.strictEqual(React.isValidElement(root), true);
    assert.strictEqual(renderToStaticMarkup(root).includes('data-rcs="root"'), true);
    assert.strictEqual(renderToStaticMarkup(root).includes('src="example-1.jpg"'), true);
    assert.strictEqual(renderToStaticMarkup(root).includes('src="example-2.jpg"'), true);
    assert.strictEqual(mockConsoleError.mock.calls.length, 0);
    assert.strictEqual(mockConsoleWarn.mock.calls.length, 0);
  });
});
