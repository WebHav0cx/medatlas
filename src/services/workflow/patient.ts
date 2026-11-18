import {
  type WorkflowContext,
  nowLabel,
  uid,
  accountFor,
  patientAccountFor,
  appendAudit,
  appendPatientAudit,
  patientDocuments,
} from "./context.ts";
import type {
  PatientAccount,
  PatientIdentityLink,
  PatientLinkStatus,
  PatientRequest,
  PatientRequestStatus,
  RequestStatus,
} from "../../domain/workflow/types.ts";
export function createPatientActions({
  get,
  change,
  permitted,
}: WorkflowContext) {
  return {
    signInPatient(email: string, password: string) {
      const a = get().patientAccounts.find(
        (a) =>
          a.email.toLowerCase() === email.toLowerCase() &&
          (a.password ?? "medatlas") === password &&
          a.status === "Active",
      );
      if (!a) return null;
      change((s) => ({
        ...s,
        currentPatientAccountId: a.id,
      }));
      return a;
    },
    createPatientAccount(input: {
      fullName: string;
      email: string;
      phone: string;
      dob: string;
      password: string;
    }): PatientAccount {
      if (
        get().patientAccounts.some(
          (a) => a.email.toLowerCase() === input.email.toLowerCase(),
        )
      )
        throw new Error(
          "An account with this email already exists. Sign in instead.",
        );
      const account: PatientAccount = {
        ...input,
        id: uid("patient-account"),
        status: "Active",
        createdAt: nowLabel(),
        preferences: {
          email: true,
          sms: false,
          sharing: true,
          records: true,
        },
      };
      change((s) => ({
        ...s,
        patientAccounts: [...s.patientAccounts, account],
        currentPatientAccountId: account.id,
      }));
      return account;
    },
    updatePatientAccount(
      id: string,
      changes: Pick<PatientAccount, "phone" | "email" | "preferences"> &
        Partial<Pick<PatientAccount, "password">>,
    ) {
      change((s) => ({
        ...s,
        patientAccounts: s.patientAccounts.map((a) =>
          a.id === id
            ? {
                ...a,
                ...changes,
              }
            : a,
        ),
      }));
    },
    patientDocuments: () => patientDocuments(get()),
    patientDocument: (id: string) =>
      patientDocuments(get()).find((d) => d.id === id),
    submitPatientLink({
      facility,
      method,
      code,
    }: {
      facility: string;
      method: PatientIdentityLink["method"];
      code?: string;
    }) {
      const s = get(),
        account = patientAccountFor(s);
      const codes: Record<string, string> = {
        "CITY-AREMU-2841": "patient-1",
        "CITY-BOLA-3109": "patient-2",
        "CITY-KEMI-4721": "patient-3",
        "CITY-IFEOMA-6820": "patient-5",
      };
      const patientId =
        method === "Linking Code"
          ? codes[(code ?? "").trim().toUpperCase()]
          : s.patients.find(
              (p) =>
                `${p.firstName} ${p.lastName}`.toLowerCase() ===
                  account.fullName.toLowerCase() && p.dob === account.dob,
            )?.id;
      if (method === "Linking Code" && !patientId) return null;
      const existing = s.patientLinks.find(
        (l) =>
          l.accountId === account.id &&
          l.facility === facility &&
          l.patientId === patientId &&
          !["Declined"].includes(l.status),
      );
      if (existing) return existing;
      const link: PatientIdentityLink = {
        id: uid("PLINK"),
        accountId: account.id,
        patientId,
        facility,
        method,
        status:
          method === "Linking Code" ? "Pending Verification" : "Under Review",
        submittedAt: nowLabel(),
        updatedAt: nowLabel(),
        note:
          method === "Linking Code"
            ? "Linking code validated. Facility confirmation is pending."
            : "Submitted for authorised facility review.",
      };
      change((c) => ({
        ...c,
        patientLinks: [link, ...c.patientLinks],
        patientNotifications: [
          {
            id: uid("PNOT"),
            accountId: account.id,
            type: "Record Link",
            title: "Record linking request submitted",
            message: `${facility} will review your request.`,
            at: nowLabel(),
            read: false,
            href: "/patient/requests",
            relatedId: link.id,
          },
          ...c.patientNotifications,
        ],
        audit: appendPatientAudit(
          c,
          "Patient record link requested",
          link.id,
          "Success",
          `${facility} review requested through ${method}.`,
        ),
      }));
      return link;
    },
    reviewPatientLink(
      id: string,
      status: Extract<
        PatientLinkStatus,
        "Linked" | "Declined" | "Additional Information Required"
      >,
      note: string,
    ) {
      if (!permitted("records", "admin")) return;
      change((s) => {
        const link = s.patientLinks.find((l) => l.id === id);
        if (
          !link ||
          link.status === "Linked" ||
          (status === "Linked" && !link.patientId)
        )
          return s;
        return {
          ...s,
          patientLinks: s.patientLinks.map((l) =>
            l.id === id
              ? {
                  ...l,
                  status,
                  note,
                  updatedAt: nowLabel(),
                }
              : l,
          ),
          patientAccounts: s.patientAccounts.map((a) =>
            a.id === link.accountId && status === "Linked"
              ? {
                  ...a,
                  patientId: link.patientId,
                }
              : a,
          ),
          patientNotifications: [
            {
              id: uid("PNOT"),
              accountId: link.accountId,
              type: "Record Link",
              title:
                status === "Linked"
                  ? "Record link approved"
                  : status === "Declined"
                    ? "Record link declined"
                    : "More information is needed",
              message: `${link.facility}: ${note}`,
              at: nowLabel(),
              read: false,
              href: "/patient/requests",
              relatedId: id,
            },
            ...s.patientNotifications,
          ],
          audit: appendAudit(
            s,
            `Patient link ${status.toLowerCase()}`,
            id,
            "Success",
            note,
          ),
        };
      });
    },
    decideSharing(id: string, decision: "Active" | "Declined") {
      change((s) => {
        const p = s.sharingPermissions.find(
          (p) => p.id === id && p.accountId === s.currentPatientAccountId,
        );
        if (!p || p.status !== "Pending Decision") return s;
        const status: RequestStatus =
          decision === "Active" ? "Under Review" : "Declined";
        return {
          ...s,
          sharingPermissions: s.sharingPermissions.map((p) =>
            p.id === id
              ? {
                  ...p,
                  status: decision,
                  decidedAt: nowLabel(),
                }
              : p,
          ),
          requests: s.requests.map((r) =>
            r.id === p.requestId
              ? {
                  ...r,
                  status,
                  history: [
                    ...r.history,
                    {
                      status,
                      at: nowLabel(),
                      actor: "Patient account",
                      note:
                        decision === "Active"
                          ? "Patient allowed the requested sharing scope."
                          : "Patient declined the sharing request.",
                    },
                  ],
                }
              : r,
          ),
          patientNotifications: s.patientNotifications.map((n) =>
            n.relatedId === id
              ? {
                  ...n,
                  read: true,
                }
              : n,
          ),
          audit: appendPatientAudit(
            s,
            decision === "Active"
              ? "Patient sharing permission granted"
              : "Patient sharing request declined",
            p.requestId,
            "Success",
            `${p.recordCategory} · ${p.scope}.`,
          ),
        };
      });
    },
    withdrawPermission(id: string) {
      change((s) => {
        const p = s.sharingPermissions.find(
          (p) => p.id === id && p.accountId === s.currentPatientAccountId,
        );
        if (!p || p.status !== "Active") return s;
        return {
          ...s,
          sharingPermissions: s.sharingPermissions.map((p) =>
            p.id === id
              ? {
                  ...p,
                  status: "Withdrawn",
                  decidedAt: nowLabel(),
                }
              : p,
          ),
          requests: s.requests.map((r) =>
            r.id === p.requestId
              ? {
                  ...r,
                  authorisation:
                    "Patient permission withdrawn for future consent-based access",
                  history: [
                    ...r.history,
                    {
                      status: r.status,
                      at: nowLabel(),
                      actor: "Patient account",
                      note: "Future consent-based access was withdrawn. Previously completed access is unchanged.",
                    },
                  ],
                }
              : r,
          ),
          audit: appendPatientAudit(
            s,
            "Patient sharing permission withdrawn",
            p.requestId,
            "Success",
            "Future consent-based access was withdrawn.",
          ),
        };
      });
    },
    addPatientRequest(
      input: Pick<PatientRequest, "type" | "facility" | "documentId" | "note">,
    ): PatientRequest {
      const s = get(),
        a = patientAccountFor(s);
      const request: PatientRequest = {
        ...input,
        id: `PRQ-${String(130 + s.patientRequests.length + 1).padStart(5, "0")}`,
        accountId: a.id,
        patientId: a.patientId,
        status: "Submitted",
        submittedAt: nowLabel(),
        updatedAt: nowLabel(),
        history: [
          {
            status: "Submitted",
            at: nowLabel(),
            actor: a.fullName,
            note: input.note,
          },
        ],
      };
      change((c) => ({
        ...c,
        patientRequests: [request, ...c.patientRequests],
        patientNotifications: [
          {
            id: uid("PNOT"),
            accountId: a.id,
            type: "Request Update",
            title: "Request submitted",
            message: `${input.facility} received your ${input.type.toLowerCase()} request.`,
            at: nowLabel(),
            read: false,
            href: `/patient/requests/${request.id}`,
            relatedId: request.id,
          },
          ...c.patientNotifications,
        ],
        audit: appendPatientAudit(
          c,
          "Patient information request submitted",
          request.id,
          "Success",
          `${input.type} sent to ${input.facility}.`,
        ),
      }));
      return request;
    },
    transitionPatientRequest(
      id: string,
      status: PatientRequestStatus,
      note: string,
    ) {
      if (!permitted("records", "admin")) return;
      change((s) => {
        const r = s.patientRequests.find((r) => r.id === id);
        if (!r || ["Completed", "Declined", "Cancelled"].includes(r.status))
          return s;
        return {
          ...s,
          patientRequests: s.patientRequests.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status,
                  updatedAt: nowLabel(),
                  history: [
                    ...r.history,
                    {
                      status,
                      at: nowLabel(),
                      actor: accountFor(s).name,
                      note,
                    },
                  ],
                }
              : r,
          ),
          patientNotifications: [
            {
              id: uid("PNOT"),
              accountId: r.accountId,
              type: "Request Update",
              title: `Request ${status.toLowerCase()}`,
              message: note,
              at: nowLabel(),
              read: false,
              href: `/patient/requests/${id}`,
              relatedId: id,
            },
            ...s.patientNotifications,
          ],
          audit: appendAudit(
            s,
            `Patient request ${status.toLowerCase()}`,
            id,
            "Success",
            note,
          ),
        };
      });
    },
    markPatientNotification(id: string) {
      change((s) => ({
        ...s,
        patientNotifications: s.patientNotifications.map((n) =>
          n.id === id && n.accountId === s.currentPatientAccountId
            ? {
                ...n,
                read: true,
              }
            : n,
        ),
      }));
    },
    markAllPatientNotifications() {
      change((s) => ({
        ...s,
        patientNotifications: s.patientNotifications.map((n) =>
          n.accountId === s.currentPatientAccountId
            ? {
                ...n,
                read: true,
              }
            : n,
        ),
      }));
    },
  };
}
