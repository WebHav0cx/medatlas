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
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">Workflow</span>
          <h2
            className="text-4xl md:text-5xl mb-4 font-display text-emerald-900 font-display"
          >
            How MedAtlas Makes This Possible.
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-start">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-start flex-1">
              <div className="flex-1">
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-white bg-emerald-900"
                >
                  {step.icon}
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center bg-lime-500 text-emerald-900"
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  className="text-lg font-semibold mb-2 font-display"
                >
                  {step.title}
                </h3>
                <ul className="space-y-1">
                  {step.points.map(p => (
                    <li key={p} className="text-sm flex items-start gap-1.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-emerald-900" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-shrink-0 flex items-center pt-8 w-8"
                >
                  <div className="flex-1 h-px bg-slate-200" />
                  <ChevronRight size={14} className="text-slate-600 shrink-0 mx-[-1px]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-8">
          {steps.map(step => (
            <div key={step.num} className="flex gap-4">
              <div
                className="relative w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-white bg-emerald-900"
              >
                {step.icon}
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center bg-lime-500 text-emerald-900"
                >
                  {step.num}
                </span>
              </div>
              <div>
                <h3
                  className="text-lg font-semibold mb-1 font-display"
                >
                  {step.title}
                </h3>
                <ul className="space-y-1">
                  {step.points.map(p => (
                    <li key={p} className="text-sm flex items-start gap-1.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-emerald-900" />
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
