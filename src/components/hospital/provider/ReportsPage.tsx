'use client';

import { Page } from './Page';

export function ReportsPage() {
  return (
    <Page
      title="Reports & Analytics"
      subtitle="Operational performance using recorded exchange events."
      action={<button className="
        inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
        border-mist-300 bg-white px-3.5 text-xs font-bold text-emerald-900 no-underline transition
        duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
        focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
      " data-slot="provider-secondary-action">Export CSV</button>}
    >
      <div className="mb-3 flex justify-end gap-2" data-slot="report-filters">
        <select className="
          h-9 min-h-10.5 w-auto rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
          transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
          focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
          disabled:cursor-not-allowed disabled:opacity-52
        ">
          <option>Last 30 days</option>
          <option>This week</option>
        </select>
        <select className="
          h-9 min-h-10.5 w-auto rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
          transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
          focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
          disabled:cursor-not-allowed disabled:opacity-52
        ">
          <option>All facilities</option>
        </select>
      </div>
      <div className="mb-3 grid grid-cols-5 gap-2.5 max-md:grid-cols-2" data-slot="analytics-grid">
        {[
          ["148", "Successful exchanges", "+12%"],
          ["42", "Request volume", "+4%"],
          ["38 min", "Median response time", "-7 min"],
          ["91%", "Approval rate", "+2%"],
          ["3", "Failed transfers", "-1"],
        ].map(([value, label, trend]) => (
          <div className="flex flex-col rounded-xl border border-mist-200 bg-white p-3" data-slot="workspace-card" key={label}>
            <span className="text-xs text-olive-600">{label}</span>
            <strong className="my-1.5 text-lg tabular-nums">{value}</strong>
            <small className="text-xs text-emerald-700">{trend} vs previous period</small>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1" data-slot="reports-layout">
        <section className="rounded-xl border border-mist-200 bg-white" data-slot="workspace-card">
          <div className="flex min-h-15 items-center justify-between border-b border-b-taupe-100 px-4 py-3.5" data-slot="workspace-card-head">
            <div>
              <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">Exchange volume</h2>
              <p className="mt-1 text-xs text-olive-500">Completed exchanges by week</p>
            </div>
          </div>
          <div className="flex h-60 items-end justify-around gap-3 border-b border-b-mist-200 p-6" data-slot="bar-chart">
            {['h-38/100', 'h-55/100', 'h-46/100', 'h-74/100', 'h-62/100', 'h-86/100', 'h-78/100'].map((heightClass, index) => (
              <span key={index} className={[(heightClass), "flex min-h-4 w-8 items-end rounded-tl-sm rounded-tr-sm rounded-br-none rounded-bl-none bg-emerald-50"].filter(Boolean).join(" ")}>
                <i className="h-3/4 w-full rounded-none bg-emerald-700" />
              </span>
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-mist-200 bg-white" data-slot="workspace-card category-report">
          <div className="flex min-h-15 items-center justify-between border-b border-b-taupe-100 px-4 py-3.5" data-slot="workspace-card-head">
            <div>
              <h2 className="text-sm font-semibold tracking-normal text-mist-800 not-italic">Record categories</h2>
              <p className="mt-1 text-xs text-olive-500">Share of completed exchanges</p>
            </div>
          </div>
          {[
            ["Laboratory Results", "34%"],
            ["Discharge Summaries", "27%"],
            ["Consultation Records", "21%"],
            ["Diagnostic Reports", "18%"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-b-mist-200 px-4 py-3 text-xs">
              <span>{label}</span>
              <strong className="tabular-nums">{value}</strong>
            </div>
          ))}
        </section>
      </div>
    </Page>
  )
}
