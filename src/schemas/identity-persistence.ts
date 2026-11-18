import { z } from "zod";
import { SEED_VERSION } from "../data/identity-seed.ts";

// Validate persisted snapshots rather than trusting browser storage or casting it.
const accountSchema = z.object({
  id: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum([
    "doctor",
    "nurse",
    "records",
    "administrator",
    "reception",
    "scientist",
    "reviewer",
    "patient",
  ]),
  workspace: z.enum(["hospital", "laboratory", "patient"]),
  organisationId: z.string().optional(),
  patientId: z.string().optional(),
});
export const snapshotSchema = z.object({
  data: z.object({
    seedVersion: z.literal(SEED_VERSION),
    accounts: z.array(accountSchema),
    organisations: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(["Hospital", "Clinic", "Laboratory", "Diagnostic centre"]),
        state: z.string(),
        phone: z.string(),
        address: z.string(),
        status: z.enum(["pending", "demo-active"]),
      }),
    ),
    patients: z.array(
      z.object({
        id: z.string(),
        medAtlasId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.email(),
        organisationId: z.string(),
        portalAccountId: z.string().optional(),
      }),
    ),
    invitations: z.array(
      z.object({
        id: z.string(),
        code: z.string(),
        email: z.email(),
        kind: z.enum(["staff", "patient"]),
        organisationId: z.string().optional(),
        patientId: z.string().optional(),
        role: z
          .enum([
            "doctor",
            "nurse",
            "records",
            "administrator",
            "reception",
            "scientist",
            "reviewer",
          ])
          .optional(),
        workspace: z.enum(["hospital", "laboratory", "patient"]),
        consumed: z.boolean(),
      }),
    ),
    audit: z.array(
      z.object({
        id: z.string(),
        at: z.string(),
        actorId: z.string(),
        action: z.enum([
          "facility-submitted",
          "staff-activated",
          "portal-activated",
          "signed-in",
          "signed-out",
        ]),
        subjectId: z.string(),
      }),
    ),
  }),
});
