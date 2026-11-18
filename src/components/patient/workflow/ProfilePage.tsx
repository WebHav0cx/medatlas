'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { contactSchema } from '@/schemas/workflow-forms';
import { useState, useEffect } from "react";
import { CheckCircle2, Info } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { friendlyDate } from './friendlyDate';
import { PatientButton } from './PatientButton';
import { PatientProfileHeader } from './PatientProfileHeader';

export function ProfilePage() {
  const store = useMockData()
  const account = store.currentPatientAccount
  const patient = store.state.patients.find(
    (item) => item.id === account.patientId,
  )
  const [editing, setEditing] = useState(false)
  const {getFieldState,register,handleSubmit,watch,setValue,reset}=useForm<z.infer<typeof contactSchema>>({resolver:zodResolver(contactSchema),defaultValues:{email:account.email,phone:account.phone}})
  useEffect(()=>reset({email:account.email,phone:account.phone}),[account.id,account.email,account.phone,reset])
  const {email,phone}=watch()
  const setEmail=(value:string)=>setValue("email",value)
  const setPhone=(value:string)=>setValue("phone",value)
  const [saved, setSaved] = useState(false)
  const save = () => {
    store.updatePatientAccount(account.id, {
      email,
      phone,
      preferences: account.preferences,
    })
    setEditing(false)
    setSaved(true)
  }
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientProfileHeader />
      {saved && (
        <div  role="status">
          <CheckCircle2 size={17} />
          Contact information saved.
        </div>
      )}
      <div >
        <form  onSubmit={handleSubmit(save)}>
          <div>
            <span>Account information</span>
            <h2 className="tracking-tight not-italic">Contact details</h2>
            {!editing && (
              <button type="button" onClick={() => setEditing(true)} className="
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              ">
                Edit contact details
              </button>
            )}
          </div>
          <label>
            <span>Email address</span>
            <input
              type="email"
              {...register("email")} aria-invalid={getFieldState("email").invalid || undefined}
              disabled={!editing}
              required className="
                min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              "
            />
          </label>
          <label>
            <span>Phone number</span>
            <input
              {...register("phone")} aria-invalid={getFieldState("phone").invalid || undefined}
              disabled={!editing}
              required className="
                min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              "
            />
          </label>
          {editing && (
            <div >
              <PatientButton
                variant="secondary"
                onClick={() => {
                  setEditing(false)
                  setEmail(account.email)
                  setPhone(account.phone)
                }}
              >
                Cancel
              </PatientButton>
              <PatientButton type="submit">Save changes</PatientButton>
            </div>
          )}
        </form>
        <section >
          <div>
            <span>Provider-maintained identity</span>
            <h2 className="tracking-tight not-italic">Linked identity information</h2>
          </div>
          <dl>
            <div>
              <dt>Full name</dt>
              <dd>
                {patient
                  ? `${patient.firstName} ${patient.lastName}`
                  : account.fullName}
              </dd>
            </div>
            <div>
              <dt>Date of birth</dt>
              <dd>{friendlyDate(patient?.dob ?? account.dob)}</dd>
            </div>
            <div>
              <dt>Local MedAtlas reference</dt>
              <dd>{patient?.medAtlasId ?? "Available after linking"}</dd>
            </div>
          </dl>
          <div >
            <Info size={18} />
            <p>
              Provider-maintained identity details cannot be edited directly.
              Submit a correction review if something needs attention.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
