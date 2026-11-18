"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Clock3, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useIdentityStore } from "../../stores/identity";
import { dashboardPath, roleLabels } from "../../domain/identity";
import { canEnterWorkspace } from "../../services/identity";
import { AuthShell } from "./AuthShell";
import { AuthHeading } from "./AuthHeading";
import { primaryButtonClassName } from "../shared/forms/FormField";

export function AccountOverview({ workspace, role }: { workspace: string; role?: string }) {
  return <AuthShell wide><AccountDetails workspace={workspace} role={role} /></AuthShell>;
}

function AccountDetails({ workspace, role }: { workspace: string; role?: string }) {
  const router = useRouter();
  const sessionId = useIdentityStore((state) => state.sessionAccountId);
  const account = useIdentityStore((state) => state.data.accounts.find((entry) => entry.id === state.sessionAccountId));
  const organisation = useIdentityStore((state) => state.data.organisations.find((entry) => entry.id === account?.organisationId));
  const patient = useIdentityStore((state) => state.data.patients.find((entry) => entry.id === account?.patientId && entry.portalAccountId === account?.id));
  const profileFacility = useIdentityStore((state) => state.data.organisations.find((entry) => entry.id === patient?.organisationId));
  const audit = useIdentityStore((state) => state.data.audit);
  const signOut = useIdentityStore((state) => state.signOut);

  if (!account || !sessionId) return <section className="rounded-2xl border border-slate-200 bg-white p-8"><AuthHeading eyebrow="Account access" title="Sign in to continue" description="Demo accounts are saved in this browser. Sessions end when you refresh; sign in again using the published demo password." /><Link href={workspace === "patient" ? "/login/patient" : "/login/provider"} className={[(primaryButtonClassName), `
    transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
    focus-visible:outline-emerald-700/32
  `].filter(Boolean).join(" ")}>Sign in</Link></section>;
  if (!canEnterWorkspace(account, workspace, role)) return <section className="rounded-2xl border border-amber-200 bg-amber-50 p-8"><AuthHeading eyebrow="Access restricted" title="This account belongs to another workspace" description="Your organisation and assigned role determine which account you can access." /><Link href={dashboardPath(account)} className={[(primaryButtonClassName), `
    transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
    focus-visible:outline-emerald-700/32
  `].filter(Boolean).join(" ")}>Return to your account</Link></section>;
  if (workspace === "patient" && !patient) return <p role="alert" className="rounded-xl bg-red-50 p-6 text-red-800">No activated clinical profile is linked to this account. Contact your facility.</p>;

  const events = audit.filter((event) => event.actorId === account.id).slice(-8).reverse();
  const eventLabels = { "facility-submitted": "Facility registration submitted", "staff-activated": "Staff invitation activated", "portal-activated": "Portal linked to existing patient profile", "signed-in": "Signed in to demo account", "signed-out": "Signed out of demo account" };

  return <>
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <AuthHeading eyebrow={patient ? "Patient Portal" : `${workspace} · ${roleLabels[account.role]}`} title={`Welcome, ${account.firstName}`} description={patient ? "Your portal access is linked to the clinical profile established by your healthcare facility." : "Your MedAtlas demonstration account and organisation membership."} />
      <button type="button" onClick={() => { signOut(); router.replace("/signin"); }} className="
        inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2
        text-sm font-semibold text-emerald-900 transition duration-160 ease-in-out focus-visible:outline-3
        focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
        disabled:opacity-52
      "><LogOut aria-hidden="true" className="size-4" />Sign out</button>
    </div>
    <div className="grid items-start gap-6 md:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <UserRound aria-hidden="true" className="mb-4 size-6 text-emerald-800" />
        <h2 className="mb-5 text-2xl tracking-tight text-emerald-950 not-italic">{patient ? "Linked patient profile" : "Account details"}</h2>
        <dl className="space-y-4 text-sm">{[["Name", `${account.firstName} ${account.lastName}`], ["Email", account.email], ["Role", roleLabels[account.role]], ...(patient ? [["MedAtlas ID", patient.medAtlasId], ["Profile origin", `${profileFacility?.name ?? "Participating facility"} · facility registered`]] : [])].map(([label, value]) => <div key={label}><dt className="text-slate-500">{label}</dt><dd className="mt-1 font-medium break-words text-slate-900">{value}</dd></div>)}</dl>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <Building2 aria-hidden="true" className="mb-4 size-6 text-emerald-800" />
        <h2 className="mb-5 text-2xl tracking-tight text-emerald-950 not-italic">{organisation ? organisation.name : "Your portal access"}</h2>
        {organisation?.status === "pending" ? <><p role="status" className="mb-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm font-semibold text-amber-900"><Clock3 aria-hidden="true" className="size-4" />Pending verification review</p><p className="text-sm leading-relaxed text-slate-600">Registration is saved. It does not grant access to patient information, provider discovery or record exchange. No live verification has taken place.</p></> : <><p className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-800"><ShieldCheck aria-hidden="true" className="size-4" />{patient ? "Portal activated · existing profile" : "Fictional demo membership"}</p><p className="text-sm leading-relaxed text-slate-600">{patient ? "Activation linked this account to your existing profile without creating a second clinical identity. No released records are available in this demo." : "Your role is linked to this fictional facility. This demo currently provides account access only; clinical worklists, diagnostic results and record exchange are not available."}</p></>}
      </section>
    </div>
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="mb-5 text-2xl tracking-tight text-emerald-950 not-italic">Your account activity</h2>
      {events.length ? <ol className="divide-y divide-slate-200">{events.map((event) => <li key={event.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><span className="text-slate-800">{eventLabels[event.action]}</span><time dateTime={event.at} className="text-slate-500">{new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos" }).format(new Date(event.at))}</time></li>)}</ol> : <p className="text-sm text-slate-500">No account activity yet.</p>}
    </section>
  </>;
}
