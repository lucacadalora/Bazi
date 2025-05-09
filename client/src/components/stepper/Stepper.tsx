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
      <div className="w-full">
        <StepperNav />
        <div className="mt-8">{children}</div>
      </div>
    </StepperProvider>
  );
}

interface StepProps {
  step: number;
  children: ReactNode;
}

export function Step({ step, children }: StepProps) {
  return (
    <div className="space-y-6">{children}</div>
  );
}