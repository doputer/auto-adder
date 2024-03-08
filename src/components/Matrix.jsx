import { useMemo, useState } from 'react';

function Matrix() {
  const [tab, setTab] = useState(1);
  const [isTranspose, setTranspose] = useState(false);
  const [text, setText] = useState('');

  const matrix = useMemo(() => {
    const tempMatrix = text
      .split(/\n|\r/)
      .filter(Boolean)
      .map((row) => row.split(/\t/));

    if (!isTranspose) return tempMatrix;

    const transposedMatrix = tempMatrix[0].map((_, i) => tempMatrix.map((row) => row[i]));
    return transposedMatrix;
  }, [text, isTranspose]);

  return (
    <div className="relative h-96 w-full">
      <div className="absolute bottom-full left-0 flex w-48 divide-x-2 rounded-t border-2 border-b-0">
        <button onClick={() => setTab(1)} className={`flex-1 ${tab === 1 && 'text-blue-500'}`}>
          Textarea
        </button>
        <button onClick={() => setTab(2)} className={`flex-1 ${tab === 2 && 'text-blue-500'}`}>
          Table
        </button>
      </div>
      <div className="absolute bottom-full right-0">
        <input
          onChange={(e) => setTranspose(e.target.checked)}
          id="transpose"
          type="checkbox"
          className="mr-1"
        />
        <label htmlFor="transpose" className="select-none">
          Transpose
        </label>
      </div>
      <div className="size-full overflow-auto rounded rounded-ss-none border-2">
        {tab === 1 && (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="box-border size-full resize-none pl-2 outline-none"
          />
        )}
        {tab === 2 && (
          <table>
            <thead />
            <tbody className="divide-y">
              {matrix.map((row, i) => (
                <tr key={i} className="divide-x">
                  {row.map((col, j) => (
                    <td key={j} className="text-nowrap pl-2">
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
