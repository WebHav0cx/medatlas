'use client';
import { useState } from "react";
import { ChevronRight, FlaskConical, Network, RefreshCw, TestTube2, UserPlus } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { LabStatus } from './LabStatus';
import { LabPageHeader } from './LabPageHeader';
import { InvitationForm } from './InvitationForm';

export function AdminPage({ moduleKey }: { moduleKey: string }) {
  const store = useMockData()
  const [invite, setInvite] = useState(false)
  if (moduleKey === "staff")
    return (
      <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
        <LabPageHeader
          title="Staff & Roles"
          subtitle="Manage Prime Diagnostics memberships and role assignments."
          action={
            <button className="
              inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
              border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
              transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
              hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
            " data-slot="hospital-primary" onClick={() => setInvite(true)}>
              <UserPlus size={16} />
              Create Invitation
            </button>
          }
        />
        <section className="overflow-clip rounded-xl border border-mist-200 bg-white" data-slot="hospital-table-panel">
          <div className="
            sticky top-0 z-2 grid min-h-11 grid-cols-5 items-center gap-2.5 border-b border-b-taupe-100
            bg-slate-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-olive-500 uppercase
            max-md:hidden
          " data-slot="hospital-table-head">
            <span>Staff</span>
            <span>Role</span>
            <span>Department</span>
            <span>Email</span>
            <span>Status</span>
            <span />
          </div>
          {store.state.staff
            .filter((item) => item.role.startsWith("lab-"))
            .map((staff) => (
              <button className="
                grid min-h-15 w-full cursor-pointer grid-cols-5 items-center gap-2.5 border-0 border-t
                border-t-taupe-100 bg-white px-4 py-2.75 text-left text-xs text-olive-600 transition duration-160
                ease-in-out hover:bg-slate-50 focus-visible:relative focus-visible:z-3 focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52 max-md:grid max-md:grid-cols-2 max-md:gap-2 max-md:p-3.5
              " data-slot="hospital-table-row" key={staff.id}>
                <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{staff.name}</span>
                <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{staff.title}</span>
                <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{staff.department}</span>
                <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{staff.email}</span>
                <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">
                  <LabStatus>{staff.status}</LabStatus>
                </span>
                <ChevronRight size={16} className="max-md:col-start-2 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
              </button>
            ))}
        </section>
        {invite && <InvitationForm onClose={() => setInvite(false)} />}
      </div>
    )
  if (moduleKey === "audit" || moduleKey === "history")
    return (
      <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
        <LabPageHeader
          title={moduleKey === "audit" ? "Audit Log" : "Exchange History"}
          subtitle="Recorded laboratory actions and exchange events."
        />
        <section className="overflow-clip rounded-xl border border-mist-200 bg-white" data-slot="hospital-table-panel">
          <div className="
            sticky top-0 z-2 grid min-h-11 grid-cols-5 items-center gap-2.5 border-b border-b-taupe-100
            bg-slate-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-olive-500 uppercase
            max-md:hidden
          " data-slot="hospital-table-head">
            <span>Timestamp</span>
            <span>Actor</span>
            <span>Action</span>
            <span>Resource</span>
            <span>Outcome</span>
            <span />
          </div>
          {store.state.audit
            .filter(
              (item) =>
                item.role.toLowerCase().includes("lab") ||
                item.resource.startsWith("DXR") ||
                item.resource.startsWith("LAB"),
            )
            .map((item) => (
              <button className="
                grid min-h-15 w-full cursor-pointer grid-cols-5 items-center gap-2.5 border-0 border-t
                border-t-taupe-100 bg-white px-4 py-2.75 text-left text-xs text-olive-600 transition duration-160
                ease-in-out hover:bg-slate-50 focus-visible:relative focus-visible:z-3 focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52 max-md:grid max-md:grid-cols-2 max-md:gap-2 max-md:p-3.5
              " data-slot="hospital-table-row" key={item.id}>
                <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{item.at}</span>
                <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{item.actor}</span>
                <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{item.action}</span>
                <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">{item.resource}</span>
                <span className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5">
                  <LabStatus>{item.outcome}</LabStatus>
                </span>
                <ChevronRight size={16} className="max-md:col-start-2 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
              </button>
            ))}
        </section>
      </div>
    )
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
      <LabPageHeader
        title={
          moduleKey === "services"
            ? "Departments & Services"
            : moduleKey === "settings"
              ? "Laboratory Settings"
              : moduleKey === "integrations"
                ? "Integrations"
                : "Operational Reports"
        }
        subtitle="Prime Diagnostics operational configuration."
      />
      <section className="overflow-hidden rounded-xl border border-mist-200 bg-white" data-slot="hospital-panel lab-settings-panel">
        {moduleKey === "integrations" ? (
          <>
            <div className="grid min-h-16 grid-cols-3 items-center gap-2.5 border-b border-b-mist-200 px-4 py-3">
              <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-900">
                <Network size={18} />
              </span>
              <div className="flex flex-col">
                <strong className="text-xs tabular-nums">Facility connector</strong>
                <small className="text-xs text-olive-500">Configuration required</small>
              </div>
              <LabStatus>Pending</LabStatus>
            </div>
            <div className="grid min-h-16 grid-cols-3 items-center gap-2.5 border-b border-b-mist-200 px-4 py-3">
              <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-900">
                <RefreshCw size={18} />
              </span>
              <div className="flex flex-col">
                <strong className="text-xs tabular-nums">FHIR R4 adapter</strong>
                <small className="text-xs text-olive-500">Endpoint not configured</small>
              </div>
              <LabStatus>Inactive</LabStatus>
            </div>
          </>
        ) : (
          <>
            <div className="grid min-h-16 grid-cols-3 items-center gap-2.5 border-b border-b-mist-200 px-4 py-3">
              <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-900">
                <FlaskConical size={18} />
              </span>
              <div className="flex flex-col">
                <strong className="text-xs tabular-nums">Haematology</strong>
                <small className="text-xs text-olive-500">Full Blood Count · Lipid Profile</small>
              </div>
              <LabStatus>Active</LabStatus>
            </div>
            <div className="grid min-h-16 grid-cols-3 items-center gap-2.5 border-b border-b-mist-200 px-4 py-3">
              <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-900">
                <TestTube2 size={18} />
              </span>
              <div className="flex flex-col">
                <strong className="text-xs tabular-nums">Clinical Chemistry</strong>
                <small className="text-xs text-olive-500">Electrolytes · Renal Function</small>
              </div>
              <LabStatus>Active</LabStatus>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
