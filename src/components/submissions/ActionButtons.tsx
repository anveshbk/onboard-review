
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
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
}

const ActionButtons = ({ submissionStatus, onApprove, onReject }: ActionButtonsProps) => {
  const [rejectComment, setRejectComment] = useState("");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);

  const handleApprove = () => {
    onApprove();
    setApproveDialogOpen(false);
  };

  const handleReject = () => {
    if (rejectComment.trim() === "") return;
    onReject(rejectComment);
    setRejectDialogOpen(false);
  };

  return (
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
            <Button disabled={submissionStatus !== undefined}>
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
              disabled={submissionStatus !== undefined}
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
