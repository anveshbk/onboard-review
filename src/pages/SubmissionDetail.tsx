
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSubmissions } from "@/contexts/SubmissionContext";
import AppLayout from "@/components/AppLayout";
import SubmissionHeader from "@/components/submissions/SubmissionHeader";
import SubmissionDetails from "@/components/submissions/SubmissionDetails";
import ReviewNotes from "@/components/submissions/ReviewNotes";
import ActionButtons from "@/components/submissions/ActionButtons";
import NotFoundMessage from "@/components/submissions/NotFoundMessage";

const SubmissionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getSubmission, setSubmissionStatus, addReviewNote } = useSubmissions();
  const submission = getSubmission(id || "");
  
  if (!submission) {
    return (
      <AppLayout>
        <NotFoundMessage />
      </AppLayout>
    );
  }

  const handleAddReviewNote = (label: string, value: string | number | boolean, comment?: string) => {
    const noteText = `${label}: ${value.toString()}`;
    addReviewNote(submission.id, noteText, comment);
  };
  
  const handleApprove = () => {
    setSubmissionStatus(submission.id, "approved");
  };
  
  const handleReject = (rejectComment: string) => {
    setSubmissionStatus(submission.id, "rejected", rejectComment);
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <SubmissionHeader submission={submission} />
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SubmissionDetails 
              submission={submission}
              onAddNote={handleAddReviewNote} 
            />
          </div>

          <div>
            <ReviewNotes notes={submission.reviewNotes || []} />
            <ActionButtons 
              submissionStatus={submission.status}
              onApprove={handleApprove}
              onReject={handleReject}
              submission={submission}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SubmissionDetail;
