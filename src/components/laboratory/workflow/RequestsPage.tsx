'use client';
import { useState } from "react";
import { CalendarDays, ChevronRight, Search, ShieldCheck, X } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { LabStatus } from './LabStatus';
import { LabPageHeader } from './LabPageHeader';
import { type LabRole } from './SourceConfig';

export function RequestsPage({ role }: { role: LabRole }) {
  const store = useMockData()
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<string | null>(null)
  const requests = store.state.diagnosticRequests.filter(
    (item) =>
      item.destination === "Prime Diagnostics" &&
      item.id.toLowerCase().includes(query.toLowerCase()),
  )
  const request = store.state.diagnosticRequests.find(
    (item) => item.id === selected,
  )
  const patient = store.state.patients.find(
    (item) => item.id === request?.patientId,
  )
  const specimen = store.state.specimens.find(
    (item) => item.requestId === request?.id,
  )
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
      <LabPageHeader
        title="Test Requests"
        subtitle="Review incoming diagnostic requests and coordinate the appropriate laboratory workflow."
      />
      <div className="mb-3 flex gap-2.5 max-md:flex-col" data-slot="hospital-filters">
        <div className="
          flex min-h-10.5 flex-1 items-center gap-1.5 rounded-lg border border-mist-300 bg-white px-2.5
          text-xs text-mist-800 focus-within:border-emerald-700 focus-within:shadow-sm max-md:w-full
        ">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search request ID" className="
              min-h-10.5 flex-1 rounded-lg border-mist-300 bg-transparent text-xs text-mist-800 outline-hidden
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            "
          />
        </div>
        <select className="
          flex h-10 min-h-10.5 w-auto items-center gap-1 rounded-lg border border-mist-200 bg-white px-2.5
          text-xs text-olive-600 transition duration-160 ease-in-out focus:border-emerald-700
          focus:shadow-sm focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
        ">
          <option>All statuses</option>
        </select>
        <button className="
          flex h-10 min-h-10.5 w-auto items-center gap-1 rounded-lg border border-mist-200 bg-white px-2.5
          text-xs text-olive-600 transition duration-160 ease-in-out focus-visible:outline-3
          focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
          disabled:opacity-52 max-md:w-full
        ">
          <CalendarDays size={15} />
          Date
        </button>
      </div>
      <section className="overflow-clip rounded-xl border border-mist-200 bg-white" data-slot="hospital-table-panel">
        <div className="
          sticky top-0 z-2 grid min-h-11 grid-cols-5 items-center gap-2.5 border-b border-b-taupe-100
          bg-slate-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-olive-500 uppercase
          max-md:hidden
        " data-slot="hospital-table-head">
          <span>Request</span>
          <span>Patient</span>
          <span>Requesting Facility</span>
          <span>Tests</span>
          <span>Status</span>
          <span />
        </div>
        {requests.map((item) => {
          const person = store.state.patients.find(
            (patientItem) => patientItem.id === item.patientId,
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
              <span data-label="Request" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Request"}</span>{item.id}</span>
              <span data-label="Patient" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Patient"}</span>
                {person?.firstName} {person?.lastName}
              </span>
              <span data-label="Facility" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Facility"}</span>{item.requestingFacility}</span>
              <span data-label="Tests" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Tests"}</span>{item.tests.join(", ")}</span>
              <span data-label="Status" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Status"}</span>
                <LabStatus>{item.status}</LabStatus>
              </span>
              <ChevronRight size={16} className="max-md:col-start-2 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
            </button>
          )
        })}
      </section>
      {request && patient && (
        <div className="fixed inset-0 z-100 bg-teal-950/42 backdrop-blur-xs" data-slot="hospital-drawer-backdrop" onClick={() => setSelected(null)}>
          <aside
            className="ml-auto h-full w-96 max-w-full bg-white p-5 shadow-xl max-md:w-full" data-slot="hospital-detail-drawer lab-request-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex justify-between border-b border-b-mist-200 pb-4">
              <div>
                <small className="text-xs font-semibold text-emerald-700 uppercase">Diagnostic request</small>
                <h2 className="my-1 text-xl leading-normal font-bold tracking-tight text-mist-800 not-italic normal-nums">{request.id}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="
                grid size-8 place-items-center rounded-md bg-mist-100 transition duration-160 ease-in-out
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <X size={18} />
              </button>
            </header>
            <div className="my-3 flex gap-2 rounded-lg border border-emerald-700/18 bg-emerald-50 p-3 text-emerald-700" data-slot="drawer-authorisation">
              <ShieldCheck size={17} />
              <span className="flex flex-col text-xs">
                <strong className="tabular-nums">{request.status}</strong>
                Clinical request information reviewed
              </span>
            </div>
            <dl>
              <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
                <dt className="text-olive-500">Patient</dt>
                <dd className="text-right font-semibold text-mist-800">
                  {patient.firstName} {patient.lastName} · {patient.medAtlasId}
                </dd>
              </div>
              <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
                <dt className="text-olive-500">Requesting facility</dt>
                <dd className="text-right font-semibold text-mist-800">{request.requestingFacility}</dd>
              </div>
              <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
                <dt className="text-olive-500">Clinician</dt>
                <dd className="text-right font-semibold text-mist-800">{request.requestingClinician}</dd>
              </div>
              <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
                <dt className="text-olive-500">Requested tests</dt>
                <dd className="text-right font-semibold text-mist-800">{request.tests.join(", ")}</dd>
              </div>
              <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
                <dt className="text-olive-500">Priority</dt>
                <dd className="text-right font-semibold text-mist-800">{request.priority}</dd>
              </div>
              <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
                <dt className="text-olive-500">Purpose</dt>
                <dd className="text-right font-semibold text-mist-800">{request.purpose}</dd>
              </div>
            </dl>
            <section className="mt-3 mb-4 rounded-lg bg-mist-100 p-3" data-slot="request-history">
              <h3 className="mb-2 text-xs tracking-tight not-italic">Status history</h3>
              {request.history.map((item, index) => (
                <p key={`${item.at}-${index}`} className="my-1 border-b border-b-mist-200 py-1.5 text-xs text-olive-600">
                  <strong className="tabular-nums">{item.status}</strong> · {item.actor} · {item.at}
                </p>
              ))}
            </section>
            {role === "reception" && (
              <div className="mt-4 mb-2.5 grid grid-cols-2 gap-2">
                {request.status === "Submitted" && (
                  <>
                    <button
                      className="
                        min-h-10 w-full rounded-lg border border-olive-400 bg-white text-xs font-bold text-red-700
                        transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                        focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                      "
                      onClick={() => {
                        const reason = window.prompt(
                          "Describe the missing information",
                        )
                        if (reason)
                          store.transitionDiagnosticRequest(
                            request.id,
                            "Incomplete",
                            reason,
                          )
                      }}
                    >
                      Mark Incomplete
                    </button>
                    <button
                      className="
                        inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                        border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                        transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                        hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                        focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                      " data-slot="hospital-primary"
                      onClick={() =>
                        store.transitionDiagnosticRequest(
                          request.id,
                          "Acknowledged",
                        )
                      }
                    >
                      Acknowledge
                    </button>
                  </>
                )}
                {request.status === "Acknowledged" && (
                  <button
                    className="
                      inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                      border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                      transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                      hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                      focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                    " data-slot="hospital-primary drawer-action"
                    onClick={() => {
                      if (!specimen)
                        store.createSpecimen(
                          request.id,
                          "Serum",
                          "staff-lab-scientist",
                        )
                      else
                        store.transitionDiagnosticRequest(
                          request.id,
                          "Assigned",
                        )
                    }}
                  >
                    Assign Laboratory Workflow
                  </button>
                )}
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}
