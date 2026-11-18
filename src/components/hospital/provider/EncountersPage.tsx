'use client';
import { useState } from "react";
import { CalendarPlus, Check, ChevronRight, Search } from "lucide-react";
import { Page } from './Page';

export function EncountersPage() {
  const [registering, setRegistering] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <Page
      title="Encounters"
      subtitle="Register discovery metadata without creating a full clinical chart."
      action={
        <button
          className="
            inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
            border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
            no-underline transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
            hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
          " data-slot="provider-primary-action"
          onClick={() => setRegistering(true)}
        >
          <CalendarPlus size={16} />
          Register Encounter
        </button>
      }
    >
      <div className="mb-4 grid grid-cols-3 gap-3 max-md:gap-1.5" data-slot="hospital-summary">
        <div className="flex flex-col rounded-lg border border-mist-200 bg-white p-3">
          <strong className="text-lg tabular-nums">28</strong>
          <span className="text-xs text-olive-600">Encounters this week</span>
        </div>
        <div className="flex flex-col rounded-lg border border-mist-200 bg-white p-3">
          <strong className="text-lg tabular-nums">19</strong>
          <span className="text-xs text-olive-600">With available records</span>
        </div>
        <div className="flex flex-col rounded-lg border border-mist-200 bg-white p-3">
          <strong className="text-lg tabular-nums">3</strong>
          <span className="text-xs text-olive-600">Awaiting metadata review</span>
        </div>
      </div>
      <section className="overflow-clip rounded-xl border border-mist-200 bg-white" data-slot="workspace-card data-card">
        <div className="mb-3 flex gap-2.5 border-b border-b-mist-200 p-3 max-md:flex-col" data-slot="data-tools">
          <div className="flex min-h-10.5 flex-1 items-center gap-1.5 rounded-md border border-mist-200 px-2.5 text-olive-500">
            <Search size={17} />
            <input placeholder="Search patient or encounter ID" className="
              h-auto min-h-10.5 flex-1 rounded-md border-mist-200 bg-white text-xs text-mist-800 outline-hidden
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </div>
          <select className="
            h-9 min-h-10.5 w-full rounded-md border border-mist-200 bg-white px-2.5 text-xs text-mist-800
            transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52
          ">
            <option>All encounter types</option>
            <option>Outpatient</option>
            <option>Inpatient</option>
            <option>Diagnostic</option>
          </select>
          <input type="date" className="
            h-9 min-h-10.5 rounded-md border border-mist-200 bg-white px-2.5 text-xs text-mist-800 transition
            duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52
          " />
        </div>
        <div  data-slot="encounter-list">
          {[
            [
              "Aremu Adewale",
              "ENC-2026-1048",
              "Outpatient",
              "23 Oct 2026",
              "Consultation Summary",
            ],
            [
              "Bola James",
              "ENC-2026-1041",
              "Diagnostic",
              "23 Oct 2026",
              "Laboratory Results",
            ],
            [
              "Kemi Bello",
              "ENC-2026-0984",
              "Inpatient",
              "21 Oct 2026",
              "Discharge Summary",
            ],
          ].map(([patient, id, type, date, records]) => (
            <button key={id} className="
              grid min-h-16 w-full grid-cols-5 items-center gap-3 border-0 border-b border-b-mist-200 bg-white
              px-3.5 py-3 text-left transition duration-160 ease-in-out focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52 max-md:grid-cols-3
            ">
              <span className="grid size-12 place-items-center rounded-full bg-emerald-900 text-xs font-bold text-white" data-slot="match-avatar">
                {patient
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </span>
              <div className="flex flex-col max-md:col-start-2 max-md:col-end-auto">
                <strong className="text-xs tabular-nums">{patient}</strong>
                <small className="text-xs text-olive-500">
                  {id} · {type}
                </small>
              </div>
              <div className="flex flex-col max-md:col-start-2 max-md:col-end-auto">
                <small className="text-xs text-olive-500">Encounter date</small>
                <strong className="text-xs tabular-nums">{date}</strong>
              </div>
              <div className="flex flex-col max-md:col-start-2 max-md:col-end-auto">
                <small className="text-xs text-olive-500">Available categories</small>
                <strong className="text-xs tabular-nums">{records}</strong>
              </div>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      </section>
      {registering && (
        <div className="fixed inset-0 z-100 grid place-items-center bg-teal-950/42 p-4 backdrop-blur-xs" data-slot="modal-backdrop">
          <section className="w-96 max-w-full rounded-2xl border border-mist-200 bg-white p-5 shadow-xl" data-slot="invite-modal">
            <div className="flex justify-between">
              <div>
                <small className="text-xs text-olive-500">CityCare Hospital</small>
                <h2 className="my-1 text-xl leading-normal font-normal tracking-tight not-italic normal-nums">Register Encounter</h2>
              </div>
              <button onClick={() => setRegistering(false)} className="
                border-0 bg-transparent text-xl transition duration-160 ease-in-out focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              ">×</button>
            </div>
            {saved ? (
              <div className="pt-8 pb-4 text-center text-amber-700" data-slot="invite-result">
                <Check size={25} />
                <h3 className="tracking-tight text-mist-800 not-italic">Encounter saved</h3>
                <p className="text-xs">No network discovery metadata was published.</p>
                <button onClick={() => setRegistering(false)} className="
                  min-h-9 rounded-md border border-mist-200 bg-white px-3 text-xs font-bold text-emerald-900
                  transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                ">Close</button>
              </div>
            ) : (
              <>
                <div className="mt-5 grid grid-cols-2 gap-3 max-md:grid-cols-1" data-slot="form-fields two-col">
                  <label  data-slot="span-two" className="col-start-1 col-end-3 flex flex-col gap-1.5 max-md:col-start-1 max-md:col-end-auto">
                    <span className="text-xs font-bold text-olive-600">Patient</span>
                    <select className="
                      h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
                      transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                      focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                      disabled:cursor-not-allowed disabled:opacity-52
                    ">
                      <option>Aremu Adewale · MA-002841</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-olive-600">Encounter type</span>
                    <select className="
                      h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
                      transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                      focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                      disabled:cursor-not-allowed disabled:opacity-52
                    ">
                      <option>Outpatient</option>
                      <option>Inpatient</option>
                      <option>Diagnostic</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-olive-600">Encounter date</span>
                    <input type="date" className="
                      h-11 min-h-10.5 rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800 transition
                      duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    " />
                  </label>
                  <label  data-slot="span-two" className="col-start-1 col-end-3 flex flex-col gap-1.5 max-md:col-start-1 max-md:col-end-auto">
                    <span className="text-xs font-bold text-olive-600">Local encounter ID</span>
                    <input placeholder="e.g. ENC-2026-1052" className="
                      h-11 min-h-10.5 rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800 transition
                      duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    " />
                  </label>
                  <label  data-slot="span-two" className="col-start-1 col-end-3 flex flex-col gap-1.5 max-md:col-start-1 max-md:col-end-auto">
                    <span className="text-xs font-bold text-olive-600">Available record categories</span>
                    <select className="
                      h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
                      transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                      focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                      disabled:cursor-not-allowed disabled:opacity-52
                    ">
                      <option>Consultation Summary</option>
                      <option>Discharge Summary</option>
                      <option>Laboratory Results</option>
                    </select>
                  </label>
                </div>
                <div className="mt-4 flex justify-end gap-2" data-slot="modal-actions">
                  <button onClick={() => setRegistering(false)} className="
                    min-h-9 rounded-md border border-mist-200 bg-white px-3 text-xs font-bold text-emerald-900
                    transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                  ">Cancel</button>
                  <button onClick={() => setSaved(true)} className="
                    min-h-9 rounded-md border border-emerald-900 bg-emerald-900 px-3 text-xs font-bold text-white
                    transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                  ">Save Encounter</button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </Page>
  )
}
