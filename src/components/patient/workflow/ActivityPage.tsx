'use client';
import { Activity, FileText, Network, ShieldCheck } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { PatientPageHeader } from './PatientPageHeader';
import { PatientEmptyState } from './PatientEmptyState';

export function ActivityPage() {
  const store = useMockData()
  const account = store.currentPatientAccount
  const patientId = account.patientId
  const exchanges = store.state.exchanges.filter(
    (item) => item.patientId === patientId,
  )
  const permissions = store.state.sharingPermissions.filter(
    (item) => item.accountId === account.id,
  )
  const notifications = store.state.patientNotifications.filter(
    (item) => item.accountId === account.id,
  )
  const events = [
    ...exchanges.map((item) => ({
      id: item.id,
      title: `${item.recipient} received your ${item.documentType.toLowerCase()}`,
      detail: `Shared by ${item.sender} for request ${item.requestId}.`,
      at: item.at,
      type: "Record exchange",
      icon: Network,
    })),
    ...permissions
      .filter((item) => item.status !== "Pending Decision")
      .map((item) => ({
        id: item.id,
        title:
          item.status === "Active"
            ? `Sharing allowed with ${item.requestingOrganisation}`
            : item.status === "Withdrawn"
              ? `Permission withdrawn from ${item.requestingOrganisation}`
              : `Sharing request ${item.status.toLowerCase()}`,
        detail: `${item.recordCategory} · ${item.purpose}`,
        at: item.decidedAt ?? item.createdAt,
        type: "Sharing",
        icon: ShieldCheck,
      })),
    ...notifications.map((item) => ({
      id: item.id,
      title: item.title,
      detail: item.message,
      at: item.at,
      type: item.type,
      icon: item.type === "Record Available" ? FileText : Activity,
    })),
  ]
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow="Account activity"
        title="Activity History"
        subtitle="Patient-facing information about record availability, requests and sharing events."
      />
      {events.length ? (
        <section >
          {events.map((event) => {
            const Icon = event.icon
            return (
              <article key={`${event.id}-${event.type}`}>
                <span>
                  <Icon size={18} />
                </span>
                <div>
                  <small>{event.type}</small>
                  <h2 className="tracking-tight not-italic">{event.title}</h2>
                  <p>{event.detail}</p>
                </div>
                <time>{event.at}</time>
              </article>
            )
          })}
        </section>
      ) : (
        <PatientEmptyState
          icon={Activity}
          title="No activity is available yet"
          text="Relevant record, request and sharing updates will appear here."
        />
      )}
    </div>
  )
}
