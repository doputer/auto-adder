function StepButton({ label, isActive, handler }) {
  return (
    <button
      onClick={handler}
      className={`flex size-4 items-center justify-center rounded-full border-4 bg-white p-4 ${isActive ? 'border-blue-500 text-blue-500' : 'border-gray-200'}`}
    >
      {label}
    </button>
  );
}

export default StepButton;
