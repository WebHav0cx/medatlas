import type { Account, IdentityData, StaffRole } from "../domain/identity.ts";

export const SEED_VERSION = 1;
export const DEMO_PASSWORD = "MedAtlas-Demo-2026";
export const PATIENT_INVITATION = { medAtlasId: "MA-DEMO-0002", email: "ada.patient@example.test", code: "PORTAL-DEMO-2026" };
export const STAFF_INVITATION = { email: "new.nurse@example.test", code: "STAFF-DEMO-2026" };

const hospitalRoles: StaffRole[] = ["doctor", "nurse", "records", "administrator"];
const laboratoryRoles: StaffRole[] = ["reception", "scientist", "reviewer", "administrator"];

export function createIdentitySeed(): IdentityData {
  const staff: Account[] = [
    ...hospitalRoles.map((role) => ({ id: `demo-hospital-${role}`, email: `${role}.hospital@example.test`, firstName: "Demo", lastName: `Hospital ${role}`, role, workspace: "hospital" as const, organisationId: "org-demo-hospital" })),
    ...laboratoryRoles.map((role) => ({ id: `demo-laboratory-${role}`, email: `${role}.laboratory@example.test`, firstName: "Demo", lastName: `Laboratory ${role}`, role, workspace: "laboratory" as const, organisationId: "org-demo-laboratory" })),
  ];
  return {
    seedVersion: SEED_VERSION,
    organisations: [
      { id: "org-demo-hospital", name: "Demo CityCare Hospital", type: "Hospital", state: "Lagos", phone: "+2340000000000", address: "1 Fictional Care Road", status: "demo-active" },
      { id: "org-demo-laboratory", name: "Demo Atlas Laboratory", type: "Laboratory", state: "Oyo", phone: "+2340000000000", address: "2 Fictional Science Road", status: "demo-active" },
    ],
    accounts: [...staff, { id: "demo-patient-1", email: "patient@example.test", firstName: "Demo", lastName: "Patient", role: "patient", workspace: "patient", patientId: "patient-demo-1" }],
    patients: [
      { id: "patient-demo-1", medAtlasId: "MA-DEMO-0001", firstName: "Demo", lastName: "Patient", email: "patient@example.test", organisationId: "org-demo-hospital", portalAccountId: "demo-patient-1" },
      { id: "patient-demo-2", medAtlasId: PATIENT_INVITATION.medAtlasId, firstName: "Ada", lastName: "Demo", email: PATIENT_INVITATION.email, organisationId: "org-demo-hospital" },
    ],
    invitations: [
      { id: "invite-demo-patient", code: PATIENT_INVITATION.code, email: PATIENT_INVITATION.email, kind: "patient", patientId: "patient-demo-2", workspace: "patient", consumed: false },
      { id: "invite-demo-staff", code: STAFF_INVITATION.code, email: STAFF_INVITATION.email, kind: "staff", organisationId: "org-demo-hospital", role: "nurse", workspace: "hospital", consumed: false },
    ],
    audit: [],
  };
}
