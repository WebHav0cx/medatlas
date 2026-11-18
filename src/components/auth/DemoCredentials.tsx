import { DEMO_PASSWORD } from "../../data/identity-seed";

export function DemoCredentials() {
  return <details className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-600"><summary className="cursor-pointer">Password</summary><code className="mt-2 block font-semibold break-all text-emerald-900">{DEMO_PASSWORD}</code></details>;
}
