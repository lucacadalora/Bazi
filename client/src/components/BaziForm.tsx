import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baziReadingSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { submitBaziReading } from "@/lib/openai";
import { useMutation } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";

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

export default function BaziForm({ onAnalysisComplete, setActiveTab }: BaziFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  
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

  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const isFirstStep = step === 0;
  const isLastStep = step === 2;
  
  const steps = ["Personal", "Birth Details", "Additional Info"];
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((label, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center ${idx === step ? 'text-primary font-bold' : 'text-gray-500'}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 
                    ${idx === step ? 'bg-primary text-white border-primary' : 
                      idx < step ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 text-gray-500'}`
                  }
                >
                  {idx < step ? '✓' : idx + 1}
                </div>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white/80 shadow-md rounded-lg p-6">
          {step === 0 && <Step1Personal />}
          {step === 1 && <Step2Birth />}
          {step === 2 && <Step3Extras />}
          
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
          
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={isFirstStep}
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
                disabled={mutation.isPending}
                className="px-6 bg-primary hover:bg-primary-dark transition-colors"
              >
                {mutation.isPending ? "Processing..." : "Generate BaZi Analysis"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                className="px-6"
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            )}
          </div>
        </div>
             
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">Your analysis will be ready in about 30 seconds</p>
        </div>
      </form>
    </Form>
  );
}