'use client';
import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { useMockData, type SpecimenStatus } from "@/stores/workflow/useMockData";
import { LabStatus } from './LabStatus';
import { LabPageHeader } from './LabPageHeader';
import { type LabRole } from './SourceConfig';

export function SpecimensPage({ role }: { role: LabRole }) {
  const store = useMockData()
  const [selected, setSelected] = useState<string | null>(null)
  const specimen = store.state.specimens.find((item) => item.id === selected)
  const validNext: Record<SpecimenStatus, SpecimenStatus[]> = {
    "Awaiting Collection": ["Collected"],
    Collected: ["Received"],
    Received: ["Processing"],
    Processing: ["Processing Completed"],
    "Processing Completed": [],
    Rejected: ["Recollection Required"],
    "Recollection Required": ["Collected"],
  }
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
      <LabPageHeader
        title="Specimen Tracking"
        subtitle="Collection, receipt and processing status for diagnostic specimens."
      />
      <section className="overflow-clip rounded-xl border border-mist-200 bg-white" data-slot="hospital-table-panel">
        <div className="
          sticky top-0 z-2 grid min-h-11 grid-cols-5 items-center gap-2.5 border-b border-b-taupe-100
          bg-slate-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-olive-500 uppercase
          max-md:hidden
        " data-slot="hospital-table-head">
          <span>Specimen</span>
          <span>Patient</span>
          <span>Request</span>
          <span>Sample Type</span>
          <span>Status</span>
          <span />
        </div>
        {store.state.specimens.map((item) => {
          const patient = store.state.patients.find(
            (person) => person.id === item.patientId,
          )
          return (
            <button
              className="
                grid min-h-15 w-full cursor-pointer grid-cols-5 items-center gap-2.5 border-0 border-t
                border-t-taupe-100 bg-white px-4 py-2.75 text-left text-xs text-olive-600 transition duration-160
                ease-in-out hover:bg-slate-50 focus-visible:relative focus-visible:z-3 focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52 max-md:grid max-md:grid-cols-2 max-md:gap-2 max-md:p-3.5
              " data-slot="hospital-table-row"
              key={item.id}
              onClick={() => setSelected(item.id)}
            >
              <span data-label="Specimen" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Specimen"}</span>{item.id}</span>
              <span data-label="Patient" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Patient"}</span>
                {patient?.firstName} {patient?.lastName}
              </span>
              <span data-label="Request" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Request"}</span>{item.requestId}</span>
              <span data-label="Sample" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Sample"}</span>{item.sampleType}</span>
              <span data-label="Status" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Status"}</span>
                <LabStatus>{item.status}</LabStatus>
              </span>
              <ChevronRight size={16} className="max-md:col-start-2 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
            </button>
          )
        })}
      </section>
      {specimen && (
        <div className="fixed inset-0 z-100 bg-teal-950/42 backdrop-blur-xs" data-slot="hospital-drawer-backdrop" onClick={() => setSelected(null)}>
          <aside
            className="ml-auto h-full w-96 max-w-full bg-white p-5 shadow-xl max-md:w-full" data-slot="hospital-detail-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex justify-between border-b border-b-mist-200 pb-4">
              <div>
                <small className="text-xs font-semibold text-emerald-700 uppercase">Specimen</small>
                <h2 className="my-1 text-xl leading-normal font-bold tracking-tight text-mist-800 not-italic normal-nums">{specimen.id}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="
                grid size-8 place-items-center rounded-md bg-mist-100 transition duration-160 ease-in-out
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <X size={18} />
              </button>
            </header>
            <dl>
              <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
                <dt className="text-olive-500">Request</dt>
                <dd className="text-right font-semibold text-mist-800">{specimen.requestId}</dd>
              </div>
              <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
                <dt className="text-olive-500">Sample type</dt>
                <dd className="text-right font-semibold text-mist-800">{specimen.sampleType}</dd>
              </div>
              <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
                <dt className="text-olive-500">Collected</dt>
                <dd className="text-right font-semibold text-mist-800">{specimen.collectedAt || "Not collected"}</dd>
              </div>
              <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
                <dt className="text-olive-500">Collector</dt>
                <dd className="text-right font-semibold text-mist-800">{specimen.collector || "Not assigned"}</dd>
              </div>
              <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
                <dt className="text-olive-500">Status</dt>
                <dd className="text-right font-semibold text-mist-800">{specimen.status}</dd>
              </div>
            </dl>
            <div className="mt-4 grid gap-2" data-slot="specimen-actions">
              {validNext[specimen.status].map((status) => (
                <button
                  className="
                    inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                    border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                    transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                    hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                  " data-slot="hospital-primary"
                  key={status}
                  onClick={() => store.updateSpecimen(specimen.id, status)}
                >
                  {status}
                </button>
              ))}
              {["reception", "scientist"].includes(role) &&
                !["Rejected", "Processing Completed"].includes(
                  specimen.status,
                ) && (
                  <button
                    className="
                      min-h-10 rounded-lg border border-olive-400 bg-white text-xs font-bold text-red-700 transition
                      duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                      focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                    "
                    onClick={() => {
                      const reason = window.prompt(
                        "Reason for rejection or recollection",
                      )
                      if (reason)
                        store.updateSpecimen(specimen.id, "Rejected", reason)
                    }}
                  >
                    Reject Specimen
                  </button>
                )}
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
