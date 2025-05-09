import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { YinYangIcon } from "../icons/ElementIcons";

export function Step1Personal() {
  const form = useFormContext();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="bg-primary/10 p-2 rounded-full mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink">Personal Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address <span className="text-sm text-gray-500">(Optional)</span></FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Eastern Symbol Decoration */}
      <div className="relative mt-8 bg-gradient-to-br from-secondary-light/20 to-primary-light/10 rounded-lg p-6 overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center spin-slow">
          <YinYangIcon className="w-16 h-16 text-primary opacity-60" />
        </div>
        
        <div className="max-w-[70%]">
          <h3 className="font-display text-xl text-primary mb-2">BaZi Insight</h3>
          <p className="text-sm text-gray-600">The essence of BaZi is understanding the balance of elements that shape your destiny</p>
        </div>
      </div>
    </div>
  );
}