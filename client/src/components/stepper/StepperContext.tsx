import { createContext, useContext, useState, ReactNode } from "react";

type StepperContextType = {
  currentStep: number;
  steps: string[];
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const useStepperContext = () => {
  const context = useContext(StepperContext);
  
  if (context === undefined) {
    throw new Error("useStepperContext must be used within a StepperProvider");
  }
  
  return context;
};

interface StepperProviderProps {
  children: ReactNode;
  steps: string[];
  initialStep?: number;
}

export const StepperProvider = ({
  children,
  steps,
  initialStep = 0,
}: StepperProviderProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  
  const nextStep = () => {
    setCurrentStep((prev) => {
      return prev < steps.length - 1 ? prev + 1 : prev;
    });
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => {
      return prev > 0 ? prev - 1 : prev;
    });
  };
  
  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };
  
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  
  return (
    <StepperContext.Provider
      value={{
        currentStep,
        steps,
        nextStep,
        prevStep,
        goToStep,
        isFirstStep,
        isLastStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};