import React from 'react';
import { Network, ArrowUpDown, User, Stethoscope, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { num: '1', title: 'Registration', points: ['Patient registers', 'Identity verified', 'UMRN assigned'], icon: <User size={20} /> },
    { num: '2', title: 'Clinical Care', points: ['Hospital treats patient', 'Diagnosis & labs', 'Records stored locally'], icon: <Stethoscope size={20} /> },
    { num: '3', title: 'Discovery', points: ['Patient visits new facility', 'Search by UMRN', 'Previous providers found'], icon: <Network size={20} /> },
    { num: '4', title: 'Secure Exchange', points: ['Request sent', 'Approval granted', 'Encrypted transfer complete'], icon: <ArrowUpDown size={20} /> },
  ]

  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">Workflow</span>
          <h2
            className="mb-4 font-serif text-4xl text-emerald-900 md:text-5xl"
          >
            How MedAtlas Makes This Possible.
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden items-start md:flex">
          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-1 items-start">
              <div className="flex-1">
                <div
                  className="relative mb-5 flex size-16 items-center justify-center rounded-2xl bg-emerald-900 text-white"
                >
                  {step.icon}
                  <span
                    className="
                      absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-lime-500 text-xs
                      font-bold text-emerald-900
                    "
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  className="mb-2 font-serif text-lg font-semibold"
                >
                  {step.title}
                </h3>
                <ul className="space-y-1">
                  {step.points.map(p => (
                    <li key={p} className="flex items-start gap-1.5 text-sm">
                      <span className="mt-1.5 size-1 flex-shrink-0 rounded-full bg-emerald-900" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex w-8 flex-shrink-0 items-center pt-8"
                >
                  <div className="h-px flex-1 bg-slate-200" />
                  <ChevronRight size={14} className="-mx-0.25 shrink-0 text-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-8 md:hidden">
          {steps.map(step => (
            <div key={step.num} className="flex gap-4">
              <div
                className="relative flex size-14 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-900 text-white"
              >
                {step.icon}
                <span
                  className="
                    absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-lime-500 text-xs
                    font-bold text-emerald-900
                  "
                >
                  {step.num}
                </span>
              </div>
              <div>
                <h3
                  className="mb-1 font-serif text-lg font-semibold"
                >
                  {step.title}
                </h3>
                <ul className="space-y-1">
                  {step.points.map(p => (
                    <li key={p} className="flex items-start gap-1.5 text-sm">
                      <span className="mt-1.5 size-1 flex-shrink-0 rounded-full bg-emerald-900" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
