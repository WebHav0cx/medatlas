import type { MockState } from "../../domain/workflow/types.ts";
import { createWorkflowContext } from "./context.ts";
import { createPatientActions } from "./patient.ts";
import { createHospitalActions } from "./hospital.ts";
import { createLaboratoryActions } from "./laboratory.ts";
import { createOrganisationActions } from "./organisation.ts";
export {
  accountFor,
  patientAccountFor,
  organisationFor,
  patientDocuments,
  routeForRole,
  nowLabel,
} from "./context.ts";
export function createWorkflowApi(
  get: () => MockState,
  set: (state: MockState) => void,
) {
  const context = createWorkflowContext(get, set);
  return {
    ...createPatientActions(context),
    ...createHospitalActions(context),
    ...createLaboratoryActions(context),
    ...createOrganisationActions(context),
  };
}
export type WorkflowActions = ReturnType<typeof createWorkflowApi>;
