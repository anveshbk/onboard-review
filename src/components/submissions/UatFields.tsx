
import React from "react";
import SubmissionField from "./SubmissionField";

interface UatFieldsProps {
  uat: any;
  onAddNote: (label: string, value: string | number | boolean) => void;
}

const UatFields = ({ uat, onAddNote }: UatFieldsProps) => {
  return (
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
  );
};

export default UatFields;
