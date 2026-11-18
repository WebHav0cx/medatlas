'use client';
import { Link } from "@/lib/workflow-router";
import { ShieldCheck } from "lucide-react";
import { Brand } from "@/components/shared/workflow/Brand";


export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50" data-slot="auth-app">
      <header className="
        flex h-18 items-center justify-between border-b border-b-mist-200 bg-white px-6 max-md:h-16
        max-md:px-4 max-md:py-0
      ">
        <Brand />
        <Link to="/" className="
          text-xs font-bold text-emerald-900 no-underline transition duration-160 ease-in-out
          focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
        ">Back to MedAtlas</Link>
      </header>
      <main className="m-auto w-full max-w-280 px-4 py-12 max-md:px-4 max-md:py-8">{children}</main>
      <footer className="flex items-center justify-center gap-1.5 p-4 text-xs text-olive-500">
        <ShieldCheck size={14} />
        MedAtlas account and organisation access
      </footer>
    </div>
  )
}
