import {
  type WorkflowContext,
  nowLabel,
  uid,
  accountFor,
  appendAudit,
} from "./context.ts";
import type {
  Patient,
  RecordRequest,
  RequestStatus,
  Referral,
  ReferralStatus,
  IdentityStatus,
  CoordinationTask,
} from "../../domain/workflow/types.ts";
export function createHospitalActions({
  get,
  change,
  auditChange,
  permitted,
}: WorkflowContext) {
  return {
    addPatient(input: Omit<Patient, "id" | "medAtlasId">): Patient {
      const s = get();
      const patient: Patient = {
        ...input,
        id: uid("patient"),
        medAtlasId: `MA-${String(100000 + s.patients.length + 1).padStart(6, "0")}`,
      };
      if (!permitted("records", "admin", "lab-reception", "lab-admin"))
        throw new Error("Access denied");
      change((c) =>
        auditChange(
          {
            ...c,
            patients: [...c.patients, patient],
          },
          "Patient registered",
          patient.medAtlasId,
          `${patient.firstName} ${patient.lastName} was registered.`,
        ),
      );
      return patient;
    },
    updatePatient(id: string, changes: Partial<Patient>) {
      change((s) =>
        auditChange(
          {
            ...s,
            patients: s.patients.map((p) =>
              p.id === id
                ? {
                    ...p,
                    ...changes,
                  }
                : p,
            ),
          },
          "Patient updated",
          id,
          "Permitted patient fields were updated.",
        ),
      );
    },
    addRequest(
      input: Omit<RecordRequest, "id" | "createdAt" | "history" | "status">,
    ): RecordRequest {
      const s = get(),
        account = accountFor(s);
      const r: RecordRequest = {
        ...input,
        id: `REQ-${String(8500 + s.requests.length + 1).padStart(6, "0")}`,
        status: "Submitted",
        createdAt: nowLabel(),
        history: [
          {
            status: "Submitted",
            at: nowLabel(),
            actor: account.name,
          },
        ],
      };
      const sharingId = uid("SHARE");
      change((c) => {
        const a = c.patientAccounts.find(
          (a) => a.patientId === input.patientId,
        );
        const consent =
          input.authorisation.toLowerCase().includes("patient") && a;
        return {
          ...c,
          requests: [r, ...c.requests],
          sharingPermissions: consent
            ? [
                {
                  id: sharingId,
                  accountId: a.id,
                  patientId: input.patientId,
                  requestId: r.id,
                  requestingOrganisation: input.requester,
                  requestingProfessional: account.name,
                  sourceFacility: input.sourceFacility,
                  recordCategory: input.category,
                  purpose: input.purpose,
                  scope: `This specific ${input.category.toLowerCase()}`,
                  duration: "30 days after approval",
                  status: "Pending Decision",
                  createdAt: nowLabel(),
                },
                ...c.sharingPermissions,
              ]
            : c.sharingPermissions,
          patientNotifications: consent
            ? [
                {
                  id: uid("PNOT"),
                  accountId: a.id,
                  type: "Sharing Request",
                  title: "Sharing decision needed",
                  message: `${input.requester} requested your ${input.category.toLowerCase()}.`,
                  at: nowLabel(),
                  read: false,
                  href: "/patient/sharing",
                  relatedId: sharingId,
                },
                ...c.patientNotifications,
              ]
            : c.patientNotifications,
          audit: appendAudit(
            c,
            "Record request created",
            r.id,
            "Success",
            `${r.category} requested from ${r.sourceFacility}.`,
          ),
        };
      });
      return r;
    },
    transitionRequest(id: string, status: RequestStatus, note?: string) {
      if (!permitted("records", "admin")) return;
      change((s) => {
        const r = s.requests.find((r) => r.id === id);
        if (!r || ["Fulfilled", "Declined", "Cancelled"].includes(r.status))
          return s;
        const consent = s.sharingPermissions.find((p) => p.requestId === id);
        if (
          ["Approved", "Fulfilled"].includes(status) &&
          r.authorisation.toLowerCase().includes("patient") &&
          (!consent || consent.status !== "Active")
        )
          return s;
        const allowed: Record<RequestStatus, RequestStatus[]> = {
          Draft: ["Submitted", "Cancelled"],
          Submitted: ["Under Review", "Approved", "Declined", "Cancelled"],
          "Under Review": ["Approved", "Declined", "Cancelled"],
          Approved: ["Fulfilled", "Cancelled"],
          Declined: [],
          Fulfilled: [],
          Cancelled: [],
        };
        if (!allowed[r.status].includes(status)) return s;
        let documents = s.documents;
        if (status === "Fulfilled") {
          const existing = documents.find(
            (d) =>
              d.patientId === r.patientId &&
              d.sourceFacility === r.sourceFacility &&
              d.category === r.category,
          );
          documents = existing
            ? documents.map((d) =>
                d.id === existing.id
                  ? {
                      ...d,
                      access: "Approved",
                      requestId: id,
                    }
                  : d,
              )
            : [
                {
                  id: uid("doc"),
                  patientId: r.patientId,
                  title: r.category,
                  category: r.category,
                  sourceFacility: r.sourceFacility,
                  date: new Date().toISOString().slice(0, 10),
                  access: "Approved",
                  patientAccess: "Available",
                  requestId: id,
                },
                ...documents,
              ];
        }
        return auditChange(
          {
            ...s,
            documents,
            requests: s.requests.map((r) =>
              r.id === id
                ? {
                    ...r,
                    status,
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
          },
          `Request ${status.toLowerCase()}`,
          id,
          note || `Request moved to ${status}.`,
        );
      });
    },
    addReferral(
      input: Omit<Referral, "id" | "createdAt" | "status">,
    ): Referral {
      const r: Referral = {
        ...input,
        id: `REF-${String(500 + get().referrals.length + 1).padStart(5, "0")}`,
        status: "Submitted",
        createdAt: nowLabel(),
      };
      change((s) =>
        auditChange(
          {
            ...s,
            referrals: [r, ...s.referrals],
          },
          "Referral created",
          r.id,
          `Referral submitted to ${r.destination}.`,
        ),
      );
      return r;
    },
    transitionReferral(id: string, status: ReferralStatus) {
      change((s) =>
        auditChange(
          {
            ...s,
            referrals: s.referrals.map((r) =>
              r.id === id
                ? {
                    ...r,
                    status,
                  }
                : r,
            ),
          },
          `Referral ${status.toLowerCase()}`,
          id,
          `Referral moved to ${status}.`,
        ),
      );
    },
    updateTask(id: string, status: CoordinationTask["status"]) {
      change((s) =>
        auditChange(
          {
            ...s,
            tasks: s.tasks.map((t) =>
              t.id === id
                ? {
                    ...t,
                    status,
                  }
                : t,
            ),
          },
          `Task ${status.toLowerCase()}`,
          id,
          `Coordination task moved to ${status}.`,
        ),
      );
    },
    decideIdentityCase(id: string, status: IdentityStatus, note: string) {
      if (
        !permitted("records", "admin") ||
        (status === "Merge Approved" && !note.trim())
      )
        return;
      change((s) =>
        auditChange(
          {
            ...s,
            identityCases: s.identityCases.map((c) =>
              c.id === id
                ? {
                    ...c,
                    status,
                    notes: note ? [...c.notes, note] : c.notes,
                    decisions: [
                      ...c.decisions,
                      {
                        action: status,
                        actor: accountFor(s).name,
                        at: nowLabel(),
                        note,
                      },
                    ],
                  }
                : c,
            ),
          },
          "Identity case decision",
          id,
          `${status}: ${note}`,
        ),
      );
    },
    reopenIdentityCase(id: string) {
      change((s) =>
        auditChange(
          {
            ...s,
            identityCases: s.identityCases.map((c) =>
              c.id === id
                ? {
                    ...c,
                    status: "Under Review",
                  }
                : c,
            ),
          },
          "Identity case reopened",
          id,
          "Case returned to manual review.",
        ),
      );
    },
  };
}
