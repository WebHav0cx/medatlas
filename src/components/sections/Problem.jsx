import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Problem() {
  return (
    <section id="problem" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">
            The Problem
          </span>
          <h2 className="mb-4 font-serif text-4xl text-emerald-900 md:text-5xl">
            Healthcare Shouldn't Start
            <br className="font-sans" />
            From Zero Every Time.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Every day, thousands of Nigerians move between hospitals carrying
            little or no medical history. Doctors rely on memory, paperwork, and
            repeated tests delaying care and increasing costs.
          </p>
        </div>

        <div className="mb-20 grid items-start gap-10 md:grid-cols-2">
          {/* Journey diagram */}
          <div className="rounded-2xl border bg-white p-8">
            <p className="mb-6 text-sm font-semibold">
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
                    className={["mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full", ((step.ok) ? "border-1 border-green-200 bg-emerald-50" : ""), (!(step.ok) ? "border-1 border-red-200 bg-red-50" : "")].filter(Boolean).join(" ")}
                  >
                    {step.ok ? (
                      <CheckCircle2 size={14} className="text-emerald-900" />
                    ) : (
                      <XCircle size={14} className="text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{step.label}</p>
                    <p className="mt-0.5 text-xs">{step.sub}</p>
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
            <h3 className="font-serif text-2xl">Meet Aremu.</h3>
            <p className="text-base leading-relaxed text-slate-600">
              Two years ago, Aremu had surgery in Ibadan. His records stayed
              inside Hospital A. Months later he moved to Lagos. One evening he
              was rushed to another hospital with complications.
            </p>
            <div className="space-y-3 rounded-xl border bg-white p-5">
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
              <span className="font-semibold text-emerald-900">
                trapped inside another hospital.
              </span>
            </p>
            <p className="font-sans text-lg font-semibold">
              Medical history should follow the patient not remain trapped
              inside a building.
            </p>
          </div>
        </div>

        {/* Before / After comparison */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-1 border-red-200 bg-red-50 p-7">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
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
                    className={["size-2 shrink-0 rounded-full", (!(i === 0) && !(i === 4) ? "bg-red-300" : ""), (((i === 0 || i === 4)) ? "bg-red-600" : "")].filter(Boolean).join(" ")}
                  />
                  <span
                    className={["text-sm", (!(i === 7) ? "font-normal text-emerald-950" : ""), ((i === 7) ? "font-semibold text-red-600" : "")].filter(Boolean).join(" ")}
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

          <div className="rounded-2xl border-1 border-green-200 bg-green-50 p-7">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
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
                    className={["size-2 shrink-0 rounded-full", (!(i === 9) && !(i === 2) ? "bg-emerald-300" : ""), (!(i === 9) && (i === 2) ? "bg-emerald-900" : ""), ((i === 9) ? "bg-lime-500" : "")].filter(Boolean).join(" ")}
                  />
                  <span
                    className={["text-sm", ((i === 9) ? "font-bold text-emerald-900" : ""), (!(i === 9) ? "font-normal text-emerald-950" : "")].filter(Boolean).join(" ")}
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
