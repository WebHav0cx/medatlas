"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { identityDecisionSchema } from "@/schemas/workflow-forms";
import { useState } from "react";
import {
  Activity,
  AlertCircle,
  Check,
  ChevronRight,
  FileText,
  IdCard,
  Search,
} from "lucide-react";
import {
  useMockData,
  type IdentityStatus,
} from "@/stores/workflow/useMockData";
import { Status } from "./Status";
import { PageHeader } from "./PageHeader";

export function IdentityResolutionWorkspace() {
  const store = useMockData();
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(
    store.state.identityCases[0]?.id ?? "",
  );
  const { getFieldState, register, watch, trigger, reset } = useForm<
    z.infer<typeof identityDecisionSchema>
  >({
    resolver: zodResolver(identityDecisionSchema),
    defaultValues: { note: "" },
  });
  const note = watch("note");
  const [confirmMerge, setConfirmMerge] = useState(false);
  const cases = store.state.identityCases.filter(
    (item) => filter === "All" || item.status === filter,
  );
  const selected =
    store.state.identityCases.find((item) => item.id === selectedId) ??
    cases[0];
  const patientA = store.state.patients.find(
    (item) => item.id === selected?.patientAId,
  );
  const patientB = store.state.patients.find(
    (item) => item.id === selected?.patientBId,
  );

  const decide = async (status: IdentityStatus) => {
    if (!selected) return;
    if (!(await trigger("note"))) return;
    store.decideIdentityCase(selected.id, status, note.trim());
    reset({ note: "" });
    setConfirmMerge(false);
  };

  return (
    <div
      className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24"
      data-slot="hospital-page"
    >
      <PageHeader
        eyebrow="Medical Records Officer"
        title="Identity Resolution"
        subtitle="Compare identity evidence, document a decision and preserve review history."
      />
      <div
        className="mb-3 flex gap-2.5 max-md:flex-col"
        data-slot="identity-toolbar"
      >
        <div
          className="
            flex min-h-10.5 flex-1 items-center gap-1.5 rounded-lg border border-mist-300 bg-white px-2.5
            text-xs text-mist-800
          "
        >
          <Search size={16} />
          <input
            placeholder="Search case or patient"
            className="
              min-h-10.5 flex-1 rounded-lg border-mist-300 bg-transparent text-xs text-mist-800 outline-hidden
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            "
          />
        </div>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="
            h-10 min-h-10.5 w-auto rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
            transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
          "
        >
          <option>All</option>
          <option>Pending Review</option>
          <option>Verification Required</option>
          <option>Under Review</option>
          <option>Resolved as Distinct</option>
          <option>Merge Approved</option>
        </select>
      </div>
      <div
        className="grid grid-cols-2 items-start gap-4 max-md:grid-cols-1"
        data-slot="identity-layout"
      >
        <aside
          className="overflow-hidden rounded-xl border border-mist-200 bg-white"
          data-slot="identity-case-list"
        >
          {cases.map((item) => {
            const a = store.state.patients.find(
              (patient) => patient.id === item.patientAId,
            );
            const b = store.state.patients.find(
              (patient) => patient.id === item.patientBId,
            );
            return (
              <button
                data-slot={selected?.id === item.id ? "active" : ""}
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={[
                  `
                    flex min-h-21 w-full cursor-pointer flex-col gap-1 border-0 border-b border-b-taupe-100 p-3.5
                    text-left transition duration-160 ease-in-out focus-visible:outline-3
                    focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                    disabled:opacity-52
                  `,
                  !(selected?.id === item.id) ? "bg-white" : "",
                  selected?.id === item.id ? "bg-emerald-50 shadow-sm" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <strong className="text-xs text-emerald-900 tabular-nums">
                    {item.id}
                  </strong>
                  <Status
                    label={item.status}
                    tone={
                      item.status.includes("Resolved") ||
                      item.status.includes("Approved")
                        ? "success"
                        : "pending"
                    }
                  />
                </div>
                <span className="text-sm font-semibold text-mist-800">
                  {a?.firstName} {a?.lastName}
                </span>
                <small className="text-xs text-olive-500">
                  compared with {b?.firstName} {b?.lastName}
                </small>
              </button>
            );
          })}
          {!cases.length && (
            <div
              className="px-4 py-8 text-center text-xs text-olive-500"
              data-slot="identity-empty"
            >
              No cases match this filter.
            </div>
          )}
        </aside>
        {selected && patientA && patientB ? (
          <section
            className="overflow-hidden rounded-xl border border-mist-200 bg-white"
            data-slot="identity-investigation"
          >
            <div
              className="flex items-start justify-between border-b border-b-mist-200 p-4"
              data-slot="identity-case-header"
            >
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase">
                  Case {selected.id}
                </span>
                <h2 className="mt-1 text-sm font-semibold tracking-tight text-mist-800 not-italic">
                  Potential duplicate identity review
                </h2>
              </div>
              <Status
                label={selected.status}
                tone={
                  selected.status.includes("Resolved") ||
                  selected.status.includes("Approved")
                    ? "success"
                    : "pending"
                }
              />
            </div>
            <div
              className="grid grid-cols-3 gap-2.5 border-b border-b-mist-200 bg-slate-50 px-4 py-3"
              data-slot="identity-evidence-summary"
            >
              <div className="flex flex-col">
                <strong className="text-base tabular-nums">
                  {selected.matchingEvidence.length}
                </strong>
                <span className="text-xs text-olive-500">
                  Matching attributes
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="text-base tabular-nums">
                  {selected.conflictingEvidence.length}
                </strong>
                <span className="text-xs text-olive-500">
                  Conflicting attributes
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="text-base tabular-nums">
                  {selected.documents.length}
                </strong>
                <span className="text-xs text-olive-500">
                  Supporting documents
                </span>
              </div>
            </div>
            <div
              className="grid grid-cols-2 gap-3 p-4 max-md:grid-cols-1"
              data-slot="identity-side-by-side"
            >
              {[patientA, patientB].map((patient, index) => (
                <article
                  key={patient.id}
                  className="rounded-lg border border-mist-200 bg-white p-3.5"
                >
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-emerald-700 uppercase">
                      Identity {index === 0 ? "A" : "B"}
                    </span>
                    <Status
                      label={patient.verification}
                      tone={
                        patient.verification === "Verified"
                          ? "success"
                          : "pending"
                      }
                    />
                  </div>
                  <h3 className="my-3 text-base tracking-tight not-italic">
                    {patient.firstName} {patient.lastName}
                  </h3>
                  <dl>
                    <div className="flex min-h-10 justify-between gap-2.5 border-t border-t-mist-200 py-1.5 text-xs">
                      <dt className="text-xs text-olive-500">MedAtlas ID</dt>
                      <dd className="max-w-3/5 text-right font-bold">
                        {patient.medAtlasId}
                      </dd>
                    </div>
                    <div className="flex min-h-10 justify-between gap-2.5 border-t border-t-mist-200 py-1.5 text-xs">
                      <dt className="text-xs text-olive-500">Date of birth</dt>
                      <dd className="max-w-3/5 text-right font-bold">
                        {patient.dob}
                      </dd>
                    </div>
                    <div className="flex min-h-10 justify-between gap-2.5 border-t border-t-mist-200 py-1.5 text-xs">
                      <dt className="text-xs text-olive-500">Sex</dt>
                      <dd className="max-w-3/5 text-right font-bold">
                        {patient.sex}
                      </dd>
                    </div>
                    <div className="flex min-h-10 justify-between gap-2.5 border-t border-t-mist-200 py-1.5 text-xs">
                      <dt className="text-xs text-olive-500">Phone</dt>
                      <dd className="max-w-3/5 text-right font-bold">
                        •••{patient.phone.slice(-4)}
                      </dd>
                    </div>
                    <div className="flex min-h-10 justify-between gap-2.5 border-t border-t-mist-200 py-1.5 text-xs">
                      <dt className="text-xs text-olive-500">Local ID</dt>
                      <dd className="max-w-3/5 text-right font-bold">
                        {patient.localId}
                      </dd>
                    </div>
                    <div className="flex min-h-10 justify-between gap-2.5 border-t border-t-mist-200 py-1.5 text-xs">
                      <dt className="text-xs text-olive-500">Facilities</dt>
                      <dd className="max-w-3/5 text-right font-bold">
                        {patient.sourceFacilities.join(", ")}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
            <div
              className="grid grid-cols-3 gap-3 px-4 pb-4 max-md:grid-cols-1"
              data-slot="evidence-grid"
            >
              <section className="rounded-lg border border-mist-200 bg-slate-50 p-3">
                <h3 className="mb-2 flex items-center gap-1.5 text-xs tracking-tight not-italic">
                  <Check size={16} />
                  Matching evidence
                </h3>
                {selected.matchingEvidence.map((item) => (
                  <p key={item} className="my-1.5 text-xs text-olive-600">
                    {item}
                  </p>
                ))}
              </section>
              <section className="rounded-lg border border-mist-200 bg-slate-50 p-3">
                <h3 className="mb-2 flex items-center gap-1.5 text-xs tracking-tight not-italic">
                  <AlertCircle size={16} />
                  Conflicting evidence
                </h3>
                {selected.conflictingEvidence.map((item) => (
                  <p key={item} className="my-1.5 text-xs text-olive-600">
                    {item}
                  </p>
                ))}
              </section>
              <section className="rounded-lg border border-mist-200 bg-slate-50 p-3">
                <h3 className="mb-2 flex items-center gap-1.5 text-xs tracking-tight not-italic">
                  <FileText size={16} />
                  Supporting documents
                </h3>
                {selected.documents.map((item) => (
                  <button
                    key={item}
                    className="
                      flex w-full justify-between border-0 border-b border-b-mist-200 bg-transparent py-1.5 text-left
                      text-xs text-emerald-900 transition duration-160 ease-in-out focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    "
                  >
                    {item}
                    <ChevronRight size={14} />
                  </button>
                ))}
              </section>
            </div>
            <label
              className="mx-4 flex flex-col gap-1.5"
              data-slot="review-note"
            >
              <span className="text-xs font-semibold text-olive-600">
                Review notes *
              </span>
              <textarea
                {...register("note")}
                aria-invalid={getFieldState("note").invalid || undefined}
                placeholder="Document evidence considered and rationale for the decision"
                className="
                  min-h-22 w-full resize-y rounded-lg border border-mist-300 bg-white p-3 text-xs leading-normal
                  text-mist-800 transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                  focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                  disabled:cursor-not-allowed disabled:opacity-52
                "
              />
            </label>
            <div
              className="flex justify-end gap-2 px-4 py-3 max-md:flex-col"
              data-slot="identity-decision-actions"
            >
              {selected.status.includes("Resolved") ||
              selected.status.includes("Approved") ? (
                <button
                  onClick={() => store.reopenIdentityCase(selected.id)}
                  className="
                    min-h-10 rounded-lg border border-mist-300 bg-white px-3 text-xs font-bold text-emerald-900
                    transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
                  "
                >
                  Reopen Case
                </button>
              ) : (
                <>
                  <button
                    onClick={() => decide("Verification Required")}
                    className="
                      min-h-10 rounded-lg border border-mist-300 bg-white px-3 text-xs font-bold text-emerald-900
                      transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                      focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
                    "
                  >
                    Request Further Verification
                  </button>
                  <button
                    onClick={() => decide("Resolved as Distinct")}
                    className="
                      min-h-10 rounded-lg border border-mist-300 bg-white px-3 text-xs font-bold text-emerald-900
                      transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                      focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
                    "
                  >
                    Mark as Distinct
                  </button>
                  <button
                    className="
                      inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                      border-mist-300 bg-white px-3 text-xs font-bold tracking-normal text-emerald-900 transition
                      duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900 hover:bg-emerald-900
                      focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                      disabled:cursor-not-allowed disabled:opacity-52 max-md:w-full
                    "
                    data-slot="hospital-primary"
                    onClick={() => note.trim() && setConfirmMerge(true)}
                  >
                    Propose Merge
                  </button>
                </>
              )}
            </div>
            <section
              className="mx-4 mb-4 border-t border-t-mist-200 pt-3"
              data-slot="decision-history"
            >
              <h3 className="text-xs tracking-tight not-italic">
                Decision history
              </h3>
              {selected.decisions.length ? (
                selected.decisions.map((decision, index) => (
                  <div
                    key={`${decision.at}-${index}`}
                    className="flex gap-2 border-b border-b-mist-200 py-2.5"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-blue-50 text-blue-700">
                      <Activity size={14} />
                    </span>
                    <div className="flex flex-col">
                      <strong className="text-xs tabular-nums">
                        {decision.action}
                      </strong>
                      <p className="my-0.5 text-xs text-olive-600">
                        {decision.note}
                      </p>
                      <small className="my-0.5 text-xs text-olive-600">
                        {decision.actor} · {decision.at}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <p className="my-0.5 text-xs text-olive-600">
                  No previous decisions recorded.
                </p>
              )}
            </section>
          </section>
        ) : (
          <div
            className="flex min-h-60 flex-col items-center justify-center text-center text-olive-500"
            data-slot="hospital-empty"
          >
            <IdCard size={25} />
            <h3 className="mt-3 mb-1 text-base font-semibold tracking-tight text-mist-800 not-italic">
              Select an identity case
            </h3>
          </div>
        )}
      </div>
      {confirmMerge && selected && (
        <div
          className="fixed inset-0 z-110 grid place-items-center bg-teal-950/42 p-4 backdrop-blur-xs"
          data-slot="hospital-dialog-backdrop"
        >
          <section
            className="w-96 max-w-full rounded-2xl border border-mist-200 bg-white p-6 text-center shadow-xl"
            data-slot="hospital-confirm-dialog"
          >
            <span
              className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-amber-50 text-amber-700"
              data-slot="dialog-warning"
            >
              <AlertCircle size={22} />
            </span>
            <h2 className="text-xl leading-normal font-bold tracking-tight text-mist-800 not-italic normal-nums">
              Confirm merge proposal
            </h2>
            <p className="text-xs leading-normal text-olive-600">
              This records a merge proposal for approval. The identities remain
              separate until the decision is approved.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setConfirmMerge(false)}
                className="
                  min-h-9 rounded-lg border border-mist-200 bg-white px-3 py-0 text-xs font-bold text-emerald-900
                  transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                "
              >
                Cancel
              </button>
              <button
                onClick={() => decide("Merge Approved")}
                className="
                  min-h-9 rounded-lg border border-emerald-900 bg-emerald-900 px-3 py-0 text-xs font-bold text-white
                  transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                "
              >
                Approve Merge Decision
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
