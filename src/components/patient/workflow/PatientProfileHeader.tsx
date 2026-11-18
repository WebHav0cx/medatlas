'use client';
import { useMockData } from "@/stores/workflow/useMockData";
import { StatusBadge } from './StatusBadge';

export function PatientProfileHeader() {
  const store = useMockData()
  const account = store.currentPatientAccount
  const patient = store.state.patients.find(
    (item) => item.id === account.patientId,
  )
  return (
    <section className="mb-6 flex items-center gap-4 max-md:grid max-md:grid-cols-3 max-md:items-center max-md:gap-3" data-slot="patient-profile-header">
      <span>{account.fullName.slice(0, 2).toUpperCase()}</span>
      <div>
        <small>Patient account</small>
        <h1 className="tracking-tight not-italic">{account.fullName}</h1>
        <p>{account.email}</p>
      </div>
      <div>
        <StatusBadge label={patient ? "Identity linked" : "Not linked"} />
        {patient && <strong className="tabular-nums">{patient.medAtlasId}</strong>}
      </div>
    </section>
  )
}
