'use client';

import { type FormSectionProps } from './SourceConfig';

export function FormSection({ title, fields }: FormSectionProps) {
  return (
    <div  data-slot="form-section-provider" className="not-first:mt-5 not-first:border-t not-first:border-t-mist-200 not-first:pt-5">
      <h3 className="mb-3 text-sm tracking-tight not-italic">{title}</h3>
      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
        {fields.map((field) => (
          <label key={field} className="flex flex-col gap-1">
            <span className="text-xs font-bold text-olive-600">{field}</span>
            {field.includes("Sex") ? (
              <select className="
                h-10 min-h-10.5 w-full rounded-md border border-mist-200 bg-white px-2.5 text-xs text-mist-800
                transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                disabled:cursor-not-allowed disabled:opacity-52
              ">
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            ) : (
              <input placeholder={field.replace(" *", "")} className="
                h-10 min-h-10.5 rounded-md border border-mist-200 bg-white px-2.5 text-xs text-mist-800 transition
                duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              " />
            )}
          </label>
        ))}
      </div>
    </div>
  )
}
