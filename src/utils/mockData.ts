
export type SpocDetail = {
  name: string;
  email: string;
  mobileNumber: string;
};

export type ConsentParam = {
  usecaseDetails: string;
  purposeCode: string;
  purposeText: string;
  consentValidityPeriod: { value: number; unit: string };
  fetchType: string;
  consentType: string[];
  fiTypes: string[];
  fiDataRange: { value: number; unit: string };
  dataLife: { value: number; unit: string };
  dataFetchFrequency?: { value: number; unit: string };
};

export type UatSubmission = {
  id: string;
  tspName: string;
  requestedBy: string;
  tspSpocEmail: string;
  fiuRegisteredName: string;
  regulator: string;
  licenseType: string;
  fiuCrId: string;
  integrationMode: string;
  primaryColor: string;
  secondaryColor: string;
  primaryFont: string;
  secondaryFont: string;
  fiuLogo: string;
  environment: string;
  submissionTimestamp: string;
  status?: "pending" | "approved" | "rejected";
  reviewNotes?: string[];
  reviewComments?: string;
};

export type ProdSubmission = {
  id: string;
  tspName: string;
  requestDate: string;
  requestedBy: string;
  tspSpocEmail: string;
  fiuRegisteredName: string;
  regulator: string;
  licenseType: string;
  licenseCopy: string;
  licenseNo: string;
  fiuCrIdUat: string;
  fiuCrIdProd: string;
  agreementExecuted: boolean;
  agreementFile: string;
  fiuSpoc: SpocDetail;
  fiuEscalationSpoc: SpocDetail;
  rbiSpoc: SpocDetail;
  grievanceSpoc: SpocDetail;
  integrationType: {
    webRedirection: boolean;
    sdk: boolean;
    assisted: boolean;
    detached: boolean;
  };
  integrationMode: string;
  consentRequestSMS: boolean;
  userJourneyVideo: string;
  whitelistedUrls: string[];
  consentRequired: string;
  accountTypeFilter: boolean;
  fipSelectionInHostApp: boolean;
  maxFipLimit: number;
  singleFipMultiFip: string;
  accountSelectionType: string;
  targetedAutoDiscovery: boolean;
  onemoneyConsentRequestMode: string;
  consentAccountsFlow: string;
  consentAccountMode: string;
  consentApprovalMode: string;
  mobileVerified: boolean;
  verificationProcedure: string;
  fiuLogoVisible: boolean;
  fiuLogo: string;
  consentParams: ConsentParam[];
  figmaUrl: string;
  dataPassedToOnemoney: string;
  dataSharedFromOnemoney: string;
  onemoneyApiReferenced: string;
  environment: string;
  submissionTimestamp: string;
  status?: "pending" | "approved" | "rejected";
  reviewNotes?: string[];
  reviewComments?: string;
};

export type Submission = UatSubmission | ProdSubmission;

export const mockSubmissions: Submission[] = [
  {
    id: "1",
    tspName: "Example TSP Solutions",
    requestedBy: "John Doe",
    tspSpocEmail: "tsp.spoc@example.com",
    fiuRegisteredName: "Example Financial Services Ltd.",
    regulator: "RBI",
    licenseType: "NBFC",
    fiuCrId: "FICR12345UAT",
    integrationMode: "Standard",
    primaryColor: "#2563eb",
    secondaryColor: "#4f46e5",
    primaryFont: "Roboto",
    secondaryFont: "Open Sans",
    fiuLogo: "[File object]",
    environment: "UAT",
    submissionTimestamp: "2025-05-17T10:30:45.123Z",
    status: "pending"
  },
  {
    id: "2",
    tspName: "FinTech Solutions Ltd.",
    requestDate: "2025-05-17T00:00:00.000Z",
    requestedBy: "John Doe",
    tspSpocEmail: "john.doe@fintechsolutions.com",
    fiuRegisteredName: "Credit Express Financial Services",
    regulator: "RBI",
    licenseType: "NBFC",
    licenseCopy: "https://example.com/license.pdf",
    licenseNo: "RBI-NBFC-12345",
    fiuCrIdUat: "FIU98765UAT",
    fiuCrIdProd: "FIU98765PROD",
    agreementExecuted: true,
    agreementFile: "https://example.com/agreement.pdf",
    fiuSpoc: {
      name: "Jane Smith",
      email: "jane.smith@creditexpress.com",
      mobileNumber: "9876543210"
    },
    fiuEscalationSpoc: {
      name: "Alex Johnson",
      email: "alex.johnson@creditexpress.com",
      mobileNumber: "9876543211"
    },
    rbiSpoc: {
      name: "Michael Brown",
      email: "michael.brown@creditexpress.com",
      mobileNumber: "9876543212"
    },
    grievanceSpoc: {
      name: "Sarah Williams",
      email: "sarah.williams@creditexpress.com",
      mobileNumber: "9876543213"
    },
    integrationType: {
      webRedirection: true,
      sdk: true,
      assisted: false,
      detached: false
    },
    integrationMode: "Cocreated FIU",
    consentRequestSMS: true,
    userJourneyVideo: "https://example.com/user-journey.mp4",
    whitelistedUrls: [
      "https://app.creditexpress.com/callback",
      "https://app.creditexpress.com/redirect"
    ],
    consentRequired: "Multiple",
    accountTypeFilter: true,
    fipSelectionInHostApp: true,
    maxFipLimit: 5,
    singleFipMultiFip: "Multi",
    accountSelectionType: "Multi",
    targetedAutoDiscovery: false,
    onemoneyConsentRequestMode: "In redirection URL",
    consentAccountsFlow: "FIP passed from host app and Onemoney already linked accounts",
    consentAccountMode: "Per Journey",
    consentApprovalMode: "Approve all/Reject all",
    mobileVerified: true,
    verificationProcedure: "Two-factor authentication via OTP",
    fiuLogoVisible: true,
    fiuLogo: "https://example.com/creditexpress-logo.png",
    consentParams: [
      {
        usecaseDetails: "Loan processing and approval",
        purposeCode: "103",
        purposeText: "To process borrower's loan application",
        consentValidityPeriod: { value: 1, unit: "Month" },
        fetchType: "Onetime",
        consentType: ["Profile", "Summary", "Transactions"],
        fiTypes: ["DEPOSIT", "TERM_DEPOSIT", "RECURRING_DEPOSIT"],
        fiDataRange: { value: 12, unit: "Month" },
        dataLife: { value: 1, unit: "Month" }
      },
      {
        usecaseDetails: "Loan monitoring",
        purposeCode: "104",
        purposeText: "To monitor the borrower's account",
        consentValidityPeriod: { value: 24, unit: "Month" },
        fetchType: "Periodic",
        consentType: ["Profile", "Summary"],
        fiTypes: ["DEPOSIT"],
        dataFetchFrequency: { value: 1, unit: "Month" },
        fiDataRange: { value: 6, unit: "Month" },
        dataLife: { value: 1, unit: "Month" }
      }
    ],
    figmaUrl: "https://figma.com/file/abcdef123456/CreditExpress-Onemoney-Integration",
    dataPassedToOnemoney: "Customer name, mobile number, email address, loan application ID, and selected loan product details.",
    dataSharedFromOnemoney: "Account aggregation data including bank statements, account balances, transaction details, and FIP selection information.",
    onemoneyApiReferenced: "Authentication API, Consent Generation API, FIP Selection API, and Data Fetch API with custom callbacks.",
    environment: "PROD",
    submissionTimestamp: "2025-05-17T15:30:45.123Z",
    status: "pending"
  },
  {
    id: "3",
    tspName: "Digital Finance Corp",
    requestedBy: "Alice Smith",
    tspSpocEmail: "alice.smith@digitalfinance.com",
    fiuRegisteredName: "Digital Finance Services",
    regulator: "RBI",
    licenseType: "NBFC",
    fiuCrId: "FICR56789UAT",
    integrationMode: "Advanced",
    primaryColor: "#10b981",
    secondaryColor: "#059669",
    primaryFont: "Inter",
    secondaryFont: "Lato",
    fiuLogo: "[File object]",
    environment: "UAT",
    submissionTimestamp: "2025-05-16T14:20:33.123Z",
    status: "approved",
    reviewNotes: ["Primary color matches brand guidelines", "Integration mode is appropriate"],
    reviewComments: "All documentation is in order and meets compliance standards."
  },
  {
    id: "4",
    tspName: "Secure Banking Tech",
    requestedBy: "Robert Johnson",
    tspSpocEmail: "rjohnson@securebanking.com",
    fiuRegisteredName: "Secure Banking Solutions",
    regulator: "RBI",
    licenseType: "Payment Bank",
    fiuCrId: "FICR98765UAT",
    integrationMode: "Standard",
    primaryColor: "#f59e0b",
    secondaryColor: "#d97706",
    primaryFont: "Montserrat",
    secondaryFont: "Poppins",
    fiuLogo: "[File object]",
    environment: "UAT",
    submissionTimestamp: "2025-05-16T08:45:12.123Z",
    status: "rejected",
    reviewNotes: ["Missing required regulatory documentation", "Integration mode needs clarification"],
    reviewComments: "Please provide the missing RBI certification and clarify the integration approach for the payment gateway."
  }
];
