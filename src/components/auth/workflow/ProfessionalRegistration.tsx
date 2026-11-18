'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { professionalSchema } from '@/schemas/workflow-forms';
import { useState } from "react";
import { Link, useNavigate } from "@/lib/workflow-router";
import { ArrowRight } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { AuthShell } from './AuthShell';
import { routeForRole } from './SourceConfig';

export function ProfessionalRegistration() {
  const store = useMockData()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const {getFieldState,register,handleSubmit}=useForm<z.infer<typeof professionalSchema>>({resolver:zodResolver(professionalSchema),defaultValues:{name:"",email:"",code:"",phone:"",category:"Doctor / Clinician",registration:"",state:"",password:"",confirmPassword:""}})
  const submit = ({name,email,code}:z.infer<typeof professionalSchema>) => {
    const staff = store.acceptInvitation(code, { name, email })
    if (!staff)
      return setError(
        "The invitation code is invalid, expired or already accepted.",
      )
    navigate(routeForRole(staff.role))
  }
  return (
    <AuthShell>
      <section className="m-auto max-w-176 rounded-2xl border border-mist-200 bg-white p-6" data-slot="professional-registration">
        <div className="mb-5 max-w-168 text-left" data-slot="auth-heading compact">
          <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">Organisation membership</span>
          <h1 className="my-2 text-3xl leading-tight font-normal tracking-tight text-teal-950 not-italic normal-nums max-md:text-3xl">Join an existing organisation</h1>
          <p className="text-xs leading-relaxed text-olive-600">
            Your invitation determines the organisation and effective role
            assigned to your account.
          </p>
        </div>
        <form onSubmit={handleSubmit(submit,()=>setError("Full name, email and invitation code are required."))} className="grid grid-cols-2 gap-3.5 gap-x-3 gap-y-0 max-md:grid-cols-1" data-slot="auth-form-grid">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-olive-600">Full name *</span>
            <input {...register("name")} aria-invalid={getFieldState("name").invalid || undefined} className="
              h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-olive-600">Email address *</span>
            <input {...register("email")} aria-invalid={getFieldState("email").invalid || undefined} type="email" className="
              h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-olive-600">Phone number</span>
            <input {...register("phone")} aria-invalid={getFieldState("phone").invalid || undefined} className="
              h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-olive-600">Professional category</span>
            <select {...register("category")} aria-invalid={getFieldState("category").invalid || undefined} className="
              h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            ">
              <option>Doctor / Clinician</option>
              <option>Nurse</option>
              <option>Medical Records Officer</option>
              <option>Laboratory Scientist / Technician</option>
              <option>Authorised Laboratory Result Reviewer</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-olive-600">Professional registration number</span>
            <input {...register("registration")} aria-invalid={getFieldState("registration").invalid || undefined} className="
              h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-olive-600">State</span>
            <input {...register("state")} aria-invalid={getFieldState("state").invalid || undefined} className="
              h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label  data-slot="wide" className="col-start-1 col-end-3 flex flex-col gap-1.5 max-md:col-start-1 max-md:col-end-auto">
            <span className="text-xs font-semibold text-olive-600">Organisation invitation code *</span>
            <input {...register("code")} aria-invalid={getFieldState("code").invalid || undefined} placeholder="e.g. PRIME-LAB-2026" className="
              h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-olive-600">Password</span>
            <input type="password" {...register("password")} aria-invalid={getFieldState("password").invalid || undefined} className="
              h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-olive-600">Confirm password</span>
            <input type="password" {...register("confirmPassword")} aria-invalid={getFieldState("confirmPassword").invalid || undefined} className="
              h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          {error && <div className="
            col-start-1 col-end-3 mt-3 rounded-lg border border-red-700/20 bg-red-50 p-2.5 text-xs
            text-red-700 max-md:col-start-1 max-md:col-end-auto
          " data-slot="auth-error wide" role="alert">{error}</div>}
          <div className="
            col-start-1 col-end-3 mt-5 flex justify-end gap-2 border-t border-t-mist-200 pt-3
            max-md:col-start-1 max-md:col-end-auto
          " data-slot="organisation-actions wide">
            <Link to="/signup" className="
              inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-mist-200 bg-white px-3.5
              text-xs font-semibold tracking-normal text-emerald-900 no-underline transition duration-160
              ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32
            ">Cancel</Link>
            <button type="submit" className="
              inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-emerald-900 bg-emerald-900
              px-3.5 text-xs font-semibold tracking-normal text-white no-underline transition duration-160
              ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            ">
              Join Organisation
              <ArrowRight size={15} />
            </button>
          </div>
        </form>
      </section>
    </AuthShell>
  )
}
