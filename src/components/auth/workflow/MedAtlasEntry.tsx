'use client';
import { Link } from "@/lib/workflow-router";
import { ArrowRight, Hospital, ShieldCheck, Stethoscope, UserRound } from "lucide-react";
import { AuthShell } from './AuthShell';

export function MedAtlasEntry() {
  return (
    <AuthShell>
      <section className="m-auto max-w-168 rounded-2xl border border-mist-200 bg-white p-12 text-center max-md:p-6" data-slot="auth-welcome">
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-900" data-slot="auth-emblem">
          <ShieldCheck size={27} />
        </span>
        <div>
          <small className="text-xs font-bold tracking-widest text-emerald-700 uppercase">Healthcare information coordination</small>
          <h1 className="my-2 text-4xl leading-tight font-normal tracking-tight text-teal-950 not-italic normal-nums max-md:text-3xl">Welcome to MedAtlas</h1>
          <p className="text-xs leading-relaxed text-olive-600">
            Securely coordinate healthcare information across participating
            providers.
          </p>
        </div>
        <div className="my-6 flex justify-center gap-2.5 max-md:flex-col" data-slot="auth-main-actions">
          <Link to="/signin" className="
            flex min-h-10 items-center gap-1.5 rounded-lg border border-emerald-900 bg-emerald-900 px-3.5
            text-xs font-semibold tracking-normal text-white no-underline transition duration-160 ease-in-out
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            max-md:justify-center
          ">
            Sign In
            <ArrowRight size={17} />
          </Link>
          <Link to="/signup" className="
            flex min-h-10 items-center gap-1.5 rounded-lg border border-emerald-900 bg-white px-3.5 text-xs
            font-semibold tracking-normal text-emerald-900 no-underline transition duration-160 ease-in-out
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            max-md:justify-center
          ">Create Account</Link>
        </div>
        <div className="flex justify-center gap-6 border-t border-t-mist-200 pt-5 max-md:flex-col" data-slot="auth-trust-row">
          <span className="flex items-center gap-1.5 text-xs text-olive-600">
            <Hospital size={17} />
            Healthcare organisations
          </span>
          <span className="flex items-center gap-1.5 text-xs text-olive-600">
            <Stethoscope size={17} />
            Authorised professionals
          </span>
          <span className="flex items-center gap-1.5 text-xs text-olive-600">
            <UserRound size={17} />
            Patients
          </span>
        </div>
      </section>
    </AuthShell>
  )
}
