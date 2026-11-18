import React from "react";

export default function Roadmap() {
  const phases = [
    {
      num: "01",
      label: "MVP Active",
      title: "Identity, Discovery & Exchange",
      items: [
        "Healthcare Identity (UMRN)",
        "Discovery Network",
        "Secure Record Exchange",
        "Offline-first infrastructure",
      ],
      active: true,
    },
    {
      num: "02",
      label: "Phase Two",
      title: "EMR Integrations",
      items: [
        "Hospital API connectors",
        "Automated record exports",
        "Deep EMR compatibility",
      ],
      active: false,
    },
    {
      num: "03",
      label: "Phase Three",
      title: "MedAtlas Lite",
      items: [
        "Lightweight offline EMR",
        "For paper-record hospitals",
        "Seamless network upgrade path",
      ],
      active: false,
    },
    {
      num: "04",
      label: "Phase Four",
      title: "Ecosystem Expansion",
      items: [
        "Lab & Pharmacy modules",
        "Government HIE integration",
        "AI-powered health insights",
        "National analytics",
      ],
      active: false,
    },
  ];

  return (
    <section id="roadmap" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">
            Product Roadmap
          </span>
          <h2 className="mb-4 font-serif text-4xl text-emerald-900 md:text-5xl">
            Building incrementally.
            <br className="font-sans" />
            Designed for national scale.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {phases.map((phase) => (
            <div
              key={phase.num}
              className={[((phase.active) ? "flex flex-col gap-3 rounded-2xl bg-emerald-900 p-6" : ""), (!(phase.active) ? "flex flex-col gap-3 rounded-2xl border bg-white p-6" : ""), (!(phase.active) ? "border-slate-200" : ""), ((phase.active) ? "border-yellow-700/18" : "")].filter(Boolean).join(" ")} data-slot={`     ${(phase.active ? " " : "  ")}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={[((phase.active) ? "rounded-full px-2.5 py-1 text-xs font-bold" : ""), (!(phase.active) ? "rounded-full px-2.5 py-1 text-xs font-bold" : ""), (!(phase.active) ? "bg-emerald-50 text-emerald-900" : ""), ((phase.active) ? "bg-green-300/20 text-green-300" : "")].filter(Boolean).join(" ")}
                >
                  {phase.label}
                </span>
                {phase.active && (
                  <span className="rounded bg-lime-500 px-2 py-0.5 text-xs font-bold text-emerald-900">
                    Now
                  </span>
                )}
              </div>
              <h3
                className={[(false ? "font-serif" : ""), ((phase.active) ? "font-serif text-lg font-semibold" : ""), (!(phase.active) ? "font-serif text-lg font-semibold" : ""), (!(phase.active) ? "text-emerald-900" : ""), ((phase.active) ? "text-white" : "")].filter(Boolean).join(" ")}
              >
                {phase.title}
              </h3>
              <ul className="mt-1 space-y-1.5">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className={[((phase.active) ? "flex items-start gap-1.5 text-xs text-white/80" : ""), (!(phase.active) ? "flex items-start gap-1.5 text-xs text-slate-600" : "")].filter(Boolean).join(" ")}
                  >
                    <span
                      className={[((phase.active) ? "mt-1.5 size-1 shrink-0 rounded-full bg-green-300" : ""), (!(phase.active) ? "mt-1.5 size-1 shrink-0 rounded-full bg-lime-500" : "")].filter(Boolean).join(" ")}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
