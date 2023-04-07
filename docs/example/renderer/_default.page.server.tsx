import React from 'react';
import { renderToString } from 'react-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr/server';

import { PageLayout } from './PageLayout';

export async function render(pageContext: any) {
  const { Page } = pageContext;
  const viewHtml = dangerouslySkipEscape(
    renderToString(
      <PageLayout>
        <Page />
      </PageLayout>,
    ),
  );

  return escapeInject/*html*/ `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>React Compare Slider &ndash; Example</title>
    </head>
      <body>
        <div id="page-view">${viewHtml}</div>
      </body>
    </html>`;
}
