
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, X, Plus } from "lucide-react";

interface SubmissionFieldProps {
  label: string;
  value: string | number | boolean;
  onAddNote: (label: string, value: string | number | boolean) => void;
}

const SubmissionField = ({ label, value, onAddNote }: SubmissionFieldProps) => {
  return (
    <div className="mb-4 flex">
      <div className="w-3/4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onAddNote(label, value)}
            className="h-6 w-6 rounded-full opacity-50 hover:opacity-100"
            title={`Add "${label}" to review notes`}
          >
            <Plus className="h-4 w-4" />
          </Button>
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
