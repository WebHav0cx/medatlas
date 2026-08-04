import React from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function PrototypeCTA() {
  return (
    <section id="prototype" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">
          Interactive MVP
        </span>
        <h2 className="text-4xl md:text-5xl mb-5 text-emerald-900 font-display">
          Experience the Prototype.
        </h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto text-slate-600">
          See how MedAtlas works in a real hospital workflow from patient
          registration to secure cross-hospital record exchange.
        </p>

        {/* Browser mock */}
        <div
          className="rounded-2xl overflow-hidden mx-auto mb-8"
          style={{
            border: "1px solid var(--color-slate-200)",
            boxShadow: "0 8px 40px rgba(26,71,49,0.10)",
            maxWidth: 680,
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
            <div className="flex gap-1.5">
              {["bg-red-400", "bg-amber-400", "bg-lime-500"].map((c) => (
                <div key={c} className={`w-3 h-3 rounded-full ${c}`} />
              ))}
            </div>
            <div className="flex-1 mx-3 rounded-lg px-3 py-1 text-xs text-center bg-white text-slate-600 border border-slate-200">
              medatlas.ng/prototype
            </div>
          </div>
          {/* Content area */}
          <div className="flex flex-col items-center justify-center py-16 px-8 bg-emerald-900 min-h-[240px]">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-[rgba(163,232,188,0.2)] border-[1.5px] border-[rgba(163,232,188,0.3)]">
              <ExternalLink size={22} className="text-green-300" />
            </div>
            <h3 className="text-xl mb-3 text-white font-display">
              Interactive Hospital Workflow
            </h3>
            <p className="text-sm mb-6 max-w-sm text-center text-white/60">
              Patient registration → UMRN assignment → Discovery → Secure record
              exchange
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 bg-lime-500 text-emerald-900"
            >
              Launch Interactive Prototype <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* Prototype steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
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
              className="rounded-xl px-3 py-2.5 text-center font-medium bg-white border border-slate-200 text-slate-600"
            >
              <span className="block text-xs mb-0.5 font-bold">
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
