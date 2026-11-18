import type {
  MockState,
  AppRole,
  DocumentRecord,
  AuditEvent,
  DiagnosticRequest,
  DiagnosticRequestStatus,
} from "../../domain/workflow/types.ts";
export const nowLabel = () =>
  new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  }).format(new Date());
export const uid = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;
export const accountFor = (state: MockState) => {
  const account =
    state.staff.find((a) => a.id === state.currentAccountId) ?? state.staff[0];
  if (!account) throw new Error("Unknown user");
  return account;
};
export const patientAccountFor = (state: MockState) => {
  const account =
    state.patientAccounts.find((a) => a.id === state.currentPatientAccountId) ??
    state.patientAccounts[0];
  if (!account) throw new Error("Unknown user");
  return account;
};
export function appendAudit(
  current: MockState,
  action: string,
  resource: string,
  outcome: string,
  detail: string,
): AuditEvent[] {
  const account = accountFor(current);
  return [
    {
      id: uid("audit"),
      at: nowLabel(),
      actor: account.name,
      role: account.title,
      action,
      resource,
      outcome,
      detail,
    },
    ...current.audit,
  ];
}
export function organisationFor(state: MockState) {
  const account = accountFor(state);
  return state.organisations.find(
    (o) =>
      o.id ===
      (account.organisationId ??
        (account.role.startsWith("lab-") ? "org-prime" : "org-citycare")),
  );
}
export const roleTitles: Record<AppRole, string> = {
  doctor: "Doctor / Clinician",
  nurse: "Nurse",
  records: "Medical Records Officer",
  admin: "Hospital Administrator",
  "lab-reception": "Laboratory Reception Officer",
  "lab-scientist": "Laboratory Scientist",
  "lab-reviewer": "Authorised Result Reviewer",
  "lab-admin": "Laboratory Administrator",
};
export const routeForRole = (role: string) =>
  role.startsWith("lab-")
    ? `/laboratory/${role.replace("lab-", "")}/dashboard`
    : `/provider/${role}/dashboard`;
export function patientDocuments(state: MockState): DocumentRecord[] {
  const account = patientAccountFor(state);
  const links = state.patientLinks.filter(
    (l) => l.accountId === account.id && l.status === "Linked",
  );
  return state.documents.filter(
    (d) =>
      links.some(
        (l) => l.patientId === d.patientId && l.facility === d.sourceFacility,
      ) &&
      d.access === "Approved" &&
      (d.patientAccess ?? "Available") === "Available",
  );
}
export function createWorkflowContext(
  get: () => MockState,
  set: (state: MockState) => void,
) {
  const change = (update: (s: MockState) => MockState) => set(update(get()));
  const auditChange = (
    s: MockState,
    action: string,
    resource: string,
    detail: string,
  ): MockState => ({
    ...s,
    audit: appendAudit(s, action, resource, "Success", detail),
  });
  const permitted = (...roles: AppRole[]) =>
    accountFor(get()).status === "Active" &&
    roles.includes(accountFor(get()).role);
  return {
    get,
    set,
    change,
    auditChange,
    permitted,
  };
}
export type WorkflowContext = ReturnType<typeof createWorkflowContext>;
export function advanceDiagnostic(
  state: MockState,
  request: DiagnosticRequest,
  status: DiagnosticRequestStatus,
  note?: string,
): DiagnosticRequest {
  if (request.status === status) return request;
  return {
    ...request,
    status,
    history: [
      ...request.history,
      {
        status,
        at: nowLabel(),
        actor: accountFor(state).name,
        note,
      },
    ],
  };
}

export function appendPatientAudit(
  current: MockState,
  action: string,
  resource: string,
  outcome: string,
  detail: string,
): AuditEvent[] {
  const events = appendAudit(current, action, resource, outcome, detail);
  const account = patientAccountFor(current);
  return events.map((event, index) =>
    index === 0
      ? { ...event, actor: account.fullName, role: "Patient account" }
      : event,
  );
}
