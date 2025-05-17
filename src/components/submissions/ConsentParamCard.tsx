
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SubmissionField from "./SubmissionField";

interface ConsentParamCardProps {
  param: any;
  index: number;
  onAddNote: (label: string, value: string | number | boolean) => void;
}

const ConsentParamCard = ({ param, index, onAddNote }: ConsentParamCardProps) => {
  return (
    <Card key={index} className="mb-4">
      <CardHeader className="py-4">
        <CardTitle className="text-lg">{param.usecaseDetails}</CardTitle>
        <CardDescription>Purpose Code: {param.purposeCode}</CardDescription>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onAddNote(`Consent Param ${index + 1}`, param.usecaseDetails)}
          className="absolute right-2 top-2 h-8 w-8 rounded-full"
          title="Add to review notes"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
          <SubmissionField label="Purpose Text" value={param.purposeText} onAddNote={onAddNote} />
          <SubmissionField label="Consent Validity" value={`${param.consentValidityPeriod.value} ${param.consentValidityPeriod.unit}`} onAddNote={onAddNote} />
          <SubmissionField label="Fetch Type" value={param.fetchType} onAddNote={onAddNote} />
          <SubmissionField label="Consent Type" value={param.consentType.join(", ")} onAddNote={onAddNote} />
          <SubmissionField label="FI Types" value={param.fiTypes.join(", ")} onAddNote={onAddNote} />
          <SubmissionField label="FI Data Range" value={`${param.fiDataRange.value} ${param.fiDataRange.unit}`} onAddNote={onAddNote} />
          <SubmissionField label="Data Life" value={`${param.dataLife.value} ${param.dataLife.unit}`} onAddNote={onAddNote} />
          {param.dataFetchFrequency && (
            <SubmissionField 
              label="Data Fetch Frequency" 
              value={`${param.dataFetchFrequency.value} ${param.dataFetchFrequency.unit}`} 
              onAddNote={onAddNote} 
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsentParamCard;
