
import React from "react";
import SubmissionField from "./SubmissionField";
import ConsentParamCard from "./ConsentParamCard";

interface ProdFieldsProps {
  prod: any;
  onAddNote: (label: string, value: string | number | boolean) => void;
}

const ProdFields = ({ prod, onAddNote }: ProdFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <div>
          <SubmissionField label="License Copy" value={prod.licenseCopy} onAddNote={onAddNote} />
          <SubmissionField label="License No" value={prod.licenseNo} onAddNote={onAddNote} />
          <SubmissionField label="FIU CR ID UAT" value={prod.fiuCrIdUat} onAddNote={onAddNote} />
          <SubmissionField label="FIU CR ID PROD" value={prod.fiuCrIdProd} onAddNote={onAddNote} />
          <SubmissionField label="Agreement Executed" value={prod.agreementExecuted} onAddNote={onAddNote} />
          <SubmissionField label="Agreement File" value={prod.agreementFile} onAddNote={onAddNote} />
          
          <div className="mb-6">
            <h4 className="mb-2 font-medium">FIU SPOC</h4>
            <SubmissionField label="Name" value={prod.fiuSpoc.name} onAddNote={onAddNote} />
            <SubmissionField label="Email" value={prod.fiuSpoc.email} onAddNote={onAddNote} />
            <SubmissionField label="Mobile Number" value={prod.fiuSpoc.mobileNumber} onAddNote={onAddNote} />
          </div>
          
          <div className="mb-6">
            <h4 className="mb-2 font-medium">FIU Escalation SPOC</h4>
            <SubmissionField label="Name" value={prod.fiuEscalationSpoc.name} onAddNote={onAddNote} />
            <SubmissionField label="Email" value={prod.fiuEscalationSpoc.email} onAddNote={onAddNote} />
            <SubmissionField label="Mobile Number" value={prod.fiuEscalationSpoc.mobileNumber} onAddNote={onAddNote} />
          </div>
        </div>
        
        <div>
          <div className="mb-6">
            <h4 className="mb-2 font-medium">RBI SPOC</h4>
            <SubmissionField label="Name" value={prod.rbiSpoc.name} onAddNote={onAddNote} />
            <SubmissionField label="Email" value={prod.rbiSpoc.email} onAddNote={onAddNote} />
            <SubmissionField label="Mobile Number" value={prod.rbiSpoc.mobileNumber} onAddNote={onAddNote} />
          </div>
          
          <div className="mb-6">
            <h4 className="mb-2 font-medium">Grievance SPOC</h4>
            <SubmissionField label="Name" value={prod.grievanceSpoc.name} onAddNote={onAddNote} />
            <SubmissionField label="Email" value={prod.grievanceSpoc.email} onAddNote={onAddNote} />
            <SubmissionField label="Mobile Number" value={prod.grievanceSpoc.mobileNumber} onAddNote={onAddNote} />
          </div>
          
          <div className="mb-6">
            <h4 className="mb-2 font-medium">Integration Type</h4>
            <SubmissionField label="Web Redirection" value={prod.integrationType.webRedirection} onAddNote={onAddNote} />
            <SubmissionField label="SDK" value={prod.integrationType.sdk} onAddNote={onAddNote} />
            <SubmissionField label="Assisted" value={prod.integrationType.assisted} onAddNote={onAddNote} />
            <SubmissionField label="Detached" value={prod.integrationType.detached} onAddNote={onAddNote} />
          </div>
          
          <SubmissionField label="Consent Request SMS" value={prod.consentRequestSMS} onAddNote={onAddNote} />
          <SubmissionField label="User Journey Video" value={prod.userJourneyVideo} onAddNote={onAddNote} />
          <SubmissionField label="Whitelisted URLs" value={prod.whitelistedUrls.join(", ")} onAddNote={onAddNote} />
          <SubmissionField label="Consent Required" value={prod.consentRequired} onAddNote={onAddNote} />
          <SubmissionField label="Account Type Filter" value={prod.accountTypeFilter} onAddNote={onAddNote} />
          <SubmissionField label="FIP Selection In Host App" value={prod.fipSelectionInHostApp} onAddNote={onAddNote} />
          <SubmissionField label="Max FIP Limit" value={prod.maxFipLimit} onAddNote={onAddNote} />
          <SubmissionField label="Single FIP / Multi FIP" value={prod.singleFipMultiFip} onAddNote={onAddNote} />
          <SubmissionField label="Account Selection Type" value={prod.accountSelectionType} onAddNote={onAddNote} />
          <SubmissionField label="Targeted Auto Discovery" value={prod.targetedAutoDiscovery} onAddNote={onAddNote} />
          <SubmissionField label="Onemoney Consent Request Mode" value={prod.onemoneyConsentRequestMode} onAddNote={onAddNote} />
        </div>
      </div>

      <div className="my-6">
        <h4 className="mb-2 font-medium">Consent Parameters</h4>
        {prod.consentParams.map((param: any, index: number) => (
          <ConsentParamCard 
            key={index}
            param={param}
            index={index}
            onAddNote={onAddNote}
          />
        ))}
      </div>

      <SubmissionField label="Figma URL" value={prod.figmaUrl} onAddNote={onAddNote} />
      <SubmissionField label="Data Passed To Onemoney" value={prod.dataPassedToOnemoney} onAddNote={onAddNote} />
      <SubmissionField label="Data Shared From Onemoney" value={prod.dataSharedFromOnemoney} onAddNote={onAddNote} />
      <SubmissionField label="Onemoney API Referenced" value={prod.onemoneyApiReferenced} onAddNote={onAddNote} />
    </>
  );
};

export default ProdFields;
