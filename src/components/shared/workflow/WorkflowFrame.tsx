'use client';

import { Suspense, useEffect, type ReactNode } from 'react';
import { useWorkflowStore } from '@/stores/workflow/store';

export function WorkflowFrame({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}><HydratedWorkflow>{children}</HydratedWorkflow></Suspense>;
}

function HydratedWorkflow({ children }: { children: ReactNode }) {
  const ready = useWorkflowStore(state => state.hydrated);
  useEffect(() => {
    if (!useWorkflowStore.persist.hasHydrated()) void useWorkflowStore.persist.rehydrate();
  }, []);

  return (
    <div
      className="
        min-h-screen min-w-80 scrollbar-thumb-slate-200 scrollbar-track-transparent bg-slate-50 font-sans
        text-base leading-normal text-mist-800 antialiased motion-reduce:**:animate-none!
        motion-reduce:**:scroll-auto! motion-reduce:**:duration-0! motion-reduce:**:before:animate-none!
        motion-reduce:**:before:scroll-auto! motion-reduce:**:before:duration-0!
        motion-reduce:**:after:animate-none! motion-reduce:**:after:scroll-auto!
        motion-reduce:**:after:duration-0!
      "
      data-slot="workflow-ui"
    >
      {ready ? children : null}
    </div>
  );
}
