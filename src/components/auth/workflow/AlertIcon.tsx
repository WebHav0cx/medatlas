'use client';
import { LockKeyhole } from "lucide-react";


export function AlertIcon() {
  return (
    <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-900" data-slot="auth-emblem">
      <LockKeyhole size={25} />
    </span>
  )
}
