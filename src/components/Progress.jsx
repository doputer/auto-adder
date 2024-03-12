import { useRecoilState } from 'recoil';

import StepButton from '@/components/StepButton';
import { stepState } from '@/stores/stepState';

const percentage = {
  1: 'w-0',
  2: 'w-1/2',
  3: 'w-full',
};

function Progress() {
  const [step, setStep] = useRecoilState(stepState);

  return (
    <div className="relative h-1 rounded bg-gray-200">
      <div className={`h-full bg-blue-500 ${percentage[step]}`} />
      <div className="absolute left-0 top-0 flex size-full items-center justify-between">
        {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => (
          <StepButton key={i} label={i} isActive={step >= i} handler={() => setStep(i)} />
        ))}
      </div>
    </div>
  );
}

export default Progress;
