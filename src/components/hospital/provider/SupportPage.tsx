'use client';
import { ChevronRight, ClipboardCheck, Search, ShieldCheck, Wifi } from "lucide-react";
import { Page } from './Page';

export function SupportPage() {
  return (
    <Page title="Help & Support" subtitle="Guidance for MedAtlas workflows.">
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1" data-slot="support-grid">
        {[
          [
            "Using patient search",
            "Identity matching and verification guidance",
            Search,
          ],
          [
            "Managing record requests",
            "Create, review, authorize and track requests",
            ClipboardCheck,
          ],
          [
            "Connectivity and sync",
            "Understand offline and delayed operations",
            Wifi,
          ],
          [
            "Privacy and security",
            "Access controls, authorization and auditability",
            ShieldCheck,
          ],
        ].map(([title, text, Icon]) => (
          <button className="
            grid min-h-18 grid-cols-3 items-center gap-3 rounded-xl border border-mist-200 bg-white p-3
            text-left transition duration-160 ease-in-out focus-visible:outline-3
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
            disabled:opacity-52
          " data-slot="workspace-card" key={title as string}>
            <span className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-emerald-900">
              <Icon size={20} />
            </span>
            <div className="flex flex-col">
              <strong className="text-xs tabular-nums">{title as string}</strong>
              <small className="text-xs text-olive-500">{text as string}</small>
            </div>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
      <section className="
        mt-3 flex items-center justify-between rounded-xl border border-mist-200 bg-white p-4
        max-md:flex-col max-md:items-stretch max-md:gap-4
      " data-slot="workspace-card support-contact">
        <div>
          <h2 className="text-xs tracking-tight not-italic">Need additional help?</h2>
          <p className="mt-1 text-xs text-olive-600">
            In production this form creates a support or privacy review case.
          </p>
        </div>
        <button className="
          inline-flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg border
          border-emerald-900 bg-emerald-900 px-3.5 text-xs font-semibold tracking-normal text-white
          no-underline transition duration-160 ease-in-out hover:-translate-y-px hover:border-emerald-900
          hover:bg-emerald-900 focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
        " data-slot="provider-primary-action">Report a Problem</button>
      </section>
    </Page>
  )
}
