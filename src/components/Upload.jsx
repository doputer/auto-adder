import { useRecoilState } from 'recoil';

import { dataState } from '@/stores/dataState';

function Upload() {
  const [data, setData] = useRecoilState(dataState);

  const handler = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();

    fileReader.onload = () => setData((prev) => ({ ...prev, template: fileReader.result }));
    fileReader.readAsText(files[0]);
  };

  return (
    <div className="h-96 w-full select-none">
      {data.template ? (
        <div className="flex size-full items-center justify-center border-2 border-blue-500 text-blue-500">
          Complete!
        </div>
      ) : (
        <label
          htmlFor="upload"
          className="flex size-full cursor-pointer items-center justify-center border-2"
        >
          Upload File
          <input id="upload" type="file" className="hidden" onChange={handler} />
        </label>
      )}
    </div>
  );
}

export default Upload;
