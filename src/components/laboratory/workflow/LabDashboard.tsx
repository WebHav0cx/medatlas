'use client';
import { Link } from "@/lib/workflow-router";
import { Activity, Building2, ChevronRight, ClipboardCheck, FileCheck2, RefreshCw, TestTube2, Wifi } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { LabStatus } from './LabStatus';
import { LabPageHeader } from './LabPageHeader';
import { type LabRole, labRoleConfig } from './SourceConfig';

export function LabDashboard({ role }: { role: LabRole }) {
  const { state } = useMockData()
  const config = labRoleConfig[role]
  const metrics =
    role === "reception"
      ? [
          [
            state.diagnosticRequests.filter(
              (item) => item.status === "Submitted",
            ).length,
            "New requests",
          ],
          [
            state.specimens.filter(
              (item) => item.status === "Awaiting Collection",
            ).length,
            "Awaiting collection",
          ],
          [
            state.diagnosticRequests.filter(
              (item) => item.status === "Incomplete",
            ).length,
            "Missing information",
          ],
          [
            state.specimens.filter((item) => item.status === "Collected")
              .length,
            "Collected today",
          ],
        ]
      : role === "scientist"
        ? [
            [
              state.diagnosticRequests.filter(
                (item) => item.assignedScientistId === state.currentAccountId,
              ).length,
              "Assigned tests",
            ],
            [
              state.specimens.filter((item) => item.status === "Received")
                .length,
              "Awaiting processing",
            ],
            [
              state.specimens.filter((item) => item.status === "Processing")
                .length,
              "In progress",
            ],
            [
              state.labResults.filter((item) => item.status === "Draft").length,
              "Draft results",
            ],
          ]
        : role === "reviewer"
          ? [
              [
                state.labResults.filter(
                  (item) => item.status === "Submitted for Review",
                ).length,
                "Awaiting review",
              ],
              [
                state.labResults.filter(
                  (item) => item.status === "Correction Required",
                ).length,
                "Corrections",
              ],
              [
                state.labResults.filter((item) => item.status === "Approved")
                  .length,
                "Approved",
              ],
              [
                state.labResults.filter((item) => item.status === "Released")
                  .length,
                "Released",
              ],
            ]
          : [
              [state.diagnosticRequests.length, "Request volume"],
              [
                state.diagnosticRequests.filter((item) =>
                  ["Released", "Completed"].includes(item.status),
                ).length,
                "Completed requests",
              ],
              [
                state.labResults.filter(
                  (item) => item.status === "Submitted for Review",
                ).length,
                "Awaiting review",
              ],
              [
                state.staff.filter(
                  (item) =>
                    item.role.startsWith("lab-") && item.status === "Active",
                ).length,
                "Active staff",
              ],
            ]
  const attention = state.diagnosticRequests.slice(0, 4)
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
      <LabPageHeader
        title={
          role === "reception"
            ? "Reception overview"
            : role === "scientist"
              ? "Laboratory workbench"
              : role === "reviewer"
                ? "Result review"
                : "Laboratory administration"
        }
        subtitle={`Prime Diagnostics · ${config.title}`}
      />
      <div className="mb-3.5 grid grid-cols-4 gap-3 max-md:grid-cols-2" data-slot="hospital-metrics">
        {metrics.map(([value, label], index) => (
          <div key={label} className="
            grid min-h-26 auto-cols-auto grid-flow-col grid-cols-none grid-rows-2 gap-x-2.5 rounded-xl border
            border-mist-200 bg-white p-4 max-md:min-h-28
          ">
            <span className="row-start-1 row-end-3 grid size-9 place-items-center rounded-lg bg-mist-100 text-emerald-900">
              {index === 0 ? (
                <ClipboardCheck size={20} />
              ) : index === 1 ? (
                <TestTube2 size={20} />
              ) : index === 2 ? (
                <FileCheck2 size={20} />
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
          <p className="mt-1 text-xs text-white/70">Common tasks for your account</p>
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-4 gap-2 max-lg:grid-cols-2 max-md:grid-cols-1">
          {config.actions.map(([label, path, Icon]) => (
            <Link key={label} to={`/laboratory/${role}/${path}`} className="
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
              <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">Requires attention</h2>
              <p className="mt-0.5 text-xs text-olive-500">Diagnostic workflows ordered by priority</p>
            </div>
          </div>
          {attention.map((request, index) => (
            <Link
              className="
                flex min-h-16 items-center gap-2 border-b border-b-mist-200 px-4 py-2.5 text-mist-800 no-underline
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 max-md:grid max-md:grid-cols-3
              " data-slot="hospital-attention-row"
              to={`/laboratory/${role}/${
                role === "reviewer" ? "review-queue" : "requests"
              }`}
              key={request.id}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-mist-100 text-xs font-bold text-emerald-900">{index + 1}</span>
              <div className="flex min-w-0 flex-1 flex-col">
                <strong className="text-xs tabular-nums">{request.id}</strong>
                <small className="text-xs text-olive-500">
                  {request.tests.join(", ")} · {request.requestingFacility}
                </small>
              </div>
              <LabStatus className="shrink-0 max-md:col-start-2 max-md:col-end-auto">{request.status}</LabStatus>
              <time className="w-14 shrink-0 text-xs text-olive-500 max-md:hidden">{request.submittedAt}</time>
              <ChevronRight size={15} className="shrink-0 max-md:col-start-3 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
            </Link>
          ))}
        </section>
        <section className="overflow-hidden rounded-xl border border-mist-200 bg-white" data-slot="hospital-panel hospital-service-panel">
          <div className="flex min-h-15 items-center justify-between border-b border-b-taupe-100 px-4 py-3.5" data-slot="hospital-panel-head">
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">Operations</h2>
              <p className="mt-0.5 text-xs text-olive-500">Prime Diagnostics</p>
            </div>
          </div>
          <div className="grid min-h-15 grid-cols-3 items-center gap-2 border-b border-b-mist-200 px-4 py-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-emerald-50 text-emerald-700" data-slot="hospital-health success">
              <Wifi size={16} />
            </span>
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">Laboratory workspace</strong>
              <small className="text-xs text-olive-500">Available</small>
            </div>
            <LabStatus>Active</LabStatus>
          </div>
          <div className="grid min-h-15 grid-cols-3 items-center gap-2 border-b border-b-mist-200 px-4 py-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-amber-50 text-amber-700" data-slot="hospital-health warning">
              <RefreshCw size={16} />
            </span>
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">External integration</strong>
              <small className="text-xs text-olive-500">Not configured</small>
            </div>
            <LabStatus>Pending</LabStatus>
          </div>
          <div className="grid min-h-15 grid-cols-3 items-center gap-2 border-b border-b-mist-200 px-4 py-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-blue-50 text-blue-700" data-slot="hospital-health info">
              <Building2 size={16} />
            </span>
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">Connected facilities</strong>
              <small className="text-xs text-olive-500">{state.organisations.length} configured</small>
            </div>
            <LabStatus>Active</LabStatus>
          </div>
        </section>
      </div>
    </div>
  )
}
