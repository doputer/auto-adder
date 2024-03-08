import Progress from '@/components/Progress';

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-500">
      <div className="w-full max-w-[480px] rounded-xl bg-white p-8">
        <Progress />
      </div>
    </div>
  );
}

export default App;
