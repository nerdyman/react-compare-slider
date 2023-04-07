import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import { PageLayout } from './PageLayout';

export async function render(pageContext: any) {
  const { Page } = pageContext;
  hydrateRoot(
    document.getElementById('page-view') as HTMLElement,
    <PageLayout>
      <Page />
    </PageLayout>,
  );
}
