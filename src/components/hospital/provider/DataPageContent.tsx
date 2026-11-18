'use client';
import { Check, ChevronRight, Search } from "lucide-react";


export function DataPageContent({
  columns,
  rows,
}: {
  columns: string[]
  rows: string[][]
}) {
  return (
    <section className="overflow-clip rounded-xl border border-mist-200 bg-white" data-slot="workspace-card data-card">
      <div className="mb-3 flex gap-2.5 border-b border-b-mist-200 p-3 max-md:flex-col" data-slot="data-tools">
        <div className="flex min-h-10.5 flex-1 items-center gap-1.5 rounded-md border border-mist-200 px-2.5 text-olive-500">
          <Search size={17} />
          <input placeholder="Search" className="
            h-auto min-h-10.5 flex-1 rounded-md border-mist-200 bg-white text-xs text-mist-800 outline-hidden
            transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52
          " />
        </div>
        <select className="
          h-9 min-h-10.5 w-full rounded-md border border-mist-200 bg-white px-2.5 text-xs text-mist-800
          transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
          focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
          disabled:cursor-not-allowed disabled:opacity-52
        ">
          <option>All statuses</option>
        </select>
      </div>
      <div  data-slot="responsive-table">
        <div  data-slot="table-header" className="
          sticky top-0 z-2 grid min-h-11 grid-cols-5 items-center gap-3 border-b border-b-taupe-100
          bg-slate-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-olive-500 uppercase
          max-md:hidden
        ">
          {columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
          <span />
        </div>
        {rows.map((row) => (
          <button  data-slot="table-data-row" key={row.join("-")} className="
            grid min-h-15 w-full cursor-pointer grid-cols-5 items-center gap-3 border-0 border-t
            border-t-taupe-100 bg-white px-4 py-2.75 text-left text-xs text-olive-600 transition duration-160
            ease-in-out hover:bg-slate-50 focus-visible:relative focus-visible:z-3 focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52 max-md:grid max-md:grid-cols-2 max-md:gap-2 max-md:p-3.5
          ">
            {row.map((cell, index) => (
              <span data-label={columns[index]} key={cell} className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:text-xs max-md:text-olive-500">{columns[index]}</span>
                {index === row.length - 1 ? (
                  <i className="
                    flex min-h-6.5 w-max items-center gap-1.25 rounded-md border border-emerald-700/18 bg-emerald-50
                    px-2 py-0.75 text-xs leading-none font-semibold text-emerald-700 not-italic
                  " data-slot="table-status">
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
  )
}
