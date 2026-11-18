'use client';
import { ArrowRight, ShieldCheck } from "lucide-react";
import { type SharingPermission } from "@/stores/workflow/useMockData";
import { StatusBadge } from './StatusBadge';
import { PatientButton } from './PatientButton';

export function SharingRequestCard({
  permission,
  onView,
}: {
  permission: SharingPermission
  onView: () => void
}) {
  return (
    <article >
      <div >
        <span>
          <ShieldCheck size={21} />
        </span>
        <div>
          <small>Sharing decision requested</small>
          <h2 className="tracking-tight not-italic">{permission.requestingOrganisation}</h2>
          <p>{permission.createdAt}</p>
        </div>
        <StatusBadge label={permission.status} />
      </div>
      <p>
        <strong className="tabular-nums">{permission.requestingOrganisation}</strong> is requesting
        access to your {permission.recordCategory.toLowerCase()} from{" "}
        {permission.sourceFacility}.
      </p>
      <dl>
        <div>
          <dt>Requested by</dt>
          <dd>{permission.requestingProfessional}</dd>
        </div>
        <div>
          <dt>Purpose</dt>
          <dd>{permission.purpose}</dd>
        </div>
        <div>
          <dt>Access scope</dt>
          <dd>{permission.scope}</dd>
        </div>
      </dl>
      <PatientButton onClick={onView}>
        View request details
        <ArrowRight size={16} />
      </PatientButton>
    </article>
  )
}
