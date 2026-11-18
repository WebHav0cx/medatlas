'use client';
import { Link } from "@/lib/workflow-router";
import { Activity, ChevronRight, ClipboardCheck, FileCheck2, Network, ShieldCheck, Users, Wifi } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { Status } from './Status';
import { PageHeader } from './PageHeader';
import { type ProviderRole, roleConfig, dashboardData } from './SourceConfig';

export function RoleDashboard({ role }: { role: ProviderRole }) {
  const config = roleConfig[role]
  const navItems = config.groups.flatMap((group) => group.items)
  const data = dashboardData[role]
  const { state } = useMockData()
  const metrics =
    role === "doctor"
      ? [
          [
            String(
              state.patients.filter((patient) =>
                patient.assignedStaff.includes(state.currentAccountId),
              ).length,
            ),
            "Authorised patients",
          ],
          [
            String(
              state.documents.filter(
                (document) => document.access === "Approved",
              ).length,
            ),
            "Authorised records",
          ],
          [
            String(
              state.referrals.filter(
                (referral) =>
                  !["Completed", "Cancelled"].includes(referral.status),
              ).length,
            ),
            "Referral follow-ups",
          ],
          [
            String(
              state.requests.filter((request) =>
                ["Submitted", "Under Review", "Approved"].includes(
                  request.status,
                ),
              ).length,
            ),
            "Incoming updates",
          ],
        ]
      : role === "nurse"
        ? [
            [
              String(
                state.patients.filter((patient) =>
                  patient.assignedStaff.includes(state.currentAccountId),
                ).length,
              ),
              "Assigned patients",
            ],
            [
              String(
                state.tasks.filter(
                  (task) =>
                    task.assignedTo === state.currentAccountId &&
                    task.status !== "Completed",
                ).length,
              ),
              "Open tasks",
            ],
            [
              String(
                state.tasks.filter(
                  (task) =>
                    task.priority === "High" && task.status !== "Completed",
                ).length,
              ),
              "Priority updates",
            ],
            [
              String(
                state.tasks.filter((task) => task.status === "Escalated")
                  .length,
              ),
              "Escalated",
            ],
          ]
        : role === "records"
          ? [
              [
                String(
                  state.requests.filter(
                    (request) =>
                      request.sourceFacility === state.facility.name &&
                      request.status !== "Fulfilled",
                  ).length,
                ),
                "Incoming requests",
              ],
              [
                String(
                  state.requests.filter(
                    (request) => request.requester === state.facility.name,
                  ).length,
                ),
                "Outgoing requests",
              ],
              [
                String(
                  state.identityCases.filter(
                    (item) =>
                      !["Resolved as Distinct", "Merge Approved"].includes(
                        item.status,
                      ),
                  ).length,
                ),
                "Identity reviews",
              ],
              [String(state.documents.length), "Documents"],
            ]
          : [
              [
                String(
                  state.staff.filter((staff) => staff.status === "Active")
                    .length,
                ),
                "Active staff",
              ],
              ["3", "Connected providers"],
              [
                String(
                  state.requests.filter(
                    (request) => request.status === "Declined",
                  ).length,
                ),
                "Request alerts",
              ],
              [String(state.audit.length), "Recorded events"],
            ]
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
      <PageHeader
        eyebrow={config.title}
        title={data.greeting}
        subtitle={data.subtitle}
      />
      <div className="mb-3.5 grid grid-cols-4 gap-3 max-md:grid-cols-2" data-slot="hospital-metrics">
        {metrics.map(([value, label], index) => (
          <div key={label} className="
            grid min-h-26 auto-cols-auto grid-flow-col grid-cols-none grid-rows-2 gap-x-2.5 rounded-xl border
            border-mist-200 bg-white p-4 max-md:min-h-28
          ">
            <span className="row-start-1 row-end-3 grid size-9 place-items-center rounded-lg bg-mist-100 text-emerald-900">
              {index === 0 ? (
                <Users size={20} />
              ) : index === 1 ? (
                <FileCheck2 size={20} />
              ) : index === 2 ? (
                <ClipboardCheck size={20} />
              ) : (
                <Activity size={20} />
              )}
            </span>
            <strong className="text-2xl font-bold tracking-tight text-mist-800 tabular-nums">{value}</strong>
            <small className="text-xs text-olive-600">{label}</small>
          </div>
        ))}
      </div>
      <section className="
        mb-3 flex items-center gap-4 rounded-xl border border-mist-500 bg-teal-950 px-4 py-3.5 text-white
        max-lg:flex-col max-lg:items-stretch
      " data-slot="hospital-quick-actions">
        <div className="w-44 shrink-0 max-lg:w-full">
          <h2 className="text-sm font-semibold tracking-normal text-white not-italic">Quick actions</h2>
          <p className="mt-1 text-xs text-white/70">Actions available to your account</p>
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-4 gap-2 max-lg:grid-cols-2 max-md:grid-cols-1">
          {config.actions.map(([label, path, Icon]) => (
            <Link key={label} to={`/provider/${role}/${path}`} className="
              flex min-h-13 items-center gap-1.5 rounded-lg border border-white/12 bg-white/7 p-2 text-xs
              font-bold text-white no-underline transition duration-160 ease-in-out hover:-translate-y-px
              hover:border-white/25 hover:bg-white/13 focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32
            ">
              <Icon size={18} />
              <span>{label}</span>
              <ChevronRight size={15} />
            </Link>
          ))}
        </div>
      </section>
      <div className="mb-3 grid grid-cols-2 gap-3 max-lg:grid-cols-1" data-slot="hospital-dashboard-grid">
        <section className="overflow-hidden rounded-xl border border-mist-200 bg-white" data-slot="hospital-panel">
          <div className="flex min-h-15 items-center justify-between border-b border-b-taupe-100 px-4 py-3.5" data-slot="hospital-panel-head">
            <div>
              <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">
                {role === "nurse"
                  ? "Shift priorities"
                  : role === "admin"
                    ? "Operational alerts"
                    : "Needs your attention"}
              </h2>
              <p className="mt-0.5 text-xs text-olive-500">Ordered by priority and time</p>
            </div>
          </div>
          {data.attention.map(([name, task, state, time], index) => (
            <Link
              to={`/provider/${role}/${navItems[Math.min(index + 1, navItems.length - 1)].path}`}
              className="
                flex min-h-16 items-center gap-2 border-b border-b-mist-200 px-4 py-2.5 text-mist-800 no-underline
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 max-md:grid max-md:grid-cols-3
              " data-slot="hospital-attention-row"
              key={name}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-mist-100 text-xs font-bold text-emerald-900">{index + 1}</span>
              <div className="flex min-w-0 flex-1 flex-col">
                <strong className="text-xs tabular-nums">{name}</strong>
                <small className="text-xs text-olive-500">{task}</small>
              </div>
              <Status
                className="shrink-0 max-md:col-start-2 max-md:col-end-auto"
                label={state}
                tone={
                  state.includes("Approved") || state.includes("Authorised")
                    ? "success"
                    : state.includes("Escalated") || state.includes("Action")
                      ? "error"
                      : "pending"
                }
              />
              <time className="w-14 shrink-0 text-xs text-olive-500 max-md:hidden">{time}</time>
              <ChevronRight size={15} className="shrink-0 max-md:col-start-3 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
            </Link>
          ))}
        </section>
        <section className="overflow-hidden rounded-xl border border-mist-200 bg-white" data-slot="hospital-panel hospital-service-panel">
          <div className="flex min-h-15 items-center justify-between border-b border-b-taupe-100 px-4 py-3.5" data-slot="hospital-panel-head">
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">Workspace status</h2>
              <p className="mt-0.5 text-xs text-olive-500">Availability and boundaries</p>
            </div>
          </div>
          <div className="grid min-h-15 grid-cols-3 items-center gap-2 border-b border-b-mist-200 px-4 py-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-emerald-50 text-emerald-700" data-slot="hospital-health success">
              <Wifi size={16} />
            </span>
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">Application workspace</strong>
              <small className="text-xs text-olive-500">Available</small>
            </div>
            <Status label="Ready" tone="success" />
          </div>
          <div className="grid min-h-15 grid-cols-3 items-center gap-2 border-b border-b-mist-200 px-4 py-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-amber-50 text-amber-700" data-slot="hospital-health warning">
              <Network size={16} />
            </span>
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">FHIR integration</strong>
              <small className="text-xs text-olive-500">Configuration unavailable</small>
            </div>
            <Status label="Not active" tone="pending" />
          </div>
          <div className="grid min-h-15 grid-cols-3 items-center gap-2 border-b border-b-mist-200 px-4 py-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-blue-50 text-blue-700" data-slot="hospital-health info">
              <ShieldCheck size={16} />
            </span>
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">Role permissions</strong>
              <small className="text-xs text-olive-500">{config.title}</small>
            </div>
            <Status label="Scoped" tone="info" />
          </div>
        </section>
      </div>
      <section className="overflow-hidden rounded-xl border border-mist-200 bg-white" data-slot="hospital-panel hospital-activity">
        <div className="flex min-h-15 items-center justify-between border-b border-b-taupe-100 px-4 py-3.5" data-slot="hospital-panel-head">
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">Recent activity</h2>
            <p className="mt-0.5 text-xs text-olive-500">Recent coordination events</p>
          </div>
        </div>
        {[
          [
            "Patient relationship verified",
            "Aremu Adewale · CityCare Hospital",
            "18 min ago",
          ],
          [
            "Record provenance reviewed",
            "Mercy Specialist Hospital · Discharge Summary",
            "42 min ago",
          ],
          ["Request status updated", "REQ-008472 · Under Review", "2 hrs ago"],
        ].map(([title, detail, time]) => (
          <div key={title} className="grid min-h-12 grid-cols-3 items-center gap-2 border-b border-b-mist-200 px-4 py-2.5 max-md:grid-cols-2">
            <span className="grid size-7 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <Activity size={15} />
            </span>
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">{title}</strong>
              <small className="text-xs text-olive-500">{detail}</small>
            </div>
            <time className="text-xs text-olive-500 max-md:col-start-2 max-md:col-end-auto">{time}</time>
          </div>
        ))}
      </section>
    </div>
  )
}
