import { Button } from "@/components/ui/button";
import { useStepperContext } from "./StepperContext";

interface StepperButtonsProps {
  onComplete?: () => void;
  completeText?: string;
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

  return (
    <div className="mt-8 flex justify-between">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={isFirstStep || backDisabled}
        type="button"
      >
        Back
      </Button>
      
      {isLastStep ? (
        <Button 
          onClick={onComplete} 
          disabled={nextDisabled}
          className="bg-accent hover:bg-accent-dark text-ink"
          type="button"
        >
          {completeText}
        </Button>
      ) : (
        <Button 
          onClick={nextStep} 
          disabled={nextDisabled}
          className="bg-accent hover:bg-accent-dark text-ink"
          type="button"
        >
          Next
        </Button>
      )}
    </div>
  );
}