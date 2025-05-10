import React from "react";
import { useStepperContext } from "./StepperContext";
import { Button } from "@/components/ui/button";

interface StepperButtonsProps {
  onComplete?: () => void;
  completeText?: string | React.ReactNode;
  nextDisabled?: boolean;
  backDisabled?: boolean;
}

export function StepperButtons({
  onComplete,
  completeText = "Complete",
  nextDisabled = false,
  backDisabled = false,
}: StepperButtonsProps) {
  const { nextStep, prevStep, isFirstStep, isLastStep } = useStepperContext();
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <div className="flex justify-between mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={prevStep}
        disabled={isFirstStep || backDisabled}
        className="px-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Button>
      
      {isLastStep ? (
        <Button
          type={onComplete ? "button" : "submit"}
          onClick={onComplete ? handleComplete : undefined}
          disabled={nextDisabled}
          className="px-6 bg-primary hover:bg-primary-dark transition-colors"
        >
          {completeText}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={nextStep}
          disabled={nextDisabled}
          className="px-6"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      )}
    </div>
  );
}