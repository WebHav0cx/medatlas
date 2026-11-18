'use client';
import { useState } from "react";
import { Check, ChevronRight, Plus, Search } from "lucide-react";
import { Page } from './Page';
import { datasets } from './SourceConfig';

export function DataPage({ kind }: { kind: keyof typeof datasets }) {
  const data = datasets[kind]
  const [query, setQuery] = useState("")
  const rows = data.rows.filter((row) =>
    row.join(" ").toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <Page
      title={data.title}
      subtitle={data.subtitle}
      action={
        kind === "requests" ? (
          <button className="
            inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
            border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
            no-underline transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
            hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
          " data-slot="provider-primary-action">
            <Plus size={16} />
            Create Request
          </button>
        ) : undefined
      }
    >
      {kind === "requests" && (
        <div className="mb-3 flex gap-5 border-b border-b-mist-200 max-md:overflow-x-auto" data-slot="request-tabs">
          {["Incoming", "Outgoing", "Pending", "Completed"].map(
            (tab, index) => (
              <button  data-slot={(index === 0 ? "active" : "")} key={tab} className={[`
                border-0 border-b-2 bg-transparent py-3 text-xs font-bold transition duration-160 ease-in-out
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              `, (!(index === 0) ? "border-b-transparent text-olive-600" : ""), ((index === 0) ? "border-b-emerald-900 text-emerald-900" : "")].filter(Boolean).join(" ")}>
                {tab}
              </button>
            ),
          )}
        </div>
      )}
      <section className="overflow-clip rounded-xl border border-mist-200 bg-white" data-slot="workspace-card data-card">
        <div className="mb-3 flex gap-2.5 border-b border-b-mist-200 p-3 max-md:flex-col" data-slot="data-tools">
          <div className="flex min-h-10.5 flex-1 items-center gap-1.5 rounded-md border border-mist-200 px-2.5 text-olive-500">
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${data.title.toLowerCase()}`} className="
                h-auto min-h-10.5 flex-1 rounded-md border-mist-200 bg-white text-xs text-mist-800 outline-hidden
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              "
            />
          </div>
          <select className="
            h-9 min-h-10.5 w-full rounded-md border border-mist-200 bg-white px-2.5 text-xs text-mist-800
            transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52
          ">
            <option>All statuses</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Failed</option>
          </select>
          <input type="date" className="
            h-9 min-h-10.5 rounded-md border border-mist-200 bg-white px-2.5 text-xs text-mist-800 transition
            duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52
          " />
        </div>
        <div  data-slot="responsive-table">
          <div  data-slot="table-header" className="
            sticky top-0 z-2 grid min-h-11 grid-cols-5 items-center gap-3 border-b border-b-taupe-100
            bg-slate-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-olive-500 uppercase
            max-md:hidden
          ">
            {data.columns.map((column) => (
              <span key={column}>{column}</span>
            ))}
            <span />
          </div>
          {rows.map((row) => (
            <button  data-slot="table-data-row" key={row[0] + row[1]} className="
              grid min-h-15 w-full cursor-pointer grid-cols-5 items-center gap-3 border-0 border-t
              border-t-taupe-100 bg-white px-4 py-2.75 text-left text-xs text-olive-600 transition duration-160
              ease-in-out hover:bg-slate-50 focus-visible:relative focus-visible:z-3 focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52 max-md:grid max-md:grid-cols-2 max-md:gap-2 max-md:p-3.5
            ">
              {row.map((cell, index) => (
                <span data-label={data.columns[index]} key={cell} className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:text-xs max-md:text-olive-500">{data.columns[index]}</span>
                  {index === row.length - 1 ? (
                    <i
                      className={[`
                        flex min-h-6.5 w-max items-center gap-1.25 rounded-md border px-2 py-0.75 text-xs leading-none
                        font-semibold not-italic
                      `, (false ? "border-transparent bg-emerald-50 text-emerald-700" : ""), (!(cell === "Failed") ? "border-emerald-700/18 bg-emerald-50 text-emerald-700" : ""), ((cell === "Failed") ? "border-red-700/18 bg-red-50 text-red-700" : "")].filter(Boolean).join(" ")} data-slot={`table-status ${(cell === "Failed" ? "failed" : "")}`}
                    >
                      <Check size={12} />
                      {cell}
                    </i>
                  ) : (
                    cell
                  )}
                </span>
              ))}
              <ChevronRight size={16} className="max-md:col-start-2 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto" />
            </button>
          ))}
        </div>
      </section>
    </Page>
  )
}
