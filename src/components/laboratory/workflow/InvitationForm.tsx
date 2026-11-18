'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { laboratoryInvitationSchema } from '@/schemas/workflow-forms';
import { useState } from "react";
import { Check, UserPlus } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";


export function InvitationForm({ onClose }: { onClose: () => void }) {
  const store = useMockData()
  const [code, setCode] = useState("")
  const {getFieldState,register,handleSubmit}=useForm<z.infer<typeof laboratoryInvitationSchema>>({resolver:zodResolver(laboratoryInvitationSchema),defaultValues:{email:"",role:"lab-reception",department:""}})
  const submit = (data:z.infer<typeof laboratoryInvitationSchema>) => {
    const invitation = store.createInvitation({
      organisationId: "org-prime",
      email: data.email,
      role: data.role,
      department: data.department,
    })
    setCode(invitation.code)
  }
  return (
    <div className="fixed inset-0 z-110 grid place-items-center bg-teal-950/42 p-4 backdrop-blur-xs" data-slot="hospital-dialog-backdrop">
      <form className="
        max-h-screen w-96 max-w-full overflow-y-auto rounded-2xl border border-mist-200 bg-white p-6
        text-center shadow-xl
      " data-slot="hospital-confirm-dialog workflow-form" onSubmit={handleSubmit(submit)}>
        {code ? (
          <>
            <span className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700" data-slot="dialog-icon">
              <Check size={22} />
            </span>
            <h2 className="text-xl leading-normal font-bold tracking-tight text-mist-800 not-italic normal-nums">Invitation created</h2>
            <p className="text-xs leading-normal text-olive-600">Share this local invitation code with the staff member.</p>
            <strong className="
              mx-auto my-4 block rounded-lg border border-dashed border-emerald-700 bg-emerald-50 px-4 py-3
              tracking-widest text-emerald-900 tabular-nums
            " data-slot="invitation-code">{code}</strong>
            <button type="button" className="
              inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
              border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
              transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
              hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            " data-slot="hospital-primary" onClick={onClose}>
              Done
            </button>
          </>
        ) : (
          <>
            <span className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700" data-slot="dialog-icon">
              <UserPlus size={22} />
            </span>
            <h2 className="text-xl leading-normal font-bold tracking-tight text-mist-800 not-italic normal-nums">Create Staff Invitation</h2>
            <div className="mt-4 grid grid-cols-2 gap-3.5 text-left max-md:grid-cols-1" data-slot="workflow-fields">
              <label  data-slot="field-wide" className="col-start-1 col-end-3 flex flex-col gap-1.5 text-left max-md:col-start-1 max-md:col-end-auto">
                <span className="text-xs font-semibold text-olive-600">Work email</span>
                <input {...register("email")} aria-invalid={getFieldState("email").invalid || undefined} type="email" required className="
                  h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                  transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                " />
              </label>
              <label className="flex flex-col gap-1.5 text-left">
                <span className="text-xs font-semibold text-olive-600">Role</span>
                <select {...register("role")} aria-invalid={getFieldState("role").invalid || undefined} className="
                  h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                  transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                ">
                  <option value="lab-reception">Reception Officer</option>
                  <option value="lab-scientist">Laboratory Scientist</option>
                  <option value="lab-reviewer">Result Reviewer</option>
                  <option value="lab-admin">Laboratory Administrator</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-left">
                <span className="text-xs font-semibold text-olive-600">Department</span>
                <input {...register("department")} aria-invalid={getFieldState("department").invalid || undefined} required className="
                  h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                  transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                " />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="
                min-h-9 rounded-lg border border-mist-200 bg-white px-3 py-0 text-xs font-bold text-emerald-900
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              ">
                Cancel
              </button>
              <button type="submit" className="
                min-h-9 rounded-lg border border-emerald-900 bg-emerald-900 px-3 py-0 text-xs font-bold text-white
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              ">Create Invitation</button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
