import React from "react";
import mapImg from "../../assets/map.png";

export default function FutureVision() {
  // City positions as % of the transparent map image (approx)
  const cities = [
    { name: "Sokoto", pos: "left-[17%] top-[15%]", xPct: 17, yPct: 15 },
    { name: "Kano", pos: "left-[39%] top-[19%]", xPct: 39, yPct: 19 },
    { name: "Maiduguri", pos: "left-[75%] top-[23%]", xPct: 75, yPct: 23 },
    { name: 'Abuja',          pos: 'left-[40%] top-[50%]', xPct: 40,  yPct: 50 }, // hub
    { name: "Ibadan", pos: "left-[17%] top-[63%]", xPct: 17, yPct: 63 },
    { name: "Lagos", pos: "left-[11%] top-[73%]", xPct: 11, yPct: 73 },
    { name: "Enugu", pos: "left-[45%] top-[67%]", xPct: 45, yPct: 67 },
    { name: "Port Harcourt", pos: "left-[49%] top-[82%]", xPct: 49, yPct: 82 },
  ];
  const hub = cities.find((c) => c.name === "Abuja");

  return (
    <section className="py-24 px-6 bg-emerald-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-[rgba(163,232,188,0.18)] text-green-300">
            The Vision
          </span>
          <h2 className="text-4xl md:text-5xl mb-5 text-white font-display">
            Nigeria, connected.
          </h2>
          <p className="text-lg max-w-xl mx-auto text-white/65">
            Healthcare records should follow the patient not stay trapped inside
            the building where they were created.
          </p>
        </div>

        {/* Map — transparent PNG sits directly on the forest-green background.
            SVG overlay adds city dots and connection lines. */}
        <div className="relative mx-auto mb-14 max-w-[680px]">
          <img
            src={mapImg}
            alt="Nigeria 6-zone geopolitical map — North-West, North-East, North-Central, South-West, South-East, South-South"
            className="w-full block"
          />

          {/* SVG overlay — city nodes + connections to Abuja hub */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
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
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth={0.4}
                  strokeDasharray="1.5 1.5"
                />
              ))}
          </svg>

          {/* City dots — positioned with % */}
          {cities.map((c) => (
            <div
              key={c.name}
              className={`absolute ${c.pos} -translate-x-1/2 -translate-y-1/2 z-10`}
            >
              {c.name === "Abuja" ? (
                // Hub node
                <div className="relative flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white border-[2.5px] border-lime-500 flex flex-col items-center justify-center shadow-[0_0_0_6px_rgba(132,204,22,0.18)]">
                    <span className="text-[7px] font-extrabold text-emerald-900 leading-[1.1] font-body">
                      Med
                    </span>
                    <span className="text-[7px] font-extrabold text-emerald-900 leading-[1.1] font-body">
                      Atlas
                    </span>
                  </div>
                  <div className="absolute top-[110%] left-1/2 -translate-x-1/2 whitespace-nowrap mt-1 text-[8px] font-bold text-green-300 font-body drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                    Abuja Hub
                  </div>
                </div>
              ) : (
                // Regular city node
                <div className="relative flex flex-col items-center">
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "white",
                      border: "2px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 0 0 3px rgba(255,255,255,0.15)",
                    }}
                  />
                  <span
                    style={{
                      marginTop: 3,
                      fontSize: 7,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.9)",
                      whiteSpace: "nowrap",
                      fontFamily: "Outfit, sans-serif",
                      textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                    }}
                  >
                    {c.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Zone legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {[
            { label: "North-West", color: "bg-amber-500" },
            { label: "North-East", color: "bg-red-500" },
            { label: "North-Central", color: "bg-violet-500" },
            { label: "South-West", color: "bg-blue-500" },
            { label: "South-East", color: "bg-emerald-500" },
            { label: "South-South", color: "bg-cyan-500" },
          ].map((z) => (
            <div key={z.label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-sm ${z.color}`} />
              <span className="text-xs font-medium text-white/65">
                {z.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p
            className="text-2xl md:text-3xl leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.88)",
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            "We're building the infrastructure that allows medical history to
            follow the patient not remain trapped inside a building."
          </p>
        </div>
      </div>
    </section>
  );
}
