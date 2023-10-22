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
  categories: z.array(z.string()),
  locations: z.array(z.string()),
});
