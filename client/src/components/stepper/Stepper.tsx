import { ReactNode } from "react";
import { StepperProvider } from "./StepperContext";
import { StepperNav } from "./StepperNav";

interface StepperProps {
  steps: string[];
  children: ReactNode;
  initialStep?: number;
}

export function Stepper({ steps, children, initialStep = 0 }: StepperProps) {
  return (
    <StepperProvider steps={steps} initialStep={initialStep}>
      <div className="space-y-6">
        <StepperNav />
        {children}
      </div>
    </StepperProvider>
  );
}

interface StepProps {
  step: number;
  children: ReactNode;
}

export function Step({ step, children }: StepProps) {
  return <div data-step={step}>{children}</div>;
}