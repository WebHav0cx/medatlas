"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { signInSchema } from "../../schemas/auth";
import { DEMO_PASSWORD } from "../../data/identity-seed";
import type { SignInValues } from "../../schemas/auth";
import { useIdentityStore } from "../../stores/identity";
import { dashboardPath, roleLabels } from "../../domain/identity";
import { FormError, FormField, fieldAccessibility, inputClassName, primaryButtonClassName } from "../shared/forms/FormField";
import { AuthShell } from "./AuthShell";
import { AuthHeading } from "./AuthHeading";
import { DemoCredentials } from "./DemoCredentials";

export function SignInPage({ audience }: { audience: "patient" | "provider" }) {
  return <AuthShell><SignInForm audience={audience} /></AuthShell>;
}

function SignInForm({ audience }: { audience: "patient" | "provider" }) {
  const router = useRouter();
  const signIn = useIdentityStore((state) => state.signIn);
  const accounts = useIdentityStore((state) => state.data.accounts);
  const { register, handleSubmit, setError, setValue, clearErrors, formState: { errors, isSubmitting } } = useForm<SignInValues>({ resolver: zodResolver(signInSchema), defaultValues: { email: "", password: "" } });

  const onSubmit = (values: SignInValues) => {
    const result = signIn(values, audience);
    if (!result.ok) { setError("root", { message: result.message }); return; }
    const account = useIdentityStore.getState().data.accounts.find((entry) => entry.id === result.accountId);
    if (account) router.push(dashboardPath(account));
  };

  return <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
    <AuthHeading eyebrow={`${audience} access`} title="Welcome back" description={`Sign in to your MedAtlas ${audience} workspace.`} />
    <DemoCredentials />
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <details><summary className="cursor-pointer text-sm text-emerald-900">Account details</summary>
      <FormField id="sample-account" label="Email or account ID">
        <select id="sample-account" defaultValue="" className={[(inputClassName), `
          h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
          transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
          focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
          disabled:cursor-not-allowed disabled:opacity-52
        `].filter(Boolean).join(" ")} onChange={(event) => { if (event.target.value) { setValue("email", event.target.value); setValue("password", DEMO_PASSWORD); clearErrors(); } }}>
          <option value="">Email or account ID</option>
          {accounts.filter((account) => (account.workspace === "patient") === (audience === "patient")).map((account) => <option key={account.id} value={account.email}>{account.workspace} · {roleLabels[account.role]} · {account.email}</option>)}
        </select>
      </FormField>
      </details>
      <FormField id="email" label="Email or account ID" error={errors.email?.message}>
        <input id="email" type="email" autoComplete="username" {...register("email")} {...fieldAccessibility("email", errors.email?.message)} className={[(inputClassName), `
          min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
          ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
          focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
          disabled:opacity-52
        `].filter(Boolean).join(" ")} placeholder="name@example.com" />
      </FormField>
      <FormField id="password" label="Password" error={errors.password?.message}>
        <input id="password" type="password" autoComplete="off" {...register("password")} {...fieldAccessibility("password", errors.password?.message)} className={[(inputClassName), `
          min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
          ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
          focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
          disabled:opacity-52
        `].filter(Boolean).join(" ")} placeholder="Your password" />
      </FormField>
      <FormError message={errors.root?.message} />
      <button type="submit" disabled={isSubmitting} className={[(`
        w-full transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
        focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
      `), primaryButtonClassName].filter(Boolean).join(" ")}>{isSubmitting ? "Signing in…" : "Sign In"}<ArrowRight aria-hidden="true" className="size-4" /></button>
    </form>
    <details className="mt-6 text-sm leading-relaxed text-slate-600"><summary className="cursor-pointer text-emerald-900">Forgot your password?</summary><DemoCredentials /></details>
  </section>;
}
