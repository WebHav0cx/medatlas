'use client';
import { Link } from "@/lib/workflow-router";
import { FileClock, Link2, Plus } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { StatusBadge } from './StatusBadge';
import { PatientPageHeader } from './PatientPageHeader';
import { PatientEmptyState } from './PatientEmptyState';

export function RequestsPage() {
  const store = useMockData()
  const account = store.currentPatientAccount
  const requests = store.state.patientRequests.filter(
    (item) => item.accountId === account.id,
  )
  const links = store.state.patientLinks.filter(
    (item) => item.accountId === account.id,
  )
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow="Information requests"
        title="My Requests"
        subtitle="Track requests about your records without changing provider-authored clinical information."
        action={
          <Link  to="/patient/requests/new" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32
          ">
            <Plus size={17} />
            Create a request
          </Link>
        }
      />
      <div >
        {links
          .filter((item) => item.status !== "Linked")
          .map((link) => (
            <article key={link.id}>
              <span>
                <Link2 size={19} />
              </span>
              <div>
                <small>Record linking</small>
                <h2 className="tracking-tight not-italic">{link.facility}</h2>
                <p>{link.note}</p>
              </div>
              <StatusBadge label={link.status} />
              <Link to="/patient/records/connect" className="
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32
              ">View link details</Link>
            </article>
          ))}
        {requests.map((request) => (
          <article key={request.id}>
            <span>
              <FileClock size={19} />
            </span>
            <div>
              <small>{request.type}</small>
              <h2 className="tracking-tight not-italic">{request.facility}</h2>
              <p>
                Submitted {request.submittedAt} · Updated {request.updatedAt}
              </p>
            </div>
            <StatusBadge label={request.status} />
            <Link to={`/patient/requests/${request.id}`} className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32
            ">View request</Link>
          </article>
        ))}
      </div>
      {!requests.length && !links.some((item) => item.status !== "Linked") && (
        <PatientEmptyState
          icon={FileClock}
          title="You have not submitted any requests"
          text="Create a request to access, link, review or obtain a copy of eligible information."
          action={<Link to="/patient/requests/new" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32
          ">Create a request</Link>}
        />
      )}
    </div>
  )
}
