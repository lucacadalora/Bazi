import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baziReadingSchema } from "@shared/schema";
import { YinYangIcon } from "./icons/ElementIcons";
import { useToast } from "@/hooks/use-toast";
import { submitBaziReading } from "@/lib/openai";
import { useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// Extend the schema with validation
const formSchema = baziReadingSchema.extend({
  privacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy and terms of service",
  }),
});

type BaziFormValues = z.infer<typeof formSchema>;

interface BaziFormProps {
  onAnalysisComplete: (data: any) => void;
  setActiveTab: (tab: string) => void;
}

export default function BaziForm({ onAnalysisComplete, setActiveTab }: BaziFormProps) {
  const { toast } = useToast();
  const [interestsList, setInterestsList] = useState<string[]>([]);
  
  // Initialize form with default values
  const form = useForm<BaziFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      birthTime: "",
      isExactTime: true,
      birthCity: "",
      bloodType: "",
      religion: "",
      maritalStatus: "",
      currentCity: "",
      interests: [],
      privacy: false,
    },
  });
  
  // Define available interests
  const interests = [
    { id: "career", label: "Career & Wealth" },
    { id: "relationships", label: "Relationships" },
    { id: "health", label: "Health & Wellness" },
    { id: "personal", label: "Personal Growth" },
  ];

  // Handle interests checkbox changes
  const handleInterestsChange = (checked: boolean, value: string) => {
    if (checked) {
      setInterestsList([...interestsList, value]);
    } else {
      setInterestsList(interestsList.filter(interest => interest !== value));
    }
  };

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
    // Update the interests array with the current state
    values.interests = interestsList;
    
    // Submit the form data
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="relative">
              <h2 className="font-display text-2xl font-semibold mb-6 text-ink flex items-center">
                <span className="text-primary mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                Personal Information
              </h2>
              
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <FormField
                  control={form.control}
                  name="birthTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isExactTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Accuracy</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => field.onChange(value === "true")}
                          defaultValue={field.value ? "true" : "false"}
                          className="flex items-center space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="exactTime" />
                            <FormLabel htmlFor="exactTime" className="font-normal">Exact</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="approxTime" />
                            <FormLabel htmlFor="approxTime" className="font-normal">Approximate</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="birthCity"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Birth City</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your birth city"
                          {...field}
                          className="pr-10"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </span>
                      </div>
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">This helps determine your exact cosmic position at birth</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Eastern Symbol Decoration */}
            <div className="hidden md:block relative h-48 bg-gradient-to-br from-secondary-light/20 to-primary-light/10 rounded-lg p-6 overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center spin-slow">
                <YinYangIcon className="w-24 h-24 text-primary opacity-60" />
              </div>
              
              <div className="max-w-[60%]">
                <h3 className="chinese-text text-2xl text-primary mb-2">命运</h3>
                <p className="text-sm text-gray-600">The essence of BaZi is understanding the balance of elements that shape your destiny</p>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6 text-ink flex items-center">
                <span className="text-secondary mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Additional Details
                <span className="ml-2 text-xs font-normal text-gray-500">(Optional)</span>
              </h2>
              
              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Blood Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Select blood type</SelectItem>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="AB">AB</SelectItem>
                        <SelectItem value="O">O</SelectItem>
                        <SelectItem value="unknown">Don't know</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="religion"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Religion/Spiritual Practice</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your spiritual or religious practice"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Marital Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Select status</SelectItem>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                        <SelectItem value="relationship">In a relationship</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="currentCity"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Current City of Residence</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Where you currently live"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mb-5">
                <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Areas of Interest</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  {interests.map((interest) => (
                    <div className="flex items-center" key={interest.id}>
                      <Checkbox 
                        id={interest.id} 
                        checked={interestsList.includes(interest.id)}
                        onCheckedChange={(checked) => {
                          handleInterestsChange(!!checked, interest.id);
                          const updatedInterests = checked 
                            ? [...form.getValues().interests || [], interest.id]
                            : (form.getValues().interests || []).filter(i => i !== interest.id);
                          form.setValue("interests", updatedInterests);
                        }}
                      />
                      <label
                        htmlFor={interest.id}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {interest.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Privacy Information */}
            <Card className="bg-paper">
              <CardContent className="pt-5">
                <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                  <span className="text-water mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  Privacy Protection
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your personal information is protected and only used for your BaZi analysis. 
                  We do not share your data with third parties.
                </p>
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem>
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
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-6 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Generate Your BaZi Analysis
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-2">Your analysis will be ready in about 30 seconds</p>
        </div>
      </form>
    </Form>
  );
}
