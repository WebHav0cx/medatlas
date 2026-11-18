'use client';
import { Link } from "@/lib/workflow-router";
import { ArrowRight, Building2 } from "lucide-react";
import { type PatientLinkStatus } from "@/stores/workflow/useMockData";
import { StatusBadge } from './StatusBadge';

export function ProviderCard({
  organisation,
  recordCount,
  status,
}: {
  organisation: {
    id: string
    name: string
    type: string
    location: string
  }
  recordCount: number
  status: PatientLinkStatus
}) {
  return (
    <article >
      <div>
        <span>
          <Building2 size={22} />
        </span>
        <StatusBadge label={status} />
      </div>
      <small>{organisation.type}</small>
      <h2 className="tracking-tight not-italic">{organisation.name}</h2>
      <p>{organisation.location}</p>
      <dl>
        <div>
          <dt>Available records</dt>
          <dd>{recordCount}</dd>
        </div>
        <div>
          <dt>Connection</dt>
          <dd>{status}</dd>
        </div>
      </dl>
      <Link to={`/patient/providers/${organisation.id}`} className="
        transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
        focus-visible:outline-emerald-700/32
      ">
        View provider details
        <ArrowRight size={16} />
      </Link>
    </article>
  )
}
