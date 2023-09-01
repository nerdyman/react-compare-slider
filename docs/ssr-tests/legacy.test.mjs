/* eslint no-console: 0 */

/**
 * Renders the component to a string without tests as node 16 doesn't support all the built-in
 * test utils.
 * This ensures the component renders correctly and
 */

const assert = await import('node:assert');
const { readFileSync } = await import('node:fs');
const { join } = await import('node:path');

const { renderToStaticMarkup } = await import('react-dom/server');

const { render } = await import('./ssr.mjs');

const snapshot = readFileSync(join('snapshots', 'render.snapshot.html'), 'utf8').replace('\n', '');
const output = renderToStaticMarkup(render());

console.info('Output:\n', output, '\n\nSnapshot:\n', snapshot);

assert.strictEqual(output, snapshot);
