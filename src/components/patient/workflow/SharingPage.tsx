'use client';
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useMockData, type SharingPermission } from "@/stores/workflow/useMockData";
import { PatientPageHeader } from './PatientPageHeader';
import { PatientEmptyState } from './PatientEmptyState';
import { SharingRequestCard } from './SharingRequestCard';
import { ConsentDetailPanel } from './ConsentDetailPanel';

export function SharingPage() {
  const store = useMockData()
  const [tab, setTab] = useState<"requests" | "active" | "history">("requests")
  const [selected, setSelected] = useState<SharingPermission | null>(null)
  const permissions = store.state.sharingPermissions.filter(
    (item) => item.accountId === store.currentPatientAccount.id,
  )
  const filtered = permissions.filter((item) =>
    tab === "requests"
      ? item.status === "Pending Decision"
      : tab === "active"
        ? item.status === "Active"
        : item.status !== "Pending Decision",
  )
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow="Patient control"
        title="Sharing & Permissions"
        subtitle="Understand who is requesting information, why it is needed and what you can decide."
      />
      <div  role="tablist">
        {[
          ["requests", "Requests requiring my decision"],
          ["active", "Active permissions"],
          ["history", "Sharing history"],
        ].map(([value, label]) => (
          <button
            role="tab"
            aria-selected={tab === value}

            onClick={() => setTab(value as typeof tab)}
            key={value} className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            "
          >
            {label}
            <i>
              {
                permissions.filter((item) =>
                  value === "requests"
                    ? item.status === "Pending Decision"
                    : value === "active"
                      ? item.status === "Active"
                      : item.status !== "Pending Decision",
                ).length
              }
            </i>
          </button>
        ))}
      </div>
      {filtered.length ? (
        <div >
          {filtered.map((permission) => (
            <SharingRequestCard
              permission={permission}
              onView={() => setSelected(permission)}
              key={permission.id}
            />
          ))}
        </div>
      ) : (
        <PatientEmptyState
          icon={ShieldCheck}
          title={
            tab === "requests"
              ? "No sharing decisions are waiting"
              : tab === "active"
                ? "No active consent-based permissions"
                : "No sharing history is available yet"
          }
          text={
            tab === "requests"
              ? "When your decision is needed for a sharing request, it will appear here."
              : "Only applicable consent-based sharing activity appears in this section."
          }
        />
      )}
      <div >
        <ShieldCheck size={18} />
        <p>
          Not every authorised healthcare information exchange requires a new
          decision in this portal. Requests appear here only when patient
          consent is the applicable basis in this fictional workflow.
        </p>
      </div>
      {selected && (
        <ConsentDetailPanel
          permission={
            store.state.sharingPermissions.find(
              (item) => item.id === selected.id,
            ) ?? selected
          }
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
