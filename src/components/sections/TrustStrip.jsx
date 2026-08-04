import React from 'react';


export default function TrustStrip() {
  const items = ['Hospitals', 'Clinics', 'Laboratories', 'Diagnostic Centres', 'Healthcare Providers', 'Healthcare Networks']
  return (
    <section className="py-8 px-6 border-y border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest mr-2">
          Designed for
        </span>
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-3">
            <span
              className="text-sm font-semibold px-3 py-1 rounded-full"
              style={{ background: 'var(--color-emerald-50)', color: 'var(--color-emerald-900)' }}
            >
              {item}
            </span>
            {i < items.length - 1 && (
              <span className="w-1 h-1 rounded-full" />
            )}
          </span>
        ))}
      </div>
    </section>
  )
}
