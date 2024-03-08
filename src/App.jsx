import Progress from '@/components/Progress';
import Upload from '@/components/Upload';

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-500">
      <div className="w-full max-w-[480px] space-y-12 rounded-xl bg-white p-8">
        <Progress />
        <Upload />
      </div>
    </div>
  );
}

export default App;
