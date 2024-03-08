import { useRecoilValue } from 'recoil';

import { dataState } from '@/stores/dataState';

import { findAndReplace } from 'hast-util-find-and-replace';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import { createElement, useState } from 'react';

function Download() {
  const [a, b] = useState([]);
  const [isComplete, setComplete] = useState(false);
  const data = useRecoilValue(dataState);

  const createFile = async (ast, data) => {
    const filename = data[0];
    const regexp = data.slice(1).map((el, index) => [new RegExp(index), el]);
    const obj = JSON.parse(JSON.stringify(ast));

    findAndReplace(obj, regexp);

    const file = new Blob([toHtml(obj)], { type: 'text/html' });

    b([
      ...a,
      createElement(
        'a',
        {
          href: URL.createObjectURL(file),
          download: `${filename}.html`,
        },
        `${filename}.html`
      ),
    ]);
  };

  const handleButtonClick = async () => {
    const templateHtml = fromHtml(data.template);

    await Promise.all(data.matrix.map((m) => createFile(templateHtml, m)));

    setComplete(true);
  };

  return (
    <div className="h-96 w-full">
      {isComplete ? (
        <div className="flex size-full select-none items-center justify-center rounded border-2 border-dashed border-blue-500 text-blue-500">
          Download Complete!
          {a.map((el) => el)}
        </div>
      ) : (
        <button
          onClick={handleButtonClick}
          className="size-full rounded border-2 border-dashed border-gray-200 text-gray-500"
        >
          Create Files
        </button>
      )}
    </div>
  );
}

export default Download;
