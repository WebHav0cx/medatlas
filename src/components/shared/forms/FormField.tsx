import type { ReactNode } from "react";

export const inputClassName = "min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 outline-none placeholder:text-slate-400 focus-visible:border-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-700/20 aria-invalid:border-red-600 disabled:bg-slate-100";
export const primaryButtonClassName = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none";

export function FormField({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-slate-800">{label}</label>
    {children}
    {error && <p id={`${id}-error`} role="alert" className="text-sm text-red-700">{error}</p>}
  </div>;
}

export function fieldAccessibility(id: string, error?: string) {
  return { "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined };
}

export function FormError({ message }: { message?: string }) {
  return message ? <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{message}</p> : null;
}
