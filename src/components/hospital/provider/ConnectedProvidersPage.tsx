'use client';
import { useState } from "react";
import { Link } from "@/lib/workflow-router";
import { Building2, ChevronRight, Search, ShieldCheck } from "lucide-react";
import { Page } from './Page';

export function ConnectedProvidersPage() {
  const [query, setQuery] = useState("")
  const providers = [
    [
      "Mercy Specialist Hospital",
      "Hospital",
      "Ikeja, Lagos",
      "Discharge Summary · Medication History",
      "Connected",
    ],
    [
      "Prime Diagnostics",
      "Diagnostic Centre",
      "Victoria Island, Lagos",
      "Imaging · Laboratory Results",
      "Connected",
    ],
    [
      "Lagoon Community Clinic",
      "Clinic",
      "Surulere, Lagos",
      "Consultation Summary",
      "Sync delayed",
    ],
    [
      "Northpoint Medical Laboratory",
      "Laboratory",
      "Abuja FCT",
      "Laboratory Results",
      "Offline",
    ],
  ].filter((item) => item.join(" ").toLowerCase().includes(query.toLowerCase()))
  return (
    <Page
      title="Connected Providers"
      subtitle="Verified participating facilities available in the directory."
    >
      <div className="
        mb-4 flex h-12 items-center gap-2.5 rounded-lg border border-mist-300 bg-white px-3 text-xs
        text-mist-800 focus-within:border-emerald-700 focus-within:shadow-sm
      " data-slot="directory-search">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by facility name, type, location, or record category" className="
            min-h-10.5 flex-1 rounded-lg border-mist-300 bg-transparent text-xs text-mist-800 outline-hidden
            transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52
          "
        />
      </div>
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1" data-slot="provider-directory-grid">
        {providers.map(([name, type, location, records, status]) => (
          <article className="rounded-xl border border-mist-200 bg-white p-4" data-slot="workspace-card" key={name}>
            <div className="grid grid-cols-3 items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-emerald-900">
                <Building2 size={21} />
              </span>
              <div>
                <h3 className="text-xs tracking-tight not-italic">{name}</h3>
                <p className="mt-1 text-xs text-olive-500">
                  {type} · {location}
                </p>
              </div>
              <i className="
                inline-flex min-h-6.5 items-center gap-1.25 rounded-md border border-emerald-700/18 bg-emerald-50
                px-2 py-0.75 text-xs leading-none font-semibold text-emerald-700
              " data-slot="verified-status">
                <ShieldCheck size={12} />
                Verified
              </i>
            </div>
            <dl className="my-3">
              <div className="border-t border-t-mist-200 py-2">
                <dt className="text-xs text-olive-500">Supported record categories</dt>
                <dd className="mt-0.5 text-xs font-semibold">{records}</dd>
              </div>
              <div className="border-t border-t-mist-200 py-2">
                <dt className="text-xs text-olive-500">Connection status</dt>
                <dd className={[((status === "Connected") ? "text-emerald-700" : ""), "mt-0.5 text-xs font-semibold"].filter(Boolean).join(" ")} data-slot={(status === "Connected" ? "available-text" : "")}>
                  {status}
                </dd>
              </div>
            </dl>
            <Link to="/provider/requests" className="
              flex min-h-9 w-full items-center justify-center gap-1 rounded-md border border-mist-300 bg-white
              text-xs font-bold text-emerald-900 no-underline transition duration-160 ease-in-out
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            ">
              Select for Request
              <ChevronRight size={15} />
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-2.5 flex gap-1.5 rounded-md bg-blue-50 p-2.5 text-xs text-blue-700" data-slot="safety-message">
        <ShieldCheck size={16} />
        This directory lists participating facilities configured for CityCare
        Hospital.
      </div>
    </Page>
  )
}
