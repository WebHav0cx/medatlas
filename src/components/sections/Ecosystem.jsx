import React from "react";
import ecosystemImg from "../../assets/ecosystem.png";

export default function Ecosystem() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">
            Ecosystem
          </span>
          <h2
            className="text-4xl md:text-5xl mb-4 text-emerald-900 font-display"
            style={{
              color: "var(--color-emerald-900)",
              fontFamily: "'DM Serif Display', Georgia, serif",
            }}
          >
            A Secure Bridge, Not a Silo.
          </h2>
          <p className="text-lg max-w-xl mx-auto text-slate-600">
            MedAtlas doesn't store everyone's records. It's the discovery and
            exchange layer connecting independent providers.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={ecosystemImg}
            alt="Healthcare Ecosystem Diagram"
            className="w-full max-w-md "
          />
        </div>
      </div>
    </section>
  );
}
