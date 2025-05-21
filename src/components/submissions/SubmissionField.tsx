
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, X, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface SubmissionFieldProps {
  label: string;
  value: string | number | boolean;
  onAddNote: (label: string, value: string | number | boolean, comment?: string) => void;
}

const SubmissionField = ({ label, value, onAddNote }: SubmissionFieldProps) => {
  const [open, setOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      comment: ""
    }
  });

  const handleSubmit = form.handleSubmit((data) => {
    onAddNote(label, value, data.comment);
    setOpen(false);
    form.reset();
  });

  return (
    <div className="mb-4 flex">
      <div className="w-3/4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full opacity-50 hover:opacity-100"
                title={`Add "${label}" to review notes`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Add comment for "{label}"</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Add your review comment here..." 
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add to Notes</Button>
                  </div>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
        </div>
        <div className="mt-1">
          {typeof value === "boolean" ? (
            value ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 mr-2">
                <Check className="mr-1 h-3 w-3" /> Yes
              </Badge>
            ) : (
              <Badge variant="outline" className="mr-2">
                <X className="mr-1 h-3 w-3" /> No
              </Badge>
            )
          ) : (
            <span>{value.toString()}</span>
          )}
        </div>
      </div>
      <Separator className="mx-4" orientation="vertical" />
    </div>
  );
};

export default SubmissionField;
