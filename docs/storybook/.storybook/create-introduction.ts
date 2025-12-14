import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

/**
 * Copy the root readme and format it to be the Storybook introduction page.
 */
export const createIntroduction = () => {
  const readmePath = path.join(dirname, '../../../README.md');
  const introductionPath = path.join(dirname, '../content/00-introduction.mdx');

  console.info('\n[vite.config] Copying readme', {
    from: `file://${readmePath}`,
    to: `file://${introductionPath}`,
  });

  const readmeContents = fs.readFileSync(readmePath, 'utf8');
  const introductionContents = `
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Docs/Introduction" />

${readmeContents}
`;

  fs.writeFile(introductionPath, introductionContents, (error) => {
    if (error) {
      console.error('[vite.config] Error copying README.md to Storybook introduction page:', error);
      process.exit(1);
    }
  });
};
