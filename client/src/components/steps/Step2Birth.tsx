import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Step2Birth() {
  const form = useFormContext();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="bg-secondary/10 p-2 rounded-full mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink">Birth Details</h2>
      </div>
      
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            <FormItem>
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
      
      <div className="mt-4 bg-gray-50 border border-gray-100 rounded-lg p-4">
        <div className="flex items-start">
          <div className="text-amber-500 mt-1 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Why birth time matters in BaZi</h4>
            <p className="text-xs text-gray-600 mt-1">
              Your birth time determines your Hour Pillar, which influences your personality traits, 
              relationships, and potential life challenges. The more accurate the time, the more 
              precise your reading will be.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}