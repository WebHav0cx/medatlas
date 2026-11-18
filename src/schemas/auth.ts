import { z } from "zod";
import { DEMO_PASSWORD } from "../data/identity-seed.ts";

const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address"));
const name = z
  .string()
  .trim()
  .min(2, "Enter at least 2 characters")
  .max(100, "Use 100 characters or fewer");
const demoPassword = z
  .string()
  .refine(
    (value): boolean => value === DEMO_PASSWORD,
    "Use the password in the Password section",
  );

export const signInSchema = z.object({ email, password: demoPassword });
export type SignInValues = z.infer<typeof signInSchema>;

export const organisationSchema = z.object({
  facilityName: name,
  facilityType: z.enum([
    "Hospital",
    "Clinic",
    "Laboratory",
    "Diagnostic centre",
  ]),
  state: z.string().trim().min(2, "Choose a state or FCT"),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+234|0)[0-9]{10}$/,
      "Enter a Nigerian phone number, e.g. +234 followed by 10 digits",
    ),
  address: z.string().trim().min(8, "Enter a street address and city").max(250),
  firstName: name,
  lastName: name,
  email,
  password: demoPassword,
});
export type OrganisationValues = z.infer<typeof organisationSchema>;

export const portalSchema = z.object({
  medAtlasId: z
    .string()
    .trim()
    .min(1, "Enter your existing MedAtlas ID")
    .toUpperCase(),
  email,
  invitationCode: z
    .string()
    .trim()
    .min(1, "Enter your separate portal invitation code"),
  password: demoPassword,
});
export type PortalValues = z.infer<typeof portalSchema>;

export const staffActivationSchema = z.object({
  firstName: name,
  lastName: name,
  email,
  invitationCode: z
    .string()
    .trim()
    .min(1, "Enter the invitation from your facility administrator"),
  password: demoPassword,
});
export type StaffActivationValues = z.infer<typeof staffActivationSchema>;
