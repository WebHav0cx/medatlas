'use client';
import { useState } from "react";
import { Link } from "@/lib/workflow-router";
import { AlertCircle, Check, ChevronRight, ShieldCheck } from "lucide-react";
import { Page } from './Page';
import { FormSection } from './FormSection';

export function NewPatient() {
  const [review, setReview] = useState(false)
  return (
    <Page
      title="Register Patient"
      subtitle="Search for an existing identity before creating a new patient."
      action={
        <Link
          className="
            inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
            border-mist-300 bg-white px-3.5 text-xs font-bold text-emerald-900 no-underline transition
            duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 max-md:w-full
          " data-slot="provider-secondary-action"
          to="/provider/patients/search"
        >
          Cancel
        </Link>
      }
    >
      {!review ? (
        <div className="grid grid-cols-2 items-start gap-4 max-md:grid-cols-1" data-slot="registration-layout">
          <section className="rounded-xl border border-mist-200 bg-white p-5" data-slot="workspace-card registration-form">
            <FormSection
              title="Personal information"
              fields={[
                "First Name *",
                "Middle Name",
                "Last Name *",
                "Date of Birth *",
                "Sex *",
                "Phone Number",
                "Email Address",
              ]}
            />
            <FormSection
              title="Identity information"
              fields={["Local Hospital ID *", "Existing MedAtlas ID"]}
            />
            <div className="my-5 grid grid-cols-2 gap-4 rounded-lg bg-mist-100 p-3 max-md:grid-cols-1" data-slot="registration-context">
              <div className="flex flex-col">
                <span className="text-xs text-olive-500">Registering facility</span>
                <strong className="text-xs tabular-nums">CityCare Hospital</strong>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-olive-500">Registration officer</span>
                <strong className="text-xs tabular-nums">Dr. T. Okafor</strong>
              </div>
            </div>
            <button
              className="
                ml-auto inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                no-underline transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              " data-slot="provider-primary-action"
              onClick={() => setReview(true)}
            >
              Review Possible Matches
              <ChevronRight size={16} />
            </button>
          </section>
          <aside className="rounded-xl border border-mist-200 bg-white p-5 max-md:row-start-1 max-md:row-end-auto" data-slot="workspace-card registration-guidance">
            <ShieldCheck size={22} className="text-emerald-700" />
            <h3 className="text-sm tracking-tight not-italic">Identity safety check</h3>
            <p className="text-xs leading-normal text-olive-600">
              Before a new identity can be created, MedAtlas checks for possible
              existing matches.
            </p>
            <ul className="grid list-none gap-2.5">
              <li className="flex items-center gap-1.5 text-xs text-olive-600">
                <Check size={14} className="text-emerald-700" />
                Required fields validated
              </li>
              <li className="flex items-center gap-1.5 text-xs text-olive-600">
                <Check size={14} className="text-emerald-700" />
                Possible identities compared
              </li>
              <li className="flex items-center gap-1.5 text-xs text-olive-600">
                <Check size={14} className="text-emerald-700" />
                Explicit confirmation required
              </li>
              <li className="flex items-center gap-1.5 text-xs text-olive-600">
                <Check size={14} className="text-emerald-700" />
                Registration audit event recorded
              </li>
            </ul>
          </aside>
        </div>
      ) : (
        <section className="mx-auto max-w-160 rounded-xl border border-mist-200 bg-white p-8 text-center max-md:p-4" data-slot="workspace-card duplicate-review">
          <span>
            <AlertCircle size={23} />
          </span>
          <h2 className="text-2xl leading-normal font-normal tracking-tight not-italic normal-nums">Review possible existing identity</h2>
          <p className="text-xs text-olive-600">
            A possible match was found. No new MedAtlas ID has been generated.
          </p>
          <article className="my-5 grid grid-cols-3 items-center gap-3 rounded-lg border border-mist-200 p-4 text-left max-md:grid-cols-2">
            <span className="grid size-12 place-items-center rounded-full bg-emerald-900 text-xs font-bold text-white" data-slot="match-avatar">AA</span>
            <div>
              <h3 className="text-xs tracking-tight not-italic">Aremu Adewale</h3>
              <strong className="text-xs text-emerald-900 tabular-nums">MA-002841</strong>
              <p className="my-1 text-xs text-olive-600">DOB 14 May 1986 · Male · Phone ending 4821</p>
            </div>
            <span className="flex flex-col max-md:col-start-2 max-md:col-end-auto" data-slot="confidence">
              <small className="text-xs text-olive-500">Confidence</small>
              <strong className="text-xs text-emerald-700 tabular-nums">High</strong>
            </span>
          </article>
          <div className="flex justify-center gap-2 max-md:flex-col">
            <button onClick={() => setReview(false)} className="
              flex min-h-10 items-center rounded-md border border-mist-200 bg-white px-3 text-xs font-bold
              text-emerald-900 no-underline transition duration-160 ease-in-out focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52
            ">Return to Form</button>
            <Link to="/provider/patients/MA-002841" className="
              flex min-h-10 items-center rounded-md border border-mist-200 bg-emerald-900 px-3 text-xs font-bold
              text-white no-underline transition duration-160 ease-in-out focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            ">
              Select Existing Patient
            </Link>
          </div>
          <small className="text-xs text-olive-600">
            Creating a new identity requires the production identity service and
            requires an authorised identity service.
          </small>
        </section>
      )}
    </Page>
  )
}
