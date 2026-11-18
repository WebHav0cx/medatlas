export type FacilityType = "Hospital" | "Clinic" | "Laboratory" | "Diagnostic centre";
export type StaffRole = "doctor" | "nurse" | "records" | "administrator" | "reception" | "scientist" | "reviewer";
export type Role = StaffRole | "patient";
export type Workspace = "hospital" | "laboratory" | "patient";

export interface Organisation {
  id: string;
  name: string;
  type: FacilityType;
  state: string;
  phone: string;
  address: string;
  status: "pending" | "demo-active";
}

export interface Account {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  workspace: Workspace;
  organisationId?: string;
  patientId?: string;
}

export interface PatientProfile {
  id: string;
  medAtlasId: string;
  firstName: string;
  lastName: string;
  email: string;
  organisationId: string;
  portalAccountId?: string;
}

export interface Invitation {
  id: string;
  code: string;
  email: string;
  kind: "staff" | "patient";
  organisationId?: string;
  patientId?: string;
  role?: StaffRole;
  workspace: Workspace;
  consumed: boolean;
}

export interface AuditEvent {
  id: string;
  at: string;
  actorId: string;
  action: "facility-submitted" | "staff-activated" | "portal-activated" | "signed-in" | "signed-out";
  subjectId: string;
}

export interface IdentityData {
  seedVersion: number;
  organisations: Organisation[];
  accounts: Account[];
  patients: PatientProfile[];
  invitations: Invitation[];
  audit: AuditEvent[];
}

export type ActionResult = { ok: true; accountId: string } | { ok: false; message: string };

export const roleLabels: Record<Role, string> = {
  doctor: "Doctor", nurse: "Nurse", records: "Records officer", administrator: "Administrator",
  reception: "Reception", scientist: "Laboratory scientist", reviewer: "Result reviewer", patient: "Patient",
};

export function dashboardPath(account: Account): string {
  return account.workspace === "patient" ? "/patient/dashboard" : `/${account.workspace}/${account.role}/dashboard`;
}
