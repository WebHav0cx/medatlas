import React from "react";

export default function EMRComparison() {
  const rows = [
    ["Scope", "One hospital", "Cross-hospital network"],
    ["Stores patient records", "Yes, internally", "No stays with providers"],
    ["Interoperability", "Limited / none", "Core function"],
    ["Connectivity requirement", "Cloud-first", "Offline-first"],
    ["Designed for", "Internal workflows", "Fragmented ecosystems"],
    ["Replaces existing EMR?", "Yes", "No works alongside them"],
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">
            Positioning
          </span>
          <h2 className="text-4xl md:text-5xl mb-4 font-display text-emerald-900 ">
            We're not replacing EMRs.
            <br />
            We're connecting them.
          </h2>
          <p className="text-base max-w-xl mx-auto">
            Existing EMRs digitize one hospital. MedAtlas becomes the identity,
            discovery, and exchange layer that runs alongside every system.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-200">
          <div className="grid grid-cols-3 text-sm font-semibold bg-slate-50 border-b border-slate-200">
            <div className="px-5 py-3">Feature</div>
            <div className="px-5 py-3">Existing EMRs</div>
            <div className="px-5 py-3">MedAtlas</div>
          </div>
          {rows.map(([feature, emr, med], i) => (
            <div
              key={feature}
              className="grid grid-cols-3 text-sm"
              style={{
                borderBottom:
                  i < rows.length - 1
                    ? "1px solid var(--color-slate-200)"
                    : undefined,
                background: i % 2 === 0 ? "white" : "var(--color-slate-50)",
              }}
            >
              <div className="px-5 py-3.5 font-medium">{feature}</div>
              <div className="px-5 py-3.5">{emr}</div>
              <div className="px-5 py-3.5 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" />
                {med}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
