'use client';
import { useState } from "react";
import { ArrowRight, Check, Info, X } from "lucide-react";
import { useMockData, type SharingPermission } from "@/stores/workflow/useMockData";
import { StatusBadge } from './StatusBadge';
import { PatientButton } from './PatientButton';

export function ConsentDetailPanel({
  permission,
  onClose,
}: {
  permission: SharingPermission
  onClose: () => void
}) {
  const store = useMockData()
  const [confirming, setConfirming] =
    useState<"Active" | "Declined" | "Withdrawn" | null>(null)
  const applyDecision = () => {
    if (confirming === "Withdrawn") store.withdrawPermission(permission.id)
    else if (confirming) store.decideSharing(permission.id, confirming)
    onClose()
  }
  return (
    <div  onClick={onClose}>
      <aside

        onClick={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span>Sharing request</span>
            <h2 className="tracking-tight not-italic">{permission.recordCategory}</h2>
          </div>
          <button onClick={onClose} aria-label="Close request details" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          ">
            <X size={19} />
          </button>
        </header>
        <div >
          <div>
            <small>Information source</small>
            <strong className="tabular-nums">{permission.sourceFacility}</strong>
          </div>
          <ArrowRight size={19} />
          <div>
            <small>Requested by</small>
            <strong className="tabular-nums">{permission.requestingOrganisation}</strong>
          </div>
        </div>
        <section>
          <h3 className="tracking-tight not-italic">What is being requested</h3>
          <dl>
            <div>
              <dt>Record</dt>
              <dd>{permission.recordCategory}</dd>
            </div>
            <div>
              <dt>Requesting professional</dt>
              <dd>{permission.requestingProfessional}</dd>
            </div>
            <div>
              <dt>Purpose</dt>
              <dd>{permission.purpose}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>{permission.scope}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{permission.duration}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <StatusBadge label={permission.status} />
              </dd>
            </div>
          </dl>
        </section>
        <div >
          <Info size={18} />
          <p>
            This decision applies only to the scope shown here. Other authorised
            legal or clinical processes may use a different basis and are not
            represented as patient consent requests.
          </p>
        </div>
        {confirming ? (
          <div >
            <h3 className="tracking-tight not-italic">
              {confirming === "Active"
                ? "Allow this sharing request?"
                : confirming === "Declined"
                  ? "Decline this sharing request?"
                  : "Withdraw this permission?"}
            </h3>
            <p>
              {confirming === "Active"
                ? `${permission.recordCategory} will be shared with ${permission.requestingOrganisation} for ${permission.purpose.toLowerCase()}.`
                : confirming === "Declined"
                  ? "The requesting organisation will see that this consent request was declined."
                  : "Withdrawal prevents future consent-based access. It cannot undo information already lawfully accessed or transferred."}
            </p>
            <div>
              <PatientButton
                variant="secondary"
                onClick={() => setConfirming(null)}
              >
                Go back
              </PatientButton>
              <PatientButton
                variant={confirming === "Active" ? "primary" : "danger"}
                onClick={applyDecision}
              >
                {confirming === "Active"
                  ? "Confirm and allow sharing"
                  : confirming === "Declined"
                    ? "Confirm decline"
                    : "Confirm withdrawal"}
              </PatientButton>
            </div>
          </div>
        ) : permission.status === "Pending Decision" ? (
          <div >
            <PatientButton
              variant="secondary"
              onClick={() => setConfirming("Declined")}
            >
              Decline request
            </PatientButton>
            <PatientButton onClick={() => setConfirming("Active")}>
              <Check size={17} />
              Allow sharing
            </PatientButton>
          </div>
        ) : permission.status === "Active" ? (
          <PatientButton
            variant="danger"
            onClick={() => setConfirming("Withdrawn")}
          >
            Withdraw permission
          </PatientButton>
        ) : null}
      </aside>
    </div>
  )
}
