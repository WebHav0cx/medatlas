import React from "react";

export default function FutureVision() {
  // City positions as % of the transparent map image (approx)
  const cities = [
    { name: "Sokoto", pos: "top-15/100 left-17/100", xPct: 17, yPct: 15 },
    { name: "Kano", pos: "top-19/100 left-39/100", xPct: 39, yPct: 19 },
    { name: "Maiduguri", pos: "top-23/100 left-75/100", xPct: 75, yPct: 23 },
    { name: 'Abuja',          pos: "top-50/100 left-40/100", xPct: 40,  yPct: 50 }, // hub
    { name: "Ibadan", pos: "top-63/100 left-17/100", xPct: 17, yPct: 63 },
    { name: "Lagos", pos: "top-73/100 left-11/100", xPct: 11, yPct: 73 },
    { name: "Enugu", pos: "top-67/100 left-45/100", xPct: 45, yPct: 67 },
    { name: "Port Harcourt", pos: "top-82/100 left-49/100", xPct: 49, yPct: 82 },
  ];
  const hub = cities.find((c) => c.name === "Abuja");

  return (
    <section className="bg-emerald-900 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="
            mb-4 inline-block rounded-full bg-emerald-200/18 px-3 py-1 text-xs font-semibold tracking-widest
            text-green-300 uppercase
          ">
            The Vision
          </span>
          <h2 className="mb-5 font-serif text-4xl text-white md:text-5xl">
            Nigeria, connected.
          </h2>
          <p className="mx-auto max-w-xl text-lg text-white/65">
            Healthcare records should follow the patient not stay trapped inside
            the building where they were created.
          </p>
        </div>

        {/* Map — transparent PNG sits directly on the forest-green background.
            SVG overlay adds city dots and connection lines. */}
        <div className="relative mx-auto mb-14 max-w-170">
          <img
            src="/assets/map.png"
            alt="Nigeria 6-zone geopolitical map — North-West, North-East, North-Central, South-West, South-East, South-South"
            className="block w-full"
          />

          {/* SVG overlay — city nodes + connections to Abuja hub */}
          <svg
            className="absolute inset-0 size-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Connection lines from each city to Abuja hub */}
            {cities
              .filter((c) => c.name !== "Abuja")
              .map((c) => (
                <line
                  key={c.name}
                  x1={c.xPct}
                  y1={c.yPct}
                  x2={hub.xPct}
                  y2={hub.yPct}
                  className="stroke-white/35"
                  strokeWidth={0.4}
                  strokeDasharray="1.5 1.5"
                />
              ))}
          </svg>

          {/* City dots — positioned with % */}
          {cities.map((c) => (
            <div
              key={c.name}
              className={[("absolute z-10 -translate-x-1/2 -translate-y-1/2"), c.pos].filter(Boolean).join(" ")}
            >
              {c.name === "Abuja" ? (
                // Hub node
                <div className="relative flex items-center justify-center">
                  <div className="flex size-9 flex-col items-center justify-center rounded-full border-2 border-lime-500 bg-white shadow-sm">
                    <span className="font-sans text-xs leading-none font-extrabold text-emerald-900">
                      Med
                    </span>
                    <span className="font-sans text-xs leading-none font-extrabold text-emerald-900">
                      Atlas
                    </span>
                  </div>
                  <div className="
                    absolute top-110/100 left-1/2 mt-1 -translate-x-1/2 font-sans text-xs font-bold whitespace-nowrap
                    text-green-300 drop-shadow-sm
                  ">
                    Abuja Hub
                  </div>
                </div>
              ) : (
                // Regular city node
                <div className="relative flex flex-col items-center">
                  <div
                    className="size-2.5 rounded-full border-2 border-white/60 bg-white shadow-sm"
                  />
                  <span
                    className="mt-0.75 font-sans text-xs font-semibold whitespace-nowrap text-white/90 text-shadow-sm" data-slot="landing-original-body"
                  >
                    {c.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Zone legend */}
        <div className="mb-14 flex flex-wrap justify-center gap-3">
          {[
            { label: "North-West", color: "bg-amber-500" },
            { label: "North-East", color: "bg-red-500" },
            { label: "North-Central", color: "bg-violet-500" },
            { label: "South-West", color: "bg-blue-500" },
            { label: "South-East", color: "bg-emerald-500" },
            { label: "South-South", color: "bg-cyan-500" },
          ].map((z) => (
            <div key={z.label} className="flex items-center gap-1.5">
              <div className={[("size-2.5 rounded-sm"), z.color].filter(Boolean).join(" ")} />
              <span className="text-xs font-medium text-white/65">
                {z.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <p
            className="font-serif text-2xl leading-relaxed font-normal text-white/88 italic md:text-3xl" data-slot="landing-original-display"
          >
            "We're building the infrastructure that allows medical history to
            follow the patient not remain trapped inside a building."
          </p>
        </div>
      </div>
    </section>
  );
}
