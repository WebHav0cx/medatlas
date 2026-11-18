'use client';
import { useState } from "react";
import { AlertCircle, ChevronRight, ShieldCheck } from "lucide-react";
import { Page } from './Page';

export function AuthorizationsPage() {
  const [tab, setTab] = useState("Needs Review")
  return (
    <Page
      title="Authorizations"
      subtitle="Review consent, legal-basis, and source-facility authorization states."
    >
      <div className="mb-3 flex gap-5 border-b border-b-mist-200 max-md:overflow-x-auto" data-slot="request-tabs">
        {[
          "Needs Review",
          "Patient Consent",
          "Approved",
          "Declined",
          "Expired",
        ].map((item) => (
          <button
             data-slot={(tab === item ? "active" : "")}
            onClick={() => setTab(item)}
            key={item} className={[`
              border-0 border-b-2 bg-transparent py-3 text-xs font-bold transition duration-160 ease-in-out
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            `, (!(tab === item) ? "border-b-transparent text-olive-600" : ""), ((tab === item) ? "border-b-emerald-900 text-emerald-900" : "")].filter(Boolean).join(" ")}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1" data-slot="authorization-grid">
        {[
          [
            "REQ-008472",
            "Aremu Adewale",
            "CityCare Hospital",
            "Mercy Specialist Hospital",
            "Source review required",
            "Continuity of Care",
          ],
          [
            "REQ-008481",
            "Kemi Bello",
            "Lagoon Clinic",
            "CityCare Hospital",
            "Patient consent required",
            "Referral",
          ],
        ].map(([ref, patient, requester, source, status, purpose]) => (
          <article className="rounded-xl border border-mist-200 bg-white p-4" data-slot="workspace-card" key={ref}>
            <div className="flex justify-between">
              <span className="text-xs font-bold text-olive-500">{ref}</span>
              <i className="
                flex min-h-6.5 w-max items-center gap-1.25 rounded-md border border-emerald-700/18 bg-emerald-50
                px-2 py-0.75 text-xs leading-none font-semibold text-emerald-700 not-italic
              " data-slot="table-status">
                <AlertCircle size={12} />
                {status}
              </i>
            </div>
            <h3 className="text-xs tracking-tight not-italic">{patient}</h3>
            <div className="grid grid-cols-3 items-center gap-2 rounded-lg bg-mist-100 p-3 text-center text-xs" data-slot="authorization-route">
              <span>{requester}</span>
              <ChevronRight size={15} />
              <span>{source}</span>
            </div>
            <dl className="my-3">
              <div className="border-t border-t-mist-200 py-2">
                <dt className="text-xs text-olive-500">Purpose</dt>
                <dd className="mt-0.5 text-xs font-semibold">{purpose}</dd>
              </div>
              <div className="border-t border-t-mist-200 py-2">
                <dt className="text-xs text-olive-500">Requested records</dt>
                <dd className="mt-0.5 text-xs font-semibold">Discharge Summary</dd>
              </div>
            </dl>
            <button className="
              flex min-h-9 w-full items-center justify-center gap-1 rounded-md border border-mist-300 bg-white
              text-xs font-bold text-emerald-900 no-underline transition duration-160 ease-in-out
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            ">
              Review Authorization
              <ChevronRight size={15} />
            </button>
          </article>
        ))}
      </div>
      <div className="mt-2.5 flex gap-1.5 rounded-md bg-blue-50 p-2.5 text-xs text-blue-700" data-slot="safety-message">
        <ShieldCheck size={16} />
        Patient consent is one possible authorization basis. Source-facility
        review remains independently required.
      </div>
    </Page>
  )
}
