'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { hospitalWorkflowSchema,workflowPrioritySchema,workflowProviderRoleSchema,type HospitalWorkflowValues } from '@/schemas/workflow-forms';
import { useState } from "react";
import { AlertCircle, Check, ShieldCheck } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { type ProviderRole, roleConfig } from './SourceConfig';

export function WorkflowDialog({
  title,
  role,
  moduleKey,
  onClose,
}: {
  title: string
  role: ProviderRole
  moduleKey: string
  onClose: () => void
}) {
  const store = useMockData()
  const [error, setError] = useState("")
  const [saved, setSaved] = useState("")

  const {getFieldState,register,handleSubmit}=useForm<HospitalWorkflowValues>({resolver:zodResolver(hospitalWorkflowSchema(moduleKey,role)),defaultValues:{}})
  const submit = (data:HospitalWorkflowValues) => {
    const value = (name:keyof HospitalWorkflowValues)=>(data[name]??"").trim()
    try {
      if (
        ["registration", "patients"].includes(moduleKey) &&
        role === "records"
      ) {
        store.addPatient({
          firstName: value("firstName"),
          lastName: value("lastName"),
          dob: value("dob"),
          sex: value("sex"),
          phone: value("phone"),
          localId: value("localId"),
          verification: "Pending",
          assignedStaff: [],
          sourceFacilities: [store.state.facility.name],
        })
      } else if (["requests", "outgoing"].includes(moduleKey)) {
        store.addRequest({
          patientId: value("patientId"),
          requester: store.state.facility.name,
          sourceFacility: value("sourceFacility"),
          category: value("category"),
          purpose: value("purpose"),
          authorisation: value("authorisation"),
          priority: workflowPrioritySchema.parse(value("priority")),
        })
      } else if (moduleKey === "referrals") {
        store.addReferral({
          patientId: value("patientId"),
          destination: value("destination"),
          reason: value("reason"),
          context: value("context"),
          attachments: value("attachment") ? [value("attachment")] : [],
        })
      } else if (moduleKey === "diagnostic-requests") {
        store.addDiagnosticRequest({
          patientId: value("patientId"),
          requestingFacility: store.state.facility.name,
          destination: "Prime Diagnostics",
          requestingClinician: store.currentAccount.name,
          tests: [value("test")],
          priority: workflowPrioritySchema.parse(value("priority")),
          purpose: value("purpose"),
        })
      } else if (moduleKey === "staff") {
        const newRole = workflowProviderRoleSchema.parse(value("role"))
        store.addStaff({
          name: value("name"),
          email: value("email"),
          department: value("department"),
          role: newRole,
          title: roleConfig[newRole].title,
        })
      } else if (moduleKey === "facility") {
        store.updateFacility({
          name: value("name"),
          address: value("address"),
          email: value("email"),
          phone: value("phone"),
        })
      } else {
        store.recordAudit(
          title,
          moduleKey,
          "Success",
          `${title} completed by ${store.currentAccount.name}.`,
        )
      }
      setSaved(`${title} saved successfully.`)
    } catch {
      setError(
        "The action could not be completed. Review the form and try again.",
      )
    }
  }

  const isPatient =
    ["registration", "patients"].includes(moduleKey) && role === "records"
  const isRequest = ["requests", "outgoing"].includes(moduleKey)
  const isReferral = moduleKey === "referrals"
  const isDiagnostic = moduleKey === "diagnostic-requests"
  const isStaff = moduleKey === "staff"
  const isFacility = moduleKey === "facility"

  if (saved) {
    return (
      <div className="fixed inset-0 z-110 grid place-items-center bg-teal-950/42 p-4 backdrop-blur-xs" data-slot="hospital-dialog-backdrop">
        <section className="w-96 max-w-full rounded-2xl border border-mist-200 bg-white p-6 text-center shadow-xl" data-slot="hospital-confirm-dialog">
          <span className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700" data-slot="dialog-icon">
            <Check size={22} />
          </span>
          <h2 className="text-xl leading-normal font-bold tracking-tight text-mist-800 not-italic normal-nums">Changes saved</h2>
          <p className="text-xs leading-normal text-olive-600">{saved}</p>
          <button className="
            inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
            border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
            transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
            hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          " data-slot="hospital-primary" onClick={onClose}>
            Done
          </button>
        </section>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-110 grid place-items-center bg-teal-950/42 p-4 backdrop-blur-xs" data-slot="hospital-dialog-backdrop">
      <form className="
        max-h-screen w-96 max-w-full overflow-y-auto rounded-2xl border border-mist-200 bg-white p-6
        text-center shadow-xl
      " data-slot="hospital-confirm-dialog workflow-form" onSubmit={handleSubmit(submit,errors=>setError(Object.values(errors).find(error=>error?.message)?.message??"The action could not be completed. Review the form and try again."))}>
        <span className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700" data-slot="dialog-icon">
          <ShieldCheck size={22} />
        </span>
        <h2 className="text-xl leading-normal font-bold tracking-tight text-mist-800 not-italic normal-nums">{title}</h2>
        <p className="text-xs leading-normal text-olive-600">Complete the required information before saving.</p>
        {isPatient && (
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
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Phone</span>
              <input {...register("phone")} aria-invalid={getFieldState("phone").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              " />
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Local hospital ID *</span>
              <input {...register("localId")} aria-invalid={getFieldState("localId").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              " />
            </label>
          </div>
        )}
        {isRequest && (
          <div className="mt-4 grid grid-cols-2 gap-3.5 text-left max-md:grid-cols-1" data-slot="workflow-fields">
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Patient *</span>
              <select {...register("patientId")} aria-invalid={getFieldState("patientId").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                {store.state.patients.map((patient) => (
                  <option value={patient.id} key={patient.id}>
                    {patient.firstName} {patient.lastName} ·{" "}
                    {patient.medAtlasId}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Source facility *</span>
              <select {...register("sourceFacility")} aria-invalid={getFieldState("sourceFacility").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option>Mercy Specialist Hospital</option>
                <option>Prime Diagnostics</option>
                <option>Lagoon Clinic</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Record category *</span>
              <select {...register("category")} aria-invalid={getFieldState("category").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option>Discharge Summary</option>
                <option>Laboratory Results</option>
                <option>Consultation Summary</option>
                <option>Imaging Report</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Purpose</span>
              <select {...register("purpose")} aria-invalid={getFieldState("purpose").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option>Continuity of Care</option>
                <option>Referral</option>
                <option>Follow-up Treatment</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Authorisation</span>
              <select {...register("authorisation")} aria-invalid={getFieldState("authorisation").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option>Verified clinical relationship</option>
                <option>Patient authorisation required</option>
                <option>Referral basis</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Priority</span>
              <select {...register("priority")} aria-invalid={getFieldState("priority").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option>Routine</option>
                <option>Urgent</option>
              </select>
            </label>
          </div>
        )}
        {isReferral && (
          <div className="mt-4 grid grid-cols-2 gap-3.5 text-left max-md:grid-cols-1" data-slot="workflow-fields">
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Patient *</span>
              <select {...register("patientId")} aria-invalid={getFieldState("patientId").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                {store.state.patients.map((patient) => (
                  <option value={patient.id} key={patient.id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Destination *</span>
              <select {...register("destination")} aria-invalid={getFieldState("destination").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option>Mercy Specialist Hospital</option>
                <option>Prime Diagnostics</option>
                <option>Lagoon Clinic</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Reason *</span>
              <input {...register("reason")} aria-invalid={getFieldState("reason").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              " />
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Permitted attachment</span>
              <select {...register("attachment")} aria-invalid={getFieldState("attachment").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option value="">No attachment</option>
                <option>Consultation Summary</option>
                <option>Referral Summary</option>
              </select>
            </label>
            <label  data-slot="field-wide" className="col-start-1 col-end-3 flex flex-col gap-1.5 text-left max-md:col-start-1 max-md:col-end-auto">
              <span className="text-xs font-semibold text-olive-600">Clinical context</span>
              <textarea {...register("context")} aria-invalid={getFieldState("context").invalid || undefined} className="
                min-h-20 w-full resize-y rounded-lg border border-mist-300 bg-white p-3 text-xs leading-normal
                text-mist-800 transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              " />
            </label>
          </div>
        )}
        {isDiagnostic && (
          <div className="mt-4 grid grid-cols-2 gap-3.5 text-left max-md:grid-cols-1" data-slot="workflow-fields">
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Patient *</span>
              <select {...register("patientId")} aria-invalid={getFieldState("patientId").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                {store.state.patients
                  .filter((patient) =>
                    patient.assignedStaff.includes(store.currentAccount.id),
                  )
                  .map((patient) => (
                    <option value={patient.id} key={patient.id}>
                      {patient.firstName} {patient.lastName} ·{" "}
                      {patient.medAtlasId}
                    </option>
                  ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Destination</span>
              <input value="Prime Diagnostics" disabled className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              " />
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Diagnostic test *</span>
              <select {...register("test")} aria-invalid={getFieldState("test").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option>Full Blood Count</option>
                <option>Lipid Profile</option>
                <option>Renal Function Panel</option>
                <option>Electrolytes</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Priority</span>
              <select {...register("priority")} aria-invalid={getFieldState("priority").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option>Routine</option>
                <option>Urgent</option>
              </select>
            </label>
            <label  data-slot="field-wide" className="col-start-1 col-end-3 flex flex-col gap-1.5 text-left max-md:col-start-1 max-md:col-end-auto">
              <span className="text-xs font-semibold text-olive-600">Clinical purpose</span>
              <textarea
                {...register("purpose")} aria-invalid={getFieldState("purpose").invalid || undefined}
                placeholder="Provide the coordination context for this request" className="
                  min-h-20 w-full resize-y rounded-lg border border-mist-300 bg-white p-3 text-xs leading-normal
                  text-mist-800 transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                "
              />
            </label>
          </div>
        )}
        {isStaff && (
          <div className="mt-4 grid grid-cols-2 gap-3.5 text-left max-md:grid-cols-1" data-slot="workflow-fields">
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Full name *</span>
              <input {...register("name")} aria-invalid={getFieldState("name").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              " />
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Work email *</span>
              <input {...register("email")} aria-invalid={getFieldState("email").invalid || undefined} type="email" className="
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
                <option value="doctor">Doctor / Clinician</option>
                <option value="nurse">Nurse</option>
                <option value="records">Medical Records Officer</option>
                <option value="admin">Hospital Administrator</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Department *</span>
              <input {...register("department")} aria-invalid={getFieldState("department").invalid || undefined} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              " />
            </label>
          </div>
        )}
        {isFacility && (
          <div className="mt-4 grid grid-cols-2 gap-3.5 text-left max-md:grid-cols-1" data-slot="workflow-fields">
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Facility name *</span>
              <input {...register("name")} aria-invalid={getFieldState("name").invalid || undefined} defaultValue={store.state.facility.name} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              " />
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Facility type</span>
              <input value={store.state.facility.type} disabled className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              " />
            </label>
            <label  data-slot="field-wide" className="col-start-1 col-end-3 flex flex-col gap-1.5 text-left max-md:col-start-1 max-md:col-end-auto">
              <span className="text-xs font-semibold text-olive-600">Address *</span>
              <input
                {...register("address")} aria-invalid={getFieldState("address").invalid || undefined}
                defaultValue={store.state.facility.address} className="
                  h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                  transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                "
              />
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Contact email *</span>
              <input
                {...register("email")} aria-invalid={getFieldState("email").invalid || undefined}
                type="email"
                defaultValue={store.state.facility.email} className="
                  h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                  transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                "
              />
            </label>
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-semibold text-olive-600">Contact phone</span>
              <input {...register("phone")} aria-invalid={getFieldState("phone").invalid || undefined} defaultValue={store.state.facility.phone} className="
                h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              " />
            </label>
          </div>
        )}
        {!isPatient &&
          !isRequest &&
          !isReferral &&
          !isDiagnostic &&
          !isStaff &&
          !isFacility && (
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-bold">Operational note</span>
              <textarea {...register("note")} aria-invalid={getFieldState("note").invalid || undefined} placeholder="Add relevant context" className="
                min-h-20 w-full resize-y rounded-lg border border-mist-300 bg-white p-3 text-xs leading-normal
                text-mist-800 transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              " />
            </label>
          )}
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
          ">Save</button>
        </div>
      </form>
    </div>
  )
}
