'use client';
import { type MockState } from "@/stores/workflow/useMockData";
import { type ProviderRole, type ModuleDefinition } from './SourceConfig';

export function liveDefinition(
  role: ProviderRole,
  moduleKey: string,
  state: MockState,
): ModuleDefinition | undefined {
  const patientName = (id: string) => {
    const patient = state.patients.find((item) => item.id === id)
    return patient ? `${patient.firstName} ${patient.lastName}` : id
  }

  if (
    [
      "patients",
      "assigned-patients",
      "patient-summary",
      "registration",
    ].includes(moduleKey)
  ) {
    const patients =
      role === "nurse"
        ? state.patients.filter((patient) =>
            patient.assignedStaff.includes(state.currentAccountId),
          )
        : state.patients
    return {
      title:
        moduleKey === "registration"
          ? "Patient Registration"
          : moduleKey === "assigned-patients"
            ? "Assigned Patients"
            : moduleKey === "patient-summary"
              ? "Patient Summary"
              : "Patients",
      subtitle:
        role === "nurse"
          ? "Patients assigned to your current service relationship."
          : "Search verified patient identities and facility mappings.",
      primary: role === "records" ? "Create Patient" : undefined,
      columns: ["Patient", "MedAtlas ID", "Local ID", "Verification", "Access"],
      rows: patients.map((patient) => [
        `${patient.firstName} ${patient.lastName}`,
        patient.medAtlasId,
        patient.localId,
        patient.verification,
        patient.assignedStaff.includes(state.currentAccountId) ||
        role === "records"
          ? "Authorised"
          : "Restricted",
      ]),
    }
  }

  if (moduleKey === "encounters") {
    return {
      title: "Encounters",
      subtitle: "Encounter metadata and linked record categories.",
      columns: [
        "Encounter",
        "Patient",
        "Type",
        "Facility",
        "Record Categories",
      ],
      rows: state.encounters.map((encounter) => [
        encounter.id,
        patientName(encounter.patientId),
        encounter.type,
        encounter.facility,
        encounter.recordCategories.join(" · "),
      ]),
    }
  }

  if (["records", "received-records", "facility-records"].includes(moduleKey)) {
    const documents =
      role === "nurse"
        ? state.documents.filter((document) => document.access === "Approved")
        : state.documents
    return {
      title:
        moduleKey === "facility-records"
          ? "Facility Records"
          : moduleKey === "received-records"
            ? "Received Records"
            : role === "nurse"
              ? "Permitted Records"
              : "Authorised Records",
      subtitle:
        "Document access with source facility and provenance information.",
      primary: moduleKey === "facility-records" ? "Register Record" : undefined,
      columns: [
        "Document",
        "Patient",
        "Source Facility",
        "Record Date",
        "Access",
      ],
      rows: documents.map((document) => [
        document.title,
        patientName(document.patientId),
        document.sourceFacility,
        document.date,
        document.access,
      ]),
    }
  }

  if (
    [
      "requests",
      "incoming",
      "outgoing",
      "record-requests",
      "authorisations",
    ].includes(moduleKey)
  ) {
    const requests =
      moduleKey === "incoming"
        ? state.requests.filter(
            (request) => request.sourceFacility === state.facility.name,
          )
        : moduleKey === "outgoing"
          ? state.requests.filter(
              (request) => request.requester === state.facility.name,
            )
          : state.requests
    return {
      title:
        moduleKey === "incoming"
          ? "Incoming Requests"
          : moduleKey === "outgoing"
            ? "Outgoing Requests"
            : moduleKey === "authorisations"
              ? "Authorisations"
              : "Record Requests",
      subtitle: "Create, review and track clinical information requests.",
      primary:
        moduleKey === "requests" || moduleKey === "outgoing"
          ? "Create Record Request"
          : undefined,
      columns: [
        "Request",
        "Patient",
        "Source Facility",
        "Record Category",
        "Status",
      ],
      rows: requests.map((request) => [
        request.id,
        patientName(request.patientId),
        request.sourceFacility,
        request.category,
        request.status,
      ]),
    }
  }

  if (moduleKey === "referrals") {
    return {
      title: "Referrals",
      subtitle: "Create and track referral coordination packages.",
      primary: "Create Referral",
      columns: ["Referral", "Patient", "Destination", "Reason", "Status"],
      rows: state.referrals.map((referral) => [
        referral.id,
        patientName(referral.patientId),
        referral.destination,
        referral.reason,
        referral.status,
      ]),
    }
  }

  if (moduleKey === "diagnostic-requests") {
    return {
      title: "Diagnostic Requests",
      subtitle:
        "Create and track diagnostic requests sent to Prime Diagnostics.",
      primary: "Create Diagnostic Request",
      columns: [
        "Request",
        "Patient",
        "Destination",
        "Requested Tests",
        "Status",
      ],
      rows: state.diagnosticRequests.map((request) => [
        request.id,
        patientName(request.patientId),
        request.destination,
        request.tests.join(", "),
        request.status,
      ]),
    }
  }

  if (["worklist", "tasks"].includes(moduleKey)) {
    const tasks = state.tasks.filter(
      (task) => task.assignedTo === state.currentAccountId,
    )
    return {
      title:
        moduleKey === "worklist" ? "Shift Worklist" : "Tasks & Escalations",
      subtitle:
        "Complete coordination steps or escalate to the responsible clinician.",
      columns: ["Task", "Patient", "Assigned By", "Due", "Status"],
      rows: tasks.map((task) => [
        task.title,
        patientName(task.patientId),
        task.assignedBy,
        task.due,
        task.status,
      ]),
    }
  }

  if (moduleKey === "identity-resolution") {
    return {
      title: "Identity Resolution",
      subtitle:
        "Investigate possible duplicate identities through controlled review.",
      columns: ["Case", "Identity A", "Identity B", "Evidence", "Status"],
      rows: state.identityCases.map((identityCase) => [
        identityCase.id,
        patientName(identityCase.patientAId),
        patientName(identityCase.patientBId),
        `${identityCase.matchingEvidence.length} matches · ${identityCase.conflictingEvidence.length} conflicts`,
        identityCase.status,
      ]),
    }
  }

  if (moduleKey === "patient-links") {
    return {
      title: "Patient Record Links",
      subtitle:
        "Review patient-account requests before making facility records available.",
      columns: [
        "Link Request",
        "Patient Account",
        "Facility",
        "Method",
        "Status",
      ],
      rows: state.patientLinks
        .filter((link) => link.facility === state.facility.name)
        .map((link) => [
          link.id,
          state.patientAccounts.find((account) => account.id === link.accountId)
            ?.fullName ?? "Patient account",
          link.facility,
          link.method,
          link.status,
        ]),
    }
  }

  if (moduleKey === "patient-requests") {
    return {
      title: "Patient Information Requests",
      subtitle:
        "Review patient requests for record access, copies and correction review.",
      columns: ["Request", "Patient", "Facility", "Request Type", "Status"],
      rows: state.patientRequests
        .filter((request) => request.facility === state.facility.name)
        .map((request) => [
          request.id,
          state.patientAccounts.find(
            (account) => account.id === request.accountId,
          )?.fullName ?? "Patient account",
          request.facility,
          request.type,
          request.status,
        ]),
    }
  }

  if (moduleKey === "staff") {
    return {
      title: "Staff & Roles",
      subtitle: "Manage facility accounts, role assignment and account status.",
      primary: "Add Staff Account",
      columns: ["Staff Member", "Role", "Department", "Email", "Status"],
      rows: state.staff.map((staff) => [
        staff.name,
        staff.title,
        staff.department,
        staff.email,
        staff.status,
      ]),
    }
  }

  if (moduleKey === "facility") {
    return {
      title: "Facility Settings",
      subtitle:
        "Maintain facility profile, contacts and supported departments.",
      primary: "Edit Facility Settings",
      columns: ["Setting", "Value", "Owner", "Last Updated", "Status"],
      rows: [
        [
          "Facility Name",
          state.facility.name,
          "Administration",
          "Today",
          "Current",
        ],
        [
          "Address",
          state.facility.address,
          "Administration",
          "Today",
          "Current",
        ],
        ["Contact", state.facility.email, "Administration", "Today", "Current"],
        [
          "Departments",
          state.facility.departments.join(" · "),
          "Administration",
          "Today",
          "Current",
        ],
      ],
    }
  }

  if (["audit", "audit-log", "history"].includes(moduleKey)) {
    return {
      title: moduleKey === "history" ? "Exchange History" : "Audit Log",
      subtitle: "Recorded application events generated by staff workflows.",
      columns: ["Timestamp", "Actor", "Role", "Action", "Outcome"],
      rows: state.audit.map((event) => [
        event.at,
        event.actor,
        event.role,
        event.action,
        event.outcome,
      ]),
    }
  }

  return undefined
}
