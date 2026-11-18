'use client';
import { useState } from "react";
import { Link } from "@/lib/workflow-router";
import { AlertCircle, ChevronDown, ChevronRight, Plus, Search, Settings, ShieldCheck } from "lucide-react";
import { Page } from './Page';
import { EmptyState } from './EmptyState';

export function PatientSearchPage() {
  const [advanced, setAdvanced] = useState(false)
  const [state, setState] = useState<"idle" | "loading" | "results" | "empty">(
    "idle",
  )
  const run = () => {
    setState("loading")
    window.setTimeout(() => setState("results"), 650)
  }
  return (
    <Page
      title="Find a Patient"
      subtitle="Search patients using permitted identifiers."
      action={
        <Link className="
          inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
          border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
          no-underline transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
          hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32 max-md:w-full
        " data-slot="provider-primary-action" to="/provider/patients/new">
          <Plus size={16} />
          Register Patient
        </Link>
      }
    >
      <section className="rounded-xl border border-mist-200 bg-white p-4" data-slot="workspace-card search-workspace">
        <label className="mb-1.5 block text-xs font-bold">Patient search</label>
        <div className="
          flex min-h-12 items-center gap-2.5 rounded-lg border border-mist-300 bg-white py-1 pr-1 pl-3
          text-xs text-mist-800 focus-within:border-emerald-700 focus-within:shadow-sm
        " data-slot="provider-search">
          <Search size={19} />
          <input
            placeholder="MedAtlas ID, full name, phone, or local hospital ID"
            defaultValue="Aremu Adewale" className="
              min-h-10.5 flex-1 rounded-lg border-mist-300 bg-transparent text-xs text-mist-800 outline-hidden
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            "
          />
          <button onClick={run} className="
            self-stretch rounded-md bg-emerald-900 px-4 text-xs font-bold text-white transition duration-160
            ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          ">Search</button>
        </div>
        <button
          className="
            mt-2.5 flex items-center gap-1.5 bg-transparent text-xs font-bold text-emerald-900 transition
            duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          " data-slot="advanced-toggle"
          onClick={() => setAdvanced(!advanced)}
        >
          <Settings size={15} />
          Advanced Search
          <ChevronDown size={14} />
        </button>
        {advanced && (
          <div className="mt-4 grid grid-cols-4 gap-3 border-t border-t-mist-200 pt-4 max-md:grid-cols-1" data-slot="advanced-panel">
            {[
              "First Name",
              "Middle Name",
              "Last Name",
              "Date of Birth",
              "Phone Number",
              "MedAtlas ID",
              "Local Hospital ID",
            ].map((field) => (
              <label key={field} className="flex flex-col gap-1">
                <span className="text-xs font-bold text-olive-600">{field}</span>
                <input placeholder={field} className="
                  h-10 min-h-10.5 rounded-md border border-mist-200 bg-white px-2.5 text-xs text-mist-800 transition
                  duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                  focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                  disabled:opacity-52
                " />
              </label>
            ))}
            <label className="flex flex-col gap-1">
              <span className="text-xs font-bold text-olive-600">Sex</span>
              <select className="
                h-10 min-h-10.5 w-full rounded-md border border-mist-200 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option>Any</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </label>
            <div className="col-start-1 col-end-5 flex justify-end gap-2 max-md:col-start-1 max-md:col-end-auto">
              <button onClick={() => setAdvanced(false)} className="
                min-h-9 rounded-md border border-mist-200 bg-white px-3 text-xs font-bold text-emerald-900
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              ">Collapse</button>
              <button className="
                min-h-9 rounded-md border border-mist-200 bg-white px-3 text-xs font-bold text-emerald-900
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              ">Clear Filters</button>
            </div>
          </div>
        )}
      </section>
      {state === "idle" && (
        <EmptyState
          icon={<Search />}
          title="Search the MedAtlas patient directory"
          text="Use at least two identifiers where possible. Every production search requires authorization and audit logging."
        />
      )}
      {state === "loading" && (
        <div className="mt-4 rounded-xl border border-mist-200 bg-white p-4" data-slot="workspace-card loading-state">
          <span className="m-2 block h-12 animate-pulse rounded-md bg-slate-100" />
          <span className="m-2 block h-12 animate-pulse rounded-md bg-slate-100" />
          <span className="m-2 block h-12 animate-pulse rounded-md bg-slate-100" />
        </div>
      )}
      {state === "empty" && (
        <EmptyState
          icon={<AlertCircle />}
          title="No matching patient found"
          text="Check the entered identifiers or begin a controlled patient registration."
        />
      )}
      {state === "results" && (
        <div className="mt-4" data-slot="search-results">
          <div className="mb-2 flex justify-between" data-slot="results-count">
            <strong className="text-xs tabular-nums">1 possible match</strong>
            <span className="text-xs text-amber-700">Patient match</span>
          </div>
          <article className="grid grid-cols-4 items-center gap-4 rounded-xl border border-mist-200 bg-white p-4 max-md:grid-cols-2" data-slot="workspace-card patient-match">
            <span className="grid size-12 place-items-center rounded-full bg-emerald-900 text-xs font-bold text-white" data-slot="match-avatar">AA</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm tracking-tight not-italic">Aremu Adewale</h3>
                <span className="
                  inline-flex min-h-6.5 items-center gap-1.25 rounded-md border border-emerald-700/18 bg-emerald-50
                  px-2 py-0.75 text-xs leading-none font-semibold text-emerald-700
                " data-slot="verified-status">
                  <ShieldCheck size={13} />
                  Verified
                </span>
              </div>
              <strong className="text-xs text-emerald-900 tabular-nums">MA-002841</strong>
              <p className="mt-1 text-xs text-olive-600">Male · 40 years · DOB 14 May 1986 · Phone ending 4821</p>
            </div>
            <div className="flex flex-col max-md:col-start-2 max-md:col-end-auto" data-slot="confidence">
              <small className="text-xs text-olive-500">Match confidence</small>
              <strong className="text-xs text-emerald-700 tabular-nums">High</strong>
            </div>
            <Link to="/provider/patients/MA-002841" className="
              flex min-h-9 items-center gap-1 rounded-lg bg-emerald-900 px-3 text-xs font-bold text-white
              no-underline transition duration-160 ease-in-out focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 max-md:col-start-1
              max-md:col-end-3 max-md:justify-center
            ">
              Open Patient
              <ChevronRight size={16} />
            </Link>
          </article>
          <div className="mt-2.5 flex gap-1.5 rounded-md bg-blue-50 p-2.5 text-xs text-blue-700" data-slot="safety-message">
            <ShieldCheck size={17} />
            Possible matches are never merged automatically. Verify identity
            before continuing.
          </div>
        </div>
      )}
    </Page>
  )
}
