import type {
  Account,
  ActionResult,
  AuditEvent,
  IdentityData,
} from "../domain/identity.ts";
import { DEMO_PASSWORD } from "../data/identity-seed.ts";
import {
  organisationSchema,
  portalSchema,
  signInSchema,
  staffActivationSchema,
} from "../schemas/auth.ts";
import type {
  OrganisationValues,
  PortalValues,
  SignInValues,
  StaffActivationValues,
} from "../schemas/auth.ts";

type Transition = { data: IdentityData; result: ActionResult };
const reject = (data: IdentityData, message: string): Transition => ({
  data,
  result: { ok: false, message },
});
const normalise = (value: string) => value.trim().toLowerCase();

export function appendAudit(
  data: IdentityData,
  actorId: string,
  action: AuditEvent["action"],
  subjectId: string,
): IdentityData {
  return {
    ...data,
    audit: [
      ...data.audit,
      {
        id: crypto.randomUUID(),
        at: new Date().toISOString(),
        actorId,
        action,
        subjectId,
      },
    ],
  };
}

export function registerOrganisation(
  data: IdentityData,
  input: OrganisationValues,
): Transition {
  const parsed = organisationSchema.safeParse(input);
  if (!parsed.success)
    return reject(data, "Check the registration fields before submitting.");
  const values = parsed.data;
  if (
    data.accounts.some((account) => normalise(account.email) === values.email)
  )
    return reject(data, "An account already uses this email. Sign in instead.");
  if (
    data.organisations.some(
      (org) =>
        normalise(org.name) === normalise(values.facilityName) &&
        normalise(org.address) === normalise(values.address),
    )
  )
    return reject(
      data,
      "This facility has already been submitted. Contact its administrator.",
    );
  const organisationId = crypto.randomUUID();
  const account: Account = {
    id: crypto.randomUUID(),
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    role: "administrator",
    workspace: values.facilityType === "Laboratory" ? "laboratory" : "hospital",
    organisationId,
  };
  const updated: IdentityData = {
    ...data,
    organisations: [
      ...data.organisations,
      {
        id: organisationId,
        name: values.facilityName,
        type: values.facilityType,
        state: values.state,
        phone: values.phone,
        address: values.address,
        status: "pending",
      },
    ],
    accounts: [...data.accounts, account],
  };
  return {
    data: appendAudit(
      updated,
      account.id,
      "facility-submitted",
      organisationId,
    ),
    result: { ok: true, accountId: account.id },
  };
}

export function signIn(
  data: IdentityData,
  input: SignInValues,
  audience: "patient" | "provider",
): Transition {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success || input.password !== DEMO_PASSWORD)
    return reject(data, "Check your email and the published demo password.");
  const account = data.accounts.find(
    (entry) => normalise(entry.email) === parsed.data.email,
  );
  if (
    !account ||
    (audience === "patient") !== (account.workspace === "patient")
  )
    return reject(
      data,
      "No active account matches this sign-in. Check the account type or activate your invitation.",
    );
  if (
    account.workspace === "patient" &&
    !data.patients.some(
      (patient) =>
        patient.id === account.patientId &&
        patient.portalAccountId === account.id,
    )
  )
    return reject(
      data,
      "Activate portal access using your facility invitation first.",
    );
  return {
    data: appendAudit(data, account.id, "signed-in", account.id),
    result: { ok: true, accountId: account.id },
  };
}

export function activatePatient(
  data: IdentityData,
  input: PortalValues,
): Transition {
  const parsed = portalSchema.safeParse(input);
  if (!parsed.success)
    return reject(data, "Check the activation fields before submitting.");
  const values = parsed.data;
  const invitation = data.invitations.find(
    (entry) =>
      entry.kind === "patient" &&
      entry.code === values.invitationCode &&
      entry.email === values.email &&
      !entry.consumed,
  );
  const patient = data.patients.find(
    (entry) =>
      entry.medAtlasId === values.medAtlasId &&
      entry.id === invitation?.patientId &&
      entry.email === values.email,
  );
  if (!invitation || !patient)
    return reject(
      data,
      "The invitation and profile details do not match. Ask your facility to verify your portal invitation.",
    );
  if (
    patient.portalAccountId ||
    data.accounts.some((account) => normalise(account.email) === values.email)
  )
    return reject(
      data,
      "Portal access is already activated for this account. Sign in instead.",
    );
  const account: Account = {
    id: crypto.randomUUID(),
    email: values.email,
    firstName: patient.firstName,
    lastName: patient.lastName,
    workspace: "patient",
    role: "patient",
    patientId: patient.id,
  };
  const updated = {
    ...data,
    accounts: [...data.accounts, account],
    patients: data.patients.map((entry) =>
      entry.id === patient.id
        ? { ...entry, portalAccountId: account.id }
        : entry,
    ),
    invitations: data.invitations.map((entry) =>
      entry.id === invitation.id ? { ...entry, consumed: true } : entry,
    ),
  };
  return {
    data: appendAudit(updated, account.id, "portal-activated", patient.id),
    result: { ok: true, accountId: account.id },
  };
}

export function activateStaff(
  data: IdentityData,
  input: StaffActivationValues,
): Transition {
  const parsed = staffActivationSchema.safeParse(input);
  if (!parsed.success)
    return reject(data, "Check the invitation fields before submitting.");
  const values = parsed.data;
  const invitation = data.invitations.find(
    (entry) =>
      entry.kind === "staff" &&
      entry.code === values.invitationCode &&
      entry.email === values.email &&
      !entry.consumed,
  );
  const organisation = data.organisations.find(
    (entry) => entry.id === invitation?.organisationId,
  );
  if (
    !invitation ||
    !invitation.role ||
    !organisation ||
    organisation.status !== "demo-active" ||
    invitation.workspace === "patient"
  )
    return reject(
      data,
      "This invitation is invalid or unavailable. Contact your facility administrator.",
    );
  if (
    data.accounts.some((account) => normalise(account.email) === values.email)
  )
    return reject(data, "This account already exists. Sign in instead.");
  const account: Account = {
    id: crypto.randomUUID(),
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    role: invitation.role,
    workspace: invitation.workspace,
    organisationId: organisation.id,
  };
  const updated = {
    ...data,
    accounts: [...data.accounts, account],
    invitations: data.invitations.map((entry) =>
      entry.id === invitation.id ? { ...entry, consumed: true } : entry,
    ),
  };
  return {
    data: appendAudit(updated, account.id, "staff-activated", organisation.id),
    result: { ok: true, accountId: account.id },
  };
}

export function canEnterWorkspace(
  account: Account | undefined,
  workspace: string,
  role?: string,
): boolean {
  return Boolean(
    account &&
    account.workspace === workspace &&
    (!role || account.role === role),
  );
}
