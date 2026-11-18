'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { informationRequestSchema } from '@/schemas/workflow-forms';
import { Link, useNavigate } from "@/lib/workflow-router";
import { ArrowRight, Info } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { PatientButton } from './PatientButton';
import { PatientPageHeader } from './PatientPageHeader';

export function NewRequestPage() {
  const store = useMockData()
  const navigate = useNavigate()
  const documents = store.patientDocuments()
  const {getFieldState,register,handleSubmit,watch}=useForm<z.infer<typeof informationRequestSchema>>({resolver:zodResolver(informationRequestSchema),defaultValues:{type:"Access Existing Records",facility:"CityCare Hospital",documentId:"",note:""}})
  const {type,facility,documentId,note}=watch()
  const submit = () => {
    const request = store.addPatientRequest({
      type,
      facility,
      documentId: documentId || undefined,
      note:
        note ||
        `Please review my ${type.toLowerCase()} request and provide the next available update.`,
    })
    navigate(`/patient/requests/${request.id}`)
  }
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow="New information request"
        title="Create a Request"
        subtitle="Send a structured request to a participating healthcare facility."
        back="/patient/requests"
      />
      <form  onSubmit={handleSubmit(submit)}>
        <div >
          <div>
            <span>Request type</span>
            <h2 className="tracking-tight not-italic">What would you like help with?</h2>
          </div>
          <label>
            <span>Type of request</span>
            <select
              {...register("type")} aria-invalid={getFieldState("type").invalid || undefined} className="
                h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              "
            >
              <option>Access Existing Records</option>
              <option>Record Linking</option>
              <option>Correction Review</option>
              <option>Copy of Record</option>
            </select>
          </label>
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
          {(type === "Correction Review" || type === "Copy of Record") && (
            <label>
              <span>Related available record</span>
              <select
                {...register("documentId")} aria-invalid={getFieldState("documentId").invalid || undefined}
                required className="
                  h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
                  transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                "
              >
                <option value="">Select a record</option>
                {documents.map((document) => (
                  <option value={document.id} key={document.id}>
                    {document.title} · {document.sourceFacility}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            <span>Helpful context</span>
            <textarea
              {...register("note")} aria-invalid={getFieldState("note").invalid || undefined}
              placeholder="Describe what you need the records team to review"
              rows={4} className="
                min-h-24 w-full resize-y rounded-lg border border-mist-300 bg-white p-3 text-xs leading-normal
                text-mist-800 transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              "
            />
            <small>
              Do not enter emergency concerns or unnecessary sensitive
              information.
            </small>
          </label>
        </div>
        <div >
          <Info size={18} />
          <p>
            Submitting this request does not directly edit clinical records. An
            authorised facility team will review it and update the request
            status.
          </p>
        </div>
        <div >
          <Link to="/patient/requests" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32
          ">Cancel</Link>
          <PatientButton type="submit">
            Submit request
            <ArrowRight size={16} />
          </PatientButton>
        </div>
      </form>
    </div>
  )
}
