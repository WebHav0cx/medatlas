"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import type { FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { organisationSchema } from "../../schemas/auth";
import type { OrganisationValues } from "../../schemas/auth";
import { useIdentityStore } from "../../stores/identity";
import { dashboardPath } from "../../domain/identity";
import { AuthShell } from "./AuthShell";
import { DemoCredentials } from "./DemoCredentials";
import { FormError, FormField, fieldAccessibility, inputClassName, primaryButtonClassName } from "../shared/forms/FormField";

const facilityFields: FieldPath<OrganisationValues>[] = ["facilityName", "facilityType", "state", "phone", "address"];
const accountFields: FieldPath<OrganisationValues>[] = ["firstName", "lastName", "email", "password"];
const states = ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Abuja FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"];

export function OrganisationSignup() {
  return <AuthShell wide><OrganisationForm /></AuthShell>;
}

function OrganisationForm() {
  const [step, setStep] = useState(1);
  const [complete, setComplete] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const registerOrganisation = useIdentityStore((state) => state.registerOrganisation);
  const { register, handleSubmit, trigger, getValues, setError, formState: { errors, isSubmitting } } = useForm<OrganisationValues>({
    resolver: zodResolver(organisationSchema),
    defaultValues: { facilityName: "", facilityType: "Hospital", state: "", phone: "", address: "", firstName: "", lastName: "", email: "", password: "" },
  });

  function goTo(next: number) { setStep(next); requestAnimationFrame(() => heading.current?.focus()); }
  async function nextStep() { if (await trigger(step === 1 ? facilityFields : accountFields, { shouldFocus: true })) goTo(step + 1); }
  function onSubmit(values: OrganisationValues) {
    const result = registerOrganisation(values);
    if (!result.ok) { setError("root", { message: result.message }); return; }
    const account = useIdentityStore.getState().data.accounts.find((entry) => entry.id === result.accountId);
    if (account) { setComplete(dashboardPath(account)); requestAnimationFrame(() => heading.current?.focus()); }
  }

  if (complete) return <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center">
    <span className="mx-auto mb-6 grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-700"><Check aria-hidden="true" className="size-7" /></span>
    <h1 ref={heading} tabIndex={-1} className="mb-4 text-3xl tracking-tight text-emerald-950 not-italic">Facility registration captured</h1>
    <p role="status" className="mb-8 leading-relaxed text-slate-600">In production, the organization would remain pending until verification is completed.</p>
    <div className="mb-6 rounded-lg bg-slate-50 p-4 text-sm"><strong className="block tabular-nums">Registration status</strong><span>Review the account details before continuing.</span></div>
    <Link href={complete} className={[(primaryButtonClassName), `
      transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
      focus-visible:outline-emerald-700/32
    `].filter(Boolean).join(" ")}>Open Provider Workspace<ArrowRight aria-hidden="true" className="size-4" /></Link>
  </section>;

  return <div className="mx-auto max-w-3xl">
    <ol aria-label="Registration progress" className="mb-8 flex gap-3 sm:gap-6">
      {["Organization", "Administrator", "Review"].map((label, index) => <li key={label} aria-current={step === index + 1 ? "step" : undefined} className={["flex flex-1 flex-col items-center gap-2 text-center text-xs sm:flex-row sm:text-sm", ((step >= index + 1) ? "text-emerald-900" : ""), (!(step >= index + 1) ? "text-slate-500" : "")].filter(Boolean).join(" ")}>
        <span className={["grid size-8 shrink-0 place-items-center rounded-full font-semibold", ((step >= index + 1) ? "bg-emerald-900" : ""), (!(step >= index + 1) ? "bg-slate-200" : ""), ((step >= index + 1) ? "text-white" : "")].filter(Boolean).join(" ")}>{step > index + 1 ? <Check aria-hidden="true" className="size-4" /> : index + 1}</span>{label}
      </li>)}
    </ol>
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <p className="mb-3 text-xs font-semibold tracking-widest text-emerald-700 uppercase">{step === 1 ? "Facility registration" : step === 2 ? "Account details" : "Registration status"}</p>
      <h1 ref={heading} tabIndex={-1} className="mb-4 text-3xl leading-tight tracking-tight text-emerald-950 not-italic">{step === 1 ? "Tell us about your healthcare organization" : step === 2 ? "Create the first administrator account" : "Registration status"}</h1>
      <p className="mb-8 text-sm leading-relaxed text-slate-600">{step === 1 ? "Submission begins a verification review. It does not immediately activate network access." : step === 2 ? "Use accurate details. Contact verification is required before a live account can be activated." : "Review the account details before continuing."}</p>
      <form noValidate onSubmit={(event) => { if (step < 3) { event.preventDefault(); void nextStep(); } else void handleSubmit(onSubmit, (invalid) => { goTo(facilityFields.some((field) => field in invalid) ? 1 : 2); })(event); }} className="space-y-6">
        <fieldset hidden={step !== 1} className="grid gap-5 sm:grid-cols-2">
          <legend className="sr-only">Organization</legend>
          <FormField id="facilityName" label="Facility name" error={errors.facilityName?.message}><input id="facilityName" {...register("facilityName")} {...fieldAccessibility("facilityName", errors.facilityName?.message)} className={[(inputClassName), `
            min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
            ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52
          `].filter(Boolean).join(" ")} placeholder="e.g. CityCare Hospital" /></FormField>
          <FormField id="facilityType" label="Facility type" error={errors.facilityType?.message}><select id="facilityType" {...register("facilityType")} {...fieldAccessibility("facilityType", errors.facilityType?.message)} className={[(inputClassName), `
            h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
            transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52
          `].filter(Boolean).join(" ")}>{["Hospital", "Clinic", "Laboratory", "Diagnostic centre"].map((type) => <option key={type}>{type}</option>)}</select></FormField>
          <FormField id="state" label="State" error={errors.state?.message}><select id="state" {...register("state")} {...fieldAccessibility("state", errors.state?.message)} className={[(inputClassName), `
            h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
            transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52
          `].filter(Boolean).join(" ")}><option value="">State</option>{states.map((state) => <option key={state}>{state}</option>)}</select></FormField>
          <FormField id="phone" label="Work phone" error={errors.phone?.message}><input id="phone" type="tel" {...register("phone")} {...fieldAccessibility("phone", errors.phone?.message)} className={[(inputClassName), `
            min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
            ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52
          `].filter(Boolean).join(" ")} placeholder="+234" /></FormField>
          <div className="sm:col-span-2"><FormField id="address" label="Facility address" error={errors.address?.message}><input id="address" {...register("address")} {...fieldAccessibility("address", errors.address?.message)} className={[(inputClassName), `
            min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
            ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52
          `].filter(Boolean).join(" ")} placeholder="Street and city" /></FormField></div>
        </fieldset>
        <fieldset hidden={step !== 2} className="space-y-5">
          <legend className="sr-only">Administrator account</legend>
          <DemoCredentials />
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="firstName" label="First name" error={errors.firstName?.message}><input id="firstName" {...register("firstName")} {...fieldAccessibility("firstName", errors.firstName?.message)} className={[(inputClassName), `
              min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
              ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52
            `].filter(Boolean).join(" ")} placeholder="First name" /></FormField>
            <FormField id="lastName" label="Last name" error={errors.lastName?.message}><input id="lastName" {...register("lastName")} {...fieldAccessibility("lastName", errors.lastName?.message)} className={[(inputClassName), `
              min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
              ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52
            `].filter(Boolean).join(" ")} placeholder="Last name" /></FormField>
          </div>
          <FormField id="email" label="Email address" error={errors.email?.message}><input id="email" type="email" autoComplete="off" {...register("email")} {...fieldAccessibility("email", errors.email?.message)} className={[(inputClassName), `
            min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
            ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52
          `].filter(Boolean).join(" ")} placeholder="name@example.com" /></FormField>
          <FormField id="password" label="Password" error={errors.password?.message}><input id="password" type="password" autoComplete="off" {...register("password")} {...fieldAccessibility("password", errors.password?.message)} className={[(inputClassName), `
            min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
            ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52
          `].filter(Boolean).join(" ")} placeholder="At least 8 characters" /></FormField>
        </fieldset>
        {step === 3 && <div>
          <dl className="divide-y rounded-xl border border-slate-200 px-4">
            {[["Facility name", getValues("facilityName")], ["Facility type", getValues("facilityType")], ["State", getValues("state")], ["Work phone", getValues("phone")], ["Facility address", getValues("address")], ["Administrator", `${getValues("firstName")} ${getValues("lastName")}`], ["Email address", getValues("email")]].map(([label, value]) => <div key={label} className="grid gap-1 py-3 text-sm sm:grid-cols-2"><dt className="text-slate-500">{label}</dt><dd className="font-medium break-words text-slate-800">{value}</dd></div>)}
          </dl>
        </div>}
        <FormError message={errors.root?.message} />
        <div className="flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-6">
          {step > 1 ? <button type="button" onClick={() => goTo(step - 1)} className="
            min-h-11 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-emerald-900
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          ">Back</button> : <Link href="/signup" className="
            p-3 text-sm font-semibold text-emerald-900 underline underline-offset-4 transition duration-160
            ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32
          ">Get Started</Link>}
          <button type="submit" disabled={isSubmitting} className={[(primaryButtonClassName), `
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          `].filter(Boolean).join(" ")}>{isSubmitting ? "Saving…" : "Continue"}<ArrowRight aria-hidden="true" className="size-4" /></button>
        </div>
      </form>
    </section>
    <p className="mt-6 text-center text-sm text-slate-600">Already have access? <Link href="/login/provider" className="
      font-semibold text-emerald-900 underline underline-offset-4 transition duration-160 ease-in-out
      focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
    ">Professional sign in</Link></p>
  </div>;
}
