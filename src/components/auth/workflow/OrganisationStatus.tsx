'use client';
import { Link, useNavigate, useSearchParams } from "@/lib/workflow-router";
import { Building2 } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { AuthShell } from './AuthShell';
import { AlertIcon } from './AlertIcon';
import { ClockIcon } from './ClockIcon';

export function OrganisationStatus() {
  const store = useMockData()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const application = store.state.organisationApplications.find(
    (item) => item.id === id,
  )
  if (!application)
    return (
      <AuthShell>
        <div className="m-auto max-w-120 rounded-xl border border-mist-200 bg-white p-8 text-center" data-slot="auth-status">
          <AlertIcon />
          <h1 className="my-2 text-4xl leading-tight font-normal tracking-tight text-teal-950 not-italic normal-nums">Application not found</h1>
          <Link to="/signup/organization" className="
            inline-flex min-h-10 items-center rounded-lg bg-emerald-900 px-3 text-xs font-bold text-white
            no-underline transition duration-160 ease-in-out focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
          ">Start registration</Link>
        </div>
      </AuthShell>
    )
  const approve = () => store.approveOrganisationApplication(application.id)
  const updated =
    store.state.organisationApplications.find((item) => item.id === id) ||
    application
  return (
    <AuthShell>
      <div className="m-auto max-w-120 rounded-xl border border-mist-200 bg-white p-8 text-center" data-slot="auth-status">
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-900" data-slot="auth-emblem">
          <Building2 size={27} />
        </span>
        <small>Organisation application</small>
        <h1 className="my-2 text-4xl leading-tight font-normal tracking-tight text-teal-950 not-italic normal-nums">{updated.displayName}</h1>
        <div
          className={["mx-auto my-4 flex w-max items-center gap-1.5 rounded-full px-2 py-1.5 text-xs font-bold", (!(updated.status === "Approved") ? "bg-amber-50 text-amber-700" : ""), ((updated.status === "Approved") ? "bg-emerald-50 text-emerald-700" : "")].filter(Boolean).join(" ")} data-slot={`application-status ${(updated.status === "Approved" ? "approved" : "")}`}
        >
          <ClockIcon />
          {updated.status}
        </div>
        <p className="text-xs leading-relaxed text-olive-600">
          {updated.status === "Approved"
            ? "The organisation workspace is active."
            : "The application is ready for internal review."}
        </p>
        <dl className="my-4 text-left">
          <div className="flex justify-between border-b border-b-mist-200 py-2 text-xs">
            <dt className="text-olive-500">Organisation type</dt>
            <dd className="font-bold">{updated.type}</dd>
          </div>
          <div className="flex justify-between border-b border-b-mist-200 py-2 text-xs">
            <dt className="text-olive-500">Administrator</dt>
            <dd className="font-bold">{updated.administratorName}</dd>
          </div>
          <div className="flex justify-between border-b border-b-mist-200 py-2 text-xs">
            <dt className="text-olive-500">Location</dt>
            <dd className="font-bold">
              {updated.lga}, {updated.state}
            </dd>
          </div>
        </dl>
        {updated.status === "Pending Review" ? (
          <button onClick={approve} className="
            inline-flex min-h-10 items-center rounded-lg bg-emerald-900 px-3 text-xs font-bold text-white
            no-underline transition duration-160 ease-in-out focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52
          ">Approve Test Application</button>
        ) : (
          <button
            onClick={() =>
              navigate(
                updated.type === "Laboratory / Diagnostic Centre"
                  ? "/laboratory/admin/dashboard"
                  : "/provider/admin/dashboard",
              )
            } className="
              inline-flex min-h-10 items-center rounded-lg bg-emerald-900 px-3 text-xs font-bold text-white
              no-underline transition duration-160 ease-in-out focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52
            "
          >
            Open Organisation Workspace
          </button>
        )}
      </div>
    </AuthShell>
  )
}
