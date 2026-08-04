import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Problem() {
  return (
    <section id="problem" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl mb-4 font-display text-emerald-900 ">
            Healthcare Shouldn't Start
            <br />
            From Zero Every Time.
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-600">
            Every day, thousands of Nigerians move between hospitals carrying
            little or no medical history. Doctors rely on memory, paperwork, and
            repeated tests delaying care and increasing costs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-20 items-start">
          {/* Journey diagram */}
          <div className="rounded-2xl p-8 bg-white border">
            <p className="text-sm font-semibold mb-6">
              Aremu's journey fragmented
            </p>
            {[
              {
                label: "Hospital A  Ibadan",
                sub: "Surgery performed. Records created.",
                ok: true,
              },
              {
                label: "Records remain locked here",
                sub: "Trapped inside the facility",
                ok: false,
              },
              {
                label: "Aremu moves to Lagos",
                sub: "No records carried forward",
                ok: false,
              },
              {
                label: "Emergency  Hospital B",
                sub: "New doctor, no history available",
                ok: false,
              },
              {
                label: "Starts from zero",
                sub: "Repeated tests · New medications · Delays",
                ok: false,
              },
            ].map((step, i, arr) => (
              <div key={i}>
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${step.ok ? "bg-emerald-50 border-[1.5px] border-green-200" : "bg-red-50 border-[1.5px] border-red-200"}`}
                  >
                    {step.ok ? (
                      <CheckCircle2 size={14} className="text-emerald-900" />
                    ) : (
                      <XCircle size={14} className="text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{step.label}</p>
                    <p className="text-xs mt-0.5">{step.sub}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="ml-4 h-5 border-l-2 border-dashed border-slate-300" />
                )}
              </div>
            ))}
          </div>

          {/* Story */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display">Meet Aremu.</h3>
            <p className="text-base leading-relaxed text-slate-600">
              Two years ago, Aremu had surgery in Ibadan. His records stayed
              inside Hospital A. Months later he moved to Lagos. One evening he
              was rushed to another hospital with complications.
            </p>
            <div className="rounded-xl p-5 space-y-3 bg-white border">
              {[
                { q: "Have you had surgery before?", a: "Yes." },
                { q: "Which hospital?", a: '"I can\'t remember."' },
                {
                  q: "What medications were you given?",
                  a: '"I don\'t know."',
                },
                { q: "Do you have your test results?", a: '"No."' },
              ].map(({ q, a }) => (
                <div key={q}>
                  <p className="text-xs font-medium">{q}</p>
                  <p className="text-sm font-semibold">{a}</p>
                </div>
              ))}
            </div>
            <p className="text-base leading-relaxed text-slate-600">
              Not because the information didn't exist but because it was{" "}
              <span className="text-emerald-900 font-semibold">
                trapped inside another hospital.
              </span>
            </p>
            <p className="text-lg font-semibold font-display">
              Medical history should follow the patient not remain trapped
              inside a building.
            </p>
          </div>
        </div>

        {/* Before / After comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-7 bg-red-50 border-[1.5px] border-red-200">
            <p className="text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
              <XCircle size={14} /> Before MedAtlas
            </p>
            {[
              "Hospital A (Ibadan)",
              "Patient Leaves",
              "Records Stay Here",
              "Patient Moves to Lagos",
              "Hospital B (Lagos)",
              "Doctor Starts From Zero",
              "Repeated Tests",
              "Delayed Care · Higher Cost",
            ].map((step, i, arr) => (
              <div key={i}>
                <div className="flex items-center gap-2.5 py-1">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${i === 0 || i === 4 ? "bg-red-600" : "bg-red-300"}`}
                  />
                  <span
                    className={`text-sm ${i === 7 ? "text-red-600 font-semibold" : "text-emerald-950 font-normal"}`}
                  >
                    {step}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="ml-1 h-4 border-l border-dashed border-slate-300" />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-7 bg-green-50 border-[1.5px] border-green-200">
            <p className="text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
              <CheckCircle2 size={14} /> With MedAtlas
            </p>
            {[
              "Hospital A (Ibadan)",
              "Patient Leaves",
              "Healthcare Identity Created",
              "Patient Visits Hospital B",
              "Hospital Searches by UMRN",
              "Hospital A Discovered",
              "Secure Record Request",
              "Approval Granted",
              "Medical History Retrieved",
              "Doctor Continues Care ✓",
            ].map((step, i, arr) => (
              <div key={i}>
                <div className="flex items-center gap-2.5 py-1">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${i === 9 ? "bg-lime-500" : i === 2 ? "bg-emerald-900" : "bg-emerald-300"}`}
                  />
                  <span
                    className={`text-sm ${i === 9 ? "text-emerald-900 font-bold" : "text-emerald-950 font-normal"}`}
                  >
                    {step}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="ml-1 h-4 border-l border-slate-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
