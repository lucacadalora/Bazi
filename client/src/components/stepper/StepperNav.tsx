import { Check } from "lucide-react";
import { useStepperContext } from "./StepperContext";
import { cn } from "@/lib/utils";

export function StepperNav() {
  const { steps, currentStep, goToStep } = useStepperContext();

  return (
    <div className="flex justify-center mb-8">
      <nav aria-label="Progress" className="w-full max-w-3xl">
        <ol
          role="list"
          className="flex items-center justify-between"
        >
          {steps.map((step, index) => {
            const isCurrent = currentStep === index;
            const isCompleted = currentStep > index;

            return (
              <li key={step} className={cn(
                "relative flex items-center",
                index !== steps.length - 1 && "w-full"
              )}>
                <button
                  type="button"
                  className={cn(
                    "group flex h-10 items-center",
                    index !== 0 && "pl-4",
                    index !== steps.length - 1 && "w-full"
                  )}
                  onClick={() => goToStep(index)}
                  disabled={!isCompleted && !isCurrent}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium",
                      isCompleted ? "bg-accent border-accent-dark text-white" : 
                      isCurrent ? "border-accent text-accent" : 
                      "border-gray-300 text-gray-500"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      "ml-2 text-sm font-medium",
                      isCompleted ? "text-accent-dark" : 
                      isCurrent ? "text-accent" : 
                      "text-gray-500"
                    )}
                  >
                    {step}
                  </span>
                </button>

                {/* Draw the connecting line between steps */}
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute right-0 hidden w-5/12 h-0.5 top-5 -translate-y-1/2 md:block",
                      isCompleted ? "bg-accent" : "bg-gray-300"
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}