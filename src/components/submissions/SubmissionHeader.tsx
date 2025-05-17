
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Submission } from "@/utils/mockData";

interface SubmissionHeaderProps {
  submission: Submission;
}

const SubmissionHeader = ({ submission }: SubmissionHeaderProps) => {
  const navigate = useNavigate();

  return (
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
            Submitted: {submission.submissionTimestamp ? format(new Date(submission.submissionTimestamp), "PPP") : ''}
          </span>
        </div>
        
        {/* Display approval information */}
        {submission.status === "approved" && submission.approvedBy && (
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium text-green-600">
              Approved by {submission.approvedBy} on {format(new Date(submission.approvalTimestamp || ''), "PPP p")}
            </span>
          </div>
        )}
        
        {/* Display rejection information */}
        {submission.status === "rejected" && submission.rejectedBy && (
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium text-red-600">
              Rejected by {submission.rejectedBy} on {format(new Date(submission.rejectionTimestamp || ''), "PPP p")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionHeader;
