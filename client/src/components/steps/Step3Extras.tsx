import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Multiple select component for interests
function MultiSelect({ value = [], onChange, options }: { 
  value: string[], 
  onChange: (value: string[]) => void,
  options: { value: string; label: string }[]
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };
  
  return (
    <div className="relative w-full">
      <div 
        className={cn(
          "flex min-h-10 w-full rounded-md border border-input bg-white/90 px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed",
          isOpen ? "ring-2 ring-ring ring-offset-2" : ""
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {value.length === 0 && (
            <span className="text-muted-foreground">Select interests...</span>
          )}
          {value.map(v => (
            <Badge 
              key={v} 
              variant="secondary"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(v);
              }}
            >
              {options.find(o => o.value === v)?.label || v}
              <span className="ml-1">×</span>
            </Badge>
          ))}
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 rounded-md border bg-popover shadow-md">
          <div className="p-1">
            {options.map(option => (
              <div
                key={option.value}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                  value.includes(option.value) 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Step3Extras() {
  const form = useFormContext();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const bloodTypeOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "AB", label: "AB" },
    { value: "O", label: "O" },
  ];
  
  const maritalStatusOptions = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorced", label: "Divorced" },
    { value: "Widowed", label: "Widowed" },
    { value: "Separated", label: "Separated" },
  ];
  
  const interestOptions = [
    { value: "Health", label: "Health & Wellness" },
    { value: "Career", label: "Career & Money" },
    { value: "Relationships", label: "Relationships" },
    { value: "Family", label: "Family" },
    { value: "Education", label: "Education & Learning" },
    { value: "Travel", label: "Travel" },
    { value: "Spirituality", label: "Spirituality" },
    { value: "Personal Development", label: "Personal Development" },
    { value: "Arts", label: "Arts & Creativity" },
    { value: "Sports", label: "Sports & Fitness" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary-dark">Additional Information</h2>
        <p className="text-muted-foreground mt-2">
          Optional details to enhance your BaZi reading
        </p>
      </div>

      <Collapsible
        open={isExpanded}
        onOpenChange={setIsExpanded}
        className="bg-white/80 p-4 rounded-lg border shadow-sm"
      >
        <div className="flex items-center justify-between space-x-4">
          <h4 className="text-sm font-semibold">
            Additional details (optional)
          </h4>
          <CollapsibleTrigger asChild>
            <button className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-accent/20">
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-4 mt-4">
          {/* Blood Type */}
          <FormField
            control={form.control}
            name="bloodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/90">
                      <SelectValue placeholder="Select your blood type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bloodTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Religion/Spiritual Practice */}
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Religion/Spiritual Practice</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your religion or spiritual practice"
                    className="bg-white/90"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Marital Status */}
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marital Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/90">
                      <SelectValue placeholder="Select your marital status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {maritalStatusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Current City */}
          <FormField
            control={form.control}
            name="currentCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your current city"
                    className="bg-white/90"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  City and country where you currently live
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Interests */}
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Areas of Interest</FormLabel>
                <FormControl>
                  <MultiSelect
                    value={field.value || []}
                    onChange={field.onChange}
                    options={interestOptions}
                  />
                </FormControl>
                <FormDescription>
                  Select areas you're most interested in insights about
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}