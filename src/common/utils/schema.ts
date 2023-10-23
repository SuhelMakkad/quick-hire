import * as z from "zod";

export type JobSchema = z.infer<typeof jobSchema>;

export type JobWithId = JobSchema & {
  id: string;
  createdAt: string;
};

const coerceNumberError = { invalid_type_error: "Must be a valid number" };

export const jobSchema = z.object({
  title: z.string().min(2).max(50),
  shortDescription: z.string().min(20),
  description: z.string().min(20),
  minExperience: z.coerce.number(coerceNumberError),
  maxExperience: z.coerce.number(coerceNumberError).min(0).max(30),
  minSalary: z.coerce.number(coerceNumberError).min(0),
  maxSalary: z.coerce.number(coerceNumberError).min(0),
  categories: z.array(z.object({ label: z.string().optional() })),
  locations: z.array(z.object({ label: z.string().optional() })),
});

export type BaseProfileSchema = z.infer<typeof baseProfileSchema>;

export const baseProfileSchema = z.object({
  jobId: z.string().min(2).max(50),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(4).max(20),
  linkedin: z.string({ required_error: "Please enter a valid url" }).trim().url().optional(),
  github: z.string({ required_error: "Please enter a valid url" }).trim().url().optional(),
  contactForFutureOpp: z.boolean().default(false).optional(),
});

export type ProfileSchemaClient = z.infer<typeof profileSchemaClient>;

export const profileSchemaClient = baseProfileSchema.extend({
  resume: z
    .custom<FileList>()
    .refine((file) => file?.length == 1, "Resume is required.")
    .refine((file) => file[0]?.type === "application/pdf", "Must be a PDF.")
    .refine((file) => file[0]?.size <= 3_000_000, `Max file size is 3MB.`),
});

export type ProfileSchemaServer = z.infer<typeof profileSchemaServer>;

export const profileSchemaServer = baseProfileSchema.extend({
  resume: z
    .custom<File>()
    .refine((file) => file, "Resume is required.")
    .refine((file) => file?.type === "application/pdf", "Must be a PDF.")
    .refine((file) => file?.size <= 3_000_000, `Max file size is 3MB.`),
});
