import React from "react";

export default function Stats() {
  return (
    <section className="bg-emerald-900 px-6 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 text-center text-white md:grid-cols-4">
        {[
          [
            "77%+",
            "Estimated healthcare facilities have not fully adopted Electronic Health Records",
          ],

          ["<10%", "of Nigerians have health insurance coverage"],
          [
            "40,000+",
            "Healthcare facilities across Nigeria require interoperability.",
          ],
          [
            "Paper-Based",
            "Medical records in many Nigerian healthcare facilities are still paper or hybrid systems",
          ],
        ].map(([num, desc]) => (
          <div key={num}>
            <div
              className={[((num.length > 10) ? "mt-2" : ""), "mb-2 font-sans font-bold text-green-300", ((num.length > 10) ? "text-2xl" : ""), (!(num.length > 10) ? "text-4xl" : "")].filter(Boolean).join(" ")}
            >
              {num}
            </div>
            <p className="text-sm leading-snug opacity-75">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
