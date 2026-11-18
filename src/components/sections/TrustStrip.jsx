import React from 'react';


export default function TrustStrip() {
  const items = ['Hospitals', 'Clinics', 'Laboratories', 'Diagnostic Centres', 'Healthcare Providers', 'Healthcare Networks']
  return (
    <section className="border-y border-slate-200 bg-white px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3">
        <span className="mr-2 text-xs font-semibold tracking-widest uppercase">
          Designed for
        </span>
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-3">
            <span
              className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-900"
            >
              {item}
            </span>
            {i < items.length - 1 && (
              <span className="size-1 rounded-full" />
            )}
          </span>
        ))}
      </div>
    </section>
  )
}
