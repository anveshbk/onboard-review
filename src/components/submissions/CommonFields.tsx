
import React from "react";
import SubmissionField from "./SubmissionField";
import { Submission } from "@/utils/mockData";

interface CommonFieldsProps {
  submission: Submission;
  onAddNote: (label: string, value: string | number | boolean) => void;
}

const CommonFields = ({ submission, onAddNote }: CommonFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
      <div>
        <SubmissionField label="TSP Name" value={submission.tspName} onAddNote={onAddNote} />
        <SubmissionField label="Requested By" value={submission.requestedBy} onAddNote={onAddNote} />
        <SubmissionField label="TSP SPOC Email" value={submission.tspSpocEmail} onAddNote={onAddNote} />
      </div>
      <div>
        <SubmissionField label="FIU Registered Name" value={submission.fiuRegisteredName} onAddNote={onAddNote} />
        <SubmissionField label="Regulator" value={submission.regulator} onAddNote={onAddNote} />
        <SubmissionField label="License Type" value={submission.licenseType} onAddNote={onAddNote} />
      </div>
    </div>
  );
};

export default CommonFields;
