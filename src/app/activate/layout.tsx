import type { ReactNode } from "react";
import { WorkflowFrame } from "@/components/shared/workflow/WorkflowFrame";
export default function WorkflowLayout({ children }: { children: ReactNode }) {
  return <WorkflowFrame>{children}</WorkflowFrame>;
}
