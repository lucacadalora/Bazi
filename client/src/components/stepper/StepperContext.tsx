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
  if (!context) {
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
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const value = {
    currentStep,
    steps,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
  };

  return (
    <StepperContext.Provider value={value}>
      {children}
    </StepperContext.Provider>
  );
};