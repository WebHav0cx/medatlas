import {
  type WorkflowContext,
  uid,
  appendAudit,
  organisationFor,
  roleTitles,
} from "./context.ts";
import type {
  MockState,
  StaffAccount,
  StaffInvitation,
  OrganisationApplication,
  AppRole,
} from "../../domain/workflow/types.ts";
import { createInitialMockState } from "../../data/workflow/seed.ts";
export function createOrganisationActions({
  get,
  set,
  change,
  auditChange,
}: WorkflowContext) {
  return {
    switchAccount(id: string) {
      if (get().staff.some((a) => a.id === id && a.status === "Active"))
        change((s) => ({
          ...s,
          currentAccountId: id,
        }));
    },
    addStaff(
      input: Omit<StaffAccount, "id" | "lastActive" | "status">,
    ): StaffAccount {
      const staff: StaffAccount = {
        ...input,
        organisationId: organisationFor(get())?.id,
        id: uid("staff"),
        status: "Pending Activation",
        lastActive: "Never",
      };
      change((s) =>
        auditChange(
          {
            ...s,
            staff: [...s.staff, staff],
          },
          "Staff account created",
          staff.id,
          `${staff.name} added as ${staff.title}.`,
        ),
      );
      return staff;
    },
    updateStaff(id: string, changes: Partial<StaffAccount>) {
      change((s) =>
        auditChange(
          {
            ...s,
            staff: s.staff.map((a) =>
              a.id === id
                ? {
                    ...a,
                    ...changes,
                  }
                : a,
            ),
          },
          "Staff account updated",
          id,
          "Role or account status changed.",
        ),
      );
    },
    updateFacility(changes: Partial<MockState["facility"]>) {
      change((s) => {
        const org = organisationFor(s);
        return auditChange(
          org && org.id !== "org-citycare"
            ? {
                ...s,
                facilityProfiles: {
                  ...s.facilityProfiles,
                  [org.id]: {
                    ...(s.facilityProfiles?.[org.id] ?? s.facility),
                    ...changes,
                  },
                },
              }
            : {
                ...s,
                facility: {
                  ...s.facility,
                  ...changes,
                },
              },
          "Facility settings updated",
          org?.name ?? "CityCare Hospital",
          "Facility profile information changed.",
        );
      });
    },
    recordAudit(
      action: string,
      resource: string,
      outcome: string,
      detail: string,
    ) {
      change((s) => ({
        ...s,
        audit: appendAudit(s, action, resource, outcome, detail),
      }));
    },
    createInvitation(
      input: Omit<StaffInvitation, "code" | "status">,
    ): StaffInvitation {
      const invitation: StaffInvitation = {
        ...input,
        code: `${input.organisationId === "org-prime" ? "PRIME" : "CITY"}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`,
        status: "Pending",
      };
      change((s) =>
        auditChange(
          {
            ...s,
            invitations: [invitation, ...s.invitations],
          },
          "Staff invitation created",
          invitation.code,
          `Invitation created for ${invitation.email}.`,
        ),
      );
      return invitation;
    },
    acceptInvitation(
      code: string,
      profile: {
        name: string;
        email: string;
      },
    ) {
      const s = get(),
        i = s.invitations.find(
          (i) =>
            i.code.toUpperCase() === code.toUpperCase() &&
            i.status === "Pending" &&
            i.email.toLowerCase() === profile.email.toLowerCase(),
        );
      if (
        !i ||
        s.staff.some(
          (a) => a.email.toLowerCase() === profile.email.toLowerCase(),
        )
      )
        return null;
      const staff: StaffAccount = {
        id: uid("staff"),
        name: profile.name,
        email: profile.email,
        role: i.role,
        title: roleTitles[i.role],
        department: i.department,
        status: "Active",
        lastActive: "Now",
        organisationId: i.organisationId,
      };
      change((s) =>
        auditChange(
          {
            ...s,
            staff: [...s.staff, staff],
            invitations: s.invitations.map((v) =>
              v.code === i.code
                ? {
                    ...v,
                    status: "Accepted",
                  }
                : v,
            ),
            currentAccountId: staff.id,
          },
          "Staff invitation accepted",
          i.code,
          `${staff.name} joined the organisation.`,
        ),
      );
      return staff;
    },
    addOrganisationApplication(
      input: Omit<OrganisationApplication, "id" | "status">,
    ): OrganisationApplication {
      const application: OrganisationApplication = {
        ...input,
        id: uid("ORG-APP"),
        status: "Pending Review",
      };
      change((s) => ({
        ...s,
        organisationApplications: [application, ...s.organisationApplications],
      }));
      return application;
    },
    approveOrganisationApplication(id: string) {
      change((s) => {
        const a = s.organisationApplications.find((a) => a.id === id);
        if (!a || a.status !== "Pending Review") return s;
        const orgId = uid("org"),
          role: AppRole =
            a.type === "Laboratory / Diagnostic Centre" ? "lab-admin" : "admin";
        const staff: StaffAccount = {
          id: uid("staff"),
          name: a.administratorName,
          email: a.administratorEmail,
          role,
          title: roleTitles[role],
          department: "Administration",
          status: "Active",
          lastActive: "Now",
          organisationId: orgId,
        };
        return {
          ...s,
          organisations: [
            ...s.organisations,
            {
              id: orgId,
              name: a.displayName,
              type: a.type,
              location: `${a.lga}, ${a.state}`,
              status: "Active",
            },
          ],
          staff: [...s.staff, staff],
          currentAccountId: staff.id,
          facilityProfiles: {
            ...s.facilityProfiles,
            [orgId]: {
              name: a.displayName,
              type: a.type,
              address: a.address,
              phone: a.phone,
              email: a.email,
              departments: ["Administration"],
            },
          },
          organisationApplications: s.organisationApplications.map((v) =>
            v.id === id
              ? {
                  ...v,
                  status: "Approved",
                }
              : v,
          ),
        };
      });
    },
    resetData() {
      set(createInitialMockState());
    },
  };
}
