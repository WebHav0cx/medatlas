'use client';
import { useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { LabStatus } from './LabStatus';
import { LabPageHeader } from './LabPageHeader';
import { ResultForm } from './ResultForm';
import { ResultDrawer } from './ResultDrawer';
import { type ResultsPageProps } from './SourceConfig';

export function ResultsPage({ role, mode }: ResultsPageProps) {
  const store = useMockData()
  const [selected, setSelected] = useState<string | null>(null)
  const [editingRequest, setEditingRequest] = useState<string | null>(null)
  let results = store.state.labResults
  if (mode === "review-queue")
    results = results.filter((item) => item.status === "Submitted for Review")
  if (mode === "corrections")
    results = results.filter((item) => item.status === "Correction Required")
  if (mode === "approved")
    results = results.filter((item) =>
      ["Approved", "Released"].includes(item.status),
    )
  const result = store.state.labResults.find((item) => item.id === selected)
  const request = store.state.diagnosticRequests.find(
    (item) => item.id === result?.requestId,
  )
  const assignedRequests = store.state.diagnosticRequests.filter(
    (item) =>
      item.assignedScientistId === store.state.currentAccountId &&
      !store.state.labResults.some(
        (resultItem) =>
          resultItem.requestId === item.id &&
          resultItem.status !== "Correction Required",
      ),
  )
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
      <LabPageHeader
        title={role === "reviewer" ? "Result Review" : "Results & Reports"}
        subtitle="Structured diagnostic results, review decisions and report provenance."
        action={
          role === "scientist" && assignedRequests.length ? (
            <button
              className="
                inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
              " data-slot="hospital-primary"
              onClick={() => setEditingRequest(assignedRequests[0].id)}
            >
              <Plus size={16} />
              Enter Results
            </button>
          ) : undefined
        }
      />
      <section className="overflow-clip rounded-xl border border-mist-200 bg-white" data-slot="hospital-table-panel">
        <div className="
          sticky top-0 z-2 grid min-h-11 grid-cols-5 items-center gap-2.5 border-b border-b-taupe-100
          bg-slate-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-olive-500 uppercase
          max-md:hidden
        " data-slot="hospital-table-head">
          <span>Report</span>
          <span>Patient</span>
          <span>Request</span>
          <span>Updated</span>
          <span>Status</span>
          <span />
        </div>
        {results.map((item) => {
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
              <span data-label="Report" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Report"}</span>{item.reportTitle}</span>
              <span data-label="Patient" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Patient"}</span>
                {patient?.firstName} {patient?.lastName}
              </span>
              <span data-label="Request" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Request"}</span>{item.requestId}</span>
              <span data-label="Updated" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Updated"}</span>{item.updatedAt}</span>
              <span data-label="Status" className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{"Status"}</span>
                <LabStatus>{item.status}</LabStatus>
              </span>
              <ChevronRight size={16} className="max-md:col-start-2 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
            </button>
          )
        })}
      </section>
      {result && request && (
        <ResultDrawer
          result={result}
          role={role}
          onClose={() => setSelected(null)}
        />
      )}
      {editingRequest && (
        <ResultForm
          requestId={editingRequest}
          onClose={() => setEditingRequest(null)}
        />
      )}
    </div>
  )
}
