'use client';
import { useParams } from "@/lib/workflow-router";
import { Building2, CalendarDays } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { friendlyDate } from './friendlyDate';
import { StatusBadge } from './StatusBadge';
import { PatientPageHeader } from './PatientPageHeader';
import { PatientEmptyState } from './PatientEmptyState';
import { PatientErrorState } from './PatientErrorState';
import { RecentDocumentCard } from './RecentDocumentCard';

export function ProviderDetailPage() {
  const store = useMockData()
  const { providerId } = useParams()
  const organisation = store.state.organisations.find(
    (item) => item.id === providerId,
  )
  const link = store.state.patientLinks.find(
    (item) =>
      item.accountId === store.currentPatientAccount.id &&
      item.facility === organisation?.name,
  )
  if (!organisation || !link)
    return (
      <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
        <PatientErrorState
          title="Provider details are unavailable"
          text="This provider is not associated with your patient account."
        />
      </div>
    )
  const records = store
    .patientDocuments()
    .filter((item) => item.sourceFacility === organisation.name)
  const encounters = store.state.encounters.filter(
    (item) =>
      item.patientId === store.currentPatientAccount.patientId &&
      item.facility === organisation.name,
  )
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow={organisation.type}
        title={organisation.name}
        subtitle={organisation.location}
        back="/patient/providers"
        action={<StatusBadge label={link.status} />}
      />
      <div >
        <span>
          <Building2 size={26} />
        </span>
        <div>
          <h2 className="tracking-tight not-italic">Facility information</h2>
          <p>
            {organisation.name} is shown because of a patient record link or
            information request in this fictional MedAtlas network.
          </p>
        </div>
        <dl>
          <div>
            <dt>Facility category</dt>
            <dd>{organisation.type}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{organisation.location}</dd>
          </div>
          <div>
            <dt>Record-linking status</dt>
            <dd>{link.status}</dd>
          </div>
        </dl>
      </div>
      <div >
        <section >
          <div >
            <div>
              <span>From this facility</span>
              <h2 className="tracking-tight not-italic">Available records</h2>
            </div>
          </div>
          {records.length ? (
            records.map((document) => (
              <RecentDocumentCard document={document} key={document.id} />
            ))
          ) : (
            <PatientEmptyState
              title="No released records available"
              text="This facility is connected, but it has no records currently released for patient access."
            />
          )}
        </section>
        <section >
          <div >
            <div>
              <span>Related history</span>
              <h2 className="tracking-tight not-italic">Healthcare events</h2>
            </div>
          </div>
          {encounters.length ? (
            encounters.map((encounter) => (
              <div  key={encounter.id}>
                <span>
                  <CalendarDays size={18} />
                </span>
                <div>
                  <strong className="tabular-nums">{encounter.type} event</strong>
                  <small>{friendlyDate(encounter.date)}</small>
                  <p>{encounter.recordCategories.join(" · ")}</p>
                </div>
              </div>
            ))
          ) : (
            <PatientEmptyState
              icon={CalendarDays}
              title="No related events available"
              text="Only patient-visible events connected to released information appear here."
            />
          )}
        </section>
      </div>
    </div>
  )
}
