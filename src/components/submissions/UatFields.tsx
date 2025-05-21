
import React from "react";
import SubmissionField from "./SubmissionField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UatFieldsProps {
  uat: any;
  onAddNote: (label: string, value: string | number | boolean, comment?: string) => void;
}

const UatFields = ({ uat, onAddNote }: UatFieldsProps) => {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="bg-primary/5 pb-3">
        <CardTitle className="text-lg font-medium text-primary">UAT Details</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
          <div>
            <SubmissionField label="FIU CR ID" value={uat.fiuCrId} onAddNote={onAddNote} />
            <SubmissionField label="Integration Mode" value={uat.integrationMode} onAddNote={onAddNote} />
          </div>
          <div>
            <SubmissionField label="Primary Color" value={uat.primaryColor} onAddNote={onAddNote} />
            <SubmissionField label="Secondary Color" value={uat.secondaryColor} onAddNote={onAddNote} />
            <SubmissionField label="Primary Font" value={uat.primaryFont} onAddNote={onAddNote} />
            <SubmissionField label="Secondary Font" value={uat.secondaryFont} onAddNote={onAddNote} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UatFields;
