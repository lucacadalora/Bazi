import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

export function Step2Birth() {
  const form = useFormContext();
  const [date, setDate] = useState<Date | undefined>(
    form.getValues("birthDate") ? new Date(form.getValues("birthDate")) : undefined
  );
  
  const [isApproxTime, setIsApproxTime] = useState(form.getValues("isExactTime") === false);
  
  // Handle approximate time checkbox
  useEffect(() => {
    if (isApproxTime) {
      form.setValue("birthTime", "12:00");
      form.setValue("isExactTime", false);
    } else {
      form.setValue("isExactTime", true);
    }
  }, [isApproxTime, form]);

  // Format time from slider values (hours and minutes)
  const formatTimeFromValues = (hours: number, minutes: number) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Convert time string to slider values
  const timeToValues = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return { hours, minutes };
  };

  // Get current time values from form
  const currentTimeValues = timeToValues(form.getValues("birthTime") || "00:00");
  
  // State for hours and minutes
  const [hours, setHours] = useState(currentTimeValues.hours);
  const [minutes, setMinutes] = useState(currentTimeValues.minutes);

  // Update form when hours or minutes change
  useEffect(() => {
    const timeString = formatTimeFromValues(hours, minutes);
    form.setValue("birthTime", timeString);
  }, [hours, minutes, form]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary-dark">Birth Information</h2>
        <p className="text-muted-foreground mt-2">
          The exact date and time of birth are essential for accurate BaZi analysis
        </p>
      </div>

      {/* Birth Date Field */}
      <FormField
        control={form.control}
        name="birthDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date of Birth</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "pl-3 text-left font-normal bg-white/90",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    if (newDate) {
                      field.onChange(format(newDate, "yyyy-MM-dd"));
                    }
                  }}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Select your exact birth date
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Birth Time Fields */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="birthTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time of Birth</FormLabel>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-xl">
                    {formatTimeFromValues(hours, minutes)}
                  </span>
                </div>
                
                {!isApproxTime && (
                  <div className="space-y-4 mt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Hours</span>
                        <span>{hours}</span>
                      </div>
                      <Slider
                        value={[hours]}
                        min={0}
                        max={23}
                        step={1}
                        onValueChange={(value) => setHours(value[0])}
                        disabled={isApproxTime}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Minutes</span>
                        <span>{minutes}</span>
                      </div>
                      <Slider
                        value={[minutes]}
                        min={0}
                        max={59}
                        step={1}
                        onValueChange={(value) => setMinutes(value[0])}
                        disabled={isApproxTime}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="approx-time"
                    checked={isApproxTime}
                    onCheckedChange={(checked) => {
                      setIsApproxTime(checked === true);
                    }}
                  />
                  <label
                    htmlFor="approx-time"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I don't know my exact birth time (will use 12:00)
                  </label>
                </div>
                
                <FormControl>
                  <Input
                    type="hidden"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Birth City Field */}
      <FormField
        control={form.control}
        name="birthCity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Birth City</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your birth city" 
                className="bg-white/90" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              City and country where you were born
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}