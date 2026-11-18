"use client";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { Status } from "./Status";
import { statusTone } from "./statusTone";
import { PageHeader } from "./PageHeader";
import { liveDefinition } from "./liveDefinition";
import { AccessDenied } from "./AccessDenied";
import { DetailDrawer } from "./DetailDrawer";
import { WorkflowDialog } from "./WorkflowDialog";
import {
  type ProviderRole,
  roleConfig,
  modules,
  sharedModules,
  sharedAccess,
} from "./SourceConfig";

export function ModulePage({
  role,
  moduleKey,
}: {
  role: ProviderRole;
  moduleKey: string;
}) {
  const store = useMockData();
  const definition =
    liveDefinition(role, moduleKey, store.state) ??
    modules[`${role}/${moduleKey}`] ??
    (sharedAccess[role].includes(moduleKey)
      ? sharedModules[moduleKey]
      : undefined);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [sortAscending, setSortAscending] = useState(true);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[] | null>(null);
  const [confirming, setConfirming] = useState(false);
  const filtered = useMemo(
    () =>
      (definition?.rows ?? [])
        .filter((row) =>
          row.join(" ").toLowerCase().includes(query.toLowerCase()),
        )
        .filter(
          (row) =>
            statusFilter === "All statuses" ||
            row[row.length - 1] === statusFilter,
        )
        .sort((a, b) =>
          sortAscending ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]),
        ),
    [definition, query, statusFilter, sortAscending],
  );
  const pageSize = 8;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const statuses = Array.from(
    new Set((definition?.rows ?? []).map((row) => row[row.length - 1])),
  );
  if (!definition || definition.denied) return <AccessDenied />;
  return (
    <div
      className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24"
      data-slot="hospital-page"
    >
      <PageHeader
        eyebrow={roleConfig[role].title}
        title={definition.title}
        subtitle={definition.subtitle}
        action={
          definition.primary && (
            <button
              className="
                inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
              "
              data-slot="hospital-primary"
              onClick={() => setConfirming(true)}
            >
              <Plus size={16} />
              {definition.primary}
            </button>
          )
        }
      />
      <div
        className="mb-3 flex gap-2.5 max-md:flex-col"
        data-slot="hospital-filters"
      >
        <div
          className="
            flex min-h-10.5 flex-1 items-center gap-1.5 rounded-lg border border-mist-300 bg-white px-2.5
            text-xs text-mist-800 focus-within:border-emerald-700 focus-within:shadow-sm max-md:w-full
          "
        >
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder={`Search ${definition.title.toLowerCase()}`}
            className="
              min-h-10.5 flex-1 rounded-lg border-mist-300 bg-transparent text-xs text-mist-800 outline-hidden
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            "
          />
        </div>
        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value);
            setPage(1);
          }}
          className="
            flex h-10 min-h-10.5 w-auto items-center gap-1 rounded-lg border border-mist-200 bg-white px-2.5
            text-xs text-olive-600 transition duration-160 ease-in-out focus:border-emerald-700
            focus:shadow-sm focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
          "
        >
          <option>All statuses</option>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <button
          onClick={() => setSortAscending((current) => !current)}
          className="
            flex h-10 min-h-10.5 w-auto items-center gap-1 rounded-lg border border-mist-200 bg-white px-2.5
            text-xs text-olive-600 transition duration-160 ease-in-out focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52 max-md:w-full
          "
        >
          <ArrowRight size={15} />
          {sortAscending ? "A–Z" : "Z–A"}
        </button>
      </div>
      <div
        className="flex min-h-8 items-center justify-between text-xs text-olive-500"
        data-slot="hospital-grid-summary"
      >
        <span>
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
        </span>
        {(query || statusFilter !== "All statuses") && (
          <button
            onClick={() => {
              setQuery("");
              setStatusFilter("All statuses");
              setPage(1);
            }}
            className="
              bg-transparent text-xs font-semibold text-emerald-900 transition duration-160 ease-in-out
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            "
          >
            Clear filters
          </button>
        )}
      </div>
      <section
        className="overflow-clip rounded-xl border border-mist-200 bg-white"
        data-slot="hospital-table-panel"
      >
        <div
          className="
            sticky top-0 z-2 grid min-h-11 grid-cols-5 items-center gap-2.5 border-b border-b-taupe-100
            bg-slate-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-olive-500 uppercase
            max-md:hidden
          "
          data-slot="hospital-table-head"
        >
          {definition.columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
          <span />
        </div>
        {visibleRows.length ? (
          visibleRows.map((row) => (
            <button
              className="
                grid min-h-15 w-full cursor-pointer grid-cols-5 items-center gap-2.5 border-0 border-t
                border-t-taupe-100 bg-white px-4 py-2.75 text-left text-xs text-olive-600 transition duration-160
                ease-in-out hover:bg-slate-50 focus-visible:relative focus-visible:z-3 focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52 max-md:grid max-md:grid-cols-2 max-md:gap-2 max-md:p-3.5
              "
              data-slot="hospital-table-row"
              key={row.join("-")}
              onClick={() => setSelected(row)}
            >
              {row.map((cell, index) => (
                <span
                  data-label={definition.columns[index]}
                  key={cell}
                  className="max-md:col-start-1 max-md:col-end-auto max-md:flex max-md:items-center max-md:gap-1.5"
                ><span aria-hidden="true" className="hidden max-md:block max-md:w-20 max-md:flex-none max-md:text-xs max-md:text-olive-500">{definition.columns[index]}</span>
                  {index === row.length - 1 ? (
                    <Status label={cell} tone={statusTone(cell)} />
                  ) : (
                    cell
                  )}
                </span>
              ))}
              <ChevronRight
                size={16}
                className="max-md:col-start-2 max-md:col-end-auto max-md:row-start-1 max-md:row-end-auto"
              />
            </button>
          ))
        ) : (
          <div
            className="flex min-h-60 flex-col items-center justify-center text-center text-olive-500"
            data-slot="hospital-empty"
          >
            <Search size={24} />
            <h3
              className="mt-3 mb-1 text-base font-semibold tracking-tight text-mist-800 not-italic"
            >
              No matching items
            </h3>
            <p className="text-xs text-olive-600">
              Adjust your search or filters to view other authorised results.
            </p>
          </div>
        )}
      </section>
      {pageCount > 1 && (
        <div
          className="flex min-h-13 items-center justify-end gap-3 py-2.5"
          data-slot="hospital-pagination"
        >
          <button
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
            className="
              min-h-8.5 rounded-lg border border-mist-200 bg-white px-2.5 text-xs font-semibold text-emerald-900
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            "
          >
            Previous
          </button>
          <span className="text-xs text-olive-600">
            Page {page} of {pageCount}
          </span>
          <button
            disabled={page === pageCount}
            onClick={() => setPage((current) => current + 1)}
            className="
              min-h-8.5 rounded-lg border border-mist-200 bg-white px-2.5 text-xs font-semibold text-emerald-900
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            "
          >
            Next
          </button>
        </div>
      )}
      {/* <div className="mt-3 p-3 flex items-start gap-2 rounded-lg bg-blue-50 text-blue-700 text-xs">
        <ShieldCheck size={16} />
        <span className="flex flex-col">
          <strong>Authorisation-aware workspace</strong>Available actions
          reflect your account role and patient relationship.
        </span>
      </div> */}
      {selected && (
        <DetailDrawer
          title={selected[0]}
          rows={definition.columns.map((column, index) => [
            column,
            selected[index],
          ])}
          role={role}
          moduleKey={moduleKey}
          onClose={() => setSelected(null)}
        />
      )}
      {confirming && (
        <WorkflowDialog
          title={definition.primary ?? "Continue"}
          role={role}
          moduleKey={moduleKey}
          onClose={() => setConfirming(false)}
        />
      )}
    </div>
  );
}
