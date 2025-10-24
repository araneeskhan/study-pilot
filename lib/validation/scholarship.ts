import { z } from "zod";

export const scholarshipSchema = z.object({
  name: z.string().min(2, "Scholarship name is required"),
  country: z.string().min(1, "Country is required"),
  universities: z.array(z.string()).optional(),
  type: z.enum(["government", "university", "private"]),
  amount: z.object({
    value: z.number().min(0),
    currency: z.string(),
    type: z.enum(["full", "partial"]),
  }),
  degree_levels: z.array(z.string()).min(1, "At least one degree level is required"),
  fields_of_study: z.array(z.string()).min(1, "At least one field is required"),
  eligibility: z.object({
    nationality: z.array(z.string()).min(1, "At least one nationality is required"),
    min_gpa: z.number().min(0).max(4),
    age_limit: z.number().min(0).optional(),
    language_requirements: z.array(
      z.object({
        test: z.string(),
        min_score: z.number().min(0),
      })
    ),
  }),
  benefits: z.array(z.string()).min(1, "At least one benefit is required"),
  application_deadline: z.string(),
  start_date: z.string(),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(100, "Description must be at least 100 characters"),
  how_to_apply: z.string().min(50, "Application process is required"),
  official_link: z.string().url("Invalid URL"),
  featured: z.boolean().default(false),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type ScholarshipFormData = z.infer<typeof scholarshipSchema>;