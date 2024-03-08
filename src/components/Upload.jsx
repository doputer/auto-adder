import { useRef } from 'react';
import { useRecoilState } from 'recoil';

import { dataState } from '@/stores/dataState';

function Upload() {
  const ref = useRef(null);
  const [data, setData] = useRecoilState(dataState);

  const handler = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();

    fileReader.onload = () =>
      setData((prev) => ({
        ...prev,
        template: fileReader.result,
      }));
    fileReader.readAsText(files[0]);
  };

  return (
    <div className="h-96 w-full">
      {data.template ? (
        <div className="flex size-full select-none items-center justify-center rounded border-2 border-dashed border-blue-500 text-blue-500">
          Complete!
        </div>
      ) : (
        <label
          htmlFor="upload"
          className="flex size-full cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-200 text-gray-500"
        >
          Upload File
          <input id="upload" type="file" ref={ref} className="hidden" onChange={handler} />
        </label>
      )}
    </div>
  );
}

export default Upload;
