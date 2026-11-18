'use client';
import { useParams } from "@/lib/workflow-router";
import { useMockData } from "@/stores/workflow/useMockData";
import { StatusBadge } from './StatusBadge';
import { PatientPageHeader } from './PatientPageHeader';
import { PatientErrorState } from './PatientErrorState';
import { RequestProgressTimeline } from './RequestProgressTimeline';

export function RequestDetailPage() {
  const store = useMockData()
  const { requestId } = useParams()
  const request = store.state.patientRequests.find(
    (item) =>
      item.id === requestId &&
      item.accountId === store.currentPatientAccount.id,
  )
  if (!request)
    return (
      <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
        <PatientErrorState
          title="Request not found"
          text="This request is not available to your patient account."
        />
      </div>
    )
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow={request.id}
        title={request.type}
        subtitle={`Submitted to ${request.facility} on ${request.submittedAt}.`}
        back="/patient/requests"
        action={<StatusBadge label={request.status} />}
      />
      <section >
        <dl>
          <div>
            <dt>Healthcare facility</dt>
            <dd>{request.facility}</dd>
          </div>
          <div>
            <dt>Submitted</dt>
            <dd>{request.submittedAt}</dd>
          </div>
          <div>
            <dt>Latest update</dt>
            <dd>{request.updatedAt}</dd>
          </div>
          <div>
            <dt>Request status</dt>
            <dd>{request.status}</dd>
          </div>
        </dl>
        <div>
          <span>Progress</span>
          <h2 className="tracking-tight not-italic">Request updates</h2>
        </div>
        <RequestProgressTimeline request={request} />
      </section>
    </div>
  )
}
