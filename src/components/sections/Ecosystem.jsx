import React from "react";

export default function Ecosystem() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">
            Ecosystem
          </span>
          <h2
            className="mb-4 font-serif text-4xl text-emerald-900 md:text-5xl" data-slot="landing-original-display"
          >
            A Secure Bridge, Not a Silo.
          </h2>
          <p className="mx-auto max-w-xl text-lg text-slate-600">
            MedAtlas doesn't store everyone's records. It's the discovery and
            exchange layer connecting independent providers.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/assets/ecosystem.png"
            alt="Healthcare Ecosystem Diagram"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
