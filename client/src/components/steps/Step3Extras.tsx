import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Helper function to handle null or undefined values in inputs
const getStringValue = (value: string | null | undefined): string => {
  return value === null || value === undefined ? "" : value;
};

function MultiSelect({ 
  value = [], 
  onChange, 
  options 
}: { 
  value: string[];
  onChange: (value: string[]) => void;
  options: { id: string; label: string }[];
}) {
  const handleCheckedChange = (checked: boolean, optionId: string) => {
    if (checked) {
      onChange([...value, optionId]);
    } else {
      onChange(value.filter(id => id !== optionId));
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox 
            id={`interest-${option.id}`}
            checked={value.includes(option.id)}
            onCheckedChange={(checked) => handleCheckedChange(!!checked, option.id)}
          />
          <label 
            htmlFor={`interest-${option.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}

export function Step3Extras() {
  const form = useFormContext();
  const [interestsList, setInterestsList] = useState<string[]>(form.getValues("interests") || []);
  
  // Define available interests
  const interests = [
    { id: "career", label: "Career & Wealth" },
    { id: "relationships", label: "Relationships" },
    { id: "health", label: "Health & Wellness" },
    { id: "personal", label: "Personal Growth" },
    { id: "education", label: "Education" },
    { id: "family", label: "Family Matters" },
    { id: "travel", label: "Travel & Relocation" },
  ];
  
  // Update form value when interests change
  const handleInterestsChange = (selected: string[]) => {
    setInterestsList(selected);
    form.setValue("interests", selected, { shouldValidate: true });
    
    // Log for debugging
    console.log("Interests updated:", selected);
  };
  
  // Set interests in the parent form on component mount and update
  React.useEffect(() => {
    if (interestsList.length > 0) {
      form.setValue("interests", interestsList);
    }
  }, [form, interestsList]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="bg-accent/10 p-2 rounded-full mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink">Additional Details</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="bloodType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Type <span className="text-xs text-gray-500">(Optional)</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">Select blood type</SelectItem>
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
            <FormItem>
              <FormLabel>Religion/Spiritual Practice <span className="text-xs text-gray-500">(Optional)</span></FormLabel>
              <FormControl>
                <Input
                  placeholder="Your spiritual or religious practice"
                  {...field}
                  value={getStringValue(field.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marital Status <span className="text-xs text-gray-500">(Optional)</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">Select status</SelectItem>
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
            <FormItem>
              <FormLabel>Current City <span className="text-xs text-gray-500">(Optional)</span></FormLabel>
              <FormControl>
                <Input
                  placeholder="Where you currently live"
                  {...field}
                  value={getStringValue(field.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div>
        <FormLabel className="mb-2 block">Areas of Interest <span className="text-xs text-gray-500">(Optional)</span></FormLabel>
        <p className="text-sm text-gray-500 mb-3">Select areas you'd like your reading to focus on:</p>
        
        <MultiSelect 
          value={interestsList}
          onChange={handleInterestsChange}
          options={interests}
        />
      </div>
    </div>
  );
}