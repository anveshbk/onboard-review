// Add the following type definitions at the top of the file or update existing ones
export type Submission = {
  id: string;
  tspName: string;
  fiuRegisteredName: string;
  environment: "UAT" | "PROD";
  submissionTimestamp: string;
  status?: "pending" | "approved" | "rejected";
  reviewComments?: string;
  reviewNotes?: string[];
  requestedBy: string;
  tspSpocEmail: string;
  regulator: string;
  licenseType: string;
  approvedBy?: string;
  approvalTimestamp?: string;
  rejectedBy?: string;
  rejectionTimestamp?: string;
  [key: string]: any; // To allow for additional fields
};

export const mockSubmissions: Submission[] = [
  {
    id: "1",
    tspName: "Tech Solutions Provider A",
    fiuRegisteredName: "Financial Info User 1",
    environment: "UAT",
    submissionTimestamp: "2024-01-20T10:00:00Z",
    status: "pending",
    reviewComments: "Awaiting initial review.",
    reviewNotes: [],
    requestedBy: "John Doe",
    tspSpocEmail: "john.doe@techsolutions.com",
    regulator: "RBI",
    licenseType: "NBFC",
    fiuCrId: "CR123",
    integrationMode: "API",
    primaryColor: "#007BFF",
    secondaryColor: "#6C757D",
    primaryFont: "Arial",
    secondaryFont: "Helvetica",
  },
  {
    id: "2",
    tspName: "Global Technologies Inc.",
    fiuRegisteredName: "Finance Data Corp",
    environment: "PROD",
    submissionTimestamp: "2024-01-15T14:30:00Z",
    status: "approved",
    reviewComments: "Approved after compliance check.",
    reviewNotes: [],
    requestedBy: "Alice Smith",
    tspSpocEmail: "alice.smith@globaltech.com",
    regulator: "SEBI",
    licenseType: "Bank",
    licenseCopy: "https://example.com/license2.pdf",
    licenseNo: "L98765",
    fiuCrIdUat: "CR456UAT",
    fiuCrIdProd: "CR456PROD",
    agreementExecuted: true,
    agreementFile: "https://example.com/agreement2.pdf",
    fiuSpoc: {
      name: "Bob Johnson",
      email: "bob.johnson@financedata.com",
      mobileNumber: "9876543210",
    },
    fiuEscalationSpoc: {
      name: "Catherine Lee",
      email: "catherine.lee@financedata.com",
      mobileNumber: "8765432109",
    },
    rbiSpoc: {
      name: "David Kim",
      email: "david.kim@financedata.com",
      mobileNumber: "7654321098",
    },
    grievanceSpoc: {
      name: "Emily Chen",
      email: "emily.chen@financedata.com",
      mobileNumber: "6543210987",
    },
    integrationType: {
      webRedirection: true,
      sdk: false,
      assisted: true,
      detached: false,
    },
    consentRequestSMS: true,
    userJourneyVideo: "https://example.com/userjourney2.mp4",
    whitelistedUrls: ["https://example.com/url1", "https://example.com/url2"],
    consentRequired: true,
    accountTypeFilter: "Savings",
    fipSelectionInHostApp: true,
    maxFipLimit: 5,
    singleFipMultiFip: "Multi",
    accountSelectionType: "Manual",
    targetedAutoDiscovery: true,
    onemoneyConsentRequestMode: "Default",
    consentParams: [
      {
        usecaseDetails: "Loan Application",
        purposeCode: "LOAN001",
        purposeText: "To process loan application",
        consentValidityPeriod: { value: 6, unit: "Months" },
        fetchType: "Periodic",
        consentType: ["View", "Fetch"],
        fiTypes: ["Account", "Summary"],
        fiDataRange: { value: 12, unit: "Months" },
        dataLife: { value: 24, unit: "Months" },
        dataFetchFrequency: { value: 1, unit: "Month" },
      },
    ],
    figmaUrl: "https://example.com/figma2",
    dataPassedToOnemoney: "Customer ID, Loan Amount",
    dataSharedFromOnemoney: "Account Balance, Transaction History",
    onemoneyApiReferenced: "Get Account Details API",
    approvedBy: "Admin User",
    approvalTimestamp: "2024-01-16T10:00:00Z"
  },
  {
    id: "3",
    tspName: "Innovative Solutions Ltd.",
    fiuRegisteredName: "Data Insights Group",
    environment: "UAT",
    submissionTimestamp: "2024-01-10T09:15:00Z",
    status: "rejected",
    reviewComments: "Rejected due to incomplete documentation.",
    reviewNotes: [],
    requestedBy: "Jane Williams",
    tspSpocEmail: "jane.williams@innovativesolutions.com",
    regulator: "IRDAI",
    licenseType: "Insurance",
    fiuCrId: "CR789",
    integrationMode: "SDK",
    primaryColor: "#28A745",
    secondaryColor: "#DC3545",
    primaryFont: "Roboto",
    secondaryFont: "Open Sans",
    rejectedBy: "Admin User",
    rejectionTimestamp: "2024-01-11T11:00:00Z"
  },
  {
    id: "4",
    tspName: "Pioneer Enterprises",
    fiuRegisteredName: "Analytics Solutions Co.",
    environment: "PROD",
    submissionTimestamp: "2024-01-05T16:45:00Z",
    status: "pending",
    reviewComments: "Initial review pending.",
    reviewNotes: [],
    requestedBy: "Mike Brown",
    tspSpocEmail: "mike.brown@pioneerenterprises.com",
    regulator: "PFRDA",
    licenseType: "Pension Fund",
    licenseCopy: "https://example.com/license4.pdf",
    licenseNo: "L24680",
    fiuCrIdUat: "CR101UAT",
    fiuCrIdProd: "CR101PROD",
    agreementExecuted: false,
    agreementFile: "https://example.com/agreement4.pdf",
    fiuSpoc: {
      name: "Susan Davis",
      email: "susan.davis@analyticssolutions.com",
      mobileNumber: "5432109876",
    },
    fiuEscalationSpoc: {
      name: "Tom Wilson",
      email: "tom.wilson@analyticssolutions.com",
      mobileNumber: "4321098765",
    },
    rbiSpoc: {
      name: "Karen White",
      email: "karen.white@analyticssolutions.com",
      mobileNumber: "3210987654",
    },
    grievanceSpoc: {
      name: "Peter Green",
      email: "peter.green@analyticssolutions.com",
      mobileNumber: "2109876543",
    },
    integrationType: {
      webRedirection: false,
      sdk: true,
      assisted: false,
      detached: true,
    },
    consentRequestSMS: false,
    userJourneyVideo: "https://example.com/userjourney4.mp4",
    whitelistedUrls: ["https://example.com/url7", "https://example.com/url8"],
    consentRequired: false,
    accountTypeFilter: "Current",
    fipSelectionInHostApp: false,
    maxFipLimit: 10,
    singleFipMultiFip: "Single",
    accountSelectionType: "Auto",
    targetedAutoDiscovery: false,
    onemoneyConsentRequestMode: "Custom",
    consentParams: [
      {
        usecaseDetails: "KYC Verification",
        purposeCode: "KYC001",
        purposeText: "To verify customer identity",
        consentValidityPeriod: { value: 3, unit: "Months" },
        fetchType: "One-time",
        consentType: ["View"],
        fiTypes: ["Identity"],
        fiDataRange: { value: 0, unit: "Days" },
        dataLife: { value: 90, unit: "Days" },
      },
    ],
    figmaUrl: "https://example.com/figma4",
    dataPassedToOnemoney: "Name, Address",
    dataSharedFromOnemoney: "KYC Status",
    onemoneyApiReferenced: "Verify KYC API",
  },
];

// Export JSON mock data for persistence
export const mockSubmissionsJSON = JSON.stringify(mockSubmissions, null, 2);

/* 
  Note: In a real application, you would store this data in a backend database.
  For now, we're storing it in the code and in localStorage for persistence.
  The JSON format allows for easy export/import to files if needed.
*/
