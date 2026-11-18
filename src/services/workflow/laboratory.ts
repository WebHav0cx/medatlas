import {
  type WorkflowContext,
  nowLabel,
  uid,
  accountFor,
  appendAudit,
  advanceDiagnostic,
} from "./context.ts";
import type {
  DiagnosticRequest,
  DiagnosticRequestStatus,
  Specimen,
  SpecimenStatus,
  LaboratoryResult,
  DocumentRecord,
} from "../../domain/workflow/types.ts";
export function createLaboratoryActions({
  get,
  change,
  auditChange,
  permitted,
}: WorkflowContext) {
  return {
    addDiagnosticRequest(
      input: Omit<
        DiagnosticRequest,
        "id" | "submittedAt" | "status" | "history"
      >,
    ): DiagnosticRequest {
      const s = get(),
        r: DiagnosticRequest = {
          ...input,
          id: `DXR-${String(4300 + s.diagnosticRequests.length + 1).padStart(6, "0")}`,
          submittedAt: nowLabel(),
          status: "Submitted",
          history: [
            {
              status: "Submitted",
              at: nowLabel(),
              actor: accountFor(s).name,
            },
          ],
        };
      change((s) =>
        auditChange(
          {
            ...s,
            diagnosticRequests: [r, ...s.diagnosticRequests],
          },
          "Diagnostic request submitted",
          r.id,
          `${r.tests.join(", ")} requested from ${r.destination}.`,
        ),
      );
      return r;
    },
    transitionDiagnosticRequest(
      id: string,
      status: DiagnosticRequestStatus,
      note?: string,
    ) {
      change((s) =>
        auditChange(
          {
            ...s,
            diagnosticRequests: s.diagnosticRequests.map((r) =>
              r.id === id &&
              !["Released", "Completed", "Cancelled"].includes(r.status)
                ? {
                    ...r,
                    status,
                    assignedScientistId:
                      status === "Assigned"
                        ? r.assignedScientistId || "staff-lab-scientist"
                        : r.assignedScientistId,
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
          `Diagnostic request ${status.toLowerCase()}`,
          id,
          note || `Request moved to ${status}.`,
        ),
      );
    },
    createSpecimen(
      requestId: string,
      sampleType: string,
      assignedTo: string,
    ): Specimen {
      if (!permitted("lab-reception", "lab-admin"))
        throw new Error("Access denied");
      const s = get(),
        r = s.diagnosticRequests.find((r) => r.id === requestId);
      if (!r) throw new Error("Request not found");
      const existing = s.specimens.find((p) => p.requestId === requestId);
      if (existing) return existing;
      const specimen: Specimen = {
        id: `SPC-${String(10300 + s.specimens.length + 1).padStart(5, "0")}`,
        requestId,
        patientId: r.patientId,
        sampleType,
        collectedAt: "",
        collector: "",
        status: "Awaiting Collection",
        assignedTo,
      };
      change((s) =>
        auditChange(
          {
            ...s,
            specimens: [specimen, ...s.specimens],
            diagnosticRequests: s.diagnosticRequests.map((r) =>
              r.id === requestId
                ? {
                    ...advanceDiagnostic(s, r, "Assigned"),
                    assignedScientistId: assignedTo,
                  }
                : r,
            ),
          },
          "Specimen workflow created",
          specimen.id,
          `${sampleType} specimen linked to ${requestId}.`,
        ),
      );
      return specimen;
    },
    updateSpecimen(id: string, status: SpecimenStatus, reason?: string) {
      if (!permitted("lab-reception", "lab-scientist")) return;
      change((s) => {
        const p = s.specimens.find((p) => p.id === id);
        return auditChange(
          {
            ...s,
            specimens: s.specimens.map((p) =>
              p.id === id
                ? {
                    ...p,
                    status,
                    rejectionReason: reason,
                    collectedAt:
                      status === "Collected" ? nowLabel() : p.collectedAt,
                    collector:
                      status === "Collected" ? accountFor(s).name : p.collector,
                  }
                : p,
            ),
            diagnosticRequests: s.diagnosticRequests.map((r) =>
              r.id === p?.requestId
                ? advanceDiagnostic(
                    s,
                    r,
                    status === "Collected"
                      ? "Specimen Collected"
                      : status === "Processing"
                        ? "Processing"
                        : r.status,
                  )
                : r,
            ),
          },
          `Specimen ${status.toLowerCase()}`,
          id,
          reason || `Specimen moved to ${status}.`,
        );
      });
    },
    saveLabResult(
      requestId: string,
      values: LaboratoryResult["values"],
      comments: string,
      submit: boolean,
    ): LaboratoryResult {
      const s = get(),
        r = s.diagnosticRequests.find((r) => r.id === requestId);
      if (!r) throw new Error("Request not found");
      const existing = s.labResults.find((r) => r.requestId === requestId);
      if (
        !permitted("lab-scientist") ||
        (existing && ["Approved", "Released"].includes(existing.status))
      )
        throw new Error("Access denied");
      const result: LaboratoryResult = {
        id:
          existing?.id ||
          `LAB-${String(7900 + s.labResults.length + 1).padStart(6, "0")}`,
        requestId,
        patientId: r.patientId,
        values,
        comments,
        reportTitle: `${r.tests.join(" & ")} Report`,
        status: submit ? "Submitted for Review" : "Draft",
        scientistId: accountFor(s).id,
        reviewerId: existing?.reviewerId,
        updatedAt: nowLabel(),
      };
      change((s) =>
        auditChange(
          {
            ...s,
            labResults: existing
              ? s.labResults.map((r) => (r.id === result.id ? result : r))
              : [result, ...s.labResults],
            diagnosticRequests: s.diagnosticRequests.map((r) =>
              r.id === requestId
                ? advanceDiagnostic(s, r, submit ? "Awaiting Review" : r.status)
                : r,
            ),
          },
          submit ? "Laboratory result submitted" : "Laboratory result saved",
          result.id,
          submit
            ? "Result submitted for authorised review."
            : "Draft result saved.",
        ),
      );
      return result;
    },
    reviewLabResult(
      id: string,
      decision: "Approved" | "Correction Required",
      note: string,
    ) {
      if (!permitted("lab-reviewer")) return;
      change((s) => {
        const result = s.labResults.find((r) => r.id === id);
        if (
          !result ||
          result.status !== "Submitted for Review" ||
          result.scientistId === s.currentAccountId
        )
          return s;
        return auditChange(
          {
            ...s,
            labResults: s.labResults.map((r) =>
              r.id === id
                ? {
                    ...r,
                    status: decision,
                    reviewerId: s.currentAccountId,
                    comments: note
                      ? `${r.comments}\nReviewer: ${note}`
                      : r.comments,
                    updatedAt: nowLabel(),
                  }
                : r,
            ),
            diagnosticRequests: s.diagnosticRequests.map((r) =>
              r.id === result.requestId
                ? advanceDiagnostic(
                    s,
                    r,
                    decision === "Approved"
                      ? "Approved"
                      : "Correction Required",
                    note,
                  )
                : r,
            ),
          },
          `Laboratory result ${decision.toLowerCase()}`,
          id,
          note,
        );
      });
    },
    releaseLabResult(id: string) {
      if (!permitted("lab-reviewer")) return;
      change((s) => {
        const result = s.labResults.find((r) => r.id === id),
          r = s.diagnosticRequests.find((r) => r.id === result?.requestId);
        if (!result || !r || result.status !== "Approved") return s;
        const account = accountFor(s);
        const exchange = {
          id: `EXC-${String(4900 + s.exchanges.length + 1).padStart(6, "0")}`,
          requestId: r.id,
          resultId: result.id,
          patientId: result.patientId,
          sender: r.destination,
          recipient: r.requestingFacility,
          documentType: result.reportTitle,
          status: "Received" as const,
          receiptStatus: "Acknowledged" as const,
          at: nowLabel(),
          responsibleUser: account.name,
        };
        const document: DocumentRecord = {
          id: uid("doc-lab"),
          patientId: result.patientId,
          title: result.reportTitle,
          category: "Laboratory Results",
          sourceFacility: r.destination,
          date: new Date().toISOString().slice(0, 10),
          access: "Approved",
          patientAccess: "Available",
          author:
            s.staff.find((a) => a.id === result.reviewerId)?.name ??
            `${r.destination} authorised reviewer`,
          requestId: r.id,
        };
        const a = s.patientAccounts.find(
          (a) =>
            a.patientId === result.patientId &&
            s.patientLinks.some(
              (l) =>
                l.accountId === a.id &&
                l.patientId === result.patientId &&
                l.facility === r.destination &&
                l.status === "Linked",
            ),
        );
        return {
          ...s,
          patients: s.patients.map((patient) =>
            patient.id === result.patientId &&
            !patient.sourceFacilities.includes(r.destination)
              ? {
                  ...patient,
                  sourceFacilities: [
                    ...patient.sourceFacilities,
                    r.destination,
                  ],
                }
              : patient,
          ),
          labResults: s.labResults.map((v) =>
            v.id === id
              ? {
                  ...v,
                  status: "Released",
                }
              : v,
          ),
          diagnosticRequests: s.diagnosticRequests.map((v) =>
            v.id === r.id ? advanceDiagnostic(s, v, "Released") : v,
          ),
          exchanges: [exchange, ...s.exchanges],
          documents: [document, ...s.documents],
          patientNotifications: a
            ? [
                {
                  id: uid("PNOT"),
                  accountId: a.id,
                  type: "Record Available",
                  title: "New laboratory report available",
                  message: `${result.reportTitle} from ${r.destination} is ready to view.`,
                  at: nowLabel(),
                  read: false,
                  href: `/patient/records/${document.id}`,
                  relatedId: document.id,
                },
                ...s.patientNotifications,
              ]
            : s.patientNotifications,
          audit: appendAudit(
            s,
            "Laboratory report released",
            exchange.id,
            "Success",
            `${result.reportTitle} made available to ${r.requestingFacility}.`,
          ),
        };
      });
    },
  };
}
