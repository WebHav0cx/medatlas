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
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">
            Positioning
          </span>
          <h2 className="mb-4 font-serif text-4xl text-emerald-900 md:text-5xl">
            We're not replacing EMRs.
            <br className="font-sans" />
            We're connecting them.
          </h2>
          <p className="mx-auto max-w-xl text-base">
            Existing EMRs digitize one hospital. MedAtlas becomes the identity,
            discovery, and exchange layer that runs alongside every system.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-sm font-semibold">
            <div className="px-5 py-3">Feature</div>
            <div className="px-5 py-3">Existing EMRs</div>
            <div className="px-5 py-3">MedAtlas</div>
          </div>
          {rows.map(([feature, emr, med], i) => (
            <div
              key={feature}
              className={["grid grid-cols-3 text-sm", ((i < rows.length - 1) ? "border-b border-b-slate-200" : ""), (!(i % 2 === 0) ? "bg-slate-50" : ""), ((i % 2 === 0) ? "bg-white" : "")].filter(Boolean).join(" ")}
            >
              <div className="px-5 py-3.5 font-medium">{feature}</div>
              <div className="px-5 py-3.5">{emr}</div>
              <div className="flex items-center gap-1.5 px-5 py-3.5 font-semibold">
                <span className="size-1.5 shrink-0 rounded-full" />
                {med}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
