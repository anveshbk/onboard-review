import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubmissions } from "@/contexts/SubmissionContext";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Check, X, Plus, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const SubmissionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSubmission, setSubmissionStatus, addReviewNote } = useSubmissions();
  
  const [rejectComment, setRejectComment] = useState("");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  
  const submission = getSubmission(id || "");
  
  if (!submission) {
    return (
      <AppLayout>
        <div className="container mx-auto p-8 text-center">
          <h2 className="text-2xl font-semibold">Submission not found</h2>
          <p className="mt-4">
            The submission you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="mt-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
          </Button>
        </div>
      </AppLayout>
    );
  }

  const isUat = submission.environment === "UAT";
  const isProd = submission.environment === "PROD";
  
  const handleAddReviewNote = (label: string, value: string | number | boolean) => {
    const noteText = `${label}: ${value.toString()}`;
    addReviewNote(submission.id, noteText);
  };
  
  const handleApprove = () => {
    setSubmissionStatus(submission.id, "approved");
    setApproveDialogOpen(false);
  };
  
  const handleReject = () => {
    if (rejectComment.trim() === "") return;
    
    setSubmissionStatus(submission.id, "rejected", rejectComment);
    setRejectDialogOpen(false);
  };

  const renderSimpleField = (label: string, value: string | number | boolean) => (
    <div className="mb-4 flex">
      <div className="w-3/4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleAddReviewNote(label, value)}
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

  const renderProdFields = () => {
    if (!isProd) return null;
    
    const prod = submission as any;
    
    return (
      <>
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
          <div>
            {renderSimpleField("License Copy", prod.licenseCopy)}
            {renderSimpleField("License No", prod.licenseNo)}
            {renderSimpleField("FIU CR ID UAT", prod.fiuCrIdUat)}
            {renderSimpleField("FIU CR ID PROD", prod.fiuCrIdProd)}
            {renderSimpleField("Agreement Executed", prod.agreementExecuted)}
            {renderSimpleField("Agreement File", prod.agreementFile)}
            
            <div className="mb-6">
              <h4 className="mb-2 font-medium">FIU SPOC</h4>
              {renderSimpleField("Name", prod.fiuSpoc.name)}
              {renderSimpleField("Email", prod.fiuSpoc.email)}
              {renderSimpleField("Mobile Number", prod.fiuSpoc.mobileNumber)}
            </div>
            
            <div className="mb-6">
              <h4 className="mb-2 font-medium">FIU Escalation SPOC</h4>
              {renderSimpleField("Name", prod.fiuEscalationSpoc.name)}
              {renderSimpleField("Email", prod.fiuEscalationSpoc.email)}
              {renderSimpleField("Mobile Number", prod.fiuEscalationSpoc.mobileNumber)}
            </div>
          </div>
          
          <div>
            <div className="mb-6">
              <h4 className="mb-2 font-medium">RBI SPOC</h4>
              {renderSimpleField("Name", prod.rbiSpoc.name)}
              {renderSimpleField("Email", prod.rbiSpoc.email)}
              {renderSimpleField("Mobile Number", prod.rbiSpoc.mobileNumber)}
            </div>
            
            <div className="mb-6">
              <h4 className="mb-2 font-medium">Grievance SPOC</h4>
              {renderSimpleField("Name", prod.grievanceSpoc.name)}
              {renderSimpleField("Email", prod.grievanceSpoc.email)}
              {renderSimpleField("Mobile Number", prod.grievanceSpoc.mobileNumber)}
            </div>
            
            <div className="mb-6">
              <h4 className="mb-2 font-medium">Integration Type</h4>
              {renderSimpleField("Web Redirection", prod.integrationType.webRedirection)}
              {renderSimpleField("SDK", prod.integrationType.sdk)}
              {renderSimpleField("Assisted", prod.integrationType.assisted)}
              {renderSimpleField("Detached", prod.integrationType.detached)}
            </div>
            
            {renderSimpleField("Consent Request SMS", prod.consentRequestSMS)}
            {renderSimpleField("User Journey Video", prod.userJourneyVideo)}
            {renderSimpleField("Whitelisted URLs", prod.whitelistedUrls.join(", "))}
            {renderSimpleField("Consent Required", prod.consentRequired)}
            {renderSimpleField("Account Type Filter", prod.accountTypeFilter)}
            {renderSimpleField("FIP Selection In Host App", prod.fipSelectionInHostApp)}
            {renderSimpleField("Max FIP Limit", prod.maxFipLimit)}
            {renderSimpleField("Single FIP / Multi FIP", prod.singleFipMultiFip)}
            {renderSimpleField("Account Selection Type", prod.accountSelectionType)}
            {renderSimpleField("Targeted Auto Discovery", prod.targetedAutoDiscovery)}
            {renderSimpleField("Onemoney Consent Request Mode", prod.onemoneyConsentRequestMode)}
          </div>
        </div>

        <div className="my-6">
          <h4 className="mb-2 font-medium">Consent Parameters</h4>
          {prod.consentParams.map((param: any, index: number) => (
            <Card key={index} className="mb-4">
              <CardHeader className="py-4">
                <CardTitle className="text-lg">{param.usecaseDetails}</CardTitle>
                <CardDescription>Purpose Code: {param.purposeCode}</CardDescription>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleAddReviewNote(`Consent Param ${index + 1}`, param.usecaseDetails)}
                  className="absolute right-2 top-2 h-8 w-8 rounded-full"
                  title="Add to review notes"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
                  {renderSimpleField("Purpose Text", param.purposeText)}
                  {renderSimpleField("Consent Validity", `${param.consentValidityPeriod.value} ${param.consentValidityPeriod.unit}`)}
                  {renderSimpleField("Fetch Type", param.fetchType)}
                  {renderSimpleField("Consent Type", param.consentType.join(", "))}
                  {renderSimpleField("FI Types", param.fiTypes.join(", "))}
                  {renderSimpleField("FI Data Range", `${param.fiDataRange.value} ${param.fiDataRange.unit}`)}
                  {renderSimpleField("Data Life", `${param.dataLife.value} ${param.dataLife.unit}`)}
                  {param.dataFetchFrequency && renderSimpleField("Data Fetch Frequency", `${param.dataFetchFrequency.value} ${param.dataFetchFrequency.unit}`)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {renderSimpleField("Figma URL", prod.figmaUrl)}
        {renderSimpleField("Data Passed To Onemoney", prod.dataPassedToOnemoney)}
        {renderSimpleField("Data Shared From Onemoney", prod.dataSharedFromOnemoney)}
        {renderSimpleField("Onemoney API Referenced", prod.onemoneyApiReferenced)}
      </>
    );
  };

  const renderUatFields = () => {
    if (!isUat) return null;
    
    const uat = submission as any;
    
    return (
      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <div>
          {renderSimpleField("FIU CR ID", uat.fiuCrId)}
          {renderSimpleField("Integration Mode", uat.integrationMode)}
        </div>
        <div>
          {renderSimpleField("Primary Color", uat.primaryColor)}
          {renderSimpleField("Secondary Color", uat.secondaryColor)}
          {renderSimpleField("Primary Font", uat.primaryFont)}
          {renderSimpleField("Secondary Font", uat.secondaryFont)}
        </div>
      </div>
    );
  };

  // Common fields for both UAT and PROD
  const renderCommonFields = () => (
    <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
      <div>
        {renderSimpleField("TSP Name", submission.tspName)}
        {renderSimpleField("Requested By", submission.requestedBy)}
        {renderSimpleField("TSP SPOC Email", submission.tspSpocEmail)}
      </div>
      <div>
        {renderSimpleField("FIU Registered Name", submission.fiuRegisteredName)}
        {renderSimpleField("Regulator", submission.regulator)}
        {renderSimpleField("License Type", submission.licenseType)}
      </div>
    </div>
  );

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              {submission.fiuRegisteredName}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant="outline">ID: {submission.id}</Badge>
              <Badge
                variant={submission.environment === "PROD" ? "destructive" : "outline"}
              >
                {submission.environment}
              </Badge>
              <Badge className={
                submission.status === "approved"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : submission.status === "rejected"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
              }>
                {submission.status || "Pending"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Submitted: {format(new Date(submission.submissionTimestamp), "PPP")}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
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
                    {renderCommonFields()}
                  </TabsContent>
                  <TabsContent value="details" className="space-y-4">
                    {isUat ? renderUatFields() : renderProdFields()}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Review Notes</CardTitle>
                <CardDescription>
                  Fields marked for compliance review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  {submission.reviewNotes && submission.reviewNotes.length > 0 ? (
                    <ul className="space-y-2">
                      {submission.reviewNotes.map((note, index) => (
                        <li key={index} className="rounded-md border bg-muted p-2 text-sm">
                          {note}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      <p>No review notes yet. Click the + icon next to any field to add it here.</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Actions</CardTitle>
                <CardDescription>
                  Approve or reject this submission
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button disabled={submission.status !== undefined}>
                      <Check className="mr-2 h-4 w-4" /> Approve
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Approve Submission</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to approve this submission? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleApprove}>
                        Confirm Approve
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      disabled={submission.status !== undefined}
                    >
                      <X className="mr-2 h-4 w-4" /> Reject
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reject Submission</AlertDialogTitle>
                      <AlertDialogDescription>
                        Please provide detailed comments explaining why this submission is being rejected.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mb-4">
                      <Textarea
                        value={rejectComment}
                        onChange={(e) => setRejectComment(e.target.value)}
                        placeholder="Enter rejection reason..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleReject}
                        disabled={!rejectComment.trim()}
                      >
                        Confirm Reject
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SubmissionDetail;
