'use client';
import { Building2, ChevronRight, FileText, ShieldCheck } from "lucide-react";
import { Page } from './Page';

export function PatientProfile() {
  return (
    <Page
      title="Aremu Adewale"
      subtitle="MA-002841 · Male · 40 years · DOB 14 May 1986"
      action={
        <button className="
          inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
          border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
          no-underline transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
          hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
        " data-slot="provider-primary-action">
          <FileText size={16} />
          Request Records
        </button>
      }
    >
      <div className="mb-4 flex items-center gap-3 text-xs text-olive-600" data-slot="profile-status-line">
        <span className="
          inline-flex min-h-6.5 items-center gap-1.25 rounded-md border border-emerald-700/18 bg-emerald-50
          px-2 py-0.75 text-xs leading-none font-semibold text-emerald-700
        " data-slot="verified-status">
          <ShieldCheck size={13} />
          Verified
        </span>
        <span>Local ID: CH-29384</span>
      </div>
      <div className="mb-3 flex gap-5 border-b border-b-mist-200 max-md:overflow-x-auto" data-slot="request-tabs">
        {[
          "Overview",
          "Provider History",
          "Requests",
          "Received Records",
          "Activity",
        ].map((tab, index) => (
          <button  data-slot={(index === 1 ? "active" : "")} key={tab} className={[`
            border-0 border-b-2 bg-transparent py-3 text-xs font-bold transition duration-160 ease-in-out
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52
          `, (!(index === 1) ? "border-b-transparent text-olive-600" : ""), ((index === 1) ? "border-b-emerald-900 text-emerald-900" : "")].filter(Boolean).join(" ")}>
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1" data-slot="provider-history-grid">
        {[
          [
            "Mercy Specialist Hospital",
            "14 Mar 2026",
            "Discharge Summary · Medication History · Laboratory Results",
          ],
          ["Prime Diagnostics", "26 Jan 2026", "Imaging Report"],
        ].map(([provider, date, records]) => (
          <article className="grid grid-cols-2 gap-3 rounded-xl border border-mist-200 bg-white p-4" data-slot="workspace-card" key={provider}>
            <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-900">
              <Building2 size={21} />
            </span>
            <div>
              <h3 className="text-xs tracking-tight not-italic">{provider}</h3>
              <p className="my-1 text-xs text-olive-500">Lagos · Verified provider</p>
            </div>
            <dl className="col-start-1 col-end-3 my-2">
              <div className="border-t border-t-mist-200 py-2">
                <dt className="text-xs text-olive-500">Last encounter</dt>
                <dd className="mt-1 text-xs">{date}</dd>
              </div>
              <div className="border-t border-t-mist-200 py-2">
                <dt className="text-xs text-olive-500">Available record categories</dt>
                <dd className="mt-1 text-xs">{records}</dd>
              </div>
            </dl>
            <button className="
              col-start-1 col-end-3 flex min-h-9 items-center justify-center gap-1 rounded-md border
              border-mist-300 bg-white text-xs font-bold text-emerald-900 transition duration-160 ease-in-out
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            ">
              Request Records
              <ChevronRight size={16} />
            </button>
          </article>
        ))}
      </div>
    </Page>
  )
}
