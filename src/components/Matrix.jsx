import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { textState } from '@/stores/textState';
import { dataState } from '@/stores/dataState';

function Matrix() {
  const [tab, setTab] = useState(1);
  const [text, setText] = useRecoilState(textState);
  const setData = useSetRecoilState(dataState);

  const matrix = useMemo(() => {
    const tempMatrix = text.value
      .split(/\n|\r/)
      .filter(Boolean)
      .map((row) => row.split(/\t/));

    if (!text.isTranspose) return tempMatrix;

    const transposedMatrix = tempMatrix[0].map((_, i) => tempMatrix.map((row) => row[i]));
    return transposedMatrix;
  }, [text]);

  useEffect(() => {
    setData((prev) => ({ ...prev, matrix: [...matrix] }));
  }, [matrix]);

  return (
    <div className="relative h-96 w-full">
      <div className="absolute bottom-full left-0 flex w-full select-none items-center justify-between">
        <div className="flex w-48 divide-x-2 border-2 border-b-0">
          <button onClick={() => setTab(1)} className={`flex-1 ${tab === 1 && 'text-blue-500'}`}>
            Textarea
          </button>
          <button onClick={() => setTab(2)} className={`flex-1 ${tab === 2 && 'text-blue-500'}`}>
            Table
          </button>
        </div>
        <div className="space-x-1">
          <input
            checked={text.isTranspose}
            onChange={(e) => setText((prev) => ({ ...prev, isTranspose: e.target.checked }))}
            id="transpose"
            type="checkbox"
          />
          <label htmlFor="transpose">Transpose</label>
        </div>
      </div>
      <div className="size-full overflow-auto border-2">
        {tab === 1 && (
          <textarea
            value={text.value}
            onChange={(e) => setText((prev) => ({ ...prev, value: e.target.value }))}
            className="box-border size-full resize-none p-1 outline-none"
          />
        )}
        {tab === 2 && (
          <table>
            <thead />
            <tbody className="divide-y">
              {matrix.map((row, i) => (
                <tr key={i} className="divide-x">
                  {row.map((col, j) => (
                    <td key={j} className="text-nowrap p-1">
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot />
          </table>
        )}
      </div>
    </div>
  );
}

export default Matrix;
