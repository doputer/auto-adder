import { createElement, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { findAndReplace } from 'hast-util-find-and-replace';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';

import { dataState } from '@/stores/dataState';

const createFile = (tree, data) => {
  const filename = data[0] + '.html';
  const pairs = data.slice(1).map((el, index) => [new RegExp(index), el]);
  const copiedTree = JSON.parse(JSON.stringify(tree));

  findAndReplace(copiedTree, pairs);

  const file = new Blob([toHtml(copiedTree)], { type: 'text/html' });

  return [filename, file];
};

function Download() {
  const data = useRecoilValue(dataState);

  const downloadLinks = useMemo(() => {
    const tree = fromHtml(data.template);
    const links = data.matrix.map((el) => {
      const [filename, file] = createFile(tree, el);

      return createElement(
        'a',
        {
          key: filename,
          href: URL.createObjectURL(file),
          download: filename,
          className: 'block p-4 hover:bg-gray-100',
        },
        filename
      );
    });

    return links;
  }, [data]);

  return (
    <div className="h-96 w-full overflow-auto border-2">{downloadLinks.map((link) => link)}</div>
  );
}

export default Download;
