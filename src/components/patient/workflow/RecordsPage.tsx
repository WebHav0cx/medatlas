'use client';
import { useState } from "react";
import { Link, useSearchParams } from "@/lib/workflow-router";
import { ArrowRight, FileText, Info, Link2, Search } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { friendlyDate } from './friendlyDate';
import { StatusBadge } from './StatusBadge';
import { PatientButton } from './PatientButton';
import { PatientPageHeader } from './PatientPageHeader';
import { PatientEmptyState } from './PatientEmptyState';
import { DocumentCategoryFilter } from './DocumentCategoryFilter';

export function RecordsPage() {
  const store = useMockData()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState(searchParams.get("category") ?? "")
  const [facility, setFacility] = useState("")
  const [sort, setSort] = useState("newest")
  const documents = store.patientDocuments()
  const categories = Array.from(new Set(documents.map((item) => item.category)))
  const facilities = Array.from(
    new Set(documents.map((item) => item.sourceFacility)),
  )
  const filtered = [...documents]
    .filter((item) =>
      `${item.title} ${item.category} ${item.sourceFacility}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .filter((item) => !category || item.category === category)
    .filter((item) => !facility || item.sourceFacility === facility)
    .sort((a, b) =>
      sort === "newest"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date),
    )

  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow="My health"
        title="My Health Records"
        subtitle="Released records from healthcare providers connected to your account."
        action={
          <Link  to="/patient/records/connect" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32
          ">
            <Link2 size={17} />
            Connect my records
          </Link>
        }
      />
      <div >
        <label >
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search records or providers" className="
              min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
              ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
              disabled:opacity-52
            "
          />
        </label>
        <DocumentCategoryFilter
          value={category}
          onChange={setCategory}
          options={categories}
        />
        <label>
          <span className="sr-only">Healthcare facility</span>
          <select
            value={facility}
            onChange={(event) => setFacility(event.target.value)} className="
              h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            "
          >
            <option value="">All healthcare facilities</option>
            {facilities.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Sort records</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)} className="
              h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            "
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>
      <div >
        <span>
          {filtered.length} available record{filtered.length === 1 ? "" : "s"}
        </span>
        {(query || category || facility) && (
          <button
            onClick={() => {
              setQuery("")
              setCategory("")
              setFacility("")
            }} className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            "
          >
            Clear filters
          </button>
        )}
      </div>
      {filtered.length ? (
        <div >
          {filtered.map((document) => (
            <article  key={document.id}>
              <div >
                <span>
                  <FileText size={21} />
                </span>
                <StatusBadge label="Available" />
              </div>
              <small>{document.category}</small>
              <h2 className="tracking-tight not-italic">{document.title}</h2>
              <dl>
                <div>
                  <dt>Healthcare facility</dt>
                  <dd>{document.sourceFacility}</dd>
                </div>
                <div>
                  <dt>Document date</dt>
                  <dd>{friendlyDate(document.date)}</dd>
                </div>
              </dl>
              <Link to={`/patient/records/${document.id}`} className="
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32
              ">
                View record
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      ) : documents.length ? (
        <PatientEmptyState
          icon={Search}
          title="No records match your search"
          text="Try another search term or clear your filters."
          action={
            <PatientButton
              onClick={() => {
                setQuery("")
                setCategory("")
                setFacility("")
              }}
            >
              Clear filters
            </PatientButton>
          }
        />
      ) : (
        <PatientEmptyState
          title="No health records available yet"
          text="Once your records are linked and released for patient access, you can find them here."
          action={<Link to="/patient/records/connect" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32
          ">Connect my records</Link>}
        />
      )}
      <div >
        <Info size={18} />
        <p>
          This is not necessarily your complete medical history. Availability
          depends on record linking, provider release and applicable access
          rules.
        </p>
      </div>
    </div>
  )
}
