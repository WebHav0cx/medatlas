"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createInitialMockState } from "../../data/workflow/seed.ts";
import { workflowStateSchema } from "../../schemas/workflow-persistence.ts";
import type { MockState } from "../../domain/workflow/types.ts";
export const WORKFLOW_STORAGE_KEY = "medatlas-mock-state-v1";
interface WorkflowStore {
  data: MockState;
  hydrated: boolean;
  setData: (data: MockState) => void;
  setHydrated: () => void;
}
export function restoreWorkflowState(
  value: unknown,
  current: MockState,
): MockState {
  const snapshot = workflowStateSchema.partial().safeParse(value);
  if (!snapshot.success) return current;
  return {
    ...current,
    ...snapshot.data,
    staff: snapshot.data.staff
      ? [
          ...snapshot.data.staff,
          ...current.staff.filter(
            (seed) =>
              seed.role.startsWith("lab-") &&
              !snapshot.data.staff?.some((account) => account.id === seed.id),
          ),
        ]
      : current.staff,
  };
}
export function serialiseWorkflowState(data: MockState) {
  return {
    ...data,
    patientAccounts: data.patientAccounts.map(
      ({ password, ...account }) => account,
    ),
  };
}
const browserStorage = {
  getItem(name: string) {
    const raw = localStorage.getItem(name);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === "object" && parsed !== null && "state" in parsed)
      return raw;
    return JSON.stringify({
      version: 1,
      state: {
        data: parsed,
      },
    });
  },
  setItem(name: string, value: string) {
    try {
      localStorage.setItem(name, value);
    } catch {}
  },
  removeItem(name: string) {
    localStorage.removeItem(name);
  },
};
export const useWorkflowStore = create<WorkflowStore>()(
  persist(
    (set) => ({
      data: createInitialMockState(),
      hydrated: false,
      setData: (data) =>
        set({
          data,
        }),
      setHydrated: () =>
        set({
          hydrated: true,
        }),
    }),
    {
      name: WORKFLOW_STORAGE_KEY,
      version: 1,
      skipHydration: true,
      storage: createJSONStorage(() => browserStorage),
      partialize: (s) => ({
        data: serialiseWorkflowState(s.data),
      }),
      migrate: (value) => value,
      merge: (persisted, current) => ({
        ...current,
        data: restoreWorkflowState(
          typeof persisted === "object" &&
            persisted !== null &&
            "data" in persisted
            ? persisted.data
            : persisted,
          current.data,
        ),
      }),
      onRehydrateStorage: () => () => {
        useWorkflowStore.getState().setHydrated();
      },
    },
  ),
);
