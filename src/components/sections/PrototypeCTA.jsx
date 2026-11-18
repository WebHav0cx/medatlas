import React from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function PrototypeCTA() {
  return (
    <section id="prototype" className="px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <span className="
          mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
          text-emerald-900 uppercase
        ">
          Interactive MVP
        </span>
        <h2 className="mb-5 font-serif text-4xl text-emerald-900 md:text-5xl">
          Experience the Prototype.
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
          See how MedAtlas works in a real hospital workflow from patient
          registration to secure cross-hospital record exchange.
        </p>

        {/* Browser mock */}
        <div
          className="mx-auto mb-8 max-w-170 overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3">
            <div className="flex gap-1.5">
              {["bg-red-400", "bg-amber-400", "bg-lime-500"].map((c) => (
                <div key={c} className={[("size-3 rounded-full"), c].filter(Boolean).join(" ")} />
              ))}
            </div>
            <div className="mx-3 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1 text-center text-xs text-slate-600">
              medatlas.ng/prototype
            </div>
          </div>
          {/* Content area */}
          <div className="flex min-h-60 flex-col items-center justify-center bg-emerald-900 px-8 py-16">
            <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border-1 border-emerald-200/30 bg-emerald-200/20">
              <ExternalLink size={22} className="text-green-300" />
            </div>
            <h3 className="mb-3 font-serif text-xl text-white">
              Interactive Hospital Workflow
            </h3>
            <p className="mb-6 max-w-sm text-center text-sm text-white/60">
              Patient registration → UMRN assignment → Discovery → Secure record
              exchange
            </p>
            <a
              href="#"
              className="
                inline-flex items-center gap-2 rounded-full bg-lime-500 px-7 py-3 text-sm font-semibold
                text-emerald-900 transition-all duration-200 hover:opacity-90
              "
            >
              Launch Interactive Prototype <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* Prototype steps */}
        <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
          {[
            "Hospital Login",
            "Register Patient",
            "Search by UMRN",
            "Discovery Results",
            "Request Records",
            "Approval Flow",
            "Secure Transfer",
            "Consultation View",
          ].map((step, i) => (
            <div
              key={step}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-center font-medium text-slate-600"
            >
              <span className="mb-0.5 block text-xs font-bold">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
