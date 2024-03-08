import Progress from '@/components/Progress';
import Upload from '@/components/Upload';
import Matrix from '@/components/Matrix';

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-500">
      <div className="w-full max-w-2xl space-y-16 rounded-xl bg-white p-8">
        <Progress />
        <Upload />
        {/* <Matrix /> */}
      </div>
    </div>
  );
}

export default App;
