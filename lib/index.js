import fs from 'fs/promises';
import path from 'path';

import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import { findAndReplace } from 'hast-util-find-and-replace';

const __dirname = path.resolve();

const main = async () => {
  const html = await fs.readFile(
    path.resolve(__dirname, 'data/template.html'),
    { encoding: 'utf-8' }
  );
  const tree = fromHtml(html, { fragment: true });

  findAndReplace(tree, [
    [/0/, 'or'],
    [/1/, 'and'],
    [/2/, 'nor'],
  ]);

  fs.writeFile(path.resolve(__dirname, 'data/output.html'), toHtml(tree));
};

main();
