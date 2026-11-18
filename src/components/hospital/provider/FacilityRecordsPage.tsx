'use client';
import { useState } from "react";
import { Plus, ShieldCheck } from "lucide-react";
import { Page } from './Page';
import { DataPageContent } from './DataPageContent';

export function FacilityRecordsPage() {
  const [open, setOpen] = useState(false)
  return (
    <Page
      title="Facility Records"
      subtitle="Manage source-controlled record availability and release preparation."
      action={
        <button
          className="
            inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
            border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
            no-underline transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
            hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
          " data-slot="provider-primary-action"
          onClick={() => setOpen(true)}
        >
          <Plus size={16} />
          Register Availability
        </button>
      }
    >
      <DataPageContent
        columns={[
          "Patient",
          "Document",
          "Category",
          "Record Date",
          "Release State",
        ]}
        rows={[
          [
            "Aremu Adewale",
            "Discharge_Summary_14Mar2026.pdf",
            "Discharge Summary",
            "14 Mar 2026",
            "Validated",
          ],
          [
            "Bola James",
            "Lab_Result_23Oct2026.pdf",
            "Laboratory Results",
            "23 Oct 2026",
            "Available",
          ],
          [
            "Kemi Bello",
            "Consultation_21Oct2026.pdf",
            "Consultation Summary",
            "21 Oct 2026",
            "Review needed",
          ],
        ]}
      />
      {open && (
        <div className="fixed inset-0 z-100 grid place-items-center bg-teal-950/42 p-4 backdrop-blur-xs" data-slot="modal-backdrop">
          <section className="w-96 max-w-full rounded-2xl border border-mist-200 bg-white p-5 shadow-xl" data-slot="invite-modal">
            <div className="flex justify-between">
              <div>
                <small className="text-xs text-olive-500">Source: CityCare Hospital</small>
                <h2 className="my-1 text-xl leading-normal font-normal tracking-tight not-italic normal-nums">Register Record Availability</h2>
              </div>
              <button onClick={() => setOpen(false)} className="
                border-0 bg-transparent text-xl transition duration-160 ease-in-out focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              ">×</button>
            </div>
            <div className="mt-5 grid gap-3" data-slot="form-fields">
              <label className="flex flex-col gap-1.5">
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
                <span className="text-xs font-bold text-olive-600">Encounter</span>
                <select className="
                  h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
                  transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                ">
                  <option>ENC-2026-1048 · 23 Oct 2026</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-olive-600">Document category</span>
                <select className="
                  h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
                  transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                ">
                  <option>Consultation Summary</option>
                  <option>Laboratory Results</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-olive-600">Document date</span>
                <input type="date" className="
                  h-11 min-h-10.5 rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800 transition
                  duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                  focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                  disabled:opacity-52
                " />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-olive-600">Permitted file</span>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="
                  h-11 min-h-10.5 rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800 transition
                  duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                  focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                  disabled:opacity-52
                " />
              </label>
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs leading-normal text-amber-700" data-slot="inline-warning">
              <ShieldCheck size={16} />
              Attachments are stored with the selected facility record.
            </div>
            <div className="mt-4 flex justify-end gap-2" data-slot="modal-actions">
              <button onClick={() => setOpen(false)} className="
                min-h-9 rounded-md border border-mist-200 bg-white px-3 text-xs font-bold text-emerald-900
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              ">Cancel</button>
              <button onClick={() => setOpen(false)} className="
                min-h-9 rounded-md border border-emerald-900 bg-emerald-900 px-3 text-xs font-bold text-white
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              ">Validate Record</button>
            </div>
          </section>
        </div>
      )}
    </Page>
  )
}
