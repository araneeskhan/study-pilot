import { z } from "zod";

export const countrySchema = z.object({
  name: z.string().min(2, "Country name is required"),
  flag: z.string().min(1, "Flag emoji is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  education_system: z.string().min(10, "Education system description is required"),
  tuition_fees: z.object({
    bachelor: z.object({
      min: z.number().min(0),
      max: z.number().min(0),
      currency: z.string(),
    }),
    master: z.object({
      min: z.number().min(0),
      max: z.number().min(0),
      currency: z.string(),
    }),
    phd: z.object({
      min: z.number().min(0),
      max: z.number().min(0),
      currency: z.string(),
    }),
  }),
  language_requirements: z.array(
    z.object({
      test: z.string(),
      min_score: z.number().min(0),
    })
  ).optional(),
  visa_info: z.string().min(10, "Visa information is required"),
  part_time_work: z.boolean(),
  post_study_work_visa: z.boolean(),
  popular_cities: z.array(z.string()).optional(),
  cost_of_living: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.string(),
  }),
  featured: z.boolean().default(false),
  meta: z.object({
    title: z.string().optional().default(''),
    description: z.string().optional().default(''),
  }),
});

export type CountryFormData = z.infer<typeof countrySchema>;