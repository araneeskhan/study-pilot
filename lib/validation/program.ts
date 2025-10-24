import { z } from "zod";

export const programSchema = z.object({
  name: z.string().min(2, "Program name is required"),
  university: z.string().min(1, "University is required"),
  country: z.string().min(1, "Country is required"),
  degree_level: z.enum(["bachelor", "master", "phd"]),
  field: z.string().min(1, "Field of study is required"),
  duration: z.string().min(1, "Duration is required"),
  language: z.array(z.string()).min(1, "At least one language is required"),
  tuition_fee: z.object({
    amount: z.number().min(0),
    currency: z.string(),
  }),
  start_dates: z.array(z.string()).min(1, "At least one start date is required"),
  description: z.string().min(100, "Description must be at least 100 characters"),
  curriculum: z.string().min(50, "Curriculum information is required"),
  requirements: z.object({
    min_gpa: z.number().min(0).max(4),
    language_tests: z.array(
      z.object({
        test: z.string(),
        min_score: z.number().min(0),
      })
    ),
    work_experience: z.boolean(),
  }),
  career_prospects: z.array(z.string()),
  accreditation: z.string(),
  mode: z.enum(["on-campus", "online", "hybrid"]),
  official_link: z.string().url("Invalid URL"),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type ProgramFormData = z.infer<typeof programSchema>;