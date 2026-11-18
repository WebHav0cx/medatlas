'use client';
import { Link } from "@/lib/workflow-router";
import { AlertCircle, Check, ChevronRight, ClipboardCheck, FileCheck2, FileText, Network, RefreshCw, Search, ShieldCheck, UserPlus, UserRound, Wifi } from "lucide-react";
import { Page } from './Page';
import { Clock3Icon } from './Clock3Icon';

export function ProviderDashboardPage() {
  return (
    <Page
      title="Good morning, Dr. Okafor"
      subtitle="CityCare Hospital · Clinician · Thursday, 23 October 2026"
      action={
        <Link
          className="
            inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
            border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
            no-underline transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
            hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 max-md:w-full
          " data-slot="provider-primary-action"
          to="/provider/patients/search"
        >
          <Search size={16} /> Find Patient
        </Link>
      }
    >
      <div className="mb-3 flex justify-between gap-4 max-md:flex-col max-md:gap-1.5" data-slot="dashboard-context">
        <span className="flex items-center gap-1.5 text-xs text-emerald-700">
          <ShieldCheck size={15} />
          Authorized facility session
        </span>
        <span className="flex items-center gap-1.5 text-xs text-olive-600">
          <Wifi size={15} />
          Application available · synchronization pending
        </span>
      </div>
      <div className="mb-3.5 grid grid-cols-4 gap-3 max-md:grid-cols-2" data-slot="provider-metrics">
        {[
          [ClipboardCheck, "4", "Incoming requests", "/provider/requests"],
          [AlertCircle, "3", "Awaiting response", "/provider/authorizations"],
          [FileCheck2, "7", "Records received", "/provider/records/received"],
          [Network, "12", "Successful exchanges", "/provider/reports"],
        ].map(([Icon, value, label, to]) => (
          <Link to={to as string} key={label as string} className="
            grid min-h-26 auto-cols-auto grid-flow-col grid-cols-none grid-rows-2 gap-x-2.5 rounded-xl border
            border-mist-200 bg-white p-4 text-mist-800 no-underline transition duration-160 ease-in-out
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            max-md:min-h-28
          ">
            <span className="row-start-1 row-end-3 grid size-9 place-items-center rounded-lg bg-mist-100 text-emerald-900">
              <Icon size={20} />
            </span>
            <strong className="text-2xl font-bold tracking-tight text-mist-800 tabular-nums">{value as string}</strong>
            <small className="text-xs text-olive-600">{label as string}</small>
            <ChevronRight size={15} className="row-start-1 row-end-3 self-center text-olive-500" />
          </Link>
        ))}
      </div>
      <section className="
        mb-3 flex items-center gap-4 rounded-xl border border-mist-500 bg-teal-950 px-4 py-3.5 text-white
        max-md:flex-col max-md:items-stretch
      " data-slot="quick-actions-panel">
        <div className="w-44 shrink-0 max-md:w-full">
          <h2 className="text-sm font-semibold tracking-normal text-white not-italic">Quick actions</h2>
          <p className="mt-1 text-xs text-white/70">Common tasks for your current role</p>
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-4 gap-2 max-md:grid-cols-2">
          {[
            [Search, "Find Patient", "/provider/patients/search"],
            [UserPlus, "Register Patient", "/provider/patients/new"],
            [FileText, "New Record Request", "/provider/requests"],
            [ClipboardCheck, "Review Incoming", "/provider/authorizations"],
          ].map(([Icon, label, to]) => (
            <Link to={to as string} key={label as string} className="
              flex min-h-13 items-center gap-1.5 rounded-lg border border-white/12 bg-white/7 p-2.5 text-xs
              font-bold text-white no-underline transition duration-160 ease-in-out hover:-translate-y-px
              hover:border-white/25 hover:bg-white/13 focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32
            ">
              <Icon size={19} />
              <span>{label as string}</span>
              <ChevronRight size={15} />
            </Link>
          ))}
        </div>
      </section>
      <div className="mb-3 grid grid-cols-2 gap-3 max-md:grid-cols-1" data-slot="dashboard-work-grid">
        <section className="rounded-xl border border-mist-200 bg-white" data-slot="workspace-card attention-list">
          <div className="flex min-h-15 items-center justify-between border-b border-b-taupe-100 px-4 py-3.5" data-slot="workspace-card-head">
            <div>
              <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">Requests needing attention</h2>
              <p className="mt-1 text-xs text-olive-500">Prioritized by status and time waiting</p>
            </div>
            <Link to="/provider/requests" className="
              text-xs font-bold text-emerald-900 no-underline transition duration-160 ease-in-out
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            ">View all</Link>
          </div>
          {[
            [
              "Aremu Adewale",
              "Discharge Summary",
              "Mercy Specialist Hospital",
              "Under Review",
              "24 min",
            ],
            [
              "Bola James",
              "Laboratory Report",
              "Prime Diagnostics",
              "Records Received",
              "18 min",
            ],
            [
              "Kemi Bello",
              "Consultation Summary",
              "Lagoon Clinic",
              "Awaiting Response",
              "2 hrs",
            ],
          ].map(([patient, record, facility, status, time]) => (
            <Link
              to={
                status === "Records Received"
                  ? "/provider/records/received"
                  : "/provider/requests"
              }
              key={patient} className="
                grid min-h-16 grid-cols-5 items-center gap-2.5 border-b border-b-mist-200 px-4 py-3 text-mist-800
                no-underline transition duration-160 ease-in-out last:border-b-0 focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 max-md:grid-cols-3
              "
            >
              <span className="grid size-8 place-items-center rounded-full bg-emerald-900 text-xs font-bold text-white" data-slot="match-avatar">
                {patient
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </span>
              <div className="flex flex-col">
                <strong className="text-xs tabular-nums">{patient}</strong>
                <small className="text-xs text-olive-500">
                  {record} · {facility}
                </small>
              </div>
              <i className="
                flex min-h-6.5 w-max items-center gap-1.25 rounded-md border border-emerald-700/18 bg-emerald-50
                px-2 py-0.75 text-xs leading-none font-semibold text-emerald-700 not-italic max-md:col-start-2
                max-md:col-end-auto
              " data-slot="table-status">
                <Clock3Icon />
                {status}
              </i>
              <time className="text-xs text-olive-500 max-md:hidden">{time}</time>
              <ChevronRight size={16} className="max-md:col-start-3 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
            </Link>
          ))}
        </section>
        <section className="rounded-xl border border-mist-200 bg-white" data-slot="workspace-card operational-status">
          <div className="flex min-h-15 items-center justify-between border-b border-b-taupe-100 px-4 py-3.5" data-slot="workspace-card-head">
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">Network status</h2>
              <p className="mt-1 text-xs text-olive-500">Connectivity and synchronization</p>
            </div>
          </div>
          <div className="grid min-h-14 grid-cols-3 items-center gap-2.5 border-b border-b-mist-200 px-4 py-3">
            <span className="grid size-8 place-items-center rounded-full bg-emerald-50 text-emerald-700" data-slot="status-orb success">
              <Wifi size={16} />
            </span>
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">Local application</strong>
              <small className="text-xs text-olive-500">Online</small>
            </div>
            <i className="text-xs font-bold text-emerald-700 not-italic">Operational</i>
          </div>
          <div className="grid min-h-14 grid-cols-3 items-center gap-2.5 border-b border-b-mist-200 px-4 py-3">
            <span className="grid size-8 place-items-center rounded-full bg-amber-50 text-amber-700" data-slot="status-orb warning">
              <RefreshCw size={16} />
            </span>
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">Backend synchronization</strong>
              <small className="text-xs text-olive-500">Not configured</small>
            </div>
            <i className="text-xs font-bold text-emerald-700 not-italic">Unavailable</i>
          </div>
          <div className="grid min-h-14 grid-cols-3 items-center gap-2.5 border-b-0 border-b-mist-200 px-4 py-3">
            <span className="grid size-8 place-items-center rounded-full bg-red-50 text-red-700" data-slot="status-orb error">
              <AlertCircle size={16} />
            </span>
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">Delayed exchanges</strong>
              <small className="text-xs text-olive-500">2 delayed operations</small>
            </div>
            <Link to="/provider/exchange-monitoring" className="
              text-xs font-bold text-emerald-700 not-italic transition duration-160 ease-in-out
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            ">Investigate</Link>
          </div>
        </section>
      </div>
      <section className="rounded-xl border border-mist-200 bg-white" data-slot="workspace-card recent-activity-expanded">
        <div className="flex min-h-15 items-center justify-between border-b border-b-taupe-100 px-4 py-3.5" data-slot="workspace-card-head">
          <div>
            <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">Recent activity</h2>
            <p className="text-xs text-olive-500">Events visible to your role</p>
          </div>
          <Link to="/provider/audit" className="
            text-xs font-bold text-emerald-900 no-underline transition duration-160 ease-in-out
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
          ">Open audit log</Link>
        </div>
        {[
          [
            "Mercy Specialist Hospital approved Aremu Adewale's request.",
            "18 minutes ago",
            Check,
          ],
          [
            "Prime Diagnostics made a laboratory report available.",
            "42 minutes ago",
            FileText,
          ],
          [
            "Registration desk linked a local identifier after verification.",
            "2 hours ago",
            UserRound,
          ],
        ].map(([text, time, Icon]) => (
          <div key={text as string} className="grid min-h-14 grid-cols-3 items-center gap-2.5 border-b border-b-mist-200 px-4 py-3">
            <span className="grid size-7 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <Icon size={15} />
            </span>
            <p className="text-xs">{text as string}</p>
            <small className="text-xs text-olive-500">{time as string}</small>
          </div>
        ))}
      </section>
    </Page>
  )
}
