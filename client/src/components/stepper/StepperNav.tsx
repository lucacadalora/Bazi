import { useStepperContext } from "./StepperContext";

export function StepperNav() {
  const { steps, currentStep, goToStep } = useStepperContext();
  
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div 
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
              index <= currentStep 
                ? "border-primary bg-primary text-white" 
                : "border-gray-300 bg-white text-gray-500"
            } cursor-pointer`}
            onClick={() => {
              // Only allow clicking on completed steps or the next step
              if (index <= currentStep + 1) {
                goToStep(index);
              }
            }}
          >
            {index + 1}
          </div>
          
          {index < steps.length - 1 && (
            <div 
              className={`w-12 h-1 mx-1 ${
                index < currentStep ? "bg-primary" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}