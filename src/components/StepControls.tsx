import React from 'react';

interface StepControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
}

const StepControls: React.FC<StepControlsProps> = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious, 
  onReset 
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center mobile-stack">
      {/* Step Indicator */}
      <div className="flex items-center space-x-4 mb-4 md:mb-0 md:mx-4">
        <div className="text-quantum-accent font-semibold responsive-text">
          {currentStep + 1} / {totalSteps}
        </div>
        
        {/* Step dots */}
        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`quantum-element transition-all duration-300 rounded-full ${
                index === currentStep
                  ? 'bg-quantum-primary animate-glow'
                  : index < currentStep
                    ? 'bg-quantum-accent'
                    : 'bg-quantum-surface'
              }`}
              style={{ width: '12px', height: '12px' }}
            />
          ))}
        </div>
      </div>

      {/* Button Group */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={isFirstStep}
          className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 responsive-text ${
            isFirstStep 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-quantum-surface text-quantum-primary hover:bg-quantum-primary hover:text-quantum-background border-2 border-quantum-primary'
          }`}
        >
          ← Prev
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={isLastStep}
          className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 responsive-text ${
            isLastStep 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-quantum-primary text-quantum-background hover:bg-quantum-secondary border-2 border-quantum-primary hover:border-quantum-secondary animate-glow'
          }`}
        >
          {isLastStep ? 'Complete!' : 'Next →'}
        </button>

        {/* Reset Button */}
        {currentStep > 0 && (
          <button
            onClick={onReset}
            className="px-3 md:px-4 py-2 rounded-lg font-medium text-quantum-accent border border-quantum-accent hover:bg-quantum-accent hover:text-quantum-background transition-all duration-300 text-sm md:text-base"
          >
            🔄
          </button>
        )}
      </div>
    </div>
  );
};

export default StepControls;
