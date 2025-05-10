import React from "react";
import { useStepperContext } from "./StepperContext";
import { Button } from "@/components/ui/button";

interface StepperNavigationButtonsProps {
  isPending: boolean;
  completeText: string;
}

export function StepperNavigationButtons({ 
  isPending, 
  completeText 
}: StepperNavigationButtonsProps) {
  const { nextStep, prevStep, isFirstStep, isLastStep } = useStepperContext();
  
  return (
    <div className="flex justify-between mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={prevStep}
        disabled={isFirstStep || isPending}
        className="px-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Button>
      
      {isLastStep ? (
        <Button
          type="submit"
          disabled={isPending}
          className="px-6 bg-primary hover:bg-primary-dark transition-colors"
        >
          {isPending ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : completeText}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={nextStep}
          disabled={isPending}
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