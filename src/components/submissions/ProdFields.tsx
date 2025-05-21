
import React from "react";
import SubmissionField from "./SubmissionField";
import ConsentParamCard from "./ConsentParamCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProdFieldsProps {
  prod: any;
  onAddNote: (label: string, value: string | number | boolean) => void;
}

const ProdFields = ({ prod, onAddNote }: ProdFieldsProps) => {
  return (
    <>
      <Card className="mb-6 border border-primary/20">
        <CardHeader className="bg-primary/5 pb-3">
          <CardTitle className="text-lg font-medium text-primary">Licensing & Registration</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
            <SubmissionField label="License Copy" value={prod.licenseCopy} onAddNote={onAddNote} />
            <SubmissionField label="License No" value={prod.licenseNo} onAddNote={onAddNote} />
            <SubmissionField label="FIU CR ID UAT" value={prod.fiuCrIdUat} onAddNote={onAddNote} />
            <SubmissionField label="FIU CR ID PROD" value={prod.fiuCrIdProd} onAddNote={onAddNote} />
            <SubmissionField label="Agreement Executed" value={prod.agreementExecuted} onAddNote={onAddNote} />
            <SubmissionField label="Agreement File" value={prod.agreementFile} onAddNote={onAddNote} />
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6 border border-primary/20">
        <CardHeader className="bg-primary/5 pb-3">
          <CardTitle className="text-lg font-medium text-primary">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
            <div>
              <div className="mb-6">
                <h5 className="mb-2 text-sm font-medium">FIU SPOC</h5>
                <SubmissionField label="Name" value={prod.fiuSpoc.name} onAddNote={onAddNote} />
                <SubmissionField label="Email" value={prod.fiuSpoc.email} onAddNote={onAddNote} />
                <SubmissionField label="Mobile Number" value={prod.fiuSpoc.mobileNumber} onAddNote={onAddNote} />
              </div>
              
              <div className="mb-6">
                <h5 className="mb-2 text-sm font-medium">FIU Escalation SPOC</h5>
                <SubmissionField label="Name" value={prod.fiuEscalationSpoc.name} onAddNote={onAddNote} />
                <SubmissionField label="Email" value={prod.fiuEscalationSpoc.email} onAddNote={onAddNote} />
                <SubmissionField label="Mobile Number" value={prod.fiuEscalationSpoc.mobileNumber} onAddNote={onAddNote} />
              </div>
            </div>
            
            <div>
              <div className="mb-6">
                <h5 className="mb-2 text-sm font-medium">RBI SPOC</h5>
                <SubmissionField label="Name" value={prod.rbiSpoc.name} onAddNote={onAddNote} />
                <SubmissionField label="Email" value={prod.rbiSpoc.email} onAddNote={onAddNote} />
                <SubmissionField label="Mobile Number" value={prod.rbiSpoc.mobileNumber} onAddNote={onAddNote} />
              </div>
              
              <div className="mb-6">
                <h5 className="mb-2 text-sm font-medium">Grievance SPOC</h5>
                <SubmissionField label="Name" value={prod.grievanceSpoc.name} onAddNote={onAddNote} />
                <SubmissionField label="Email" value={prod.grievanceSpoc.email} onAddNote={onAddNote} />
                <SubmissionField label="Mobile Number" value={prod.grievanceSpoc.mobileNumber} onAddNote={onAddNote} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6 border border-primary/20">
        <CardHeader className="bg-primary/5 pb-3">
          <CardTitle className="text-lg font-medium text-primary">Integration Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
            <div>
              <div className="mb-6">
                <h5 className="mb-2 text-sm font-medium">Integration Type</h5>
                <SubmissionField label="Web Redirection" value={prod.integrationType.webRedirection} onAddNote={onAddNote} />
                <SubmissionField label="SDK" value={prod.integrationType.sdk} onAddNote={onAddNote} />
                <SubmissionField label="Assisted" value={prod.integrationType.assisted} onAddNote={onAddNote} />
                <SubmissionField label="Detached" value={prod.integrationType.detached} onAddNote={onAddNote} />
              </div>
              <SubmissionField label="Consent Request SMS" value={prod.consentRequestSMS} onAddNote={onAddNote} />
              <SubmissionField label="User Journey Video" value={prod.userJourneyVideo} onAddNote={onAddNote} />
            </div>
            
            <div>
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
        </CardContent>
      </Card>

      <Card className="mb-6 border border-primary/20">
        <CardHeader className="bg-primary/5 pb-3">
          <CardTitle className="text-lg font-medium text-primary">Consent Parameters</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {prod.consentParams.map((param: any, index: number) => (
            <ConsentParamCard 
              key={index}
              param={param}
              index={index}
              onAddNote={onAddNote}
            />
          ))}
        </CardContent>
      </Card>

      <Card className="mb-6 border border-primary/20">
        <CardHeader className="bg-primary/5 pb-3">
          <CardTitle className="text-lg font-medium text-primary">Co-creation Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
            <SubmissionField label="Figma URL" value={prod.figmaUrl} onAddNote={onAddNote} />
            <SubmissionField label="Data Passed To Onemoney" value={prod.dataPassedToOnemoney} onAddNote={onAddNote} />
            <SubmissionField label="Data Shared From Onemoney" value={prod.dataSharedFromOnemoney} onAddNote={onAddNote} />
            <SubmissionField label="Onemoney API Referenced" value={prod.onemoneyApiReferenced} onAddNote={onAddNote} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProdFields;
