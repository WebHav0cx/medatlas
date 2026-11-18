import { AccountOverview } from "../../auth/AccountOverview";
export function HospitalAccount({ role }: { role: string }) { return <AccountOverview workspace="hospital" role={role} />; }
