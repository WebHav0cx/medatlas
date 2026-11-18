'use client';
import { useState } from "react";
import { ChevronRight, UserPlus } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { LabStatus } from './LabStatus';
import { LabPageHeader } from './LabPageHeader';
import { PatientForm } from './PatientForm';

export function PatientsPage() {
  const store = useMockData()
  const [open, setOpen] = useState(false)
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
      <LabPageHeader
        title="Patients"
        subtitle="Shared MedAtlas patient identities linked to diagnostic requests."
        action={
          <button className="
            inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
            border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
            transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
            hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
          " data-slot="hospital-primary" onClick={() => setOpen(true)}>
            <UserPlus size={16} />
            Register Patient
          </button>
        }
      />
      <section className="overflow-clip rounded-xl border border-mist-200 bg-white" data-slot="hospital-table-panel">
        <div className="
          sticky top-0 z-2 grid min-h-11 grid-cols-5 items-center gap-2.5 border-b border-b-taupe-100
          bg-slate-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-olive-500 uppercase
          max-md:hidden
        " data-slot="hospital-table-head">
          <span>Patient</span>
          <span>MedAtlas ID</span>
          <span>Prime Requests</span>
          <span>Verification</span>
          <span>Latest Report</span>
          <span />
        </div>
        {store.state.patients.map((patient) => {
          const requests = store.state.diagnosticRequests.filter(
            (item) => item.patientId === patient.id,
          )
          const result = store.state.labResults.find(
            (item) => item.patientId === patient.id,
          )
          return (
            <button className="
              grid min-h-15 w-full cursor-pointer grid-cols-5 items-center gap-2.5 border-0 border-t
              border-t-taupe-100 bg-white px-4 py-2.75 text-left text-xs text-olive-600 transition duration-160
              ease-in-out hover:bg-slate-50 focus-visible:relative focus-visible:z-3 focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52 max-md:grid max-md:grid-cols-2 max-md:gap-2 max-md:p-3.5
            " data-slot="hospital-table-row" key={patient.id}>
              <span data-label="Patient" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Patient"}</span>
                {patient.firstName} {patient.lastName}
              </span>
              <span data-label="ID" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"ID"}</span>{patient.medAtlasId}</span>
              <span data-label="Requests" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Requests"}</span>{requests.length}</span>
              <span data-label="Verification" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Verification"}</span>
                <LabStatus>{patient.verification}</LabStatus>
              </span>
              <span data-label="Report" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Report"}</span>{result?.status || "None"}</span>
              <ChevronRight size={16} className="max-md:col-start-2 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
            </button>
          )
        })}
      </section>
      {open && <PatientForm onClose={() => setOpen(false)} />}
    </div>
  )
}
