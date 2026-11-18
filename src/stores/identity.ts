"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { snapshotSchema } from "../schemas/identity-persistence.ts";
import { createIdentitySeed } from "../data/identity-seed.ts";
import type { ActionResult, IdentityData } from "../domain/identity.ts";
import type {
  OrganisationValues,
  PortalValues,
  SignInValues,
  StaffActivationValues,
} from "../schemas/auth.ts";
import {
  activatePatient,
  activateStaff,
  appendAudit,
  registerOrganisation,
  signIn,
} from "../services/identity.ts";

interface IdentityStore {
  data: IdentityData;
  sessionAccountId: string | null;
  hydrated: boolean;
  storageError: string | null;
  registerOrganisation: (values: OrganisationValues) => ActionResult;
  signIn: (
    values: SignInValues,
    audience: "patient" | "provider",
  ) => ActionResult;
  activatePatient: (values: PortalValues) => ActionResult;
  activateStaff: (values: StaffActivationValues) => ActionResult;
  signOut: () => void;
  finishHydration: (error?: string) => void;
}

export const useIdentityStore = create<IdentityStore>()(
  persist(
    (set, get) => {
      function apply(transition: {
        data: IdentityData;
        result: ActionResult;
      }): ActionResult {
        if (transition.result.ok)
          set({
            data: transition.data,
            sessionAccountId: transition.result.accountId,
          });
        return transition.result;
      }
      return {
        data: createIdentitySeed(),
        sessionAccountId: null,
        hydrated: false,
        storageError: null,
        registerOrganisation: (values) =>
          apply(registerOrganisation(get().data, values)),
        signIn: (values, audience) =>
          apply(signIn(get().data, values, audience)),
        activatePatient: (values) => apply(activatePatient(get().data, values)),
        activateStaff: (values) => apply(activateStaff(get().data, values)),
        signOut: () => {
          const { data, sessionAccountId } = get();
          set({
            sessionAccountId: null,
            data: sessionAccountId
              ? appendAudit(
                  data,
                  sessionAccountId,
                  "signed-out",
                  sessionAccountId,
                )
              : data,
          });
        },
        finishHydration: (error) =>
          set({ hydrated: true, storageError: error ?? null }),
      };
    },
    {
      name: "medatlas-demo-identity",
      version: 1,
      skipHydration: true,
      storage: createJSONStorage(() => ({
        getItem: (name) => localStorage.getItem(name),
        removeItem: (name) => localStorage.removeItem(name),
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, value);
          } catch {
            queueMicrotask(() => {
              const message =
                "Browser storage is unavailable. Changes will last for this session only.";
              if (useIdentityStore.getState().storageError !== message)
                useIdentityStore.setState({ storageError: message });
            });
          }
        },
      })),
      // Sessions and entered passwords are intentionally never persisted.
      partialize: (state) => ({ data: state.data }),
      migrate: () => ({ data: createIdentitySeed() }),
      merge: (persisted, current) => {
        const result = snapshotSchema.safeParse(persisted);
        if (persisted !== undefined && !result.success)
          return {
            ...current,
            data: createIdentitySeed(),
            sessionAccountId: null,
            storageError:
              "Saved demo data was incompatible and has been reset to fictional samples.",
          };
        return result.success
          ? { ...current, data: result.data.data }
          : current;
      },
      onRehydrateStorage: () => (state, error) => {
        if (state)
          state.finishHydration(
            error
              ? "Browser storage is unavailable. Changes will last for this session only."
              : (state.storageError ?? undefined),
          );
        else
          useIdentityStore
            .getState()
            .finishHydration(
              "Browser storage is unavailable. Changes will last for this session only.",
            );
      },
    },
  ),
);
