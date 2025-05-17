
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommonFields from "./CommonFields";
import UatFields from "./UatFields";
import ProdFields from "./ProdFields";
import { Submission } from "@/utils/mockData";

interface SubmissionDetailsProps {
  submission: Submission;
  onAddNote: (label: string, value: string | number | boolean) => void;
}

const SubmissionDetails = ({ submission, onAddNote }: SubmissionDetailsProps) => {
  const isUat = submission?.environment === "UAT";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submission Details</CardTitle>
        <CardDescription>
          Review the submission information below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="details">
              {submission.environment === "UAT" ? "UAT Details" : "PROD Details"}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-4">
            <CommonFields submission={submission} onAddNote={onAddNote} />
          </TabsContent>
          <TabsContent value="details" className="space-y-4">
            {isUat ? (
              <UatFields uat={submission} onAddNote={onAddNote} />
            ) : (
              <ProdFields prod={submission} onAddNote={onAddNote} />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SubmissionDetails;
