'use client';
import {downloadLabResult} from '@/services/workflow/download';
import { useState } from "react";
import { FileText, FlaskConical, ShieldCheck, X } from "lucide-react";
import { useMockData, type LaboratoryResult } from "@/stores/workflow/useMockData";
import { LabStatus } from './LabStatus';
import { type LabRole } from './SourceConfig';

export function ResultDrawer({
  result,
  role,
  onClose,
}: {
  result: LaboratoryResult
  role: LabRole
  onClose: () => void
}) {
  const store = useMockData()
  const patient = store.state.patients.find(
    (item) => item.id === result.patientId,
  )
  const [note, setNote] = useState("")
  return (
    <div className="fixed inset-0 z-100 bg-teal-950/42 backdrop-blur-xs" data-slot="hospital-drawer-backdrop" onClick={onClose}>
      <aside
        className="ml-auto h-full w-96 max-w-full bg-white p-5 shadow-xl max-md:w-full" data-slot="hospital-detail-drawer"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex justify-between border-b border-b-mist-200 pb-4">
          <div>
            <small className="text-xs font-semibold text-emerald-700 uppercase">Laboratory report</small>
            <h2 className="my-1 text-xl leading-normal font-bold tracking-tight text-mist-800 not-italic normal-nums">{result.reportTitle}</h2>
          </div>
          <button onClick={onClose} className="
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
            <strong className="tabular-nums">{result.status}</strong>Originating facility: Prime
            Diagnostics
          </span>
        </div>
        <dl>
          <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
            <dt className="text-olive-500">Patient</dt>
            <dd className="text-right font-semibold text-mist-800">
              {patient?.firstName} {patient?.lastName}
            </dd>
          </div>
          <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
            <dt className="text-olive-500">Request</dt>
            <dd className="text-right font-semibold text-mist-800">{result.requestId}</dd>
          </div>
          <div className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
            <dt className="text-olive-500">Updated</dt>
            <dd className="text-right font-semibold text-mist-800">{result.updatedAt}</dd>
          </div>
        </dl>
        <table className="my-4 w-full border-collapse overflow-hidden rounded-lg border border-mist-200 text-xs" data-slot="result-values">
          <thead>
            <tr>
              <th className="border-b border-b-taupe-100 bg-slate-50 px-2.5 py-3 text-left text-xs font-semibold text-olive-500 uppercase">Test</th>
              <th className="border-b border-b-taupe-100 bg-slate-50 px-2.5 py-3 text-left text-xs font-semibold text-olive-500 uppercase">Value</th>
              <th className="border-b border-b-taupe-100 bg-slate-50 px-2.5 py-3 text-left text-xs font-semibold text-olive-500 uppercase">Reference</th>
              <th className="border-b border-b-taupe-100 bg-slate-50 px-2.5 py-3 text-left text-xs font-semibold text-olive-500 uppercase">Flag</th>
            </tr>
          </thead>
          <tbody>
            {result.values.map((value) => (
              <tr key={value.test}>
                <td className="border-b border-b-taupe-100 px-2.5 py-3 text-left">{value.test}</td>
                <td className="border-b border-b-taupe-100 px-2.5 py-3 text-left">
                  {value.value} {value.unit}
                </td>
                <td className="border-b border-b-taupe-100 px-2.5 py-3 text-left">{value.reference}</td>
                <td className="border-b border-b-taupe-100 px-2.5 py-3 text-left">
                  <LabStatus>{value.flag}</LabStatus>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className="my-4 rounded-lg bg-mist-100 p-3">
          <h3 className="mb-2 text-xs tracking-tight not-italic">Laboratory comments</h3>
          <p className="my-1 text-xs text-olive-600">{result.comments || "No comments recorded."}</p>
        </section>
        <section className="my-4 overflow-hidden rounded-xl! border border-mist-200 bg-mist-100! p-0!" data-slot="document-preview-shell lab-report-preview">
          <div className="flex min-h-11 items-center justify-between border-b border-b-mist-200 bg-teal-950 px-3 text-white" data-slot="document-preview-toolbar">
            <span className="flex items-center gap-1.5 text-xs font-semibold">
              <FileText size={15} />
              Attached report
            </span>
            <button type="button" onClick={()=>downloadLabResult(result)} className="
              min-h-7.5 rounded-md border border-white/22 bg-transparent px-2 text-xs text-white transition
              duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            ">Download</button>
          </div>
          <div className="m-3.5 border border-mist-200 bg-white p-5 shadow-sm" data-slot="document-preview-page">
            <div className="flex items-center gap-2.5 border-b-2 border-b-emerald-900 pb-3">
              <span className="grid size-8 place-items-center rounded-full bg-emerald-50 text-emerald-900" data-slot="document-source-mark">
                <FlaskConical size={17} />
              </span>
              <div className="flex flex-col">
                <strong className="text-xs text-mist-800 tabular-nums">Prime Diagnostics</strong>
                <small className="text-xs text-olive-500">Laboratory report · {result.updatedAt}</small>
              </div>
            </div>
            <h3 className="mb-2 text-xs font-bold tracking-tight text-mist-800 not-italic">{result.reportTitle}</h3>
            <dl>
              <div className="flex min-h-9! justify-between gap-4 border-b border-b-taupe-100 px-0! py-2! text-xs!">
                <dt className="text-olive-500">Request reference</dt>
                <dd className="text-right font-semibold text-mist-800">{result.requestId}</dd>
              </div>
              <div className="flex min-h-9! justify-between gap-4 border-b border-b-taupe-100 px-0! py-2! text-xs!">
                <dt className="text-olive-500">Review status</dt>
                <dd className="text-right font-semibold text-mist-800">{result.status}</dd>
              </div>
              <div className="flex min-h-9! justify-between gap-4 border-b border-b-taupe-100 px-0! py-2! text-xs!">
                <dt className="text-olive-500">Version</dt>
                <dd className="text-right font-semibold text-mist-800">Version 1</dd>
              </div>
            </dl>
            <p className="my-1 text-xs! leading-relaxed text-olive-600">
              Structured result values and reviewer comments above form part of
              this fictional diagnostic report.
            </p>
          </div>
        </section>
        {role === "reviewer" && result.status === "Submitted for Review" && (
          <>
            <label className="mx-4 flex flex-col gap-1.5" data-slot="review-note">
              <span className="text-xs font-semibold text-olive-600">Review note</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)} className="
                  min-h-22 w-full resize-y rounded-lg border border-mist-300 bg-white p-3 text-xs leading-normal
                  text-mist-800 transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                "
              />
            </label>
            <div className="mt-4 mb-2.5 grid grid-cols-2 gap-2">
              <button
                className="
                  min-h-10 w-full rounded-lg border border-olive-400 bg-white text-xs font-bold text-red-700
                  transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                "
                onClick={() => {
                  if (note.trim()) {
                    store.reviewLabResult(
                      result.id,
                      "Correction Required",
                      note,
                    )
                    onClose()
                  }
                }}
              >
                Request Correction
              </button>
              <button
                className="
                  inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                  border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                  transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                  hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                " data-slot="hospital-primary"
                onClick={() => {
                  store.reviewLabResult(
                    result.id,
                    "Approved",
                    note || "Report completeness confirmed.",
                  )
                  onClose()
                }}
              >
                Approve Report
              </button>
            </div>
          </>
        )}
        {role === "reviewer" && result.status === "Approved" && (
          <button
            className="
              inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
              border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
              transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
              hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            " data-slot="hospital-primary drawer-action"
            onClick={() => {
              store.releaseLabResult(result.id)
              onClose()
            }}
          >
            Release to Requesting Facility
          </button>
        )}
      </aside>
    </div>
  )
}
