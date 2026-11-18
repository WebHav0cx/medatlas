'use client';
import { useState } from "react";
import { Link, useParams } from "@/lib/workflow-router";
import { Building2, CalendarDays, Download, FileClock, ShieldCheck } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { friendlyDate } from './friendlyDate';
import { StatusBadge } from './StatusBadge';
import { PatientButton } from './PatientButton';
import { PatientPageHeader } from './PatientPageHeader';
import { PatientErrorState } from './PatientErrorState';
import { downloadRecord } from './downloadRecord';
import { PatientDocumentViewer } from './PatientDocumentViewer';

export function RecordDetailPage() {
  const store = useMockData()
  const { documentId } = useParams()
  const document = store.patientDocument(documentId ?? "")
  const [requestCreated, setRequestCreated] = useState(false)
  if (!document)
    return (
      <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
        <PatientErrorState
          title="This document is not available"
          text="It may not belong to your linked account, may not have been released for patient access, or may no longer be available."
        />
      </div>
    )
  const organisation = store.state.organisations.find(
    (item) => item.name === document.sourceFacility,
  )
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow={document.category}
        title={document.title}
        subtitle={`Provided by ${document.sourceFacility} on ${friendlyDate(document.date)}.`}
        back="/patient/records"
        action={<StatusBadge label="Available" />}
      />
      <div >
        <div>
          <PatientDocumentViewer document={document} />
        </div>
        <aside >
          <div>
            <span>Document details</span>
            <h2 className="tracking-tight not-italic">About this record</h2>
          </div>
          <dl>
            <div>
              <dt>Healthcare facility</dt>
              <dd>{document.sourceFacility}</dd>
            </div>
            <div>
              <dt>Document category</dt>
              <dd>{document.category}</dd>
            </div>
            <div>
              <dt>Document date</dt>
              <dd>{friendlyDate(document.date)}</dd>
            </div>
            <div>
              <dt>Author or releasing professional</dt>
              <dd>{document.author ?? "Not recorded"}</dd>
            </div>
            <div>
              <dt>Release status</dt>
              <dd>
                <StatusBadge label="Available" />
              </dd>
            </div>
          </dl>
          <div >
            <PatientButton onClick={() => downloadRecord(document)}>
              <Download size={17} />
              Download record copy
            </PatientButton>
            {organisation && (
              <Link to={`/patient/providers/${organisation.id}`} className="
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32
              ">
                <Building2 size={17} />
                View source facility
              </Link>
            )}
            {document.eventId && (
              <Link to={`/patient/timeline?event=${document.eventId}`} className="
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32
              ">
                <CalendarDays size={17} />
                View related health event
              </Link>
            )}
            <button
              onClick={() => {
                store.addPatientRequest({
                  type: "Correction Review",
                  facility: document.sourceFacility,
                  documentId: document.id,
                  note: `Please review the information in ${document.title}.`,
                })
                setRequestCreated(true)
              }}
              disabled={requestCreated} className="
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              "
            >
              <FileClock size={17} />
              {requestCreated
                ? "Correction review requested"
                : "Request a correction review"}
            </button>
          </div>
          <div >
            <ShieldCheck size={18} />
            <p>
              {document.sourceFacility} remains the source of this clinical
              information. MedAtlas has not created or interpreted it.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
