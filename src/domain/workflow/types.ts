export type AppRole =
  | "doctor"
  | "nurse"
  | "records"
  | "admin"
  | "lab-reception"
  | "lab-scientist"
  | "lab-reviewer"
  | "lab-admin";
export type RequestStatus =
  | "Draft"
  | "Submitted"
  | "Under Review"
  | "Approved"
  | "Declined"
  | "Fulfilled"
  | "Cancelled";
export type ReferralStatus =
  | "Draft"
  | "Submitted"
  | "Acknowledged"
  | "In Progress"
  | "Completed"
  | "Cancelled";
export type IdentityStatus =
  | "Pending Review"
  | "Verification Required"
  | "Under Review"
  | "Resolved as Distinct"
  | "Merge Approved";
export type Patient = {
  id: string;
  medAtlasId: string;
  firstName: string;
  lastName: string;
  dob: string;
  sex: string;
  phone: string;
  localId: string;
  verification: "Verified" | "Pending";
  assignedStaff: string[];
  sourceFacilities: string[];
};
export type Encounter = {
  id: string;
  patientId: string;
  type: string;
  facility: string;
  date: string;
  recordCategories: string[];
};
export type DocumentRecord = {
  id: string;
  patientId: string;
  title: string;
  category: string;
  sourceFacility: string;
  date: string;
  access: "Approved" | "Limited" | "Access denied";
  patientAccess?: "Available" | "Restricted" | "Pending";
  author?: string;
  eventId?: string;
  requestId?: string;
};
export type RecordRequest = {
  id: string;
  patientId: string;
  requester: string;
  sourceFacility: string;
  category: string;
  purpose: string;
  authorisation: string;
  priority: "Routine" | "Urgent";
  status: RequestStatus;
  createdAt: string;
  history: Array<{
    status: RequestStatus;
    at: string;
    actor: string;
    note?: string;
  }>;
};
export type Referral = {
  id: string;
  patientId: string;
  destination: string;
  reason: string;
  context: string;
  attachments: string[];
  status: ReferralStatus;
  createdAt: string;
};
export type IdentityCase = {
  id: string;
  patientAId: string;
  patientBId: string;
  reasons: string[];
  matchingEvidence: string[];
  conflictingEvidence: string[];
  documents: string[];
  status: IdentityStatus;
  notes: string[];
  decisions: Array<{ action: string; actor: string; at: string; note: string }>;
};
export type StaffAccount = {
  id: string;
  name: string;
  role: AppRole;
  title: string;
  department: string;
  email: string;
  status: "Active" | "Pending Activation" | "Deactivated";
  lastActive: string;
  organisationId?: string;
};
export type CoordinationTask = {
  id: string;
  patientId: string;
  title: string;
  assignedTo: string;
  assignedBy: string;
  due: string;
  priority: "Routine" | "High";
  status: "Assigned" | "Pending" | "Completed" | "Escalated";
};
export type AuditEvent = {
  id: string;
  at: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  outcome: string;
  detail: string;
};
export type Organisation = {
  id: string;
  name: string;
  type: "Hospital" | "Clinic" | "Laboratory / Diagnostic Centre";
  location: string;
  status: "Active" | "Pending Review";
};
export type DiagnosticRequestStatus =
  | "Submitted"
  | "Acknowledged"
  | "Incomplete"
  | "Assigned"
  | "Specimen Collected"
  | "Processing"
  | "Awaiting Review"
  | "Correction Required"
  | "Approved"
  | "Released"
  | "Completed"
  | "Cancelled";
export type DiagnosticRequest = {
  id: string;
  patientId: string;
  requestingFacility: string;
  destination: string;
  requestingClinician: string;
  tests: string[];
  priority: "Routine" | "Urgent";
  purpose: string;
  submittedAt: string;
  status: DiagnosticRequestStatus;
  assignedScientistId?: string;
  history: Array<{
    status: DiagnosticRequestStatus;
    at: string;
    actor: string;
    note?: string;
  }>;
};
export type SpecimenStatus =
  | "Awaiting Collection"
  | "Collected"
  | "Received"
  | "Processing"
  | "Processing Completed"
  | "Rejected"
  | "Recollection Required";
export type Specimen = {
  id: string;
  requestId: string;
  patientId: string;
  sampleType: string;
  collectedAt: string;
  collector: string;
  status: SpecimenStatus;
  assignedTo: string;
  rejectionReason?: string;
};
export type LaboratoryResult = {
  id: string;
  requestId: string;
  patientId: string;
  values: Array<{
    test: string;
    value: string;
    unit: string;
    reference: string;
    flag: "Normal" | "High" | "Low";
  }>;
  comments: string;
  reportTitle: string;
  status:
    | "Draft"
    | "Submitted for Review"
    | "Correction Required"
    | "Approved"
    | "Released";
  scientistId: string;
  reviewerId?: string;
  updatedAt: string;
};
export type ExchangeTransaction = {
  id: string;
  requestId: string;
  resultId: string;
  patientId: string;
  sender: string;
  recipient: string;
  documentType: string;
  status: "Prepared" | "Released" | "Received" | "Failed";
  receiptStatus: "Pending" | "Acknowledged";
  at: string;
  responsibleUser: string;
};
export type StaffInvitation = {
  code: string;
  organisationId: string;
  email: string;
  role: AppRole;
  department: string;
  status: "Pending" | "Accepted" | "Revoked";
};
export type OrganisationApplication = {
  id: string;
  registeredName: string;
  displayName: string;
  type: Organisation["type"];
  state: string;
  lga: string;
  address: string;
  email: string;
  phone: string;
  licence: string;
  authority: string;
  administratorName: string;
  administratorEmail: string;
  status: "Pending Review" | "Approved" | "Declined";
};
// Password values are held in memory only and excluded from persistence.
export type PatientAccount = {
  id: string;
  patientId?: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  password?: string;
  status: "Active" | "Inactive";
  createdAt: string;
  preferences: {
    email: boolean;
    sms: boolean;
    sharing: boolean;
    records: boolean;
  };
};
export type PatientLinkStatus =
  | "Not Linked"
  | "Pending Verification"
  | "Additional Information Required"
  | "Linked"
  | "Declined"
  | "Under Review";
export type PatientIdentityLink = {
  id: string;
  accountId: string;
  patientId?: string;
  facility: string;
  method: "Linking Code" | "Facility Invitation" | "Review Request";
  status: PatientLinkStatus;
  submittedAt: string;
  updatedAt: string;
  note: string;
};
export type SharingPermission = {
  id: string;
  accountId: string;
  patientId: string;
  requestId: string;
  requestingOrganisation: string;
  requestingProfessional: string;
  sourceFacility: string;
  recordCategory: string;
  purpose: string;
  scope: string;
  duration: string;
  status: "Pending Decision" | "Active" | "Declined" | "Withdrawn" | "Expired";
  createdAt: string;
  decidedAt?: string;
};
export type PatientRequestStatus =
  | "Submitted"
  | "Under Review"
  | "Additional Information Required"
  | "Completed"
  | "Declined"
  | "Cancelled";
export type PatientRequest = {
  id: string;
  accountId: string;
  patientId?: string;
  type:
    | "Access Existing Records"
    | "Record Linking"
    | "Correction Review"
    | "Copy of Record";
  facility: string;
  documentId?: string;
  note: string;
  status: PatientRequestStatus;
  submittedAt: string;
  updatedAt: string;
  history: Array<{
    status: PatientRequestStatus;
    at: string;
    actor: string;
    note: string;
  }>;
};
export type PatientNotification = {
  id: string;
  accountId: string;
  type:
    | "Record Available"
    | "Sharing Request"
    | "Sharing Expiring"
    | "Record Link"
    | "Request Update";
  title: string;
  message: string;
  at: string;
  read: boolean;
  href: string;
  relatedId: string;
};
export type MockState = {
  facilityProfiles?: Record<string, {
    name: string;
    type: string;
    address: string;
    phone: string;
    email: string;
    departments: string[];
  }>;
  currentAccountId: string;
  currentPatientAccountId: string;
  patients: Patient[];
  encounters: Encounter[];
  documents: DocumentRecord[];
  requests: RecordRequest[];
  referrals: Referral[];
  identityCases: IdentityCase[];
  staff: StaffAccount[];
  tasks: CoordinationTask[];
  audit: AuditEvent[];
  organisations: Organisation[];
  diagnosticRequests: DiagnosticRequest[];
  specimens: Specimen[];
  labResults: LaboratoryResult[];
  exchanges: ExchangeTransaction[];
  invitations: StaffInvitation[];
  organisationApplications: OrganisationApplication[];
  patientAccounts: PatientAccount[];
  patientLinks: PatientIdentityLink[];
  sharingPermissions: SharingPermission[];
  patientRequests: PatientRequest[];
  patientNotifications: PatientNotification[];
  facility: {
    name: string;
    type: string;
    address: string;
    phone: string;
    email: string;
    departments: string[];
  };
};
export type FacilityProfile = MockState['facility'];
