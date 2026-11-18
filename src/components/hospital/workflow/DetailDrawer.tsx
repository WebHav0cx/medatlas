"use client";
import { downloadRecord } from "@/services/workflow/download";
import { FileText, ShieldCheck, Stethoscope, X } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { type ProviderRole } from "./SourceConfig";

export function DetailDrawer({
  title,
  rows,
  role,
  moduleKey,
  onClose,
}: {
  title: string;
  rows: string[][];
  role: ProviderRole;
  moduleKey: string;
  onClose: () => void;
}) {
  const store = useMockData();
  const request = store.state.requests.find((item) => item.id === title);
  const referral = store.state.referrals.find((item) => item.id === title);
  const task = store.state.tasks.find((item) => item.title === title);
  const staff = store.state.staff.find((item) => item.name === title);
  const patientLink = store.state.patientLinks.find(
    (item) => item.id === title,
  );
  const patientRequest = store.state.patientRequests.find(
    (item) => item.id === title,
  );
  const isDocument = [
    "records",
    "received-records",
    "facility-records",
  ].includes(moduleKey);
  const canReviewRequest =
    role === "records" &&
    ["incoming", "authorisations"].includes(moduleKey) &&
    request &&
    ["Submitted", "Under Review"].includes(request.status);
  return (
    <div className="fixed inset-0 z-100 bg-teal-950/42 backdrop-blur-xs" data-slot="hospital-drawer-backdrop" onClick={onClose}>
      <aside
        className="ml-auto h-full w-96 max-w-full bg-white p-5 shadow-xl max-md:w-full" data-slot="hospital-detail-drawer"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex justify-between border-b border-b-mist-200 pb-4">
          <div>
            <small className="text-xs font-semibold text-emerald-700 uppercase">Details</small>
            <h2 className="my-1 text-xl leading-normal font-bold tracking-tight text-mist-800 not-italic normal-nums">{title}</h2>
          </div>
          <button onClick={onClose} className="
            grid size-8 place-items-center rounded-md bg-mist-100 transition duration-160 ease-in-out
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
            disabled:cursor-not-allowed disabled:opacity-52
          ">
            <X size={18} />
          </button>
        </header>
        <div className="my-3 flex gap-2 rounded-lg border border-emerald-700/18 bg-emerald-50 p-3 text-emerald-700" data-slot="drawer-authorisation">
          <ShieldCheck size={17} />
          <span className="flex flex-col text-xs">
            <strong className="tabular-nums">Authorisation state</strong>Access granted for this account
            and workflow.
          </span>
        </div>
        <dl>
          {rows.map(([label, value]) => (
            <div key={label} className="flex min-h-11 justify-between gap-4 border-b border-b-taupe-100 py-2.5 text-xs">
              <dt className="text-olive-500">{label}</dt>
              <dd className="text-right font-semibold text-mist-800">{value}</dd>
            </div>
          ))}
        </dl>
        {isDocument && (
          <section className="my-4 overflow-hidden rounded-xl! border border-mist-200 bg-mist-100! p-0!" data-slot="document-preview-shell">
            <div className="flex min-h-11 items-center justify-between border-b border-b-mist-200 bg-teal-950 px-3 text-white" data-slot="document-preview-toolbar">
              <span className="flex items-center gap-1.5 text-xs font-semibold">
                <FileText size={15} />
                Document preview
              </span>
              <button
                type="button"
                onClick={() => {
                  const document = store.state.documents.find(
                    (document) =>
                      document.title === title &&
                      rows.some(
                        ([, value]) => value === document.sourceFacility,
                      ),
                  );
                  if (document) downloadRecord(document);
                }} className="
                  min-h-7.5 rounded-md border border-white/22 bg-transparent px-2 text-xs text-white transition
                  duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                "
              >
                Download
              </button>
            </div>
            <div className="m-3.5 border border-mist-200 bg-white p-5 shadow-sm" data-slot="document-preview-page">
              <div className="flex items-center gap-2.5 border-b-2 border-b-emerald-900 pb-3">
                <span className="grid size-8 place-items-center rounded-full bg-emerald-50 text-emerald-900" data-slot="document-source-mark">
                  <Stethoscope size={17} />
                </span>
                <div className="flex flex-col">
                  <strong className="text-xs text-mist-800 tabular-nums">
                    {rows.find(([label]) => label.includes("Source"))?.[1] ||
                      "Originating healthcare facility"}
                  </strong>
                  <small className="text-xs text-olive-500">Source-controlled clinical document</small>
                </div>
              </div>
              <h3 className="mb-2 text-xs font-bold tracking-tight text-mist-800 not-italic">{title}</h3>
              <dl>
                <div className="flex min-h-9! justify-between gap-4 border-b border-b-taupe-100 px-0! py-2! text-xs!">
                  <dt className="text-olive-500">Patient reference</dt>
                  <dd className="text-right font-semibold text-mist-800">
                    {rows.find(([label]) => label === "Patient")?.[1] ||
                      "Authorised patient"}
                  </dd>
                </div>
                <div className="flex min-h-9! justify-between gap-4 border-b border-b-taupe-100 px-0! py-2! text-xs!">
                  <dt className="text-olive-500">Document date</dt>
                  <dd className="text-right font-semibold text-mist-800">
                    {rows.find(([label]) => label.includes("Date"))?.[1] ||
                      "Recorded date"}
                  </dd>
                </div>
                <div className="flex min-h-9! justify-between gap-4 border-b border-b-taupe-100 px-0! py-2! text-xs!">
                  <dt className="text-olive-500">Version</dt>
                  <dd className="text-right font-semibold text-mist-800">Version 1</dd>
                </div>
              </dl>
              <p className="my-1 text-xs! leading-relaxed text-olive-600">
                This document preview contains fictional structured content
                associated with the selected record. Source provenance and
                access rules remain visible alongside the document.
              </p>
            </div>
          </section>
        )}
        <section className="my-4 rounded-lg bg-mist-100 p-3">
          <h3 className="mb-2 text-xs tracking-tight not-italic">Provenance and audit</h3>
          <p className="my-1 text-xs text-olive-600">
            Source organisation: CityCare Hospital or named originating
            facility.
          </p>
          <p className="my-1 text-xs text-olive-600">Opened by: {store.currentAccount.name}</p>
          <p className="my-1 text-xs text-olive-600">Event time: {new Date().toLocaleString("en-NG")}</p>
        </section>
        {canReviewRequest && (
          <div className="mt-4 mb-2.5 grid grid-cols-2 gap-2">
            <button
              className="
                min-h-10 w-full rounded-lg border border-olive-400 bg-white text-xs font-bold text-red-700
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              "
              onClick={() => {
                const reason = window.prompt(
                  "Reason for declining this request",
                );
                if (!reason) return;
                store.transitionRequest(request.id, "Declined", reason);
                onClose();
              }}
            >
              Decline Request
            </button>
            <button
              className="
                inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              " data-slot="hospital-primary"
              onClick={() => {
                store.transitionRequest(
                  request.id,
                  "Approved",
                  "Disclosure requirements reviewed.",
                );
                onClose();
              }}
            >
              Approve Request
            </button>
          </div>
        )}
        {request && role === "records" && request.status === "Approved" && (
          <button
            className="
              inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
              border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
              transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
              hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            " data-slot="hospital-primary drawer-action"
            onClick={() => {
              store.transitionRequest(
                request.id,
                "Fulfilled",
                "Document package prepared.",
              );
              onClose();
            }}
          >
            Mark as Fulfilled
          </button>
        )}
        {patientLink &&
          role === "records" &&
          ["Pending Verification", "Under Review"].includes(
            patientLink.status,
          ) && (
            <div className="mt-4 mb-2.5 grid grid-cols-2 gap-2">
              <button
                className="
                  min-h-10 w-full rounded-lg border border-olive-400 bg-white text-xs font-bold text-red-700
                  transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                "
                onClick={() => {
                  store.reviewPatientLink(
                    patientLink.id,
                    "Additional Information Required",
                    "Please contact the facility records team with supporting registration information.",
                  );
                  onClose();
                }}
              >
                Request More Information
              </button>
              <button
                className="
                  min-h-10 w-full rounded-lg border border-olive-400 bg-white text-xs font-bold text-red-700
                  transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                "
                onClick={() => {
                  store.reviewPatientLink(
                    patientLink.id,
                    "Declined",
                    "The submitted information could not be confirmed against this facility record.",
                  );
                  onClose();
                }}
              >
                Decline Link
              </button>
              <button
                className="
                  inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                  border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                  transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                  hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                " data-slot="hospital-primary"
                disabled={!patientLink.patientId}
                onClick={() => {
                  store.reviewPatientLink(
                    patientLink.id,
                    "Linked",
                    "Identity information reviewed and the facility record link was approved.",
                  );
                  onClose();
                }}
              >
                Approve Record Link
              </button>
            </div>
          )}
        {patientRequest && role === "records" && (
          <div className="mt-4 mb-2.5 grid grid-cols-2 gap-2">
            {patientRequest.status === "Submitted" && (
              <button
                className="
                  inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                  border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                  transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                  hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                " data-slot="hospital-primary"
                onClick={() => {
                  store.transitionPatientRequest(
                    patientRequest.id,
                    "Under Review",
                    "CityCare Hospital records team has started reviewing this request.",
                  );
                  onClose();
                }}
              >
                Begin Review
              </button>
            )}
            {patientRequest.status === "Under Review" && (
              <>
                <button
                  className="
                    min-h-10 w-full rounded-lg border border-olive-400 bg-white text-xs font-bold text-red-700
                    transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                  "
                  onClick={() => {
                    store.transitionPatientRequest(
                      patientRequest.id,
                      "Additional Information Required",
                      "Additional information is needed before this request can be completed.",
                    );
                    onClose();
                  }}
                >
                  Request Information
                </button>
                <button
                  className="
                    min-h-10 w-full rounded-lg border border-olive-400 bg-white text-xs font-bold text-red-700
                    transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                  "
                  onClick={() => {
                    store.transitionPatientRequest(
                      patientRequest.id,
                      "Declined",
                      "The facility could not fulfil this request under the available record access rules.",
                    );
                    onClose();
                  }}
                >
                  Decline Request
                </button>
                <button
                  className="
                    inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                    border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                    transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                    hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                  " data-slot="hospital-primary"
                  onClick={() => {
                    store.transitionPatientRequest(
                      patientRequest.id,
                      "Completed",
                      "The records team completed this patient information request.",
                    );
                    onClose();
                  }}
                >
                  Complete Request
                </button>
              </>
            )}
            {patientRequest.status === "Additional Information Required" && (
              <button
                className="
                  inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                  border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                  transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                  hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                " data-slot="hospital-primary"
                onClick={() => {
                  store.transitionPatientRequest(
                    patientRequest.id,
                    "Under Review",
                    "The request was returned to records review.",
                  );
                  onClose();
                }}
              >
                Resume Review
              </button>
            )}
          </div>
        )}
        {task && role === "nurse" && (
          <div className="mt-4 mb-2.5 grid grid-cols-2 gap-2">
            <button
              className="
                min-h-10 w-full rounded-lg border border-olive-400 bg-white text-xs font-bold text-red-700
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              "
              onClick={() => {
                store.updateTask(task.id, "Escalated");
                onClose();
              }}
            >
              Escalate
            </button>
            <button
              className="
                inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
                border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
                transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
                hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              " data-slot="hospital-primary"
              onClick={() => {
                store.updateTask(task.id, "Completed");
                onClose();
              }}
            >
              Mark Completed
            </button>
          </div>
        )}
        {referral && role === "doctor" && referral.status !== "Completed" && (
          <button
            className="
              inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
              border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
              transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
              hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            " data-slot="hospital-primary drawer-action"
            onClick={() => {
              const next =
                referral.status === "Submitted" ? "Acknowledged" : "Completed";
              store.transitionReferral(referral.id, next);
              onClose();
            }}
          >
            {referral.status === "Submitted"
              ? "Mark Acknowledged"
              : "Mark Completed"}
          </button>
        )}
        {staff && role === "admin" && (
          <button
            className="
              inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
              border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
              transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
              hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            " data-slot="hospital-primary drawer-action"
            onClick={() => {
              store.updateStaff(staff.id, {
                status:
                  staff.status === "Deactivated" ? "Active" : "Deactivated",
              });
              onClose();
            }}
          >
            {staff.status === "Deactivated"
              ? "Reactivate Account"
              : "Deactivate Account"}
          </button>
        )}
        <button className="
          inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border
          border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
          transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
          hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
        " data-slot="hospital-primary" onClick={onClose}>
          Close Details
        </button>
      </aside>
    </div>
  );
}
