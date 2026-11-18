import { z } from "zod";
const required = (message: string) => z.string().trim().min(1, message);
const orgError = "Complete the required organisation details.";
const contactError = "Complete the administrative contact details.";
const professionalError = "Full name, email and invitation code are required.";
const patientError =
  "Complete all required fields, use at least 8 characters and confirm the same password.";
export const workflowSignInSchema = z.object({
  email: required("Check the email, password and account status."),
  password: required("Check the email, password and account status."),
});
export const organisationApplicationSchema = z.object({
  type: z.enum(["Hospital", "Clinic", "Laboratory / Diagnostic Centre"]),
  registeredName: required(orgError),
  displayName: required(orgError),
  state: required(orgError),
  lga: z.string(),
  address: required(orgError),
  adminName: required(contactError),
  adminEmail: required(contactError),
  email: z.string(),
  phone: required(contactError),
  licence: z.string(),
  authority: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});
export type OrganisationApplicationValues = z.infer<
  typeof organisationApplicationSchema
>;
export const professionalSchema = z.object({
  name: required(professionalError),
  email: required(professionalError),
  code: required(professionalError),
  phone: z.string(),
  category: z.string(),
  registration: z.string(),
  state: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});
export const patientSignupSchema = z
  .object({
    fullName: required(patientError),
    email: required(patientError),
    phone: z.string(),
    dob: required(patientError),
    password: z.string().min(8, patientError),
    confirmPassword: z.string(),
    accepted: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword)
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: patientError,
      });
    if (!values.accepted)
      ctx.addIssue({
        code: "custom",
        path: ["accepted"],
        message: patientError,
      });
  });
export const laboratoryPatientSchema = z.object({
  firstName: required("Complete the required patient fields."),
  lastName: required("Complete the required patient fields."),
  dob: required("Complete the required patient fields."),
  sex: z.string(),
  phone: z.string(),
});
export const laboratoryInvitationSchema = z.object({
  email: z.string(),
  role: z.enum(["lab-reception", "lab-scientist", "lab-reviewer", "lab-admin"]),
  department: z.string(),
});
export const laboratoryResultSchema = z.object({
  value: z.string(),
  unit: z.string(),
  reference: z.string(),
  flag: z.enum(["Normal", "High", "Low"]),
  comments: z.string(),
});
export const linkingSchema = z.object({
  method: z.enum(["Linking Code", "Review Request"]),
  facility: z.string(),
  code: z.string(),
});
export const informationRequestSchema = z.object({
  type: z.enum([
    "Access Existing Records",
    "Record Linking",
    "Correction Review",
    "Copy of Record",
  ]),
  facility: z.string(),
  documentId: z.string(),
  note: z.string(),
});
export const contactSchema = z.object({
  email: z.string(),
  phone: z.string(),
});
export const localPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Use at least 8 characters and enter the same password twice."),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Use at least 8 characters and enter the same password twice.",
    path: ["confirmPassword"],
  });
const hospitalFieldsSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dob: z.string().optional(),
  sex: z.string().optional(),
  phone: z.string().optional(),
  localId: z.string().optional(),
  patientId: z.string().optional(),
  sourceFacility: z.string().optional(),
  category: z.string().optional(),
  purpose: z.string().optional(),
  authorisation: z.string().optional(),
  priority: z.string().optional(),
  destination: z.string().optional(),
  reason: z.string().optional(),
  context: z.string().optional(),
  attachment: z.string().optional(),
  test: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  department: z.string().optional(),
  role: z.string().optional(),
  address: z.string().optional(),
  note: z.string().optional(),
});
export type HospitalWorkflowValues = z.infer<typeof hospitalFieldsSchema>;
export const workflowPrioritySchema = z.enum(["Routine", "Urgent"]);
export const workflowProviderRoleSchema = z.enum([
  "doctor",
  "nurse",
  "records",
  "admin",
]);
export function hospitalWorkflowSchema(moduleKey: string, role: string) {
  return hospitalFieldsSchema.superRefine((values, ctx) => {
    const required = (
      keys: Array<keyof HospitalWorkflowValues>,
      message: string,
    ) => {
      for (const key of keys)
        if (!values[key]?.trim())
          ctx.addIssue({
            code: "custom",
            path: [key],
            message,
          });
    };
    if (["registration", "patients"].includes(moduleKey) && role === "records")
      required(
        ["firstName", "lastName", "dob", "localId"],
        "Complete all required patient fields.",
      );
    else if (["requests", "outgoing"].includes(moduleKey))
      required(
        ["patientId", "sourceFacility", "category"],
        "Select a patient, source facility and record category.",
      );
    else if (moduleKey === "referrals")
      required(
        ["patientId", "destination", "reason"],
        "Select a patient, destination and referral reason.",
      );
    else if (moduleKey === "diagnostic-requests")
      required(["patientId", "test"], "Select a patient and diagnostic test.");
    else if (moduleKey === "staff")
      required(
        ["name", "email", "department"],
        "Name, email and department are required.",
      );
    else if (moduleKey === "facility")
      required(
        ["name", "address", "email"],
        "Facility name, address and contact email are required.",
      );
  });
}
export const preferenceSchema = z.object({
  email: z.boolean(),
  sms: z.boolean(),
  sharing: z.boolean(),
  records: z.boolean(),
});
export const identityDecisionSchema = z.object({
  note: z.string().trim().min(1),
});
