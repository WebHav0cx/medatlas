"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffActivationSchema } from "../../schemas/auth";
import type { StaffActivationValues } from "../../schemas/auth";
import { STAFF_INVITATION } from "../../data/identity-seed";
import { dashboardPath } from "../../domain/identity";
import { useIdentityStore } from "../../stores/identity";
import { AuthShell } from "./AuthShell";
import { AuthHeading } from "./AuthHeading";
import { DemoCredentials } from "./DemoCredentials";
import { FormError, FormField, fieldAccessibility, inputClassName, primaryButtonClassName } from "../shared/forms/FormField";

export function StaffActivation() {
  return <AuthShell><StaffActivationForm /></AuthShell>;
}

function StaffActivationForm() {
  const router = useRouter();
  const activateStaff = useIdentityStore((state) => state.activateStaff);
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<StaffActivationValues>({ resolver: zodResolver(staffActivationSchema), defaultValues: { firstName: "", lastName: "", email: "", invitationCode: "", password: "" } });
  function onSubmit(values: StaffActivationValues) {
    const result = activateStaff(values);
    if (!result.ok) { setError("root", { message: result.message }); return; }
    const account = useIdentityStore.getState().data.accounts.find((entry) => entry.id === result.accountId);
    if (account) router.push(dashboardPath(account));
  }

  return <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
    <AuthHeading eyebrow="Professional invitation" title="Join your facility's team" description="Your administrator's invitation determines your organisation and role. Activation cannot grant a different role." />
    <details className="mb-6 rounded-lg bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-900"><summary className="cursor-pointer font-semibold">Try a fictional nurse invitation</summary><p className="mt-3 break-all">Email: {STAFF_INVITATION.email}<br />Code: {STAFF_INVITATION.code}</p><p className="mt-2">This sample invitation can be used once per browser.</p></details>
    <DemoCredentials />
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="firstName" label="Fictional first name" error={errors.firstName?.message}><input id="firstName" {...register("firstName")} {...fieldAccessibility("firstName", errors.firstName?.message)} className={[(inputClassName), `
          min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
          ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
          focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
          disabled:opacity-52
        `].filter(Boolean).join(" ")} /></FormField>
        <FormField id="lastName" label="Fictional last name" error={errors.lastName?.message}><input id="lastName" {...register("lastName")} {...fieldAccessibility("lastName", errors.lastName?.message)} className={[(inputClassName), `
          min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
          ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
          focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
          disabled:opacity-52
        `].filter(Boolean).join(" ")} /></FormField>
      </div>
      <FormField id="email" label="Invited email address" error={errors.email?.message}><input id="email" type="email" {...register("email")} {...fieldAccessibility("email", errors.email?.message)} className={[(inputClassName), `
        min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
        ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
        focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
        disabled:opacity-52
      `].filter(Boolean).join(" ")} autoComplete="off" /></FormField>
      <FormField id="invitationCode" label="Staff invitation code" error={errors.invitationCode?.message}><input id="invitationCode" {...register("invitationCode")} {...fieldAccessibility("invitationCode", errors.invitationCode?.message)} className={[(inputClassName), `
        min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
        ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
        focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
        disabled:opacity-52
      `].filter(Boolean).join(" ")} autoComplete="off" /></FormField>
      <FormField id="password" label="Demo password" error={errors.password?.message}><input id="password" type="password" {...register("password")} {...fieldAccessibility("password", errors.password?.message)} className={[(inputClassName), `
        min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
        ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
        focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
        disabled:opacity-52
      `].filter(Boolean).join(" ")} autoComplete="off" /></FormField>
      <FormError message={errors.root?.message} />
      <button type="submit" disabled={isSubmitting} className={[(`
        w-full transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
        focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
      `), primaryButtonClassName].filter(Boolean).join(" ")}>{isSubmitting ? "Activating…" : "Activate staff account"}</button>
    </form>
    <p className="mt-6 text-sm text-slate-600">Already activated? <Link href="/login/provider" className="
      font-semibold text-emerald-900 underline underline-offset-4 transition duration-160 ease-in-out
      focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
    ">Sign in</Link></p>
  </section>;
}
