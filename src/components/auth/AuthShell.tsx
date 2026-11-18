"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useIdentityStore } from "../../stores/identity";

export function AuthShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  const hydrated = useIdentityStore((state) => state.hydrated);
  const storageError = useIdentityStore((state) => state.storageError);
  useEffect(() => { if (!useIdentityStore.persist.hasHydrated()) void useIdentityStore.persist.rehydrate(); }, []);

  return <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
    <header className="border-b border-slate-200 bg-white px-6">
      <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4">
        <Link href="/" aria-label="MedAtlas home" className="
          rounded-lg transition duration-160 ease-in-out focus-visible:outline-3
          focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
        "><img src="/assets/medatlas_logo.png" alt="MedAtlas" className="h-12 w-auto" /></Link>
        <Link href="/" className="
          inline-flex items-center gap-2 rounded-lg text-sm font-medium text-emerald-900 transition
          duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32
        "><ArrowLeft aria-hidden="true" className="size-4" />Back to website</Link>
      </div>
    </header>
    <main id="main-content" className={[((wide) ? "mx-auto w-full max-w-5xl flex-1 px-6 py-12 md:py-16" : ""), (!(wide) ? "mx-auto w-full max-w-xl flex-1 px-6 py-12 md:py-16" : "")].filter(Boolean).join(" ")} >
      {storageError && <p role="status" className="mb-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">{storageError}</p>}
      {hydrated ? children : <p role="status" className="py-12 text-center text-slate-600">Loading your demo accounts…</p>}
    </main>
    <footer className="px-6 pb-8 text-center text-xs leading-relaxed text-slate-500">Protected by MedAtlas identity and access controls</footer>
  </div>;
}
