'use client';
import {useMockData} from '@/stores/workflow/useMockData';
import {routeForRole} from '@/services/workflow/api';
import { Link } from "@/lib/workflow-router";
import { ShieldCheck } from "lucide-react";


export function AccessDenied() {
  const store=useMockData()
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="hospital-page">
      <div className="flex min-h-60 flex-col items-center justify-center text-center" data-slot="access-denied">
        <span className="grid size-16 place-items-center rounded-full bg-red-50 text-red-700">
          <ShieldCheck size={28} />
        </span>
        <h1 className="
          mt-4 mb-1.5 font-sans text-base leading-normal font-semibold tracking-tight text-mist-800
          not-italic normal-nums
        ">Access denied</h1>
        <p className="max-w-100 text-xs text-olive-600">
          Your current role does not permit access to this module or patient
          information.
        </p>
        <Link to={routeForRole(store.currentAccount.role)} className="
          mt-3 font-sans text-xs font-bold text-emerald-900 transition duration-160 ease-in-out
          focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
        ">Return to dashboard</Link>
      </div>
    </div>
  )
}
