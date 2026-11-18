'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { workflowSignInSchema } from '@/schemas/workflow-forms';
import { useState } from "react";
import { Link, useNavigate } from "@/lib/workflow-router";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { AuthShell } from './AuthShell';
import { routeForRole } from './SourceConfig';

export function UnifiedSignIn() {
  const store = useMockData()
  const navigate = useNavigate()
  const {getFieldState,register, handleSubmit, watch, setValue} = useForm<z.infer<typeof workflowSignInSchema>>({resolver:zodResolver(workflowSignInSchema),defaultValues:{email:"",password:""}})
  const email=watch("email")
  const setEmail=(value:string)=>setValue("email",value)
  const setPassword=(value:string)=>setValue("password",value)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const submit = ({email,password}:z.infer<typeof workflowSignInSchema>) => {
    const patientAccount = store.signInPatient(email, password)
    if (patientAccount) {
      navigate("/patient/dashboard")
      return
    }
    const account = store.state.staff.find(
      (staff) =>
        staff.email.toLowerCase() === email.toLowerCase() &&
        staff.status === "Active",
    )
    if (!account || !password)
      return setError("Check the email, password and account status.")
    store.switchAccount(account.id)
    navigate(routeForRole(account.role))
  }
  return (
    <AuthShell>
      <section className="
        m-auto grid max-w-216 grid-cols-2 overflow-hidden rounded-2xl border border-mist-200 bg-white
        max-md:grid-cols-1
      " data-slot="unified-login">
        <div className="bg-emerald-900 p-8 text-white max-md:p-6" data-slot="login-brand-panel">
          <span className="grid size-11 place-items-center rounded-lg bg-white/12 text-lime-300">
            <ShieldCheck size={22} />
          </span>
          <h1 className="mt-6 mb-3 text-3xl leading-tight font-bold tracking-tight not-italic normal-nums">One account for your MedAtlas workspaces.</h1>
          <p className="text-xs leading-relaxed text-white/70">
            Your approved organisation membership determines the workspace and
            permissions available after sign in.
          </p>
          <div className="mt-4 flex flex-col border-t border-t-white/18 pt-3">
            <strong className="text-xs tabular-nums">Prime Diagnostics</strong>
            <small className="text-xs text-white/60">Laboratory and diagnostic workflows</small>
          </div>
          <div className="mt-4 flex flex-col border-t border-t-white/18 pt-3">
            <strong className="text-xs tabular-nums">CityCare Hospital</strong>
            <small className="text-xs text-white/60">Hospital interoperability workflows</small>
          </div>
        </div>
        <form onSubmit={handleSubmit(submit,()=>setError("Check the email, password and account status."))} className="p-8 max-md:p-6">
          <Link to="/auth" className="
            flex items-center gap-1 text-xs text-olive-600 no-underline transition duration-160 ease-in-out
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
          " data-slot="auth-back">
            <ArrowLeft size={15} />
            Back
          </Link>
          <small className="mt-6 block text-xs font-bold text-emerald-700 uppercase">Account access</small>
          <h2 className="my-1 text-2xl leading-normal font-normal tracking-tight not-italic normal-nums">Sign in to MedAtlas</h2>
          <p className="text-xs text-olive-600">Enter one of the configured local account emails.</p>
          <label className="mt-3 flex flex-col gap-1">
            <span className="text-xs font-semibold text-olive-600">Email address</span>
            <input
              type="email"
              {...register("email")} aria-invalid={getFieldState("email").invalid || undefined}
              required className="
                h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              "
            />
          </label>
          <label className="mt-3 flex flex-col gap-1">
            <span className="text-xs font-semibold text-olive-600">Password</span>
            <div className="
              flex min-h-11 items-center overflow-hidden rounded-lg border border-mist-300 bg-white
              focus-within:border-emerald-700 focus-within:shadow-sm
            " data-slot="password-field">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")} aria-invalid={getFieldState("password").invalid || undefined}
                required className="
                  h-10 min-h-10.5 w-full rounded-lg border-mist-300 bg-white px-2.5 text-xs text-mist-800
                  outline-hidden transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)} className="
                  min-h-8 border-0 border-l border-l-taupe-100 bg-transparent px-2.5 text-xs font-semibold
                  text-emerald-900 transition duration-160 ease-in-out focus-visible:outline-3
                  focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                  disabled:opacity-52
                "
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          <label  data-slot="remember-session" className="mt-3 flex flex-row items-center gap-2 text-xs text-olive-600">
            <input type="checkbox" className="
              size-4 min-h-auto rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              accent-emerald-900 transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
            Remember this account on this device
          </label>
          {error && <div className="mt-3 rounded-lg border border-red-700/20 bg-red-50 p-2.5 text-xs text-red-700" data-slot="auth-error" role="alert">{error}</div>}
          <button type="submit" className="
            mt-4 flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-900 text-xs
            font-bold text-white transition duration-160 ease-in-out focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52
          ">
            Sign In
            <ArrowRight size={16} />
          </button>
          <div className="mt-4 flex flex-col gap-1.5 rounded-lg bg-mist-100 p-3" data-slot="test-account-select">
            <span className="text-xs font-bold">Available accounts</span>
            <select
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setPassword("medatlas")
              }} className="
                h-9 min-h-10.5 w-full rounded-md border border-mist-200 bg-white px-3 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              "
            >
              <option value="">Choose an account</option>
              {store.state.staff
                .filter((staff) => staff.status === "Active")
                .map((staff) => (
                  <option value={staff.email} key={staff.id}>
                    {staff.name} · {staff.title}
                  </option>
                ))}
              {store.state.patientAccounts
                .filter((account) => account.status === "Active")
                .map((account) => (
                  <option value={account.email} key={account.id}>
                    {account.fullName} · Patient
                  </option>
                ))}
            </select>
            <small className="text-xs text-olive-500">
              Use password “medatlas” for configured local accounts.
            </small>
          </div>
          <p className="text-center text-xs text-olive-600" data-slot="auth-create-link">
            New to MedAtlas? <Link to="/signup" className="
              font-bold text-emerald-900 transition duration-160 ease-in-out focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            ">Create an account</Link>
          </p>
        </form>
      </section>
    </AuthShell>
  )
}
