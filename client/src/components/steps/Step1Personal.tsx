import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useFormContext } from "react-hook-form";
import { HelpCircle } from "lucide-react";

export function Step1Personal() {
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary-dark">Personal Information</h2>
        <p className="text-muted-foreground mt-2">
          Please provide your basic personal information for your BaZi reading
        </p>
      </div>

      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your full name" 
                className="bg-white/90" 
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
            <div className="flex items-center gap-2">
              <FormLabel>Email</FormLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={14} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-sm">
                      Your email is used to save your reading. Alias email is allowed.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <FormControl>
              <Input 
                placeholder="Enter your email" 
                className="bg-white/90" 
                type="email"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              We'll only use this to save your reading.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}