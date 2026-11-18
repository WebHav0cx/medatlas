import { AccountOverview } from "../../auth/AccountOverview";
export function LaboratoryAccount({ role }: { role: string }) { return <AccountOverview workspace="laboratory" role={role} />; }
