'use client';
import { Building2 } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { LabStatus } from './LabStatus';
import { LabPageHeader } from './LabPageHeader';

export function FacilitiesPage() {
  const { state } = useMockData()
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
      <LabPageHeader
        title="Connected Facilities"
        subtitle="Healthcare organisations configured for diagnostic coordination."
      />
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1" data-slot="provider-directory-grid">
        {state.organisations.map((organisation) => (
          <article className="rounded-xl border border-mist-200 bg-white p-4" data-slot="workspace-card" key={organisation.id}>
            <div className="grid grid-cols-3 items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-emerald-900">
                <Building2 size={21} />
              </span>
              <div>
                <h3 className="text-xs tracking-tight not-italic">{organisation.name}</h3>
                <p className="mt-1 text-xs text-olive-500">
                  {organisation.type} · {organisation.location}
                </p>
              </div>
              <LabStatus>{organisation.status}</LabStatus>
            </div>
            <dl className="my-3">
              <div className="border-t border-t-mist-200 py-2">
                <dt className="text-xs text-olive-500">Supported requests</dt>
                <dd className="mt-0.5 text-xs font-semibold">
                  {organisation.type === "Laboratory / Diagnostic Centre"
                    ? "Laboratory · Imaging"
                    : "Laboratory · Diagnostic referral"}
                </dd>
              </div>
              <div className="border-t border-t-mist-200 py-2">
                <dt className="text-xs text-olive-500">Connection configuration</dt>
                <dd className="mt-0.5 text-xs font-semibold">
                  {organisation.status === "Active" ? "Configured" : "Pending"}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  )
}
