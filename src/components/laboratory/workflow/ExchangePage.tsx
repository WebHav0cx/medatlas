'use client';
import { Check, ChevronRight, FileCheck2 } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { LabStatus } from './LabStatus';
import { LabPageHeader } from './LabPageHeader';

export function ExchangePage() {
  const store = useMockData()
  const approved = store.state.labResults.filter(
    (item) => item.status === "Approved",
  )
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
      <LabPageHeader
        title="Record Exchange"
        subtitle="Release reviewed reports and track receipt acknowledgement."
      />
      <section className="mb-3 overflow-hidden rounded-xl border border-mist-200 bg-white" data-slot="hospital-panel exchange-ready">
        <div className="flex min-h-15 items-center justify-between border-b border-b-taupe-100 px-4 py-3.5" data-slot="hospital-panel-head">
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">Ready for release</h2>
            <p className="mt-0.5 text-xs text-olive-500">Only approved reports are eligible</p>
          </div>
        </div>
        {approved.length ? (
          approved.map((result) => (
            <div key={result.id} className="grid min-h-16 grid-cols-3 items-center gap-2.5 border-b border-b-mist-200 px-4 py-3 max-md:grid-cols-2">
              <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <FileCheck2 size={18} />
              </span>
              <div className="flex flex-col">
                <strong className="text-xs tabular-nums">{result.reportTitle}</strong>
                <small className="text-xs text-olive-500">{result.requestId} · Prime Diagnostics</small>
              </div>
              <button onClick={() => store.releaseLabResult(result.id)} className="
                min-h-9 rounded-md bg-emerald-900 px-2.5 text-xs font-bold text-white transition duration-160
                ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                max-md:col-start-1 max-md:col-end-3 max-md:w-full
              ">
                Release Report
              </button>
            </div>
          ))
        ) : (
          <div className="
            flex! min-h-32! grid-cols-3 flex-col items-center justify-center gap-2.5 border-b
            border-b-mist-200 px-4 py-3 text-emerald-700 max-md:grid-cols-2
          " data-slot="lab-empty">
            <Check size={22} />
            <strong className="text-xs tabular-nums">No reports awaiting release</strong>
          </div>
        )}
      </section>
      <section className="overflow-clip rounded-xl border border-mist-200 bg-white" data-slot="hospital-table-panel">
        <div className="
          sticky top-0 z-2 grid min-h-11 grid-cols-5 items-center gap-2.5 border-b border-b-taupe-100
          bg-slate-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-olive-500 uppercase
          max-md:hidden
        " data-slot="hospital-table-head">
          <span>Transaction</span>
          <span>Request</span>
          <span>Recipient</span>
          <span>Document</span>
          <span>Receipt</span>
          <span />
        </div>
        {store.state.exchanges.map((item) => (
          <button className="
            grid min-h-15 w-full cursor-pointer grid-cols-5 items-center gap-2.5 border-0 border-t
            border-t-taupe-100 bg-white px-4 py-2.75 text-left text-xs text-olive-600 transition duration-160
            ease-in-out hover:bg-slate-50 focus-visible:relative focus-visible:z-3 focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52 max-md:grid max-md:grid-cols-2 max-md:gap-2 max-md:p-3.5
          " data-slot="hospital-table-row" key={item.id}>
            <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{item.id}</span>
            <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{item.requestId}</span>
            <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{item.recipient}</span>
            <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{item.documentType}</span>
            <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">
              <LabStatus>{item.receiptStatus}</LabStatus>
            </span>
            <ChevronRight size={16} className="max-md:col-start-2 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
          </button>
        ))}
      </section>
    </div>
  )
}
