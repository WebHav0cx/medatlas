"use client";
import { useMemo } from "react";
import { useWorkflowStore } from "./store.ts";
import {
  accountFor,
  patientAccountFor,
  organisationFor,
  createWorkflowApi,
} from "../../services/workflow/api.ts";
export type * from "../../domain/workflow/types.ts";
export const workflowActions = createWorkflowApi(
  () => useWorkflowStore.getState().data,
  (data) => useWorkflowStore.getState().setData(data),
);
export function useMockData() {
  const data = useWorkflowStore((s) => s.data);
  return useMemo(() => {
    const currentAccount = accountFor(data),
      currentOrganisation = organisationFor(data);
    const facility = currentOrganisation
      ? (data.facilityProfiles?.[currentOrganisation.id] ?? data.facility)
      : data.facility;
    let state = {
      ...data,
      facility,
    };
    if (
      currentOrganisation &&
      !["org-citycare", "org-prime", "org-mercy", "org-lagoon"].includes(
        currentOrganisation.id,
      )
    ) {
      const organisation = currentOrganisation.name;
      const patients = data.patients.filter((p) =>
        p.sourceFacilities.includes(organisation),
      );
      const diagnosticRequests = data.diagnosticRequests.filter((r) =>
        currentAccount.role.startsWith("lab-")
          ? r.destination === organisation
          : r.requestingFacility === organisation,
      );
      state = {
        ...state,
        patients,
        encounters: data.encounters.filter((e) => e.facility === organisation),
        documents: data.documents.filter(
          (d) =>
            d.sourceFacility === organisation ||
            data.requests.some(
              (r) =>
                r.requester === organisation &&
                r.status === "Fulfilled" &&
                d.requestId === r.id,
            ),
        ),
        requests: data.requests.filter(
          (r) =>
            r.requester === organisation || r.sourceFacility === organisation,
        ),
        diagnosticRequests,
        labResults: data.labResults.filter((r) =>
          diagnosticRequests.some((d) => d.id === r.requestId),
        ),
        specimens: data.specimens.filter((r) =>
          diagnosticRequests.some((d) => d.id === r.requestId),
        ),
        exchanges: data.exchanges.filter(
          (e) => e.recipient === organisation || e.sender === organisation,
        ),
        identityCases: [],
        tasks: data.tasks.filter((t) =>
          patients.some((p) => p.id === t.patientId),
        ),
        referrals: data.referrals.filter((r) =>
          patients.some((p) => p.id === r.patientId),
        ),
      };
    }
    return {
      ...workflowActions,
      state,
      currentAccount,
      currentOrganisation,
      currentPatientAccount: patientAccountFor(data),
    };
  }, [data]);
}
