
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Download } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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

interface ActionButtonsProps {
  submissionStatus: string | undefined;
  onApprove: () => void;
  onReject: (comment: string) => void;
  submission: any; // Add submission prop to access the submission data
}

const ActionButtons = ({ submissionStatus, onApprove, onReject, submission }: ActionButtonsProps) => {
  const [rejectComment, setRejectComment] = useState("");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);

  const handleApprove = () => {
    onApprove();
    setApproveDialogOpen(false);
    
    // Create the JSON data for approval
    const approvalData = {
      fiuCrIdProd: submission.fiuCrIdProd || submission.fiuCrId,
      fiuSpocEmail: submission.tspSpocEmail || (submission.fiuSpoc ? submission.fiuSpoc.email : ''),
      fiuLogo: submission.fiuLogo || '',
      integrationDetails: {
        integrationMode: submission.integrationMode || '',
        integrationType: submission.integrationType || {},
        whitelistedUrls: submission.whitelistedUrls || [],
        consentRequired: submission.consentRequired || false,
        accountTypeFilter: submission.accountTypeFilter || '',
        fipSelectionInHostApp: submission.fipSelectionInHostApp || false,
        maxFipLimit: submission.maxFipLimit || 0,
        singleFipMultiFip: submission.singleFipMultiFip || '',
        accountSelectionType: submission.accountSelectionType || '',
        targetedAutoDiscovery: submission.targetedAutoDiscovery || false,
      }
    };
    
    // Download the JSON file
    downloadJson(approvalData, `approval-${submission.id}-${new Date().toISOString()}.json`);
  };

  const handleReject = () => {
    if (rejectComment.trim() === "") return;
    onReject(rejectComment);
    setRejectDialogOpen(false);
    
    // Create the JSON data for rejection
    const rejectionData = {
      fiuCrId: submission.fiuCrId || '',
      reviewNotes: submission.reviewNotes || [],
      rejectionComment: rejectComment,
      rejectedBy: submission.rejectedBy || '',
      rejectionTimestamp: new Date().toISOString()
    };
    
    // Download the JSON file
    downloadJson(rejectionData, `rejection-${submission.id}-${new Date().toISOString()}.json`);
  };

  // Helper function to download JSON
  const downloadJson = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Check if the submission is already approved or rejected
  const isReviewed = submissionStatus === "approved" || submissionStatus === "rejected";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Actions</CardTitle>
        <CardDescription>
          {isReviewed 
            ? `This submission has already been ${submissionStatus}`
            : "Approve or reject this submission"
          }
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button disabled={isReviewed}>
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
              disabled={isReviewed}
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
  );
};

export default ActionButtons;
