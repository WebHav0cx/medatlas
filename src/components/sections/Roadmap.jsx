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
    <section id="roadmap" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">
            Product Roadmap
          </span>
          <h2 className="text-4xl md:text-5xl mb-4 text-emerald-900 font-display">
            Building incrementally.
            <br />
            Designed for national scale.
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {phases.map((phase) => (
            <div
              key={phase.num}
              className={`rounded-2xl p-6 flex flex-col gap-3 ${phase.active ? "bg-emerald-900 border-none" : "bg-white border border-slate-200"}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${phase.active ? "bg-green-300/20 text-green-300" : "bg-emerald-50 text-emerald-900"}`}
                >
                  {phase.label}
                </span>
                {phase.active && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-lime-500 text-emerald-900">
                    Now
                  </span>
                )}
              </div>
              <h3
                className={`text-lg font-semibold font-display ${phase.active ? "text-white" : "text-emerald-900"}`}
              >
                {phase.title}
              </h3>
              <ul className="space-y-1.5 mt-1">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className={`text-xs flex items-start gap-1.5 ${phase.active ? "text-[rgba(255,255,255,0.8)]" : "text-slate-600"}`}
                  >
                    <span
                      className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${phase.active ? "bg-green-300" : "bg-lime-500"}`}
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
