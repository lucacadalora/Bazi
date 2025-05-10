import { useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baziReadingSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { submitBaziReading } from "@/lib/openai";
import { useMutation } from "@tanstack/react-query";
import { Stepper } from "./stepper/Stepper";
import { StepperButtons } from "./stepper/StepperButtons";
import { useStepperContext } from "./stepper/StepperContext";
import { Step1Personal } from "./steps/Step1Personal";
import { Step2Birth } from "./steps/Step2Birth";
import { Step3Extras } from "./steps/Step3Extras";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

// Extend the schema with validation
const formSchema = baziReadingSchema.extend({
  privacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy and terms of service",
  }),
  email: z.string().email().optional(),
});

type BaziFormValues = z.infer<typeof formSchema>;

interface BaziFormProps {
  onAnalysisComplete: (data: any) => void;
  setActiveTab: (tab: string) => void;
}

// StepContent component to conditionally render step content
function StepContent({ step }: { step: number }) {
  const { currentStep } = useStepperContext();
  
  if (currentStep !== step) {
    return null;
  }
  
  return (
    <div className="animate-fadeIn">
      {step === 0 && <Step1Personal />}
      {step === 1 && <Step2Birth />}
      {step === 2 && <Step3Extras />}
    </div>
  );
}

export default function BaziForm({ onAnalysisComplete, setActiveTab }: BaziFormProps) {
  const { toast } = useToast();
  
  // Initialize form with default values
  const form = useForm<BaziFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      birthDate: "",
      birthTime: "",
      isExactTime: true,
      birthCity: "",
      bloodType: undefined,
      religion: "",
      maritalStatus: undefined,
      currentCity: "",
      interests: [],
      privacy: false,
    },
  });

  // Mutation for submitting form
  const mutation = useMutation({
    mutationFn: submitBaziReading,
    onSuccess: (data) => {
      onAnalysisComplete(data);
      setActiveTab("analysis");
      toast({
        title: "BaZi Analysis Complete",
        description: "Your personalized reading is ready to view.",
      });
    },
    onError: (error) => {
      console.error("Error submitting BaZi reading:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate BaZi analysis",
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  function onSubmit(values: BaziFormValues) {
    console.log("Submitting form with values:", values);
    mutation.mutate(values);
  }

  // Define steps for the stepper
  const steps = ["Personal", "Birth Details", "Additional Info"];
  
  return (
    <Form {...form}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
          <Stepper steps={steps}>
            <div className="bg-white/80 shadow-md rounded-lg p-6">
              <StepContent step={0} />
              <StepContent step={1} />
              <StepContent step={2} />
              
              <FormField
                control={form.control}
                name="privacy"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <div className="flex items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="privacy"
                        />
                      </FormControl>
                      <FormLabel htmlFor="privacy" className="ml-2 text-sm text-gray-700">
                        I agree to the <a href="#" className="text-primary hover:underline">privacy policy</a> and <a href="#" className="text-primary hover:underline">terms of service</a>
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <StepperButtons 
                completeText={mutation.isPending ? "Processing..." : "Generate BaZi Analysis"}
                nextDisabled={mutation.isPending}
              />
            </div>
          </Stepper>
                 
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">Your analysis will be ready in about 30 seconds</p>
          </div>
        </form>
      </FormProvider>
    </Form>
  );
}