'use client';
import { useState } from "react";
import { Check, ChevronRight, ShieldCheck, Wifi } from "lucide-react";
import { Page } from './Page';

export function SettingsPage() {
  const [saved, setSaved] = useState(false)
  return (
    <Page
      title="Settings"
      subtitle="Facility profile, access, exchange and connectivity preferences."
    >
      <div className="grid grid-cols-2 items-start gap-4 max-md:grid-cols-1" data-slot="settings-layout">
        <nav className="flex flex-col gap-1 max-md:flex-row max-md:overflow-x-auto">
          {[
            "Facility Profile",
            "Staff & Access",
            "Record Sharing",
            "Notifications",
            "Connectivity",
            "Security",
            "Support",
          ].map((item, index) => (
            <button  data-slot={(index === 0 ? "active" : "")} key={item} className={[`
              flex min-h-10 items-center justify-between rounded-md px-3 text-xs font-bold transition
              duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              max-md:whitespace-nowrap
            `, (!(index === 0) ? "bg-transparent text-olive-600" : ""), ((index === 0) ? "bg-emerald-50 text-emerald-900" : "")].filter(Boolean).join(" ")}>
              {item}
              <ChevronRight size={15} />
            </button>
          ))}
        </nav>
        <section className="rounded-xl border border-mist-200 bg-white p-5" data-slot="workspace-card settings-form">
          <div className="flex items-center justify-between">
            <h2 className="text-base tracking-tight not-italic">Facility Profile</h2>
            <span className="
              inline-flex min-h-6.5 items-center gap-1.25 rounded-md border border-emerald-700/18 bg-emerald-50
              px-2 py-0.75 text-xs leading-none font-semibold text-emerald-700
            " data-slot="verified-status">
              <ShieldCheck size={13} />
              Verified facility
            </span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 max-md:grid-cols-1" data-slot="form-fields two-col">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-olive-600">Facility name</span>
              <input defaultValue="CityCare Hospital" className="
                h-11 min-h-10.5 rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800 transition
                duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              " />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-olive-600">Facility type</span>
              <select className="
                h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option>Hospital</option>
              </select>
            </label>
            <label  data-slot="span-two" className="col-start-1 col-end-3 flex flex-col gap-1.5 max-md:col-start-1 max-md:col-end-auto">
              <span className="text-xs font-bold text-olive-600">Address</span>
              <input defaultValue="12 Adeola Avenue, Ikeja, Lagos" className="
                h-11 min-h-10.5 rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800 transition
                duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              " />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-olive-600">Contact phone</span>
              <input defaultValue="+234 800 000 0000" className="
                h-11 min-h-10.5 rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800 transition
                duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              " />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-olive-600">Contact email</span>
              <input defaultValue="operations@citycare.example" className="
                h-11 min-h-10.5 rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800 transition
                duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              " />
            </label>
          </div>
          <div className="my-4 flex gap-2 rounded-lg bg-amber-50 p-3 text-amber-700" data-slot="settings-connectivity">
            <Wifi size={18} />
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">Application available</strong>
              <span className="text-xs">Synchronization status available in Integrations</span>
            </div>
          </div>
          <button
            className="
              inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
              border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
              no-underline transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
              hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            " data-slot="provider-primary-action"
            onClick={() => setSaved(true)}
          >
            Save Changes
          </button>
          {saved && (
            <p className="ml-2.5 inline-flex items-center gap-1 text-xs text-amber-700" data-slot="local-save-message">
              <Check size={14} />
              Changes saved.
            </p>
          )}
        </section>
      </div>
    </Page>
  )
}
