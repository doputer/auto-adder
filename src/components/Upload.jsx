import { useRef, useState } from 'react';

function Upload() {
  const ref = useRef(null);
  const [isComplete, setComplete] = useState(false);

  const handler = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();

    fileReader.onload = () => console.log(fileReader.result);
    fileReader.readAsText(files[0]);

    setComplete(true);
  };

  return (
    <div className="h-16 w-full">
      {isComplete ? (
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
