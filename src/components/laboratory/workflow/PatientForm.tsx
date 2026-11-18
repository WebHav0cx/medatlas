'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { laboratoryPatientSchema } from '@/schemas/workflow-forms';
import { useState } from "react";
import { AlertCircle, Users } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";


export function PatientForm({ onClose }: { onClose: () => void }) {
  const store = useMockData()
  const [error, setError] = useState("")
  const {getFieldState,register,handleSubmit}=useForm<z.infer<typeof laboratoryPatientSchema>>({resolver:zodResolver(laboratoryPatientSchema),defaultValues:{firstName:"",lastName:"",dob:"",sex:"Female",phone:""}})
  const submit = (data:z.infer<typeof laboratoryPatientSchema>) => {
    const value = (name:keyof typeof data) => data[name].trim()
    if (!value("firstName") || !value("lastName") || !value("dob"))
      return setError("Complete the required patient fields.")
    store.addPatient({
      firstName: value("firstName"),
      lastName: value("lastName"),
      dob: value("dob"),
      sex: value("sex"),
      phone: value("phone"),
      localId: `PD-${Date.now().toString().slice(-5)}`,
      verification: "Pending",
      assignedStaff: [],
      sourceFacilities: ["Prime Diagnostics"],
    })
    onClose()
  }
  return (
    <div className="fixed inset-0 z-110 grid place-items-center bg-teal-950/42 p-4 backdrop-blur-xs" data-slot="hospital-dialog-backdrop">
      <form className="
        max-h-screen w-96 max-w-full overflow-y-auto rounded-2xl border border-mist-200 bg-white p-6
        text-center shadow-xl
      " data-slot="hospital-confirm-dialog workflow-form" onSubmit={handleSubmit(submit,()=>setError("Complete the required patient fields."))}>
        <span className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700" data-slot="dialog-icon">
          <Users size={22} />
        </span>
        <h2 className="text-xl leading-normal font-bold tracking-tight text-mist-800 not-italic normal-nums">Register Laboratory Patient</h2>
        <div className="mt-4 grid grid-cols-2 gap-3.5 text-left max-md:grid-cols-1" data-slot="workflow-fields">
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-olive-600">First name *</span>
            <input {...register("firstName")} aria-invalid={getFieldState("firstName").invalid || undefined} className="
              h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-olive-600">Last name *</span>
            <input {...register("lastName")} aria-invalid={getFieldState("lastName").invalid || undefined} className="
              h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-olive-600">Date of birth *</span>
            <input {...register("dob")} aria-invalid={getFieldState("dob").invalid || undefined} type="date" className="
              h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-olive-600">Sex</span>
            <select {...register("sex")} aria-invalid={getFieldState("sex").invalid || undefined} className="
              h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            ">
              <option>Female</option>
              <option>Male</option>
            </select>
          </label>
          <label  data-slot="field-wide" className="col-start-1 col-end-3 flex flex-col gap-1.5 text-left max-md:col-start-1 max-md:col-end-auto">
            <span className="text-xs font-semibold text-olive-600">Phone</span>
            <input {...register("phone")} aria-invalid={getFieldState("phone").invalid || undefined} className="
              h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
        </div>
        {error && (
          <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-red-700/20 bg-red-50 p-2.5 text-xs text-red-700" data-slot="workflow-error" role="alert">
            <AlertCircle size={15} />
            {error}
          </div>
        )}
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
          ">Save Patient</button>
        </div>
      </form>
    </div>
  )
}
