'use client';
import { Building2, ShieldCheck } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { StatusBadge } from './StatusBadge';
import { PatientPageHeader } from './PatientPageHeader';
import { RecordLinkingForm } from './RecordLinkingForm';

export function ConnectRecordsPage() {
  const store = useMockData()
  const links = store.state.patientLinks.filter(
    (item) => item.accountId === store.currentPatientAccount.id,
  )
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow="Record linking"
        title="Connect My Records"
        subtitle="Ask a participating healthcare facility to connect eligible records to your account."
        back="/patient/records"
      />
      <div >
        <ShieldCheck size={20} />
        <p>
          A matching name or date of birth is not enough to grant access.
          Facility review must be completed before records become visible.
        </p>
      </div>
      <RecordLinkingForm />
      {links.length > 0 && (
        <section >
          <div>
            <span>Existing connections</span>
            <h2 className="tracking-tight not-italic">Connected facility requests</h2>
          </div>
          {links.map((link) => (
            <article key={link.id}>
              <span>
                <Building2 size={18} />
              </span>
              <div>
                <strong className="tabular-nums">{link.facility}</strong>
                <small>
                  {link.method} · Updated {link.updatedAt}
                </small>
              </div>
              <StatusBadge label={link.status} />
            </article>
          ))}
        </section>
      )}
    </div>
  )
}
