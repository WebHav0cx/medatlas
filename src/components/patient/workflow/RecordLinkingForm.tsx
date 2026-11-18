'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { linkingSchema } from '@/schemas/workflow-forms';
import { useState } from "react";
import { Link } from "@/lib/workflow-router";
import { ArrowRight, CheckCircle2, CircleAlert, FileClock, KeyRound } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { StatusBadge } from './StatusBadge';
import { PatientButton } from './PatientButton';

export function RecordLinkingForm() {
  const store = useMockData()
  const {getFieldState,register,handleSubmit,watch}=useForm<z.infer<typeof linkingSchema>>({resolver:zodResolver(linkingSchema),defaultValues:{method:"Linking Code",facility:"CityCare Hospital",code:""}})
  const {method,facility,code}=watch()
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const submit = () => {
    const link = store.submitPatientLink({ facility, method, code })
    if (!link) {
      setError(
        "That linking code does not match the seeded facility records. Check the code and try again.",
      )
      return
    }
    setError("")
    setSubmitted(true)
  }
  if (submitted)
    return (
      <div >
        <span>
          <CheckCircle2 size={28} />
        </span>
        <h2 className="tracking-tight not-italic">Your record-linking request is being reviewed</h2>
        <p>
          {facility} received your request. Records will not become available
          unless an authorised review is completed.
        </p>
        <StatusBadge label="Pending Verification" />
        <Link to="/patient/requests" className="
          transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32
        ">View my requests</Link>
      </div>
    )
  return (
    <form  onSubmit={handleSubmit(submit)}>
      <fieldset>
        <legend>How would you like to connect?</legend>
        <label >
          <input
            type="radio"
            {...register("method")} aria-invalid={getFieldState("method").invalid || undefined} value="Linking Code" className="
              min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
              ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52
            "
          />
          <span>
            <KeyRound size={20} />
          </span>
          <div>
            <strong className="tabular-nums">Use a facility linking code</strong>
            <small>
              Enter a fictional code supplied by a participating facility.
            </small>
          </div>
        </label>
        <label >
          <input
            type="radio"
            {...register("method")} aria-invalid={getFieldState("method").invalid || undefined} value="Review Request" className="
              min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
              ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52
            "
          />
          <span>
            <FileClock size={20} />
          </span>
          <div>
            <strong className="tabular-nums">Ask the facility to review a link</strong>
            <small>
              A records officer will compare the request with facility-held
              identity information.
            </small>
          </div>
        </label>
      </fieldset>
      <label>
        <span>Healthcare facility</span>
        <select
          {...register("facility")} aria-invalid={getFieldState("facility").invalid || undefined} className="
            h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
            transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52
          "
        >
          {store.state.organisations.map((organisation) => (
            <option key={organisation.id}>{organisation.name}</option>
          ))}
        </select>
      </label>
      {method === "Linking Code" && (
        <label>
          <span>Facility-issued linking code</span>
          <input
            {...register("code")} aria-invalid={getFieldState("code").invalid || undefined}
            placeholder="Enter your linking code"
            required className="
              min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
              ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52
            "
          />
          <small>
            Codes are checked against the connected fictional dataset. Use
            CITY-AREMU-2841 for the seeded CityCare scenario.
          </small>
        </label>
      )}
      {error && (
        <div  role="alert">
          <CircleAlert size={17} />
          {error}
        </div>
      )}
      <div >
        <Link to="/patient/records" className="
          transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32
        ">Cancel</Link>
        <PatientButton type="submit">
          Submit linking request
          <ArrowRight size={16} />
        </PatientButton>
      </div>
    </form>
  )
}
