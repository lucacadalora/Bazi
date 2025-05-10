import { useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baziReadingSchema } from "@shared/schema";
import { YinYangIcon } from "./icons/ElementIcons";
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
  const [interestsList, setInterestsList] = useState<string[]>([]);
  
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
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate BaZi analysis",
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  function onSubmit(values: BaziFormValues) {
    // Submit the form data
    mutation.mutate(values);
  }

  // Define steps for the stepper
  const steps = ["Personal", "Birth Details", "Additional Info"];
  
  // Update interests array before form submission
  const handleFormSubmit = form.handleSubmit((values) => {
    // Make sure interests are included
    onSubmit(values);
  });

  return (
    <Form {...form}>
      <FormProvider {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-8 max-w-4xl mx-auto">
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
                completeText={mutation.isPending ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : "Generate BaZi Analysis"}
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