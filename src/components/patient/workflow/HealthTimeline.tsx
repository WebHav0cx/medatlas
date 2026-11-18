'use client';
import { useState } from "react";
import { HeartPulse, ListFilter } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { PatientButton } from './PatientButton';
import { PatientPageHeader } from './PatientPageHeader';
import { PatientEmptyState } from './PatientEmptyState';
import { HealthTimelineEvent } from './HealthTimelineEvent';

export function HealthTimeline() {
  const store = useMockData()
  const documents = store.patientDocuments()
  const [facility, setFacility] = useState("")
  const [type, setType] = useState("")
  const [openId, setOpenId] = useState<string | null>(documents[0]?.id ?? null)
  const facilities = Array.from(
    new Set(documents.map((item) => item.sourceFacility)),
  )
  const types = Array.from(new Set(documents.map((item) => item.category)))
  const filtered = [...documents]
    .filter((item) => !facility || item.sourceFacility === facility)
    .filter((item) => !type || item.category === type)
    .sort((a, b) => b.date.localeCompare(a.date))
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow="My health"
        title="Health Timeline"
        subtitle="A chronological view of the healthcare information available to you."
      />
      <div >
        <ListFilter size={18} />
        <select value={type} onChange={(event) => setType(event.target.value)} className="
          h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
          transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
          focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
          disabled:cursor-not-allowed disabled:opacity-52
        ">
          <option value="">All event types</option>
          {types.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          value={facility}
          onChange={(event) => setFacility(event.target.value)} className="
            h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
            transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52
          "
        >
          <option value="">All facilities</option>
          {facilities.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      {filtered.length ? (
        <div >
          {filtered.map((document) => (
            <HealthTimelineEvent
              document={document}
              isOpen={openId === document.id}
              onToggle={() =>
                setOpenId((current) =>
                  current === document.id ? null : document.id,
                )
              }
              key={document.id}
            />
          ))}
        </div>
      ) : (
        <PatientEmptyState
          icon={HeartPulse}
          title="No timeline events match these filters"
          text="Clear your filters to see other available health events."
          action={
            <PatientButton
              onClick={() => {
                setType("")
                setFacility("")
              }}
            >
              Clear filters
            </PatientButton>
          }
        />
      )}
    </div>
  )
}
