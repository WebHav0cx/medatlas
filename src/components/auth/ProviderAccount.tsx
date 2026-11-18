"use client";
import { AccountOverview } from "./AccountOverview";
import { useIdentityStore } from "../../stores/identity";
export function ProviderAccount() {
  const workspace = useIdentityStore((state) => state.data.accounts.find((account) => account.id === state.sessionAccountId)?.workspace);
  return <AccountOverview workspace={workspace === "laboratory" ? "laboratory" : "hospital"} />;
}
