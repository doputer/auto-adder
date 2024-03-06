import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import { findAndReplace } from 'hast-util-find-and-replace';

const html = `<h1>0</h1><h1>1</h1><h1>2</h1>`;

const tree = fromHtml(html, { fragment: true });
console.log(toHtml(tree));

findAndReplace(tree, [
  [/0/, 'or'],
  [/1/, 'and'],
  [/2/, 'nor'],
]);
console.log(toHtml(tree));
