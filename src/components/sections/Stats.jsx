import React from "react";

export default function Stats() {
  return (
    <section className="py-16 px-6 bg-emerald-900">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-white">
        {[
          ["~40%", "of patients repeat diagnostic tests at a new hospital"],
          ["72 hrs", "average care delay caused by missing medical records"],
          ["60%", "of medical records in Nigeria still paper-based"],
          ["₦18B+", "estimated annual loss to duplicate diagnostics"],
        ].map(([num, desc]) => (
          <div key={num}>
            <div className="text-4xl font-bold mb-2 font-display text-green-300">
              {num}
            </div>
            <p className="text-sm leading-snug opacity-75">{desc}</p>
            <p className="text-xs mt-1.5 italic opacity-35">
              Estimated pending verified data
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
