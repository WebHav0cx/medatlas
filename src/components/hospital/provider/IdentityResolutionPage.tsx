'use client';
import { AlertCircle } from "lucide-react";
import { Page } from './Page';
import { LockIcon } from './LockIcon';
import { IdentityColumn } from './IdentityColumn';

export function IdentityResolutionPage() {
  return (
    <Page
      title="Identity Resolution"
      subtitle="Restricted workspace for authorized identity stewards."
    >
      <div className="mb-4 flex gap-3 rounded-lg bg-amber-50 p-3.5 text-amber-700" data-slot="restricted-banner">
        <LockIcon />
        <div>
          <strong className="tabular-nums">Restricted administrative module</strong>
          <p className="mt-1 text-xs">
            Merge and correction actions require elevated permissions and an
            immutable production audit trail.
          </p>
        </div>
      </div>
      <section className="rounded-xl border border-mist-200 bg-white" data-slot="workspace-card">
        <div className="flex min-h-15 items-center justify-between border-b border-b-taupe-100 px-4 py-3.5" data-slot="workspace-card-head">
          <div>
            <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">Possible duplicate · IDR-00219</h2>
            <p className="mt-1 text-xs text-olive-500">Raised by registration matching · 23 Oct 2026</p>
          </div>
          <i className="
            flex min-h-6.5 w-max items-center gap-1.25 rounded-md border border-emerald-700/18 bg-emerald-50
            px-2 py-0.75 text-xs leading-none font-semibold text-emerald-700 not-italic
          " data-slot="table-status">
            <AlertCircle size={12} />
            Review required
          </i>
        </div>
        <div className="grid grid-cols-3 items-center gap-4 p-4 max-md:grid-cols-1" data-slot="identity-comparison">
          <IdentityColumn
            title="Identity A"
            id="MA-002841"
            localId="CH-29384"
            phone="•••4821"
          />
          <div className="flex flex-col items-center text-center max-md:p-2" data-slot="comparison-score">
            <strong className="text-2xl text-amber-700 tabular-nums">86%</strong>
            <span className="text-xs font-bold text-emerald-700 uppercase">Match confidence</span>
            <small className="text-xs text-olive-600">Manual verification required</small>
          </div>
          <IdentityColumn
            title="Identity B"
            id="MA-009331"
            localId="MSH-11482"
            phone="•••4821"
          />
        </div>
        <div className="flex justify-end gap-2 border-t border-t-mist-200 p-4 max-md:flex-col" data-slot="identity-actions">
          <button className="
            min-h-9 rounded-md border border-mist-200 bg-white px-3 text-xs font-bold text-emerald-900
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:bg-mist-100
            disabled:text-olive-500 disabled:opacity-52
          ">Request Additional Verification</button>
          <button disabled className="
            min-h-9 rounded-md border border-mist-200 bg-white px-3 text-xs font-bold text-emerald-900
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:bg-mist-100
            disabled:text-olive-500 disabled:opacity-52
          ">Submit Merge Request</button>
        </div>
      </section>
    </Page>
  )
}
