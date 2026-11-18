'use client';
import { Activity, RefreshCw } from "lucide-react";
import { Page } from './Page';
import { DataPageContent } from './DataPageContent';

export function ExchangeMonitoringPage() {
  return (
    <Page
      title="Exchange Monitoring"
      subtitle="Investigate delivery acknowledgements, delays, and eligible retries."
    >
      <div className="mb-3.5 grid grid-cols-4 gap-3 max-md:grid-cols-2" data-slot="provider-metrics monitoring-metrics">
        {[
          ["8", "Pending"],
          ["2", "Delayed"],
          ["1", "Failed"],
          ["24", "Delivered today"],
        ].map(([value, label], index) => (
          <div key={label} className="
            grid min-h-26 grid-cols-3 grid-rows-2 gap-x-2.5 rounded-xl border border-mist-200 bg-white p-4
            text-mist-800 no-underline max-md:min-h-28
          ">
            <span
              className={["row-start-1 row-end-3 grid size-9 place-items-center rounded-lg", (false ? "bg-mist-100 text-emerald-900" : ""), (!(index === 2) && !(index === 1) ? "bg-emerald-50 text-emerald-700" : ""), (!(index === 2) && (index === 1) ? "bg-amber-50 text-amber-700" : ""), ((index === 2) ? "bg-red-50 text-red-700" : "")].filter(Boolean).join(" ")} data-slot={`status-orb ${(index === 2 ? "error" : (index === 1 ? "warning" : "success"))}`}
            >
              <Activity size={17} />
            </span>
            <strong className="text-2xl font-bold tracking-tight text-mist-800 tabular-nums">{value}</strong>
            <small className="text-xs text-olive-600">{label}</small>
          </div>
        ))}
      </div>
      <DataPageContent
        columns={["Exchange", "Route", "Status", "Last Attempt", "Next Action"]}
        rows={[
          [
            "EXC-004812",
            "Mercy → CityCare",
            "Delayed",
            "11:22 AM",
            "Retry eligible",
          ],
          [
            "EXC-004809",
            "Prime → CityCare",
            "Failed",
            "10:48 AM",
            "Investigate",
          ],
          [
            "EXC-004806",
            "CityCare → Lagoon",
            "Pending",
            "10:32 AM",
            "Await acknowledgement",
          ],
        ]}
      />
      <div className="mt-2.5 flex gap-1.5 rounded-md bg-blue-50 p-2.5 text-xs text-blue-700" data-slot="safety-message">
        <RefreshCw size={16} />
        Eligible retries preserve the original request and exchange reference.
      </div>
    </Page>
  )
}
