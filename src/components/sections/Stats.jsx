import React from "react";

export default function Stats() {
  return (
    <section className="py-16 px-6 bg-emerald-900">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-white">
        {[
          ["77%+", "Estimated healthcare facilities have not fully adopted Electronic Health Records"],
          ["71%", "of healthcare spending is paid out-of-pocket"],
          ["<10%", "of Nigerians have health insurance coverage"],
          ["40,000+", "Healthcare facilities across Nigeria"],
        ].map(([num, desc]) => (
          <div key={num}>
            <div className="text-4xl font-bold mb-2 font-display text-green-300">
              {num}
            </div>
            <p className="text-sm leading-snug opacity-75">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
