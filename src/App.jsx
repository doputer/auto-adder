import { useRecoilValue } from 'recoil';

import Progress from '@/components/Progress';
import Upload from '@/components/Upload';
import Matrix from '@/components/Matrix';
import Download from '@/components/Download';
import { stepState } from '@/stores/stepState';

function App() {
  const step = useRecoilValue(stepState);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-500">
      <div className="w-full max-w-2xl space-y-16 rounded-xl bg-white p-8">
        <Progress />
        {step === 1 && <Upload />}
        {step === 2 && <Matrix />}
        {step === 3 && <Download />}
      </div>
    </div>
  );
}

export default App;
